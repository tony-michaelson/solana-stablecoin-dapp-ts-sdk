import { AccountMeta, PublicKey, TransactionInstruction } from '@solana/web3.js'
import { WithdrawStakeLayout } from './layouts'
import { LucraConfig, LucraInstruction } from '../../../types/lucra'
import { TOKEN_PROGRAM_ID } from '../../../constants'
import { buildInstruction } from '../../common'
import { getAssociatedTokenAddress } from '@solana/spl-token'

export interface WithdrawStake {
  config: LucraConfig
  owner: PublicKey
  lucra: bigint
  stakeBalanceAccount: PublicKey
  stakedLucraVault: PublicKey
  pendingVault: PublicKey
  stakeVault: PublicKey
  depositVault: PublicKey
  ownerLucraAccount?: PublicKey
}

export const withdrawStakeInstruction = async ({
  config,
  owner,
  lucra,
  stakeBalanceAccount,
  stakedLucraVault,
  pendingVault,
  stakeVault,
  depositVault,
  ownerLucraAccount,
}: WithdrawStake): Promise<TransactionInstruction> => {
  // TODO; convert to createProgramAddress using bumpSeed stored in on-chain data
  const [authority] = await PublicKey.findProgramAddress(
    [owner.toBuffer(), config.account.state.toBuffer()],
    config.programId
  )

  const lucraAtaAddress = ownerLucraAccount
    ? ownerLucraAccount
    : await getAssociatedTokenAddress(config.mint.lucra.address, owner, false)

  const data = Buffer.alloc(WithdrawStakeLayout.span)
  WithdrawStakeLayout.encode(
    {
      instruction: LucraInstruction.WithdrawStake,
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
      pubkey: stakeBalanceAccount,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: stakedLucraVault,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: depositVault,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: stakeVault,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: pendingVault,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: lucraAtaAddress,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: owner,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: authority,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: TOKEN_PROGRAM_ID,
      isSigner: false,
      isWritable: false,
    },
  ]

  return buildInstruction({ config, keys, data })
}
