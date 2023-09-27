import { Connection, PublicKey } from '@solana/web3.js'
import { loadProgramAccount } from '../../utils/account'
import { appendBuffer, MetaData, MetaDataLayout } from '../common'
import { PendingWithdrawalAccountLayout } from './layout'
import bs58 from 'bs58'
import { LucraAccountType } from '../../types/lucra'

export * from './layout'

export interface PendingWithdrawalAccount {
  account: PublicKey
  metadata: MetaData
  stakeBalance: PublicKey
  startTimestamp: bigint
  endTimestamp: bigint
  lucra: bigint
}

const decodePendingWithdrawalAccount = (
  account: PublicKey,
  data: Buffer
): PendingWithdrawalAccount => {
  const decoded = PendingWithdrawalAccountLayout.decode(data)
  return {
    account,
    ...decoded,
  }
}

export const loadPendingWithdrawalAccount = async (
  connection: Connection,
  account: PublicKey,
  programID: PublicKey
): Promise<PendingWithdrawalAccount> => {
  const data = await loadProgramAccount(connection, account, programID)
  return decodePendingWithdrawalAccount(account, data)
}

export async function getPendingWithdrawalAccounts(
  connection: Connection,
  stakeBalance: PublicKey,
  programId: PublicKey
): Promise<PendingWithdrawalAccount[]> {
  const metaData = MetaDataLayout()
  const metaDataBuffer = Buffer.alloc(metaData.span)
  metaData.encode(
    {
      version: 0,
      dataType: LucraAccountType.PendingWithdrawal,
      isInitialized: true,
      extraInfo: [0, 0, 0, 0, 0],
    },
    metaDataBuffer
  )

  const metaDataWithoutVersion = metaDataBuffer.slice(1)
  const searchBuffer = appendBuffer(
    metaDataWithoutVersion,
    stakeBalance.toBuffer()
  )
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
  return accounts.map((e) =>
    decodePendingWithdrawalAccount(e.pubkey, e.account.data)
  )
}
