import { u8, struct, seq } from '@solana/buffer-layout'
import { publicKey, u64, bool } from '@solana/buffer-layout-utils'
import { ArbStateAccount } from '.'
import {
  AddressWithSeedLayout,
  MetaDataLayout,
  ArbLimitLayout,
} from '../common'

export type ArbStateStructure = Omit<ArbStateAccount, 'account'>

export const ArbStateLayout = struct<ArbStateStructure>([
  MetaDataLayout('metadata'),
  publicKey('key'),
  AddressWithSeedLayout('arbFund'),
  AddressWithSeedLayout('wsolHoldingVault'),
  AddressWithSeedLayout('mataHoldingVault'),
  AddressWithSeedLayout('lucraHoldingVault'),
  seq(u8(), 4, 'padding'),
  u64('maxAmountOfLucraToMint'),
  bool('buyingLucra'),
  seq(u8(), 7, 'padding2'),
  seq(ArbLimitLayout('rollingLimits'), 30, 'rollingLimits'),
  u64('aggLimit'),
  u64('dailyLimit'),
  u64('startOfDayTimestamp'),
  u8('state'),
  seq(u8(), 256, 'padding3'),
])
