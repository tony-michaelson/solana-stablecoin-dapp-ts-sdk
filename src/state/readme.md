# Encoding/Decoding Option Types

> In the future if we want to handle `Option` types here is a good start

```typescript
pubKeyOpt usage for future reference
export interface PubkeyOpt {
  some?: PublicKey
  none?: number[]
}

export const pubkeyOpt = (property: string): Layout<PubkeyOpt> => {
  const PubkeyOptLayout = union(
    u8('t') as unknown as Layout<LayoutObject>,
    publicKey(),
    property
  )
  PubkeyOptLayout.addVariant(0, seq(u8(), 0), 'none')
  PubkeyOptLayout.addVariant(1, publicKey(), 'some')

  return PubkeyOptLayout as Layout<unknown> as Layout<PubkeyOpt>
}

export const getPubkeyOptLayoutSpan = (
  opt: PubkeyOpt,
  layout: Layout<PubkeyOpt>
): number => {
  return 'none' in opt ? 1 : layout.span
}

describe('PubkeyOptLayout', () => {
  it('encodes when pubkey not set', () => {
    const opt = { none: [] }

    const lo = pubkeyOpt('testKey')
    const encoded = Buffer.alloc(getPubkeyOptLayoutSpan(opt, lo))
    lo.encode(opt, encoded)

    const data = Buffer.from(new Uint8Array([0]))
    expect(encoded).toStrictEqual(data)
  })

  it('encodes when a pubkey is set', () => {
    const opt = {
      some: new PublicKey('AsZirXSHJWYjnRtm1TpFbkgUZ4DQ4xZxqVaCmeuzHWax'),
    }

    const lo = pubkeyOpt('testKey')
    const encoded = Buffer.alloc(getPubkeyOptLayoutSpan(opt, lo))
    lo.encode(opt, encoded)

    const data = Buffer.from(
      new Uint8Array([
        1, 146, 173, 56, 163, 96, 218, 166, 128, 181, 78, 209, 248, 104, 10, 21,
        168, 13, 126, 185, 49, 222, 146, 51, 253, 252, 113, 241, 38, 243, 104,
        46, 149,
      ])
    )
    expect(encoded).toStrictEqual(data)
  })

  it('decodes a tagged pubkey that exists properly', () => {
    const data = new Uint8Array([
      1, 146, 173, 56, 163, 96, 218, 166, 128, 181, 78, 209, 248, 104, 10, 21,
      168, 13, 126, 185, 49, 222, 146, 51, 253, 252, 113, 241, 38, 243, 104, 46,
      149,
    ])
    const lo = pubkeyOpt('testKey')
    const decoded = lo.decode(data)

    expect('some' in decoded).toBeTruthy()
    decoded.some &&
      expect(decoded.some.toString()).toStrictEqual(
        'AsZirXSHJWYjnRtm1TpFbkgUZ4DQ4xZxqVaCmeuzHWax'
      )
  })

  it('decodes a tagged pubkey that does not exist properly', () => {
    const data = new Uint8Array([0])
    const lo = pubkeyOpt('testKey')
    const decoded = lo.decode(data)
    expect('none' in decoded).toBeTruthy()
    decoded.none && expect(decoded.none.toString()).toStrictEqual('')
  })
})
```

> This ended up working for a contract that had option fields in the args for a short time and was removed

