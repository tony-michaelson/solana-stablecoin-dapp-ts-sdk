import {
  Layout,
  struct,
  seq,
  u8,
  u32,
  union,
  LayoutObject,
} from '@solana/buffer-layout'
import { bigInt, bool, encodeDecode, publicKey, u64 } from '@solana/buffer-layout-utils'
import { PublicKey } from '@solana/web3.js'
import { BondAccountType } from '../types/bond'
import { PubkeyOpt } from '../types/common'
import { LucraAccountType } from '../types/lucra'

export const i64 = bigInt(8)

export interface MetaData {
  version: number
  dataType: LucraAccountType | BondAccountType
  isInitialized: boolean
  extraInfo: number[]
}

export const MetaDataLayout = (property?: string): Layout<MetaData> => {
  const layout = struct<MetaData>(
    [
      u8('version'),
      u8('dataType'),
      bool('isInitialized'),
      seq(u8(), 5, 'extraInfo'),
    ],
    property
  )
  const { encode, decode } = encodeDecode(layout)

  const lo = layout as Layout<unknown> as Layout<MetaData>

  lo.decode = (buffer: Buffer, offset: number) => {
    const src = decode(buffer, offset)

    return {
      version: src.version,
      dataType: src.dataType,
      isInitialized: src.isInitialized,
      extraInfo: src.extraInfo,
    }
  }

  lo.encode = (metaData: MetaData, buffer: Buffer, offset: number) => {
    return encode(metaData, buffer, offset)
  }

  return lo
}

export interface OraclePrice {
  slot: bigint
  price: bigint
  expo: number
  padding: number
  vol: bigint
}

export const OraclePriceLayout = (property?: string): Layout<OraclePrice> => {
  const layout = struct<OraclePrice>(
    [u64('slot'), u64('price'), u64('vol'), u32('expo'), u32('padding')],
    property
  )
  const { encode, decode } = encodeDecode(layout)

  const lo = layout as Layout<unknown> as Layout<OraclePrice>

  lo.decode = (buffer: Buffer, offset: number): OraclePrice => {
    const src = decode(buffer, offset)

    return {
      slot: src.slot,
      price: src.price,
      vol: src.vol,
      expo: src.expo,
      padding: src.padding,
    }
  }

  lo.encode = (oraclePrice: OraclePrice, buffer: Buffer, offset: number) => {
    return encode(oraclePrice, buffer, offset)
  }

  return lo
}

export interface ArbLimit {
  date: bigint
  limit: bigint
}

export const ArbLimitLayout = (property?: string): Layout<ArbLimit> => {
  const layout = struct<ArbLimit>([u64('date'), u64('limit')], property)
  const { encode, decode } = encodeDecode(layout)

  const lo = layout as Layout<unknown> as Layout<ArbLimit>

  lo.decode = (buffer: Buffer, offset: number): ArbLimit => {
    const src = decode(buffer, offset)

    return {
      date: src.date,
      limit: src.limit,
    }
  }

  lo.encode = (arbLimit: ArbLimit, buffer: Buffer, offset: number) => {
    return encode(arbLimit, buffer, offset)
  }

  return lo
}

export interface AddressWithSeed {
  address: PublicKey
  seed: number
}

export const AddressWithSeedLayout = (
  property?: string
): Layout<AddressWithSeed> => {
  const layout = struct<AddressWithSeed>(
    [publicKey('address'), u8('seed')],
    property
  )
  const { encode, decode } = encodeDecode(layout)

  const lo = layout as Layout<unknown> as Layout<AddressWithSeed>

  lo.decode = (buffer: Buffer, offset: number) => {
    const src = decode(buffer, offset)

    return {
      address: src.address,
      seed: src.seed,
    }
  }

  lo.encode = (metaData: AddressWithSeed, buffer: Buffer, offset: number) => {
    return encode(metaData, buffer, offset)
  }

  return lo
}

export const pubkeyOpt = (property: string): Layout<PubkeyOpt> => {
  const layout = union(
    u8('t') as unknown as Layout<LayoutObject>,
    publicKey('any'),
    property
  )
  layout.addVariant(0, seq(u8(), 0), 'none')
  layout.addVariant(1, publicKey(), 'some')

  return layout as Layout<unknown> as Layout<PubkeyOpt>
}

