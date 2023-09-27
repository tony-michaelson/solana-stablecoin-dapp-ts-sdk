import { Connection, PublicKey } from '@solana/web3.js'
import { BOND_MAINNET_CONFIG, BOND_MAINNET_SYSTEMS } from './constants'
import {
  BondConfig,
  BondQuoteRequest,
  BondSystem,
  BondSystemBalances,
  BondSystems,
  SystemName,
  SystemNames,
} from './types/bond'
import * as instructions from './instructions/bond'
import { Instructions, PDAList, Signers } from './types/common'
import { BondAccount, getBondAccounts, loadBondAccount } from './state/bond'
import {
  BondSystemAccount,
  BondSystemAccounts,
  getBondSystemAccountList,
  getBondSystemAccounts,
  loadBondSystemAccount,
} from './state/bondSystem'
import Decimal from 'decimal.js'
import { getAccount, getMint } from '@solana/spl-token'
import { estimateBondValue, getBondSystemBalances } from './utils/bond'
import { loadOracleAccount, OracleAccount } from './state/oracle'

export class Bond {
  public config: BondConfig
  public systems: BondSystems
  public connection: Connection

  constructor(
    connection: Connection,
    config?: BondConfig,
    systems?: BondSystems
  ) {
    this.config = config || BOND_MAINNET_CONFIG
    this.systems = systems || BOND_MAINNET_SYSTEMS
    this.connection = connection
  }

  public async getBondAccount(account: PublicKey): Promise<BondAccount> {
    return loadBondAccount(this.connection, account)
  }

  public async getBonds(owner: PublicKey) {
    return getBondAccounts(this.connection, owner, this.config.programId)
  }

  public async getBondSystemAccount(
    account: PublicKey
  ): Promise<BondSystemAccount> {
    const systemName = this.getSystemNameByAccount(account)
    const bondSystem = this.systems[systemName]
    return loadBondSystemAccount(
      this.connection,
      account,
      bondSystem.name,
      bondSystem.provider
    )
  }

  public async getBondSystems(): Promise<BondSystemAccounts> {
    return getBondSystemAccounts(this.connection)
  }

  public async getBondSystemAccounts(): Promise<BondSystemAccount[]> {
    return getBondSystemAccountList(this.connection)
  }

  public getBondSystem(systemName: SystemNames): BondSystem {
    return this.fetchBondSystem(systemName)
  }

  public async getBondSystemBalances(): Promise<BondSystemBalances> {
    return {
      LUCRA_SOL_ORCA: await getBondSystemBalances(
        this.connection,
        this.systems['LUCRA_SOL_ORCA']
      ),
      SOL_MATA_RAYDIUM: await getBondSystemBalances(
        this.connection,
        this.systems['SOL_MATA_RAYDIUM']
      ),
    }
  }

  public getSystemNameByAccount(bondSystemAccount: PublicKey): SystemNames {
    return this.bondSystemAccountToName(bondSystemAccount)
  }

  public async getQuote(
    systemName: SystemName,
    lpTokens: Decimal,
    custom?: BondSystem
  ) {
    const bondSystem = this.fetchBondSystem(systemName, custom)
    return this.getBondQuote(bondSystem, lpTokens)
  }

  public async createBondSystem(
    args: Pick<
    instructions.CreateBondSysInstruction,
    | 'bondSystemAcctKP'
    | 'lpTokenVaultKP'
    | 'treasuryKP'
    | 'lpMint'
    | 'baseMint'
    | 'quoteMint'
    | 'poolStateAccount'
    | 'treasuryMint'
    | 'treasuryOracle'
    | 'baseOracle'
    | 'quoteOracle'
    | 'settings'
    | 'payer'
    >
  ): Promise<Instructions & Signers & PDAList> {
    return instructions.createBondSysInstruction({
      config: this.config,
      connection: this.connection,
      ...args,
    })
  }

  public startBondSystem(
    args: Pick<
    instructions.StartBondSysInstruction,
    'authority' | 'bondSystemAcct'
    >
  ): Instructions & Signers {
    return instructions.startBondSystemInstuction({
      config: this.config,
      ...args,
    })
  }

  public async toggleBondSystem(
    systemName: SystemName,
    args: Pick<instructions.ToggleBondSystemInstruction, 'authority'>,
    custom?: BondSystem
  ): Promise<Instructions & Signers> {
    const bondSystem = this.fetchBondSystem(systemName, custom)
    return instructions.toggleBondSystemInstruction({
      config: this.config,
      bondSystem,
      ...args,
    })
  }