```typescript
import * as lo from '@solana/buffer-layout'
import { u8 } from '@solana/buffer-layout'
import { publicKey, u64 } from '@solana/buffer-layout-utils'
import { PublicKey } from '@solana/web3.js'
import { BondInstruction, PoolType } from '../../types/bond'
import { PubkeyOpt } from '../../types/common'

const { struct, u32 } = lo

export const pubkeyOpt = (property: string): lo.Layout<PubkeyOpt> => {
  const layout = lo.union(
    u8('t') as unknown as lo.Layout<lo.LayoutObject>,
    null,
    property
  )
  layout.addVariant(0, lo.seq(u8(), 0), 'none')
  layout.addVariant(1, publicKey(), 'some')

  return layout as lo.Layout<unknown> as lo.Layout<PubkeyOpt>
}

export const BuyBondLayout = struct<{
  instruction: BondInstruction.BuyBond
  lpTokens: bigint
}>([u32('instruction'), u64('lpTokens')])

export const BondInstructionLayout = struct<{
  instruction: number
}>([u32('instruction')])

export interface BondSystemFields {
  instruction: BondInstruction.CreateBondSystem
  pool_type: PoolType
  authority: PublicKey
  treasury_oracle_address: PublicKey
  base_oracle_address: PubkeyOpt
  quote_oracle_address: PubkeyOpt
  bond_yield: number
  timeclock: bigint
  epoch: bigint
  total_amount_to_distribute: bigint
  max_amount_to_distribute_per_epoch: bigint
  max_allowed_to_distribute_at_one_time: bigint
}

const bondSystemLayoutElements = [
  u32('instruction'),
  u8('pool_type'),
  publicKey('authority'),
  publicKey('treasury_oracle_address'),
]

const bondSystemLayoutElementsCont = [
  u32('bond_yield'),
  u64('timeclock'),
  u64('epoch'),
  u64('total_amount_to_distribute'),
  u64('max_amount_to_distribute_per_epoch'),
  u64('max_allowed_to_distribute_at_one_time'),
]

export const BondSystemLayout = struct<BondSystemFields>([
  ...bondSystemLayoutElements,
  pubkeyOpt('base_oracle_address'),
  pubkeyOpt('quote_oracle_address'),
  ...bondSystemLayoutElementsCont,
])

export const BondSystemLayoutNoOptions = struct<BondSystemFields>([
  ...bondSystemLayoutElements,
  ...bondSystemLayoutElementsCont,
])

export const getBondSystemLayoutSpan = (pubKeyOpts: PubkeyOpt[]) => {
  const pubKeyOptsSpanTotal = pubKeyOpts.reduce(
    (span, data) => span + (data.some ? 33 : 1),
    0
  )
  return BondSystemLayoutNoOptions.span + pubKeyOptsSpanTotal
}
```

> tests

