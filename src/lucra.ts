import {
  Connection,
  Keypair,
  PublicKey,
  TransactionInstruction,
} from '@solana/web3.js'
import { LUCRA_MAINNET_CONFIG, MARINADE_MAINNET_CONFIG } from './constants'
import {
  LucraConfig,
  MarinadeConfig,
  StakeBalanceWithAmounts,
} from './types/lucra'
import * as instructions from './instructions/lucra'
import {
  Address,
  Instructions,
  Signers,
  TwoTransactions,
  FourTransactions,
} from './types/common'
import { loadStakingStateAccount, StakingStateAccount } from './state/staking'
import { loadStateAccount, StateAccount } from './state/lucraState'
import {
  getStakeBalances,
  loadStakeBalance,
  StakeBalance,
  StakeBalanceAmounts,
} from './state/stakeBalance'
import { loadRewardAccount, RewardAccount } from './state/reward'
import {
  getPendingWithdrawalAccounts,
  loadPendingWithdrawalAccount,
  PendingWithdrawalAccount,
} from './state/pendingWithdrawal'
import {
  generatePendingFundsAccountKP,
  generateRewardAccountKP,
  generateRewardAccountPkList,
  generateStakeAccountKP,
} from './instructions/common'
import { loadOracleAccount, OracleAccount } from './state/oracle'
import {
  getLoanAccounts,
  getUnpaidLoanData,
  loadLoanAccount,
  LoanAccount,
} from './state/loan'
import { loadStakeAccount, StakeAccount } from './state/stakeAccount'
import {
  loadPriceHistoryAccount,
  PriceHistoryAccount,
} from './state/priceHistory'
import { ArbStateAccount, loadArbStateAccount } from './state/arbState'

export class Lucra {
  public config: LucraConfig
  public marinade: MarinadeConfig
  public connection: Connection

  constructor(
    connection: Connection,
    config?: LucraConfig,
    marinade?: MarinadeConfig
  ) {
    this.config = config || LUCRA_MAINNET_CONFIG
    this.marinade = marinade || MARINADE_MAINNET_CONFIG
    this.connection = connection
  }

  public async initialize(
    args: Pick<
    instructions.Initialize,
    | 'creatorAuthority'
    | 'payer'
    | 'marinadeState'
    | 'settings'
    | 'mataMint'
    | 'lucraMint'
    | 'stLucraMint'
    | 'oracleRewardMint'
    | 'msolVaultKP'
    | 'rewardVaultKP'
    | 'lucraStateAcctKP'
    | 'arbStateAcctKP'
    | 'lucraStakingAcctKP'
    | 'arbFundAcctKP'
    | 'arbCofferKP'
    | 'wsolHoldingVaultAcctKP'
    | 'mataHoldingVaultAcctKP'
    | 'lucraHoldingVaultAcctKP'
    >
  ): Promise<FourTransactions> {
    return instructions.createInitializeInstruction({
      config: this.config,
      connection: this.connection,
      ...args,
    })
  }

  public updateState(
    args: Pick<
    instructions.Update,
    'settings' | 'daoAuthority' | 'lucraStateAcct' | 'arbStateAcct'
    >
  ): TransactionInstruction {
    return instructions.createUpdateInstruction({
      config: this.config,
      ...args,
    })
  }

  public async createLoan(
    args: Pick<
    instructions.CreateLoan,
    'payer' | 'loanAccountKP' | 'lamports' | 'stakeAccount'
    >
  ): Promise<Instructions & Signers> {
    return instructions.createLoanInstruction({
      config: this.config,
      connection: this.connection,
      ...args,
    })
  }

  public async addCollateral(
    args: Pick<
    instructions.AddCollateral,
    'payer' | 'loanAccount' | 'lamports' | 'stakeAccount'
    >
  ): Promise<TransactionInstruction[]> {
    return instructions.addCollateralInstruction({
      config: this.config,
      connection: this.connection,
      ...args,
    })
  }

  public async closeLoan(
    args: Pick<
    instructions.CloseLoan,
    'payer' | 'loanAccount' | 'stakeAccount' | 'unstakeMsol'
    >
  ): Promise<TransactionInstruction> {
    return instructions.closeLoanInstruction({
      config: this.config,
      connection: this.connection,
      ...args,
    })
  }

  public async createPriceHistory(
    args: Pick<
    instructions.CreatePriceHistory,
    'creatorAuthority' | 'priceHistoryAccountKP'
    >
  ): Promise<Instructions & Signers> {
    return instructions.createPriceHistoryInstruction({
      config: this.config,
      connection: this.connection,
      ...args,
    })
  }

