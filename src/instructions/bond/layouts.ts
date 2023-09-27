import { u8, struct, u32 } from '@solana/buffer-layout'
import { publicKey, u64, bigInt } from '@solana/buffer-layout-utils'
import { PublicKey } from '@solana/web3.js'
import { BondInstruction, PoolType } from '../../types/bond'

export const i64 = bigInt(8)

export const BuyBondLayout = struct<{
  instruction: BondInstruction.BuyBond
  lpTokens: bigint
}>([u32('instruction'), u64('lpTokens')])

export const BondInstructionLayout = struct<{
  instruction: number
}>([u32('instruction')])

export const UpdateBondSystemLayout = struct<{
  instruction: BondInstruction.UpdateBondSystem
  bond_yield: number
  timelock: bigint
  max_amount_to_distribute_per_epoch: bigint
  max_allowed_to_distribute_at_one_time: bigint
}>([u32('instruction'), u32('bond_yield'), i64('timelock'), u64('max_amount_to_distribute_per_epoch'), u64('max_allowed_to_distribute_at_one_time')])

export interface BondSystemFields {
  instruction: BondInstruction.CreateBondSystem
  pool_type: PoolType
  authority: PublicKey
  bond_yield: number
  timeclock: bigint
  epoch: bigint
  total_amount_to_distribute: bigint
  max_amount_to_distribute_per_epoch: bigint
  max_allowed_to_distribute_at_one_time: bigint
}

export const BondSystemLayout = struct<BondSystemFields>([
  u32('instruction'),
  u8('pool_type'),
  publicKey('authority'),
  u32('bond_yield'),
  u64('timeclock'),
  u64('epoch'),
  u64('total_amount_to_distribute'),
  u64('max_amount_to_distribute_per_epoch'),
  u64('max_allowed_to_distribute_at_one_time'),
])
