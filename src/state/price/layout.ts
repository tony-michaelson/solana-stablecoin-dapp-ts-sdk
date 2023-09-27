import {u8, struct } from '@solana/buffer-layout'
import { u64 } from '@solana/buffer-layout-utils'
import { Price } from '.'

export type PriceStructure = Price

export const PriceLayout = struct<PriceStructure>([
  u8('expo'),
  u64('price'),
  u64('vol'),
  u64('slot'),
])