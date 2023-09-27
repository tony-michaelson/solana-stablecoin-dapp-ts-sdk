import { Connection, PublicKey } from '@solana/web3.js'
import { loadProgramAccount } from '../../utils/account'
import { MetaData, PriceSource } from '../common'
import { OracleV2AccountLayout } from './layout'

export * from './layout'

export interface OracleV2Account {
  account: PublicKey
  metadata: MetaData
  baseMint: PublicKey
  quoteMint: PublicKey
  expo: number
  priceSources: PriceSource[]
  aggPrice: bigint
  validSlot: bigint
  timestamp: bigint
  minPs: number
  authority: PublicKey
  treasury: PublicKey
  treasuryNonce: number
  rewardMint: PublicKey
  rewardMintNonce: number
  rewardBonus: number
  algorithm: number
  status: number
  prevSlot: bigint
  prevAggPrice: bigint
  prevTimestamp: bigint
  numPs: number
}

const decodeOracleAccountV2 = (
  account: PublicKey,
  data: Buffer
): OracleV2Account => {
  const decoded = OracleV2AccountLayout.decode(data)
  return {
    account,
    ...decoded,
  }
}

export const loadOracleAccountV2 = async (
  connection: Connection,
  account: PublicKey,
  programID: PublicKey,
): Promise<OracleV2Account> => {
  const data = await loadProgramAccount(connection, account, programID)
  return decodeOracleAccountV2(account, data)
}