```typescript
import { PublicKey } from '@solana/web3.js'
import { BondInstruction } from '../../types/bond'
import { BondSystemLayout, getBondSystemLayoutSpan, pubkeyOpt } from './layouts'

describe('PubkeyOptLayout', () => {
  it('encodes when pubkey not set', () => {
    const opt = { none: [] }

    const testData = new Uint8Array([0])
    const lo = pubkeyOpt('testKey')
    const encoded = Buffer.alloc(testData.length)
    lo.encode(opt, encoded)

    const data = Buffer.from(testData)
    expect(encoded).toStrictEqual(data)
  })

  it('encodes when a pubkey is set', () => {
    const opt = {
      some: new PublicKey('AsZirXSHJWYjnRtm1TpFbkgUZ4DQ4xZxqVaCmeuzHWax'),
    }

    const testData = new Uint8Array([
      1, 146, 173, 56, 163, 96, 218, 166, 128, 181, 78, 209, 248, 104, 10, 21,
      168, 13, 126, 185, 49, 222, 146, 51, 253, 252, 113, 241, 38, 243, 104, 46,
      149,
    ])
    const lo = pubkeyOpt('testKey')
    const encoded = Buffer.alloc(lo.getSpan(testData))
    lo.encode(opt, encoded)

    const data = Buffer.from(testData)
    expect(encoded).toStrictEqual(data)
  })

  it('decodes a tagged pubkey that exists properly', () => {
    const data = new Uint8Array([
      1, 146, 173, 56, 163, 96, 218, 166, 128, 181, 78, 209, 248, 104, 10, 21,
      168, 13, 126, 185, 49, 222, 146, 51, 253, 252, 113, 241, 38, 243, 104, 46,
      149,
    ])
    const lo = pubkeyOpt('testKey')
    const decoded = lo.decode(data)

    expect('some' in decoded).toBeTruthy()
    decoded.some &&
      expect(decoded.some.toString()).toStrictEqual(
        'AsZirXSHJWYjnRtm1TpFbkgUZ4DQ4xZxqVaCmeuzHWax'
      )
  })

  it('decodes a tagged pubkey that does not exist properly', () => {
    const data = new Uint8Array([0])
    const lo = pubkeyOpt('testKey')
    const decoded = lo.decode(data)
    expect('none' in decoded).toBeTruthy()
    decoded.none && expect(decoded.none.toString()).toStrictEqual('')
  })

  it('encodes some keys properly when nested', () => {
    const fakePK = new PublicKey('2VvktmP6BefjsbPoVUW9SPyt61GmwANGqK3MfxPYUXmf')
    const baseOracleAddress = { some: fakePK }
    const quoteOracleAddress = { some: fakePK }
    const span = getBondSystemLayoutSpan([
      baseOracleAddress,
      quoteOracleAddress,
    ])
    console.log(span)
    const encoded = Buffer.alloc(span)
    BondSystemLayout.encode(
      {
        instruction: BondInstruction.CreateBondSystem,
        pool_type: 55,
        authority: fakePK,
        treasury_oracle_address: fakePK,
        base_oracle_address: baseOracleAddress,
        quote_oracle_address: quoteOracleAddress,
        bond_yield: 111,
        timeclock: BigInt(2),
        epoch: BigInt(3),
        total_amount_to_distribute: BigInt(4),
        max_amount_to_distribute_per_epoch: BigInt(5),
        max_allowed_to_distribute_at_one_time: BigInt(6),
      },
      encoded
    )

    const testData = new Uint8Array([
      0, 0, 0, 0, 55, 22, 68, 187, 136, 118, 158, 75, 112, 8, 60, 233, 20, 131,
      180, 156, 0, 240, 222, 239, 80, 190, 3, 91, 200, 143, 206, 9, 136, 196,
      180, 237, 254, 22, 68, 187, 136, 118, 158, 75, 112, 8, 60, 233, 20, 131,
      180, 156, 0, 240, 222, 239, 80, 190, 3, 91, 200, 143, 206, 9, 136, 196,
      180, 237, 254, 1, 22, 68, 187, 136, 118, 158, 75, 112, 8, 60, 233, 20,
      131, 180, 156, 0, 240, 222, 239, 80, 190, 3, 91, 200, 143, 206, 9, 136,
      196, 180, 237, 254, 1, 22, 68, 187, 136, 118, 158, 75, 112, 8, 60, 233,
      20, 131, 180, 156, 0, 240, 222, 239, 80, 190, 3, 91, 200, 143, 206, 9,
      136, 196, 180, 237, 254, 111, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0,
      0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0,
      0, 0, 0,
    ])
    const expectedData = Buffer.from(testData)
    expect(encoded).toStrictEqual(expectedData)
  })

  it('decodes some keys properly when nested', () => {
    const testData = new Uint8Array([
      0, 0, 0, 0, 55, 22, 68, 187, 136, 118, 158, 75, 112, 8, 60, 233, 20, 131,
      180, 156, 0, 240, 222, 239, 80, 190, 3, 91, 200, 143, 206, 9, 136, 196,
      180, 237, 254, 22, 68, 187, 136, 118, 158, 75, 112, 8, 60, 233, 20, 131,
      180, 156, 0, 240, 222, 239, 80, 190, 3, 91, 200, 143, 206, 9, 136, 196,
      180, 237, 254, 1, 22, 68, 187, 136, 118, 158, 75, 112, 8, 60, 233, 20,
      131, 180, 156, 0, 240, 222, 239, 80, 190, 3, 91, 200, 143, 206, 9, 136,
      196, 180, 237, 254, 1, 22, 68, 187, 136, 118, 158, 75, 112, 8, 60, 233,
      20, 131, 180, 156, 0, 240, 222, 239, 80, 190, 3, 91, 200, 143, 206, 9,
      136, 196, 180, 237, 254, 111, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0,
      0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0,
      0, 0, 0,
    ])

    const decoded = BondSystemLayout.decode(testData)

    expect(decoded.instruction.toString()).toStrictEqual('0')
    expect(decoded.pool_type.toString()).toStrictEqual('55')
    expect(decoded.authority.toString()).toStrictEqual(
      '2VvktmP6BefjsbPoVUW9SPyt61GmwANGqK3MfxPYUXmf'
    )
    expect(decoded.treasury_oracle_address.toString()).toStrictEqual(
      '2VvktmP6BefjsbPoVUW9SPyt61GmwANGqK3MfxPYUXmf'
    )
    expect(decoded.base_oracle_address.some?.toString()).toStrictEqual(
      '2VvktmP6BefjsbPoVUW9SPyt61GmwANGqK3MfxPYUXmf'
    )
    expect(decoded.quote_oracle_address.some?.toString()).toStrictEqual(
      '2VvktmP6BefjsbPoVUW9SPyt61GmwANGqK3MfxPYUXmf'
    )
    expect(decoded.bond_yield.toString()).toStrictEqual('111')
    expect(decoded.timeclock.toString()).toStrictEqual('2')
    expect(decoded.epoch.toString()).toStrictEqual('3')
    expect(decoded.total_amount_to_distribute.toString()).toStrictEqual('4')
    expect(decoded.max_amount_to_distribute_per_epoch.toString()).toStrictEqual(
      '5'
    )
    expect(
      decoded.max_allowed_to_distribute_at_one_time.toString()
    ).toStrictEqual('6')
  })

  it('encodes none keys properly when nested', () => {
    const fakePK = new PublicKey('2VvktmP6BefjsbPoVUW9SPyt61GmwANGqK3MfxPYUXmf')
    const baseOracleAddress = { none: [] }
    const quoteOracleAddress = { none: [] }
    const span = getBondSystemLayoutSpan([
      baseOracleAddress,
      quoteOracleAddress,
    ])
    console.log(span)
    const encoded = Buffer.alloc(span)
    BondSystemLayout.encode(
      {
        instruction: BondInstruction.CreateBondSystem,
        pool_type: 55,
        authority: fakePK,
        treasury_oracle_address: fakePK,
        base_oracle_address: baseOracleAddress,
        quote_oracle_address: quoteOracleAddress,
        bond_yield: 111,
        timeclock: BigInt(2),
        epoch: BigInt(3),
        total_amount_to_distribute: BigInt(4),
        max_amount_to_distribute_per_epoch: BigInt(5),
        max_allowed_to_distribute_at_one_time: BigInt(6),
      },
      encoded
    )
    console.dir(JSON.parse(JSON.stringify(encoded)), { maxArrayLength: null })
    const testData = new Uint8Array([
      0, 0, 0, 0, 55, 22, 68, 187, 136, 118, 158, 75, 112, 8, 60, 233, 20, 131,
      180, 156, 0, 240, 222, 239, 80, 190, 3, 91, 200, 143, 206, 9, 136, 196,
      180, 237, 254, 22, 68, 187, 136, 118, 158, 75, 112, 8, 60, 233, 20, 131,
      180, 156, 0, 240, 222, 239, 80, 190, 3, 91, 200, 143, 206, 9, 136, 196,
      180, 237, 254, 0, 0, 111, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0,
      0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0,
      0, 0,
    ])
    const expectedData = Buffer.from(testData)
    expect(encoded).toStrictEqual(expectedData)
  })
})

it('decodes some keys properly when nested', () => {
  const testData = new Uint8Array([
    0, 0, 0, 0, 55, 22, 68, 187, 136, 118, 158, 75, 112, 8, 60, 233, 20, 131,
    180, 156, 0, 240, 222, 239, 80, 190, 3, 91, 200, 143, 206, 9, 136, 196, 180,
    237, 254, 22, 68, 187, 136, 118, 158, 75, 112, 8, 60, 233, 20, 131, 180,
    156, 0, 240, 222, 239, 80, 190, 3, 91, 200, 143, 206, 9, 136, 196, 180, 237,
    254, 0, 0, 111, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 4,
    0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0,
  ])

  const decoded = BondSystemLayout.decode(testData)

  expect(decoded.instruction.toString()).toStrictEqual('0')
  expect(decoded.pool_type.toString()).toStrictEqual('55')
  expect(decoded.authority.toString()).toStrictEqual(
    '2VvktmP6BefjsbPoVUW9SPyt61GmwANGqK3MfxPYUXmf'
  )
  expect(decoded.treasury_oracle_address.toString()).toStrictEqual(
    '2VvktmP6BefjsbPoVUW9SPyt61GmwANGqK3MfxPYUXmf'
  )
  expect(decoded.base_oracle_address.some).toStrictEqual(undefined)
  expect(decoded.quote_oracle_address.some).toStrictEqual(undefined)
  expect(decoded.bond_yield.toString()).toStrictEqual('111')
  expect(decoded.timeclock.toString()).toStrictEqual('2')
  expect(decoded.epoch.toString()).toStrictEqual('3')
  expect(decoded.total_amount_to_distribute.toString()).toStrictEqual('4')
  expect(decoded.max_amount_to_distribute_per_epoch.toString()).toStrictEqual(
    '5'
  )
  expect(
    decoded.max_allowed_to_distribute_at_one_time.toString()
  ).toStrictEqual('6')
})
```
