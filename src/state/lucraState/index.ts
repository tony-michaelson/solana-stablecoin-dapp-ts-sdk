import { Connection, PublicKey } from '@solana/web3.js'
import { loadProgramAccount } from '../../utils/account'
import { AddressWithSeed, MetaData } from '../common'
import { StateLayout } from './layout'

export * from './layout'

export interface StateAccount {
  account: PublicKey
  metadata: MetaData
  key: PublicKey
  stakingState: PublicKey
  arbState: PublicKey
  mataMint: AddressWithSeed
  lucraMint: AddressWithSeed
  rewardMint: AddressWithSeed
  msolVault: AddressWithSeed
  rewardsVault: AddressWithSeed
  linusBlanket: AddressWithSeed
  padding1: number[]
  epoch: bigint
  minDeposit: bigint
  totalOutstandingMata: bigint
  maximumOutstandingMata: bigint
  minimumHarvestAmount: bigint
  totalSolCollateral: bigint
  collateralRequirement: number
  rewardFee: number
  loansEnabled: boolean
  stakingEnabled: boolean
  arbitrageEnabled: boolean
  pegCheckEnabled: boolean
  pegBroken: boolean
  lcp: number
  padding2: number[]
}

const decodeState = (account: PublicKey, data: Buffer): StateAccount => {
  const decoded = StateLayout.decode(data)
  return {
    account,
    ...decoded,
  }
}

export const loadStateAccount = async (
  connection: Connection,
  account: PublicKey,
  programID: PublicKey
): Promise<StateAccount> => {
  const data = await loadProgramAccount(connection, account, programID)
  console.dir(JSON.parse(JSON.stringify(data)), {
    maxArrayLength: null,
  })
  return decodeState(account, data)
}
