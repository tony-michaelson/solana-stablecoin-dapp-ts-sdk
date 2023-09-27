import { PublicKey, Signer, TransactionInstruction } from '@solana/web3.js'

export interface Instructions {
  instructions: TransactionInstruction[]
}

export interface Signers {
  signers: Signer[]
}

export interface PDA {
  name: string
  pda: PublicKey
  bumpSeed: number
}

export interface Address {
  address: PublicKey
}

export interface PDAList {
  pdas: PDA[]
}

export type TwoTransactions = {
  transaction1: Instructions & Signers & PDAList
  transaction2: Instructions & Signers & PDAList
}

export type ThreeTransactions = TwoTransactions & {
  transaction3: Instructions & Signers & PDAList
}

export type FourTransactions = ThreeTransactions & {
  transaction4: Instructions & Signers & PDAList
}

export type LucraToken =
  | 'LUCRA'
  | 'MATA'
  | 'USDC'
  | 'SOL'
  | 'STLUCRA'
  | 'USDT'
  | 'ORACLEREWARD'

export interface SwapLPInfo {
  account: PublicKey
  lpMint: PublicKey
  baseVault: PublicKey
  quoteVault: PublicKey
  baseOracle: PublicKey
  quoteOracle: PublicKey
  openOrders?: PublicKey
  authority?: PublicKey
  ammTarget?: PublicKey
  programId?: PublicKey
}

export interface SerumMarket {
  programId: PublicKey
  market: PublicKey
  bids: PublicKey
  asks: PublicKey
  eventQ: PublicKey
  baseVault: PublicKey
  quoteVault: PublicKey
  vaultSigner: PublicKey
}

export interface RaydiumMarket {
  amm: PublicKey
  ammAuthority: PublicKey
  baseVault: PublicKey
  quoteVault: PublicKey
  lpMint: PublicKey
  lpVault: PublicKey
  targetOrders: PublicKey
  withdrawQueue: PublicKey
  openOrders: PublicKey
}

export type TokenMint = {
  [key in LucraToken]: PublicKey
}

/** Base class for errors */
export abstract class LucraError extends Error {
  constructor(message?: string) {
    super(message)
  }
}

/** Thrown if an account is not found at the expected address */
export class AccountNotFoundError extends LucraError {
  override name = 'AccountNotFoundError'
}

/** Thrown if price is not found in Pyth account data */
export class PriceNotFoundError extends LucraError {
  override name = 'PriceNotfoundError'
}

export interface PubkeyOpt {
  some?: PublicKey
  none?: number[]
}
