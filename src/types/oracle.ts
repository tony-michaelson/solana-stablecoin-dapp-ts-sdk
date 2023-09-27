import { PublicKey } from "@solana/web3.js"

export enum OracleInstruction {
  CreateOracle = 0,
  UpdateOracle = 1,
  FreezeOracle = 2,
  ThawOracle = 3,
  CloseOracle = 4,
  AddPriceSource = 5,
  FreezePriceSource = 6,
  ThawPriceSource = 7,
  RemovePriceSource = 8,
  UpdatePrice = 9,
  UpdateAggPrice = 10,
  RedeemReward = 11,
}

export enum OracleAccountTypes {
  Invalid = 0,
  Oracle = 1,
}

export enum AlgorithmType {
  VWA = 0,
  TWA = 1,
  AVERAGE = 2,
}

export enum OracleStatus {
  Invalid = 0,
  Valid = 1,
}

export enum SourceType {
  Unknown = 0,
  Raydium = 1,
  Serum = 2,
  Orca = 3,
  Whirlpool = 4,
  Saber = 5,
  Lifinity = 6,
}

export enum StatusType {
  Unknown = 0,
  Operating = 1,
  Closed = 2,
  Frozen = 3,
}

export type Oracles = 'SOL_USDC' | 'SOL_USDT' | 'LUCRA_SOL' | 'SOL_MATA'

export interface OracleSettings {
  expo: number,
  reward_bonus: number,
  algorithm: number
}

export type OracleUpdateSettings = Omit<OracleSettings, 'expo'>

export interface SearchParams {
  market: PublicKey
}

export interface PriceSourceSettings {
  market: PublicKey,
  source: number,
  algorithm: number,
}

export interface PriceOracleV2 {
  account: PublicKey,
  baseMint: PublicKey,
  quoteMint: PublicKey,
  authority: PublicKey,
  treasury: PublicKey,
  treasuryMint: PublicKey,
  rewardMint: PublicKey,

  market: PublicKey
  bids: PublicKey
  asks: PublicKey
  eventQ: PublicKey
  baseVault: PublicKey
  quoteVault: PublicKey
  vaultSigner: PublicKey

  ammId: PublicKey
  ammAuthority: PublicKey
  ammBaseVault: PublicKey
  ammQuoteVault: PublicKey
  ammOpenOrders: PublicKey
  ammTargetOrders: PublicKey
  ammPoolMint: PublicKey

  orcaSwap: PublicKey
  orcaAuthority: PublicKey
  orcaBaseVault: PublicKey
  orcaQuoteVault: PublicKey
  orcaPoolMint: PublicKey
  orcaFeeAccount: PublicKey

  wpId: PublicKey
  wpBaseVault: PublicKey
  wpQuoteVault: PublicKey
}

export interface OracleConfig {
  programId: PublicKey
  oracles: {
    [key in Oracles]: PriceOracleV2
  }
  accountSize: {
    oracle: number
  }
  seed: {
    rewardMint: 'reward_mint'
    treasury: 'treasury'
  }
}