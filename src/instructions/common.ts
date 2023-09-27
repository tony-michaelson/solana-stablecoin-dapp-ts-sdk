import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  TransactionInstructionCtorFields,
} from '@solana/web3.js'
import {
  AccountLayout,
  AuthorityType,
  createApproveInstruction,
  createAssociatedTokenAccountInstruction,
  createInitializeAccount2Instruction,
  createInitializeAccountInstruction,
  createInitializeMintInstruction,
  createSetAuthorityInstruction,
  getAccount,
  getAssociatedTokenAddress,
  getMinimumBalanceForRentExemptMint,
  getMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token'
import { TransactionInstruction } from '@solana/web3.js'
import { LucraConfig } from '../types/lucra'
import { BondConfig } from '../types/bond'
import { Address, Instructions, PDA, Signers } from '../types/common'
import { OracleConfig } from '../types/oracle'

export const buildInstruction = ({
  config: { programId },
  keys,
  data,
}: Pick<TransactionInstructionCtorFields, 'keys' | 'data'> & {
  config: LucraConfig | BondConfig | OracleConfig
}): TransactionInstruction => {
  return new TransactionInstruction({
    keys,
    programId: programId,
    data,
  })
}

export const buildTransferAuthorityInst = (
  tokenAccount: PublicKey,
  amount: bigint,
  userTransferAuthority: Keypair,
  payer: PublicKey
) => {
  return createApproveInstruction(
    tokenAccount,
    userTransferAuthority.publicKey,
    payer,
    BigInt(amount.toString())
  )
}

export const createProgramAccountInst = async (
  connection: Connection,
  accountKP: Keypair,
  accountSize: number,
  payer: PublicKey,
  programId: PublicKey
): Promise<Instructions & Signers> => {
  if (await connection.getAccountInfo(accountKP.publicKey)) {
    return {
      instructions: [],
      signers: [],
    }
  } else {
    return {
      instructions: [
        SystemProgram.createAccount({
          fromPubkey: payer,
          newAccountPubkey: accountKP.publicKey,
          lamports: await connection.getMinimumBalanceForRentExemption(
            accountSize
          ),
          space: accountSize,
          programId: programId,
        }),
      ],
      signers: [accountKP],
    }
  }
}

export const createATAInst = async (
  connection: Connection,
  owner: PublicKey,
  mint: PublicKey
): Promise<Instructions & Address> => {
  const ataAddress = await getAssociatedTokenAddress(mint, owner, false)

  if (await connection.getAccountInfo(ataAddress)) {
    return {
      instructions: [],
      address: ataAddress,
    }
  } else {
    return {
      instructions: [
        await createAssociatedTokenAccountInstruction(
          owner,
          ataAddress,
          owner,
          mint
        ),
      ],
      address: ataAddress,
    }
  }
}

async function _createTokenAcctOrTransferAuth(
  connection: Connection,
  payer: PublicKey,
  tokenAccount: Keypair,
  mint: PublicKey,
  authority: PublicKey,
  programId: PublicKey
): Promise<Instructions & Signers> {
  if (await connection.getAccountInfo(tokenAccount.publicKey)) {
    const accountInfo = await getAccount(connection, tokenAccount.publicKey)
    if (accountInfo.owner) {
      if (accountInfo.owner.toString() !== authority.toString()) {
        console.log(
          'Token Account:',
          accountInfo.address.toString(),
          ' Owner Is To Be Transferred to ProgramId: ' + programId.toString()
        )
        return {
          instructions: [
            createSetAuthorityInstruction(
              accountInfo.address,
              accountInfo.owner,
              AuthorityType.AccountOwner,
              authority
            ),
          ],
          signers: [],
        }
      } else {
        return {
          instructions: [],
          signers: [],
        }
      }
    } else {
      throw 'Authority For Token Account Not Found in On-Chain Lookup'
    }
  } else {
    const lamports = await connection.getMinimumBalanceForRentExemption(
      AccountLayout.span
    )
    return {
      instructions: [
        SystemProgram.createAccount({
          fromPubkey: payer,
          newAccountPubkey: tokenAccount.publicKey,
          lamports,
          space: AccountLayout.span,
          programId: TOKEN_PROGRAM_ID,
        }),
        createInitializeAccountInstruction(
          tokenAccount.publicKey,
          mint,
          authority
        ),
      ],
      signers: [tokenAccount],
    }
  }
}

export const createNonATAInst = async (
  connection: Connection,
  owner: PublicKey,
  mint: PublicKey
): Promise<Instructions & Address & Signers> => {
  const account = Keypair.generate()

  const space = 165
  const lamports = await connection.getMinimumBalanceForRentExemption(space)

  return {
    instructions: [
      SystemProgram.createAccount({
        fromPubkey: owner,
        newAccountPubkey: account.publicKey,
        space,
        lamports,
        programId: TOKEN_PROGRAM_ID,
      }),
      createInitializeAccount2Instruction(account.publicKey, mint, owner),
    ],
    address: account.publicKey,
    signers: [account],
  }
}

export const createTokenAccountInsts = async (
  connection: Connection,
  payer: PublicKey,
  tokenAccount: Keypair,
  accountName: string,
  mint: PublicKey,
  seedKeys: PublicKey[],
  programId: PublicKey,
  seedText?: string
): Promise<Instructions & PDA & Signers> => {
  const [authority, bumpSeed] = await PublicKey.findProgramAddress(
    generateSeeds(seedKeys, seedText),
    programId
  )

  const tokenAccountInst = await _createTokenAcctOrTransferAuth(
    connection,
    payer,
    tokenAccount,
    mint,
    authority,
    programId
  )

  return {
    instructions: [...tokenAccountInst.instructions],
    signers: [...tokenAccountInst.signers],
    name: accountName,
    pda: authority,
    bumpSeed: bumpSeed,
  }
}

async function _createMintOrTransferAuth(
  connection: Connection,
  payer: PublicKey,
  mintKP: Keypair,
  mintAuthority: PublicKey,
  decimals: number,
  freezeAuthority: PublicKey | null,
  programId: PublicKey
): Promise<Instructions & Signers> {
  if (await connection.getAccountInfo(mintKP.publicKey)) {
    const mintInfo = await getMint(connection, mintKP.publicKey)
    if (mintInfo.mintAuthority) {
      if (mintInfo.mintAuthority.toString() !== mintAuthority.toString()) {
        console.log(
          'Mint Authority Is To Be Transferred to ProgramId: ' +
            programId.toString()
        )
        return {
          instructions: [
            createSetAuthorityInstruction(
              mintInfo.address,
              mintInfo.mintAuthority,
              AuthorityType.MintTokens,
              mintAuthority
            ),
          ],
          signers: [],
        }
      } else {
        return {
          instructions: [],
          signers: [],
        }
      }
    } else {
      throw 'Authority For Mint Not Found in On-Chain Lookup'
    }
  } else {
    const lamports = await getMinimumBalanceForRentExemptMint(connection)
    return {
      instructions: [
        SystemProgram.createAccount({
          fromPubkey: payer,
          newAccountPubkey: mintKP.publicKey,
          lamports,
          space: MINT_SIZE,
          programId: TOKEN_PROGRAM_ID,
        }),
        createInitializeMintInstruction(
          mintKP.publicKey,
          decimals,
          mintAuthority,
          freezeAuthority,
          TOKEN_PROGRAM_ID
        ),
      ],
      signers: [mintKP],
    }
  }
}

export const createMintInsts = async (
  connection: Connection,
  payer: PublicKey,
  mintKP: Keypair,
  mintName: string,
  decimals: number,
  freezeAuthority: PublicKey | null,
  seedAccount: PublicKey,
  seed: string,
  programId: PublicKey
): Promise<Instructions & PDA & Signers> => {
  const [mintAuthority, mintAuthorityBumpSeed] =
    await PublicKey.findProgramAddress(
      [seedAccount.toBuffer(), Buffer.from(seed)],
      programId
    )

  const mintInst = await _createMintOrTransferAuth(
    connection,
    payer,
    mintKP,
    mintAuthority,
    decimals,
    freezeAuthority,
    programId
  )

  return {
    instructions: [...mintInst.instructions],
    signers: [...mintInst.signers],
    name: mintName,
    pda: mintAuthority,
    bumpSeed: mintAuthorityBumpSeed,
  }
}

export function generateSeeds(
  seedKeys: PublicKey[],
  seedText?: string
): (Buffer | Uint8Array)[] {
  const buffers = seedKeys.map((k) => k.toBuffer())
  if (buffers && seedText) {
    return [...buffers, Buffer.from(seedText)]
  } else {
    return [...buffers]
  }
}

export async function generateRewardAccountKP(
  config: LucraConfig,
  rewardCursor: number
): Promise<Keypair> {
  const [seedKey] = await PublicKey.findProgramAddress(
    generateSeeds([config.account.stake], 'reward' + rewardCursor.toString()),
    config.programId
  )
  return Keypair.fromSeed(seedKey.toBytes())
}

export async function generatePendingFundsAccountKP(
  config: LucraConfig,
  seedAccounts: PublicKey[]
): Promise<Keypair> {
  const [seedKey] = await PublicKey.findProgramAddress(
    generateSeeds(seedAccounts, 'pendingfunds'),
    config.programId
  )
  return Keypair.fromSeed(seedKey.toBytes())
}

export async function generateRewardAccountPkList(
  config: LucraConfig,
  start: number,
  end: number
): Promise<PublicKey[]> {
  async function _helper(
    cursor: number,
    end: number,
    keys: PublicKey[] = []
  ): Promise<PublicKey[]> {
    if (cursor > end) {
      return keys
    } else {
      const key = await generateRewardAccountKP(config, cursor)
      return _helper(cursor + 1, end, keys.concat(key.publicKey))
    }
  }
  return _helper(start, end)
}

export async function generateStakeAccountKP(
  config: LucraConfig,
  wallet: PublicKey
): Promise<[Keypair, number]> {
  const [seedKey, bumpSeed] = await PublicKey.findProgramAddress(
    generateSeeds([config.account.stake, wallet], config.seed.stakeAccount),
    config.programId
  )
  return [Keypair.fromSeed(seedKey.toBytes()), bumpSeed]
}
