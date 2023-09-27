import { Connection, PublicKey } from '@solana/web3.js'
import { BOND_MAINNET_CONFIG } from '../../constants'
import { loadProgramAccount } from '../../utils/account'
import { I80F48 } from '../../utils/fixednum'
import { MetaData } from '../common'
import { BondAccountLayout } from './layout'

export * from './layout'

export interface BondAccount {
  account: PublicKey
  metadata: MetaData
  owner: PublicKey
  bondSystem: PublicKey
  lpTokenMint: PublicKey
  lpTokenAmount: bigint
  totalValue: I80F48
  suppliedValue: I80F48
  bondYield: I80F48
  timestamp: bigint
  exercised: boolean
  padding: number[]
}

const decodeBondAccount = (account: PublicKey, data: Buffer): BondAccount => {
  const decoded = BondAccountLayout.decode(data)
  return {
    account,
    ...decoded,
  }
}

export const loadBondAccount = async (
  connection: Connection,
  account: PublicKey,
  programID: PublicKey = BOND_MAINNET_CONFIG.programId
): Promise<BondAccount> => {
  const data = await loadProgramAccount(connection, account, programID)
  return decodeBondAccount(account, data)
}

export async function getBondAccounts(
  connection: Connection,
  owner: PublicKey,
  programId: PublicKey
): Promise<BondAccount[]> {
  const accounts = await connection.getProgramAccounts(programId, {
    commitment: 'max',
    filters: [
      {
        memcmp: {
          bytes: owner.toString(),
          offset: 8, // MataData (8)
        },
      },
    ],
  })
  return accounts.map((e) => decodeBondAccount(e.pubkey, e.account.data))
}
