import { Connection, PublicKey } from '@solana/web3.js'
import { loadProgramAccount } from '../../utils/account'
import { HistoricPrice, MetaData } from '../common'
import { PriceHistoryAccountLayout } from './layout'

export * from './layout'

export interface PriceHistoryAccount {
  account: PublicKey
  metadata: MetaData
  prices: HistoricPrice[]
  intervalStart: bigint
  lastUpdateTimestamp: bigint
  updateCounter: number
  padding: number[]
}

const decodePriceHistoryAccount = (
  account: PublicKey,
  data: Buffer
): PriceHistoryAccount => {
  const decoded = PriceHistoryAccountLayout.decode(data)
  return {
    account,
    ...decoded,
  }
}

export const loadPriceHistoryAccount = async (
  connection: Connection,
  account: PublicKey,
  programID: PublicKey
): Promise<PriceHistoryAccount> => {
  const data = await loadProgramAccount(connection, account, programID)
  return decodePriceHistoryAccount(account, data)
}
