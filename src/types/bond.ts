import { PublicKey, TokenAmount } from '@solana/web3.js'
import { Decimal } from 'decimal.js'
import { SwapLPInfo } from './common'

export enum BondInstruction {
  CreateBondSystem = 0,
  BuyBond = 1,
  ExerciseBond = 2,
  TransferBond = 3,
  StartBondSystem = 4,
  ToggleBondSystem = 5,
  CloseBondSystem = 6,
  UpdateBondSystem = 7,
}

export enum PoolType {
  Invalid = 0,
  Raydium = 1,
  SplTokenSwap = 2,
  Saber = 3,
}

export enum BondAccountType {
  Invalid = 0,
  Bond = 1,
  BondSystem = 2,
}

export interface BondConfig {
  programId: PublicKey
  authority: PublicKey
  accountSize: {
    bondSystem: number
    bond: number
  }
  seed: {
    vault: 'vault'
    treasury: 'treasury'
  }
}

export interface BondSystemSettings {
  pool_type: PoolType
  authority: PublicKey
  bond_yield: number
  timeclock: bigint
  epoch: bigint
  total_amount_to_distribute: bigint
  max_amount_to_distribute_per_epoch: bigint
  max_allowed_to_distribute_at_one_time: bigint
}

// TODO; change to BondTypes
export type SystemNames = 'SOL_MATA_RAYDIUM' | 'LUCRA_SOL_ORCA'

export type SystemName = SystemNames | 'CUSTOM'

export type LiquidityProvider = 'ORCA' | 'RAYDIUM' | 'SABER'

export interface BondSystem {
  name: string
  provider: LiquidityProvider
  account: PublicKey
  vault: PublicKey
  vaultNonce: number
  treasury: PublicKey
  treasuryNonce: number
  treasuryMint: PublicKey
  treasuryOracle: PublicKey
  baseMint: PublicKey
  quoteMint: PublicKey
  lpInfo: SwapLPInfo
}

export type BondSystems = {
  [key in SystemNames]: BondSystem
}

export interface BondSystemBalance {
  treasury: TokenAmount
  vault: TokenAmount
  lp: {
    base: TokenAmount
    quote: TokenAmount
    lpMintSupply: TokenAmount
  }
}

export type BondSystemBalances = {
  [key in SystemNames]: BondSystemBalance
}

export interface BuyBondParams {
  system: SystemNames
  lpTokenAmount: bigint
}

export type BondActions =
  | 'create'
  | 'start'
  | 'buy'
  | 'transfer'
  | 'exercise'
  | 'toggle'
  | 'close'

export type BondTestSignatures = {
  [key in BondActions]: string | undefined
}

export interface BondQuoteRequest {
  lpTokens: Decimal
  bondYield: Decimal
  lp: {
    lpTokenSupply: Decimal
    tokenBal: {
      base: Decimal
      quote: Decimal
    }
  }
  price: {
    lucra: Decimal
    base: Decimal
    quote: Decimal
  }
}
