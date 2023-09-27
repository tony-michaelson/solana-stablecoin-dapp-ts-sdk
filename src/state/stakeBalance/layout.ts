import { u8, struct, u32, seq } from '@solana/buffer-layout'
import { publicKey, u64 } from '@solana/buffer-layout-utils'
import { StakeBalance } from '.'
import { MetaDataLayout, StakeVaultsLayout } from '../common'

export type StakeBalanceStructure = Omit<StakeBalance, 'account'>

export const StakeBalanceLayout = struct<StakeBalanceStructure>([
  MetaDataLayout('metadata'),
  publicKey('owner'),
  StakeVaultsLayout('vaults'),
  u64('lastStakeTimestamp'),
  u64('allocatedJuiceReward'),
  u64('juiceRewardDistributed'),
  u32('rewardCursor'),
  u8('stakingTimeframe'),
  u8('signerBumpSeed'),
  seq(u8(), 130, 'padding'),
])
