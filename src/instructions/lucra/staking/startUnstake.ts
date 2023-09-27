import { AccountMeta, Connection, Keypair, PublicKey } from '@solana/web3.js'
import { StartUnstakeLayout } from './layouts'
import { LucraConfig, LucraInstruction } from '../../../types/lucra'
import { TOKEN_PROGRAM_ID } from '../../../constants'
import { buildInstruction, createProgramAccountInst } from '../../common'
import { Instructions, Signers } from '../../../types/common'

export interface StartUnstake {
  config: LucraConfig
  connection: Connection
  owner: PublicKey
  lucra: bigint
  stakeAccount: PublicKey
  stakeBalanceAccount: PublicKey
  pendingVault: PublicKey
  stakeVault: PublicKey
  stakedLucraVault: PublicKey
  pendingWithdrawalKP?: Keypair
}

export const startUnstakeInstruction = async ({
  config,
  connection,
  owner,
  lucra,
  stakeAccount,
  stakeBalanceAccount,
  pendingVault,
  stakeVault,
  stakedLucraVault,
  pendingWithdrawalKP = Keypair.generate(),
}: StartUnstake): Promise<Instructions & Signers> => {
  const pendingWithdrawalAccount = await createProgramAccountInst(
    connection,
    pendingWithdrawalKP,
    config.accountSize.pendingWithdrawal,
    owner,
    config.programId
  )

  // TODO; convert to createProgramAddress using bumpSeed stored in on-chain data
  const [authority] = await PublicKey.findProgramAddress(
    [owner.toBuffer(), config.account.state.toBuffer()],
    config.programId
  )

  const data = Buffer.alloc(StartUnstakeLayout.span)
  StartUnstakeLayout.encode(
    {
      instruction: LucraInstruction.StartUnstake,
      lucra,
    },
    data
  )

  const keys: AccountMeta[] = [
    {
      pubkey: config.account.state,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.account.stake,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: stakeAccount,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: stakeBalanceAccount,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.mint.stLucra.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: stakedLucraVault,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: owner,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: stakeVault,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: pendingVault,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: authority,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: pendingWithdrawalKP.publicKey,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.oracle.SOL_USDC.account,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.oracle.SOL_USDT.account,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.oracle.LUCRA_SOL.account,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: TOKEN_PROGRAM_ID,
      isSigner: false,
      isWritable: false,
    },
  ]

  return {
    instructions: [
      ...pendingWithdrawalAccount.instructions,
      buildInstruction({ config, keys, data }),
    ],
    signers: [...pendingWithdrawalAccount.signers],
  }
}