  public async updatePriceHistory(
    args: Pick<instructions.UpdatePriceHistory, 'payer'>
  ): Promise<Instructions> {
    return instructions.updatePriceHistoryInstruction({
      config: this.config,
      connection: this.connection,
      ...args,
    })
  }

  public async determineInterest(
    args: Pick<instructions.DetermineInterest, 'payer' | 'loanAccount'>
  ): Promise<Instructions> {
    return instructions.determineInterestInstruction({
      config: this.config,
      connection: this.connection,
      ...args,
    })
  }

  public async harvestInterest(
    args: Pick<instructions.HarvestInterest, 'payer' | 'loanAccount' | 'amm'>
  ): Promise<Instructions & Signers> {
    return instructions.harvestInterestInstruction({
      config: this.config,
      marinade: this.marinade,
      connection: this.connection,
      ...args,
    })
  }

  public async createOracle(
    args: Pick<
    instructions.CreateOracle,
    | 'payer'
    | 'market'
    | 'serumMarket'
    | 'raydiumAMM'
    | 'orcaSwap'
    | 'baseMint'
    | 'quoteMint'
    | 'oracleAccountKP'
    >
  ): Promise<Instructions & Signers> {
    return instructions.createOracleInstruction({
      config: this.config,
      connection: this.connection,
      ...args,
    })
  }

  public async updatePrice(
    args: Pick<instructions.UpdatePrice, 'payer' | 'oracle'>
  ): Promise<Instructions> {
    return instructions.createUpdatePriceInstruction({
      config: this.config,
      connection: this.connection,
      ...args,
    })
  }
  public async sellLucraForArbFunds(
    args: Pick<instructions.SellLucraForArbFunds, 'payer' | 'amm' | 'lamports'>
  ): Promise<Instructions & Signers> {
    return instructions.sellLucraForArbFundsInstruction({
      config: this.config,
      connection: this.connection,
      ...args,
    })
  }

  public async sellMataForArbFunds(
    args: Pick<instructions.SellMataForArbFunds, 'payer' | 'amm' | 'mata'>
  ): Promise<Instructions & Signers> {
    return instructions.sellMataForArbFundsInstruction({
      config: this.config,
      connection: this.connection,
      ...args,
    })
  }

  public async mintLucraForArbFunds(
    args: Pick<instructions.MintLucraForArbFunds, 'payer' | 'amm' | 'lamports'>
  ): Promise<Instructions & Signers> {
    return instructions.mintLucraForArbFundsInstruction({
      config: this.config,
      connection: this.connection,
      ...args,
    })
  }

  public async mintMataForArbFunds(
    args: Pick<instructions.MintMataForArbFunds, 'payer' | 'amm' | 'mata'>
  ): Promise<Instructions & Signers> {
    return instructions.mintMataForArbFundsInstruction({
      config: this.config,
      connection: this.connection,
      ...args,
    })
  }

  public async buyBurnLucra(
    args: Pick<instructions.BuyBurnLucra, 'payer' | 'amm' | 'lamports'>
  ): Promise<Instructions & Signers> {
    return instructions.buyBurnLucraInstruction({
      config: this.config,
      connection: this.connection,
      ...args,
    })
  }

  public async buyBurnMata(
    args: Pick<instructions.BuyBurnMata, 'payer' | 'amm' | 'lamports'>
  ): Promise<Instructions & Signers> {
    return instructions.buyBurnMataInstruction({
      config: this.config,
      connection: this.connection,
      ...args,
    })
  }

  public async transferMsolForArbFunds(
    args: Pick<
    instructions.TransferMsolForArbFunds,
    'payer' | 'amm' | 'lamports'
    >
  ): Promise<Instructions & Signers> {
    return instructions.transferMsolForArbFundsInstruction({
      config: this.config,
      connection: this.connection,
      ...args,
    })
  }

  public async cleanUpArb(
    args: Pick<instructions.CleanUpArb, 'payer'>
  ): Promise<Instructions & Signers> {
    return instructions.cleanUpArbInstruction({
      config: this.config,
      connection: this.connection,
      ...args,
    })
  }

  public async createStakeAccount(
    args: Pick<instructions.CreateStakeAccount, 'owner'>
  ): Promise<Instructions & Signers & Address> {
    return instructions.createStakeAccountInstruction({
      config: this.config,
      connection: this.connection,
      ...args,
    })
  }

