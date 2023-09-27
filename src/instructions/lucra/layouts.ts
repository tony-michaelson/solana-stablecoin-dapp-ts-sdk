import * as lo from '@solana/buffer-layout'
import { bool, u64 } from '@solana/buffer-layout-utils'
import {
  Amm,
  Currency,
  LucraInstruction,
  OracleMarket,
} from '../../types/lucra'

const { struct, u8, u32 } = lo

export const InitializationLayout = struct<{
  instruction: LucraInstruction.Initialize
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
}>([
  u32('instruction'),
  u64('min_deposit'),
  u32('collateral_requirement'),
  u64('epoch'),
  bool('loans_enabled'),
  bool('staking_enabled'),
  bool('arbitrage_enabled'),
  bool('peg_check_enabled'),
  u64('maximum_lucra_to_mint'),
  u64('daily_arb_limit'),
  u64('maximum_outstanding_mata'),
  u8('lcp'),
])

export const UpdateLayout = struct<{
  instruction: LucraInstruction.UpdateState
  min_deposit: bigint
  collateral_requirement: number
  loans_enabled: boolean
  staking_enabled: boolean
  arbitrage_enabled: boolean
  peg_check_enabled: boolean
  maximum_lucra_to_mint: bigint
  daily_arb_limit: bigint
  maximum_outstanding_mata: bigint
  minimum_harvest_amount: bigint
  reward_fee: number
  lcp: number
}>([
  u32('instruction'),
  u64('min_deposit'),
  u32('collateral_requirement'),
  bool('loans_enabled'),
  bool('staking_enabled'),
  bool('arbitrage_enabled'),
  bool('peg_check_enabled'),
  u64('maximum_lucra_to_mint'),
  u64('daily_arb_limit'),
  u64('maximum_outstanding_mata'),
  u64('minimum_harvest_amount'),
  u32('reward_fee'),
  u8('lcp'),
])

export const CreateLoanLayout = struct<{
  instruction: LucraInstruction.CreateMataLoan
  lamports: bigint
}>([u32('instruction'), u64('lamports')])

export const DetermineInterestLayout = struct<{
  instruction: LucraInstruction.DetermineInterest
}>([u32('instruction')])

export const HarvestInterestLayout = struct<{
  instruction: LucraInstruction.HarvestInterest
  amm: Amm
}>([u32('instruction'), u8('amm')])

export const AddCollateralLayout = struct<{
  instruction: LucraInstruction.AddCollateral
  lamports: bigint
}>([u32('instruction'), u64('lamports')])

export const CreateOracleLayout = struct<{
  instruction: LucraInstruction.CreateOracle
  market: OracleMarket
}>([u32('instruction'), u8('market')])

export const CreatePriceHistoryLayout = struct<{
  instruction: LucraInstruction.CreatePriceHistory
}>([u32('instruction')])

export const UpdatePriceHistoryLayout = struct<{
  instruction: LucraInstruction.UpdatePriceHistory
}>([u32('instruction')])

export const UpdatePriceLayout = struct<{
  instruction: LucraInstruction.UpdatePrice
}>([u32('instruction')])

export const CloseLoanLayout = struct<{
  instruction: LucraInstruction.CloseOutMataLoan
  unstake_msol: boolean
}>([u32('instruction'), bool('unstake_msol')])

export const TransferLayout = struct<{
  instruction: LucraInstruction.TransferFunds
  lamports: bigint
}>([u32('instruction'), u64('lamports')])

export const MintFundsForArbLayout = struct<{
  instruction: LucraInstruction.MintFundsForArb
  source: Currency
  amm: Amm
  lamports: bigint
}>([u32('instruction'), u8('source'), u8('amm'), u64('lamports')])

export const SellFundsForArbLayout = struct<{
  instruction: LucraInstruction.SellFundsForArb
  source: Currency
  amm: Amm
  lamports: bigint
}>([u32('instruction'), u8('source'), u8('amm'), u64('lamports')])

export const BuyBurnForArbLayout = struct<{
  instruction: LucraInstruction.BuyBurnForArb
  source: Currency
  amm: Amm
  lamports: bigint
}>([u32('instruction'), u8('source'), u8('amm'), u64('lamports')])

export const CleanUpArbLayout = struct<{
  instruction: LucraInstruction.CleanUpArb
}>([u32('instruction')])
