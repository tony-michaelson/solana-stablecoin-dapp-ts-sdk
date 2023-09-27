import {
  createInitializeMintInstruction,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token'
import {
  Connection,
  Context,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  SignatureResult,
  Signer,
  SystemProgram,
  Transaction,
} from '@solana/web3.js'
import { fs } from 'mz'
import { createTokenAccountInsts } from '../src/instructions/common'

export async function createKeypairFromFile(
  filePath: string | undefined
): Promise<Keypair> {
  if (filePath) {
    const secretKeyString = await fs.readFile(filePath, { encoding: 'utf8' })
    const secretKey = Uint8Array.from(JSON.parse(secretKeyString))
    return Keypair.fromSecretKey(secretKey)
  } else {
    throw 'Unable to create keypair from file: ' + filePath
  }
}

export function getPubkeyForEnv(keyString: string | undefined) {
  if (keyString) {
    return new PublicKey(keyString)
  } else {
    throw 'No key provided'
  }
}

export async function watchTransaction(
  connection: Connection,
  signature: string
): Promise<boolean> {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  let success = 0
  await connection.onSignature(
    signature,
    function (signatureResult: SignatureResult, _context: Context) {
      if (signatureResult.err) {
        success = -1
      } else {
        success = 1
      }
    }
  )
  while (success === 0) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  return success === 1
}

export async function waitForTransaction(
  signature: string | undefined
): Promise<string> {
  while (signature === undefined) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  return signature
}

export async function transactionIsSuccessfull(
  connection: Connection,
  signature: string | undefined
): Promise<boolean> {
  const txid = await waitForTransaction(signature)
  if (txid === 'skip') {
    return true
  } else {
    return watchTransaction(connection, txid)
  }
}

export async function waitFor(miliseconds: number): Promise<void> {
  while (miliseconds > 0) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    miliseconds = miliseconds - 1000
  }
}

export async function createTokenMint(
  connection: Connection,
  payer: Keypair,
  mintKP: Keypair,
  authority: PublicKey,
  decimals: number
): Promise<Keypair> {
  const lamports = await getMinimumBalanceForRentExemptMint(connection)
  const transaction = new Transaction().add(
    SystemProgram.createAccount({
      fromPubkey: payer.publicKey,
      newAccountPubkey: mintKP.publicKey,
      lamports,
      space: MINT_SIZE,
      programId: TOKEN_PROGRAM_ID,
    }),
    createInitializeMintInstruction(
      mintKP.publicKey,
      decimals,
      authority,
      null,
      TOKEN_PROGRAM_ID
    )
  )

  const signers: Signer[] = [payer, mintKP]

  const signature = await sendAndConfirmTransaction(
    connection,
    transaction,
    signers,
    { commitment: 'finalized' }
  )
  console.log('created token mint txid:', signature)

  return mintKP
}

export async function createSPLTokenAccount(
  connection: Connection,
  payer: Keypair,
  tokenAccount: Keypair,
  mint: PublicKey,
  seedAccount: PublicKey,
  programId: PublicKey,
  seed?: string
) {
  const createAcct = await createTokenAccountInsts(
    connection,
    payer.publicKey,
    tokenAccount,
    'na',
    mint,
    [seedAccount],
    programId,
    seed
  )

  const signers: Signer[] = [payer, ...createAcct.signers]

  const transaction = new Transaction().add(...createAcct.instructions)

  const signature = await sendAndConfirmTransaction(
    connection,
    transaction,
    signers,
    { commitment: 'finalized' }
  )

  return signature
}

/* eslint-disable @typescript-eslint/ban-types */
export function logObjectWithBigints(data: Object) {
  console.dir(
    JSON.parse(
      JSON.stringify(data, (_key, value) => {
        switch (typeof value) {
          case 'bigint': {
            return value.toString()
          }
          case 'object': {
            return 'data' in value ? { data: value.toString() } : value
          }
          default: {
            return value
          }
        }
      })
    ),
    { maxArrayLength: null }
  )
}
