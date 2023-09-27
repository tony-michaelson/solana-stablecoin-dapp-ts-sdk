import { Connection, PublicKey } from '@solana/web3.js'
import { loadProgramAccount } from '../../utils/account'
import { MetaData } from '../common'
import { RewardAccountLayout } from './layout'

export * from './layout'

export interface RewardAccount {
  account: PublicKey
  metadata: MetaData
  previousReward: PublicKey
  poolTokenSupply: bigint
  total: bigint
  startTimestamp: bigint
  rewardCursor: number
  juiceSqueezed: boolean
  padding: number[]
}

const decodeRewardAccount = (
  account: PublicKey,
  data: Buffer
): RewardAccount => {
  const decoded = RewardAccountLayout.decode(data)
  return {
    account,
    ...decoded,
  }
}

export const loadRewardAccount = async (
  connection: Connection,
  account: PublicKey,
  programID: PublicKey
): Promise<RewardAccount> => {
  const data = await loadProgramAccount(connection, account, programID)
  return decodeRewardAccount(account, data)
}
