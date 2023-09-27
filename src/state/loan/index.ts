import { Connection, PublicKey, Commitment } from '@solana/web3.js'
import { LucraConfig } from '../../types/lucra'
import { loadProgramAccount } from '../../utils/account'
import { MetaData } from '../common'
import { LoanLayout } from './layout'

export * from './layout'

export interface LoanAccount {
  account: PublicKey
  metadata: MetaData
  owner: PublicKey
  solCollateralAmount: bigint
  stakingCollateralAmount: bigint
  marketPrice: bigint
  loanAmount: bigint
  penaltyHarvested: bigint
  penaltyToHarvest: bigint
  loanMint: PublicKey
  creationDate: bigint
  lastDayPenaltyWasChecked: bigint
  collateralRate: number
  loanType: number
  repaid: boolean
  padding: number[]
}

const decodeLoanAccount = (account: PublicKey, data: Buffer): LoanAccount => {
  const decoded = LoanLayout.decode(data)
  return {
    account,
    ...decoded,
  }
}

export const loadLoanAccount = async (
  connection: Connection,
  account: PublicKey,
  programID: PublicKey
): Promise<LoanAccount> => {
  const data = await loadProgramAccount(connection, account, programID)
  return decodeLoanAccount(account, data)
}

export async function getLoanAccounts(
  config: LucraConfig,
  connection: Connection,
  owner: PublicKey
): Promise<LoanAccount[]> {
  const accounts = await connection.getProgramAccounts(config.programId, {
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
  return accounts
    .filter((a) => a.account.data.length === config.accountSize.loan)
    .map((e) => decodeLoanAccount(e.pubkey, e.account.data))
}

export async function getUnpaidLoanData(
  config: LucraConfig,
  connection: Connection
): Promise<LoanAccount[]> {
  const conf = {
    commitment: 'max' as Commitment,
    filters: [
      {
        dataSize: 264,
      },
    ],
  }
  const accounts = await connection.getProgramAccounts(config.programId, conf)
  
  return accounts
    .map((e) => decodeLoanAccount(e.pubkey, e.account.data))
    .filter((e) => !e.repaid)
}