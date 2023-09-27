import { u8, struct, seq } from '@solana/buffer-layout'
import { u64, publicKey } from '@solana/buffer-layout-utils'
import { OracleV2Account } from '.'
import { MetaDataLayout, PriceSourceLayout, i64 } from '../common'

export type OracleV2Structure = Omit<OracleV2Account, 'account'>

export const OracleV2AccountLayout = struct<OracleV2Structure>([
  MetaDataLayout('metadata'),
  publicKey('baseMint'),
  publicKey('quoteMint'),
  u8('expo'),
  seq(PriceSourceLayout('priceSource'), 16, 'priceSources'),
  u64('aggPrice'),
  u64('validSlot'),
  i64('timestamp'),
  u8('minPs'),
  publicKey('authority'),
  publicKey('treasury'),
  u8('treasuryNonce'),
  publicKey('rewardMint'),
  u8('rewardMintNonce'),
  u8('rewardBonus'),
  u8('algorithm'),
  u8('status'),
  u64('prevSlot'),
  u64('prevAggPrice'),
  i64('prevTimestamp'),
  u8('numPs'),
])