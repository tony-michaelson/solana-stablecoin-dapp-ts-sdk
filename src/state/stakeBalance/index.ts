import { Connection, PublicKey, TokenAmount } from '@solana/web3.js'
import { loadProgramAccount } from '../../utils/account'
import { appendBuffer, MetaData, MetaDataLayout, StakeVaults } from '../common'
import { StakeBalanceLayout } from './layout'
import bs58 from 'bs58'
import { LucraAccountType } from '../../types/lucra'

export * from './layout'

export interface StakeBalance {
  account: PublicKey
  metadata: MetaData
  owner: PublicKey
  vaults: StakeVaults
  lastStakeTimestamp: bigint
  allocatedJuiceReward: bigint
  juiceRewardDistributed: bigint
  rewardCursor: number
  stakingTimeframe: number
  signerBumpSeed: number
  padding: number[]
}

export interface StakeBalanceAmounts {
  stLucraVault: TokenAmount
  depositVault: TokenAmount
  pendingVault: TokenAmount
  stakeVault: TokenAmount
}

const decodeStakeBalance = (account: PublicKey, data: Buffer): StakeBalance => {
  const decoded = StakeBalanceLayout.decode(data)
  return {
    account,
    ...decoded,
  }
}

export const loadStakeBalance = async (
  connection: Connection,
  account: PublicKey,
  programID: PublicKey
): Promise<StakeBalance> => {
  const data = await loadProgramAccount(connection, account, programID)
  return decodeStakeBalance(account, data)
}

export async function getStakeBalances(
  connection: Connection,
  owner: PublicKey,
  programId: PublicKey
): Promise<StakeBalance[]> {
  const metaData = MetaDataLayout()
  const metaDataBuffer = Buffer.alloc(metaData.span)
  metaData.encode(
    {
      version: 0,
      dataType: LucraAccountType.StakeBalance,
      isInitialized: true,
      extraInfo: [0, 0, 0, 0, 0],
    },
    metaDataBuffer
  )

  const metaDataWithoutVersion = metaDataBuffer.slice(1)
  const searchBuffer = appendBuffer(metaDataWithoutVersion, owner.toBuffer())
  const searchString = bs58.encode(searchBuffer)

  const accounts = await connection.getProgramAccounts(programId, {
    commitment: 'max',
    filters: [
      {
        memcmp: {
          bytes: searchString,
          offset: 1, // skipping the version u8 in metadata
        },
      },
    ],
  })
  return accounts.map((e) => decodeStakeBalance(e.pubkey, e.account.data))
}
