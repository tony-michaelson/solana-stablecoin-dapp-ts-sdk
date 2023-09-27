import { Connection, Keypair, PublicKey } from '@solana/web3.js'
import { LUCRA_MAINNET_CONFIG } from '../constants'
import { AccountNotFoundError } from '../types/common'

/**
 * Loads the account info of an account owned by a program.
 * @param connection
 * @param address
 * @param programId
 * @returns
 */
export const loadProgramAccount = async (
  connection: Connection,
  address: PublicKey,
  programId: PublicKey = LUCRA_MAINNET_CONFIG.programId
): Promise<Buffer> => {
  const accountInfo = await connection.getAccountInfo(address, 'processed')
  if (accountInfo === null) {
    throw new AccountNotFoundError(address.toString())
  }

  if (!accountInfo.owner.equals(programId)) {
    throw new Error(
      `Invalid owner: expected ${programId.toBase58()}, found ${accountInfo.owner.toBase58()}`
    )
  }

  return Buffer.from(accountInfo.data)
}

export async function generateStakeAcctKeypairs(
  stakeAccount: PublicKey,
  programId: PublicKey = LUCRA_MAINNET_CONFIG.programId
): Promise<{
    stakedLucraVaultKP: Keypair
    depositVaultKP: Keypair
    stakeVaultKP: Keypair
    pendingVaultKP: Keypair
  }> {
  const [stakedLucraVaultSeed] = await PublicKey.findProgramAddress(
    [stakeAccount.toBuffer(), Buffer.from('stlucra')],
    programId
  )
  const stakedLucraVaultKP = Keypair.fromSeed(stakedLucraVaultSeed.toBytes())

  const [depositVaultSeed] = await PublicKey.findProgramAddress(
    [stakeAccount.toBuffer(), Buffer.from('deposit')],
    programId
  )
  const depositVaultKP = Keypair.fromSeed(depositVaultSeed.toBytes())

  const [stakeVaultSeed] = await PublicKey.findProgramAddress(
    [stakeAccount.toBuffer(), Buffer.from('stake')],
    programId
  )
  const stakeVaultKP = Keypair.fromSeed(stakeVaultSeed.toBytes())

  const [pendingVaultSeed] = await PublicKey.findProgramAddress(
    [stakeAccount.toBuffer(), Buffer.from('pending')],
    programId
  )
  const pendingVaultKP = Keypair.fromSeed(pendingVaultSeed.toBytes())

  return {
    stakedLucraVaultKP,
    depositVaultKP,
    stakeVaultKP,
    pendingVaultKP,
  }
}