export interface StakeVaults {
  stLucraVault: PublicKey
  depositVault: PublicKey
  stakeVault: PublicKey
  pendingVault: PublicKey
}

export const StakeVaultsLayout = (property?: string): Layout<StakeVaults> => {
  const layout = struct<StakeVaults>(
    [
      publicKey('stLucraVault'),
      publicKey('depositVault'),
      publicKey('stakeVault'),
      publicKey('pendingVault'),
    ],
    property
  )
  const { encode, decode } = encodeDecode(layout)

  const lo = layout as Layout<unknown> as Layout<StakeVaults>

  lo.decode = (buffer: Buffer, offset: number) => {
    const src = decode(buffer, offset)

    return {
      stLucraVault: src.stLucraVault,
      depositVault: src.depositVault,
      stakeVault: src.stakeVault,
      pendingVault: src.pendingVault,
    }
  }

  lo.encode = (metaData: StakeVaults, buffer: Buffer, offset: number) => {
    return encode(metaData, buffer, offset)
  }

  return lo
}

export const appendBuffer = function (
  buffer1: Buffer,
  buffer2: Buffer
): Uint8Array {
  const tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength)
  tmp.set(new Uint8Array(buffer1), 0)
  tmp.set(new Uint8Array(buffer2), buffer1.byteLength)
  return tmp
}

export interface HistoricPrice {
  solPrice: bigint
  lucraPrice: bigint
  date: bigint
  solDecimals: number
  lucraDecimals: number
  padding: number[]
}

export const PriceHistoryLayout = (
  property?: string
): Layout<HistoricPrice> => {
  const layout = struct<HistoricPrice>(
    [
      u64('solPrice'),
      u64('lucraPrice'),
      u64('date'),
      u8('solDecimals'),
      u8('lucraDecimals'),
      seq(u8(), 6, 'padding'),
    ],
    property
  )
  const { encode, decode } = encodeDecode(layout)

  const lo = layout as Layout<unknown> as Layout<HistoricPrice>

  lo.decode = (buffer: Buffer, offset: number): HistoricPrice => {
    const src = decode(buffer, offset)

    return {
      ...src,
    }
  }

  lo.encode = (oraclePrice: HistoricPrice, buffer: Buffer, offset: number) => {
    return encode(oraclePrice, buffer, offset)
  }

  return lo
}

export interface Price {
  expo: number
  price: bigint
  slot: bigint
  vol: bigint
}

export const PriceLayout = (property?: string): Layout<Price> => {
  const layout = struct<Price>(
    [u8('expo'), u64('price'), u64('vol'), u64('slot')],
    property
  )
  const { encode, decode } = encodeDecode(layout)

  const lo = layout as Layout<unknown> as Layout<Price>

  lo.decode = (buffer: Buffer, offset: number): Price => {
    const src = decode(buffer, offset)

    return {
      expo: src.expo,
      price: src.price,
      slot: src.slot,
      vol: src.vol,
    }
  }

  lo.encode = (price: Price, buffer: Buffer, offset: number) => {
    return encode(price, buffer, offset)
  }

  return lo
}

export interface PriceSource {
  market: PublicKey,
  aggPrice: Price,
  prices: Price[],
  status: number,
  source: number,
  maxTolerance: number,
  algorithm: number,
}

export const PriceSourceLayout = (
  property?: string
): Layout<PriceSource> => {
  const layout = struct<PriceSource>(
    [
      publicKey('market'),
      PriceLayout('aggPrice'),
      seq(PriceLayout('price'), 25, 'prices'),
      u8('status'),
      u8('source'),
      u32('maxTolerance'),
      u8('algorithm'),
    ],
    property
  )
  const { encode, decode } = encodeDecode(layout)

  const lo = layout as Layout<unknown> as Layout<PriceSource>

  lo.decode = (buffer: Buffer, offset: number): PriceSource => {
    const src = decode(buffer, offset)

    return {
      ...src,
    }
  }

  lo.encode = (priceSource: PriceSource, buffer: Buffer, offset: number) => {
    return encode(priceSource, buffer, offset)
  }

  return lo
}