  public async createStakeBalance(
    args: Pick<
    instructions.CreateStakeBalance,
    | 'owner'
    | 'timeframe'
    | 'stakeBalanceAccountKP'
    | 'stakedLucraVaultKP'
    | 'depositVaultKP'
    | 'stakeVaultKP'
    | 'pendingVaultKP'
    >
  ): Promise<TwoTransactions> {
    return instructions.createStakeBalanceInstruction({
      config: this.config,
      connection: this.connection,
      ...args,
    })
  }

  public async depositStake(
    args: Pick<
    instructions.DepositStake,
    'owner' | 'lucra' | 'stakeBalanceAccount' | 'depositVault'
    >
  ): Promise<TransactionInstruction> {
    return instructions.depositStakeInstruction({
      config: this.config,
      ...args,
    })
  }

  public async stake(
    args: Pick<
    instructions.Stake,
    | 'owner'
    | 'lucra'
    | 'stakeAccount'
    | 'stakeBalanceAccount'
    | 'depositVault'
    | 'stakeVault'
    | 'stakedLucraVault'
    >
  ): Promise<TransactionInstruction> {
    return instructions.stakeInstruction({
      config: this.config,
      ...args,
    })
  }

  public async dropReward(
    args: Pick<instructions.DropReward, 'payer' | 'rewardAccountKP'>
  ): Promise<Instructions & Signers> {
    return instructions.dropRewardInstruction({
      config: this.config,
      connection: this.connection,
      ...args,
    })
  }

  public async generateRewardAccountKP(rewardCursor: number): Promise<Keypair> {
    return generateRewardAccountKP(this.config, rewardCursor)
  }

  public async claimReward(
    args: Pick<
    instructions.ClaimReward,
    | 'owner'
    | 'rewardAccount'
    | 'stakeBalanceAccount'
    | 'stakeVault'
    | 'stakedLucraVault'
    >
  ): Promise<TransactionInstruction> {
    return instructions.claimRewardInstruction({
      config: this.config,
      connection: this.connection,
      ...args,
    })
  }

  public async startUnstake(
    args: Pick<
    instructions.StartUnstake,
    | 'owner'
    | 'pendingWithdrawalKP'
    | 'pendingVault'
    | 'stakeAccount'
    | 'stakeBalanceAccount'
    | 'stakeVault'
    | 'stakedLucraVault'
    | 'lucra'
    >
  ): Promise<Instructions & Signers> {
    return instructions.startUnstakeInstruction({
      config: this.config,
      connection: this.connection,
      ...args,
    })
  }

  public async endUnstake(
    args: Pick<
    instructions.EndUnstake,
    | 'owner'
    | 'depositVault'
    | 'pendingVault'
    | 'pendingWithdrawal'
    | 'stakeBalanceAccount'
    >
  ): Promise<TransactionInstruction> {
    return instructions.endUnstakeInstruction({
      config: this.config,
      ...args,
    })
  }

  public async withdrawStake(
    args: Pick<
    instructions.WithdrawStake,
    | 'owner'
    | 'depositVault'
    | 'ownerLucraAccount'
    | 'stakeBalanceAccount'
    | 'pendingVault'
    | 'stakeVault'
    | 'stakedLucraVault'
    | 'lucra'
    >
  ): Promise<TransactionInstruction> {
    return instructions.withdrawStakeInstruction({
      config: this.config,
      ...args,
    })
  }

  public transferFunds(
    args: Pick<instructions.Transfer, 'daoAuthority' | 'toAccount' | 'lamports'>
  ): TransactionInstruction {
    return instructions.transferInstruction({
      config: this.config,
      ...args,
    })
  }

  public async getStateAccount(account: PublicKey): Promise<StateAccount> {
    return loadStateAccount(this.connection, account, this.config.programId)
  }

  public async getStakingStateAccount(
    account?: PublicKey
  ): Promise<StakingStateAccount> {
    return loadStakingStateAccount(
      this.connection,
      account ? account : this.config.account.stake,
      this.config.programId
    )
  }

  public async getArbStateAccount(
    account?: PublicKey
  ): Promise<ArbStateAccount> {
    return loadArbStateAccount(
      this.connection,
      account ? account : this.config.account.arb,
      this.config.programId
    )
  }

  public async getUnpaidLoanAccounts(owner: PublicKey): Promise<LoanAccount[]> {
    return (await getLoanAccounts(this.config, this.connection, owner)).filter(
      (e) => !e.repaid
    )
  }

  public async getLoanAccount(account: PublicKey): Promise<LoanAccount> {
    return loadLoanAccount(this.connection, account, this.config.programId)
  }

  public async getOracleAccount(account: PublicKey): Promise<OracleAccount> {
    return loadOracleAccount(this.connection, account, this.config.programId)
  }

