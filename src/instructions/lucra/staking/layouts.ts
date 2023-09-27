import * as lo from '@solana/buffer-layout'
import { u64 } from '@solana/buffer-layout-utils'
import { LucraInstruction } from '../../../types/lucra'

const { struct, u32, u8 } = lo

export const CreateStakeAccountLayout = struct<{
  instruction: LucraInstruction.CreateStakingAccount
  bumpSeed: number
}>([u32('instruction'), u8('bumpSeed')])

export const CreateStakeBalanceLayout = struct<{
  instruction: LucraInstruction.CreateStakeBalance
  bumpSeed: number
  timeframe: number
}>([u32('instruction'), u8('bumpSeed'), u8('timeframe')])

export const DepositStakeLayout = struct<{
  instruction: LucraInstruction.DepositStake
  lucra: bigint
}>([u32('instruction'), u64('lucra')])

export const StakeLayout = struct<{
  instruction: LucraInstruction.Stake
  lucra: bigint
}>([u32('instruction'), u64('lucra')])

export const DropRewardLayout = struct<{
  instruction: LucraInstruction.DropReward
}>([u32('instruction')])

export const ClaimRewardLayout = struct<{
  instruction: LucraInstruction.ClaimReward
}>([u32('instruction')])

export const StartUnstakeLayout = struct<{
  instruction: LucraInstruction.StartUnstake
  lucra: bigint
}>([u32('instruction'), u64('lucra')])

export const WithdrawStakeLayout = struct<{
  instruction: LucraInstruction.WithdrawStake
  lucra: bigint
}>([u32('instruction'), u64('lucra')])

export const EndUnstakeLayout = struct<{
  instruction: LucraInstruction.EndUnstake
}>([u32('instruction')])
