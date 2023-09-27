import { Connection, PublicKey } from '@solana/web3.js'
import { loadProgramAccount } from '../../utils/account'
import { MetaData, OraclePrice } from '../common'
import { OracleAccountLayout } from './layout'

export * from './layout'

export interface OracleAccount {
  account: PublicKey
  metadata: MetaData
  market: PublicKey
  raydiumAmm: PublicKey
  orcaPool: PublicKey
  baseMint: PublicKey
  quoteMint: PublicKey
  prices: OraclePrice[]
  aggPrice: bigint
  lowestSlot: bigint
  orcaVol: bigint
  raydiumVol: bigint
  expo: number
  valid: number
  oracleMarket: number
  padding: number[]
}

const decodeOracleAccount = (
  account: PublicKey,
  data: Buffer
): OracleAccount => {
  const decoded = OracleAccountLayout.decode(data)
  return {
    account,
    ...decoded,
  }
}

export const loadOracleAccount = async (
  connection: Connection,
  account: PublicKey,
  programID: PublicKey
): Promise<OracleAccount> => {
  const data = await loadProgramAccount(connection, account, programID)
  return decodeOracleAccount(account, data)
}