  public async getPriceHistoryAccount(
    account: PublicKey
  ): Promise<PriceHistoryAccount> {
    return loadPriceHistoryAccount(
      this.connection,
      account,
      this.config.programId
    )
  }

  public async getRewardAccount(account: PublicKey): Promise<RewardAccount> {
    return loadRewardAccount(this.connection, account, this.config.programId)
  }

  public async getRewardAccountKeys(
    stakeBalance: StakeBalance | StakeBalanceWithAmounts,
    stakingState?: StakingStateAccount
  ): Promise<PublicKey[]> {
    const account = stakingState
      ? stakingState
      : await this.getStakingStateAccount()
    return generateRewardAccountPkList(
      this.config,
      stakeBalance.rewardCursor + 1,
      account.rewardCursor
    )
  }

  public async generatePendingFundsKP(
    seedAccounts: PublicKey[]
  ): Promise<Keypair> {
    return generatePendingFundsAccountKP(this.config, seedAccounts)
  }

  public async getPendingWithdrawalAccount(
    account: PublicKey
  ): Promise<PendingWithdrawalAccount> {
    return loadPendingWithdrawalAccount(
      this.connection,
      account,
      this.config.programId
    )
  }

  public async getPendingWithdrawalAccounts(
    stakeAccount: PublicKey
  ): Promise<PendingWithdrawalAccount[]> {
    return getPendingWithdrawalAccounts(
      this.connection,
      stakeAccount,
      this.config.programId
    )
  }

  public async getStakeBalance(account: PublicKey): Promise<StakeBalance> {
    return loadStakeBalance(this.connection, account, this.config.programId)
  }

  public async getStakeBalanceWithAmounts(
    account: PublicKey
  ): Promise<StakeBalanceWithAmounts> {
    const stakeBalance = await loadStakeBalance(
      this.connection,
      account,
      this.config.programId
    )
    const amounts = await this.getStakeBalanceAmounts(stakeBalance)
    return { ...stakeBalance, balance: { ...amounts } }
  }

  public async getStakeAccount(owner: PublicKey): Promise<StakeAccount> {
    const [stakeAccountKP] = await generateStakeAccountKP(this.config, owner)
    return loadStakeAccount(
      this.connection,
      stakeAccountKP.publicKey,
      this.config.programId
    )
  }

  public async getStakeBalances(owner: PublicKey) {
    return getStakeBalances(this.connection, owner, this.config.programId)
  }

  public async getStakeBalancesAndVaults(
    owner: PublicKey
  ): Promise<StakeBalanceWithAmounts[]> {
    const accounts = await this.getStakeBalances(owner)
    return this.getStakeBalanceVaults(accounts)
  }

  private async getStakeBalanceVaults(
    accounts: StakeBalance[],
    accumulator: StakeBalanceWithAmounts[] = []
  ): Promise<StakeBalanceWithAmounts[]> {
    const head = accounts[0]
    const tail = accounts.slice(1)
    if (head) {
      const vaults = await this.getStakeBalanceAmounts(head)
      const accountWithBalances = {
        ...head,
        balance: { ...vaults },
      }
      return this.getStakeBalanceVaults(
        tail,
        accumulator.concat(accountWithBalances)
      )
    } else {
      return accumulator
    }
  }

  private async getStakeBalanceAmounts(
    account: StakeBalance
  ): Promise<StakeBalanceAmounts> {
    const stLucra = await this.connection.getTokenAccountBalance(
      account.vaults.stLucraVault
    )
    const deposit = await this.connection.getTokenAccountBalance(
      account.vaults.depositVault
    )
    const pending = await this.connection.getTokenAccountBalance(
      account.vaults.pendingVault
    )
    const stake = await this.connection.getTokenAccountBalance(
      account.vaults.stakeVault
    )
    return {
      stLucraVault: stLucra.value,
      depositVault: deposit.value,
      pendingVault: pending.value,
      stakeVault: stake.value,
    }
  }

  public async getLoanAccountsThatHaventBeenCheckedRecently(): Promise<
  LoanAccount[]
  > {
    return (await getUnpaidLoanData(this.config, this.connection)).filter(
      (e) => e.lastDayPenaltyWasChecked <= Date.now() - 86_400
    ) // Filter out anything that was checked within a day ago
  }

  public async getLoanAccountsThatHavePenaltyAccrued(
    state: PublicKey
  ): Promise<LoanAccount[]> {
    const st = await loadStateAccount(
      this.connection,
      state,
      this.config.programId
    )
    return (await getUnpaidLoanData(this.config, this.connection)).filter(
      (e) => e.penaltyToHarvest >= st.minimumHarvestAmount
    )
  }
}
