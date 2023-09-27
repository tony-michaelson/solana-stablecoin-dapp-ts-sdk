import { Connection, PublicKey } from '@solana/web3.js'
import { BOND_MAINNET_CONFIG, BOND_MAINNET_SYSTEMS } from '../../constants'
import { loadProgramAccount } from '../../utils/account'
import { MetaData } from '../common'
import { BondSystemLayout } from './layout'
import { LiquidityProvider, PoolType, SystemNames } from '../../types/bond'
import { PubkeyOpt } from '../../types/common'

export * from './layout'

export interface BondSystemAccount {
  account: PublicKey
  name: string
  provider: LiquidityProvider
  metadata: MetaData
  authority: PublicKey
  poolState: PublicKey
  commonMint: PublicKey
  treasuryOracle: PubkeyOpt
  padding0: number[]
  bondYield: number
  closed: boolean
  vaultBumpSeed: number
  treasuryBumpSeed: number
  baseOracle: PubkeyOpt
  poolType: PoolType
  paused: boolean
  padding1: number[]
  quoteOracle: PubkeyOpt
  padding2: number[]
  vaultMint: PublicKey
  vault: PublicKey
  treasuryMint: PublicKey
  treasury: PublicKey
  padding3: number[]
  startOfEpoch: bigint
  timelock: bigint
  epoch: bigint
  totalAmountToDistribute: bigint
  maxAmountToDistributePerEpoch: bigint
  maxAllowedToDistributeAtOneTime: bigint
  estimatedAmountDistributed: bigint
  estimatedAmountDistributedThisEpoch: bigint
  totalAmountDistributed: bigint
  padding4: number[]
}

export type BondSystemAccounts = {
  [key in SystemNames]: BondSystemAccount
}

const decodeBondSystemAccount = (
  account: PublicKey,
  name: string,
  provider: LiquidityProvider,
  data: Buffer
): BondSystemAccount => {
  const decoded = BondSystemLayout.decode(data)
  return {
    account,
    name,
    provider,
    ...decoded,
  }
}

export const loadBondSystemAccount = async (
  connection: Connection,
  account: PublicKey,
  name: string,
  provider: LiquidityProvider,
  programID: PublicKey = BOND_MAINNET_CONFIG.programId
): Promise<BondSystemAccount> => {
  const data = await loadProgramAccount(connection, account, programID)
  return decodeBondSystemAccount(account, name, provider, data)
}

export async function getBondSystemAccounts(
  connection: Connection
): Promise<BondSystemAccounts> {
  return {
    LUCRA_SOL_ORCA: await loadBondSystemAccount(
      connection,
      BOND_MAINNET_SYSTEMS['LUCRA_SOL_ORCA'].account,
      BOND_MAINNET_SYSTEMS['LUCRA_SOL_ORCA'].name,
      BOND_MAINNET_SYSTEMS['LUCRA_SOL_ORCA'].provider
    ),
    SOL_MATA_RAYDIUM: await loadBondSystemAccount(
      connection,
      BOND_MAINNET_SYSTEMS['SOL_MATA_RAYDIUM'].account,
      BOND_MAINNET_SYSTEMS['SOL_MATA_RAYDIUM'].name,
      BOND_MAINNET_SYSTEMS['SOL_MATA_RAYDIUM'].provider
    ),
  }
}

export async function getBondSystemAccountList(
  connection: Connection
): Promise<BondSystemAccount[]> {
  const systems = await getBondSystemAccounts(connection)
  return Object.keys(systems).map((e) => {
    const name = e as unknown as SystemNames
    return systems[name]
  })
}
