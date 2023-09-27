import BN from 'bn.js'
import { I80F48 } from '../../utils/fixednum'
import { u8, Layout, blob, struct, seq } from '@solana/buffer-layout'
import { encodeDecode, publicKey, bool, u64 } from '@solana/buffer-layout-utils'
import { MetaDataLayout } from '../common'
import { BondAccount } from '.'

const _I80F48Layout =
  (length: number) =>
    (property?: string): Layout<I80F48> => {
      const layout = blob(length, property)
      const { encode, decode } = encodeDecode(layout)

      const i80F48Layout = layout as Layout<unknown> as Layout<I80F48>

      i80F48Layout.decode = (buffer: Buffer, offset: number) => {
        const src = decode(buffer, offset)
        const result = new BN(src, 10, 'le').fromTwos(8 * length)
        return new I80F48(result)
      }

      i80F48Layout.encode = (i80F48: I80F48, buffer: Buffer, offset: number) => {
        return encode(i80F48.toArray(), buffer, offset)
      }

      return i80F48Layout
    }

export const I80F48Layout = _I80F48Layout(16)

export type BondStructure = Omit<BondAccount, 'account'>

export const BondAccountLayout = struct<BondStructure>([
  MetaDataLayout('metadata'),
  publicKey('owner'),
  publicKey('bondSystem'),
  publicKey('lpTokenMint'),
  u64('lpTokenAmount'),
  I80F48Layout('totalValue'),
  I80F48Layout('suppliedValue'),
  I80F48Layout('bondYield'),
  u64('timestamp'),
  bool('exercised'),
  seq(u8(), 135, 'padding'),
])
