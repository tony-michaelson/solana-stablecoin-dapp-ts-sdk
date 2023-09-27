import { Connection, PublicKey } from '@solana/web3.js'
import { loadProgramAccount } from '../../utils/account'
import { AddressWithSeed, MetaData } from '../common'
import { StakingStateLayout } from './layout'

export * from './layout'

export interface StakingStateAccount {
  account: PublicKey
  metadata: MetaData
  key: PublicKey
  currentRewardPubkey: PublicKey
  totalAmountToDistribute: bigint
  amountToDistributePerEpoch: bigint
  lastReward: bigint
  lastDropTimestamp: bigint
  rewardCursor: number
  treasury: AddressWithSeed
  stakeMint: AddressWithSeed
  padding: number[]
}

const decodeStakingState = (
  account: PublicKey,
  data: Buffer
): StakingStateAccount => {
  const decoded = StakingStateLayout.decode(data)
  return {
    account,
    ...decoded,
  }
}

export const loadStakingStateAccount = async (
  connection: Connection,
  account: PublicKey,
  programID: PublicKey
): Promise<StakingStateAccount> => {
  const data = await loadProgramAccount(connection, account, programID)
  return decodeStakingState(account, data)
}
