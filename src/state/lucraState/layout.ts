import { seq, struct, u32, u8 } from '@solana/buffer-layout'
import { publicKey, u64, bool } from '@solana/buffer-layout-utils'
import { StateAccount } from '.'
import { AddressWithSeedLayout, MetaDataLayout } from '../common'

export type StateStructure = Omit<StateAccount, 'account'>

export const StateLayout = struct<StateStructure>([
  MetaDataLayout('metadata'),
  publicKey('key'),
  publicKey('stakingState'),
  publicKey('arbState'),
  AddressWithSeedLayout('mataMint'),
  AddressWithSeedLayout('lucraMint'),
  AddressWithSeedLayout('rewardMint'),
  AddressWithSeedLayout('msolVault'),
  AddressWithSeedLayout('rewardsVault'),
  AddressWithSeedLayout('linusBlanket'),
  seq(u8(), 2, 'padding1'),
  u64('epoch'),
  u64('minDeposit'),
  u64('totalOutstandingMata'),
  u64('maximumOutstandingMata'),
  u64('minimumHarvestAmount'),
  u64('totalSolCollateral'),
  u32('collateralRequirement'),
  u32('rewardFee'),
  bool('loansEnabled'),
  bool('stakingEnabled'),
  bool('arbitrageEnabled'),
  bool('pegCheckEnabled'),
  bool('pegBroken'),
  u8('lcp'),
  seq(u8(), 250, 'padding2'),
])