  public async buyBond(
    systemName: SystemName,
    args: Pick<
    instructions.BuyBondInstruction,
    'lpTokenAmount' | 'tokenAccount' | 'owner' | 'payer' | 'bondAcctKP'
    >,
    custom?: BondSystem
  ): Promise<Instructions & Signers> {
    const bondSystem = this.fetchBondSystem(systemName, custom)
    return instructions.buyBondInstruction({
      config: this.config,
      connection: this.connection,
      bondSystem: bondSystem,
      ...args,
    })
  }

  public async exerciseBond(
    systemName: SystemName,
    args: Pick<instructions.ExerciseBondInstruction, 'bond' | 'tokenAccount'>,
    custom?: BondSystem
  ): Promise<Instructions & Signers> {
    const bondSystem = this.fetchBondSystem(systemName, custom)
    return instructions.exerciseBondInstruction({
      config: this.config,
      bondSystem: bondSystem,
      ...args,
    })
  }

  public async transferBond(
    args: Pick<
    instructions.TransferBondInstruction,
    'bond' | 'newOwner' | 'oldOwner'
    >
  ): Promise<Instructions & Signers> {
    return instructions.transferBondInstruction({
      config: this.config,
      ...args,
    })
  }

  public async closeBondSystem(
    systemName: SystemName,
    args: Pick<
    instructions.CloseBondSystemInstruction,
    | 'bondSystemAuthority'
    | 'solReceiveAccount'
    | 'treasuryReceiveAccount'
    | 'vaultReceiveAccount'
    >,
    custom?: BondSystem
  ): Promise<Instructions & Signers> {
    const bondSystem = this.fetchBondSystem(systemName, custom)
    return instructions.closeBondSystemInstruction({
      config: this.config,
      bondSystem: bondSystem,
      ...args,
    })
  }

  public async updateBondSystem(
    systemName: SystemName,
    args: Pick<
    instructions.UpdateBondSystemInstruction,
    | 'authority'
    | 'bondYield'
    | 'timelock'
    | 'maxAmountToDistributePerEpoch'
    | 'maxAllowedToDistributeAtOneTime'
    >,
    custom?: BondSystem
  ): Promise<Instructions & Signers> {
    const bondSystem = this.fetchBondSystem(systemName, custom)
    return instructions.updateBondSystemInstruction({
      config: this.config,
      bondSystem: bondSystem,
      ...args,
    })
  }

  private fetchBondSystem(systemName: SystemName, custom?: BondSystem) {
    if (systemName !== 'CUSTOM') {
      return this.systems[systemName]
    } else if (systemName === 'CUSTOM' && custom) {
      return custom
    } else {
      throw 'Provide a custom Bond Config'
    }
  }

  private bondSystemAccountToName(account: PublicKey): SystemNames {
    const name = Object.keys(this.systems).find(
      (k) =>
        account.toString() === this.systems[k as SystemNames].account.toString()
    )
    if (!name) {
      throw Error('Unable to locate Bond System by Account')
    }
    return name as SystemNames
  }

  private async getOracleAccount(account: PublicKey): Promise<OracleAccount> {
    return loadOracleAccount(this.connection, account, this.config.programId)
  }

  private async getBondQuote(
    bondSystem: BondSystem,
    lpTokens: Decimal
  ): Promise<Decimal> {
    const r = await this.buildQuoteRequest(bondSystem, lpTokens)
    return estimateBondValue(r)
  }

  public async buildQuoteRequest(
    bondSystem: BondSystem,
    lpTokens: Decimal
  ): Promise<BondQuoteRequest> {
    const bondSystemAcct = await loadBondSystemAccount(
      this.connection,
      bondSystem.account,
      bondSystem.name,
      bondSystem.provider
    )
    const lpMint = await getMint(this.connection, bondSystem.lpInfo.lpMint)
    const lpTokenSupply = lpMint.supply.toString()
    const baseVault = await getAccount(
      this.connection,
      bondSystem.lpInfo.baseVault
    )
    const quoteVault = await getAccount(
      this.connection,
      bondSystem.lpInfo.quoteVault
    )

    const lucraPrice = await this.getOracleAccount(bondSystem.treasuryOracle)
    const basePrice = await this.getOracleAccount(bondSystem.lpInfo.baseOracle)
    const quotePrice = await this.getOracleAccount(
      bondSystem.lpInfo.quoteOracle
    )

    return {
      lpTokens: lpTokens,
      bondYield: new Decimal(bondSystemAcct.bondYield),
      lp: {
        lpTokenSupply: new Decimal(lpTokenSupply),
        tokenBal: {
          base: new Decimal(baseVault.amount.toString()),
          quote: new Decimal(quoteVault.amount.toString()),
        },
      },
      price: {
        lucra: new Decimal(lucraPrice.aggPrice.toString()),
        base: new Decimal(basePrice.aggPrice.toString()),
        quote: new Decimal(quotePrice.aggPrice.toString()),
      },
    }
  }
}
