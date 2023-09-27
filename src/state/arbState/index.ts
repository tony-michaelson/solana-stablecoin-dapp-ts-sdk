import { Connection, PublicKey } from '@solana/web3.js'
import { ArbState } from '../../types/lucra'
import { loadProgramAccount } from '../../utils/account'
import { AddressWithSeed, ArbLimit, MetaData } from '../common'
import { ArbStateLayout } from './layout'

export * from './layout'

export interface ArbStateAccount {
  account: PublicKey
  metadata: MetaData
  key: PublicKey
  arbFund: AddressWithSeed
  wsolHoldingVault: AddressWithSeed
  mataHoldingVault: AddressWithSeed
  lucraHoldingVault: AddressWithSeed
  padding: number[]
  maxAmountOfLucraToMint: bigint
  buyingLucra: boolean
  padding2: number[]
  rollingLimits: ArbLimit[]
  aggLimit: bigint
  dailyLimit: bigint
  startOfDayTimestamp: bigint
  state: ArbState
  padding3: number[]
}

const decodeArbState = (account: PublicKey, data: Buffer): ArbStateAccount => {
  const decoded = ArbStateLayout.decode(data)
  return {
    account,
    ...decoded,
  }
}

export const loadArbStateAccount = async (
  connection: Connection,
  account: PublicKey,
  programID: PublicKey
): Promise<ArbStateAccount> => {
  const data = await loadProgramAccount(connection, account, programID)
  console.dir(JSON.parse(JSON.stringify(data)), { maxArrayLength: null })
  return decodeArbState(account, data)
}
