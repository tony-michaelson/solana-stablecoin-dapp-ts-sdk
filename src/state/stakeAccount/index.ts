import { Connection, PublicKey } from '@solana/web3.js'
import { loadProgramAccount } from '../../utils/account'
import { MetaData } from '../common'
import { StakeAccountLayout } from './layout'

export * from './layout'

export interface StakeAccount {
  account: PublicKey
  metadata: MetaData
  owner: PublicKey
  total: bigint
  lockedTotal: bigint
  padding: number[]
}

const decodeStakeAccount = (account: PublicKey, data: Buffer): StakeAccount => {
  const decoded = StakeAccountLayout.decode(data)
  return {
    account,
    ...decoded,
  }
}

export const loadStakeAccount = async (
  connection: Connection,
  account: PublicKey,
  programID: PublicKey
): Promise<StakeAccount> => {
  const data = await loadProgramAccount(connection, account, programID)
  return decodeStakeAccount(account, data)
}
