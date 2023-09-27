import { PublicKey } from '@solana/web3.js'
import Decimal from 'decimal.js'
import { StakeBalance } from '../state'
import { StakeBalanceAmounts } from '../state/stakeBalance'

export enum LucraInstruction {
  Initialize = 0,
  UpdateState = 1,
  CreateMataLoan = 2,
  CloseOutMataLoan = 3,
  CreateStakingAccount = 4,
  CreateStakeBalance = 5,
  DepositStake = 6,
  Stake = 7,
  StartUnstake = 8,
  EndUnstake = 9,
  WithdrawStake = 10,
  ClaimReward = 11,
  DropReward = 12,
  TransferFunds = 13,
  CreateOracle = 14,
  CreatePriceHistory = 15,
  UpdatePriceHistory = 16,
  UpdatePrice = 17,
  RedeemRewardTokens = 18,
  AddCollateral = 19,
  DetermineInterest = 20,
  HarvestInterest = 21,
  SellFundsForArb = 22,
  BuyBurnForArb = 23,
  CleanUpArb = 24,
  MintFundsForArb = 25,
}

export enum LucraAccountType {
  Invalid = 0,
  SystemState = 1,
  Loan = 2,
  StakingAccount = 3,
  StakeBalance = 4,
  PendingWithdrawal = 5,
  Reward = 6,
  BondDistribution = 7,
  StakingState = 8,
  PendingFunds = 9,
  Oracle = 10,
  MataLucraBond = 11,
  ArbState = 12,
  LucraMataBond = 13,
  PriceHistory = 14,
}

export enum OracleMarket {
  Invalid = 0,
  SolUsdc = 1,
  SolUsdt = 2,
  LucraSol = 3,
  MataSol = 4,
}

export enum StakingTimeframe {
  Default = 0,
  OneYear,
  TwoYear,
}

export enum Currency {
  Lucra = 0,
  Mata = 1,
  Msol = 2,
}

export enum ArbState {
  Minting = 0,
  Selling = 1,
  BuyBurning = 2,
  Cleaning = 3,
}

export enum Amm {
  None = 0,
  Raydium = 1,
  Orca = 2,
}

export interface PriceOracle {
  account: PublicKey
  market: PublicKey
  bids: PublicKey
  asks: PublicKey
  baseMint: PublicKey
  quoteMint: PublicKey
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
}

export type LucraOracles = 'SOL_USDC' | 'SOL_USDT' | 'LUCRA_SOL' | 'SOL_MATA'

export interface LucraConfig {
  programId: PublicKey
  account: {
    state: PublicKey
    stake: PublicKey
    arb: PublicKey
    priceHistory: PublicKey
    msolVault: {
      address: PublicKey
      authority: PublicKey
      bumpSeed: number
    }
    treasury: {
      address: PublicKey
      authority: PublicKey
      bumpSeed: number
    }
    arbCoffer: {
      address: PublicKey
      authority: PublicKey
      bumpSeed: number
    }
    rewardsVault: {
      address: PublicKey
      authority: PublicKey
      bumpSeed: number
    }
    arbFund: {
      address: PublicKey
      authority: PublicKey
      bumpSeed: number
    }
    wsolHoldingVault: {
      address: PublicKey
      authority: PublicKey
      bumpSeed: number
    }
    lucraHoldingVault: {
      address: PublicKey
      authority: PublicKey
      bumpSeed: number
    }
    mataHoldingVault: {
      address: PublicKey
      authority: PublicKey
      bumpSeed: number
    }
  }
  mint: {
    lucra: { address: PublicKey; authority: PublicKey; bumpSeed: number }
    mata: { address: PublicKey; authority: PublicKey; bumpSeed: number }
    stLucra: { address: PublicKey; authority: PublicKey; bumpSeed: number }
    oracleReward: { address: PublicKey; authority: PublicKey; bumpSeed: number }
  }
  oracle: {
    [key in LucraOracles]: PriceOracle
  }
  accountSize: {
    program: { state: number; staking: number; arb: number }
    oracle: number
    priceHistory: number
    loan: number
    staking: { account: number; balances: number }
    reward: number
    pendingWithdrawal: number
  }
  seed: {
    lucraMint: 'lucra_mint'
    stLucraMint: 'stake'
    mataMint: 'mata_mint'
    oracleRewardMint: 'reward_mint'
    msolVault: 'msol_vault'
    rewardVault: 'rewards_vault'
    treasury: 'treasury'
    stakeAccount: 'staking_account'
    arbFund: 'arb_fund'
    arbCoffer: 'arb_coffer'
    wsolHoldingVault: 'wsol_holding_vault'
    lucraHoldingVault: 'lucra_holding_vault'
    mataHoldingVault: 'mata_holding_vault'
  }
}

export interface LucraProgramSettings {
  min_deposit: bigint
  collateral_requirement: number
  epoch: bigint
  loans_enabled: boolean
  staking_enabled: boolean
  arbitrage_enabled: boolean
  peg_check_enabled: boolean
  maximum_lucra_to_mint: bigint
  daily_arb_limit: bigint
  maximum_outstanding_mata: bigint
  lcp: number
}

export type LucraProgramUpdateSettings = Omit<LucraProgramSettings, 'epoch'> & {
  minimum_harvest_amount: bigint
  reward_fee: number
}

export interface MarinadeConfig {
  programId: PublicKey
  stateAccount: PublicKey
  msolMint: PublicKey
  msolMintAuth: PublicKey
  solLeg: PublicKey
  msolLeg: PublicKey
  msolLegAuthorityInfo: PublicKey
  reservePDAInfo: PublicKey
  msolTreasury: PublicKey
}

export type StakeBalanceWithAmounts = StakeBalance & {
  balance: StakeBalanceAmounts
}

export interface ArbitrageInfo {
  pegValue: Decimal
  status: 'under' | 'over'
}
