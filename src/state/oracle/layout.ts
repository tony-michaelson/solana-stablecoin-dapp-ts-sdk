import { u8, struct, seq, u32 } from '@solana/buffer-layout'
import { u64, publicKey } from '@solana/buffer-layout-utils'
import { OracleAccount } from '.'
import { MetaDataLayout, OraclePriceLayout } from '../common'

export type OracleStructure = Omit<OracleAccount, 'account'>

export const OracleAccountLayout = struct<OracleStructure>([
  MetaDataLayout('metadata'),
  publicKey('market'),
  publicKey('raydiumAmm'),
  publicKey('orcaPool'),
  publicKey('baseMint'),
  publicKey('quoteMint'),
  seq(OraclePriceLayout('price'), 25, 'prices'),
  u64('aggPrice'),
  u64('lowestSlot'),
  u64('orcaVol'),
  u64('raydiumVol'),
  u32('expo'),
  u8('valid'),
  u8('oracleMarket'),
  seq(u8(), 130, 'padding'),
])
