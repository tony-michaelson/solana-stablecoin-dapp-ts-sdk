import { AccountMeta, Connection, Keypair, PublicKey } from '@solana/web3.js'
import { DropRewardLayout } from './layouts'
import { LucraConfig, LucraInstruction } from '../../../types/lucra'
import { MARINADE_MAINNET_CONFIG, TOKEN_PROGRAM_ID } from '../../../constants'
import {
  buildInstruction,
  createATAInst,
  createProgramAccountInst,
  generateRewardAccountKP,
} from '../../common'
import { Instructions, Signers } from '../../../types/common'
import { loadStakingStateAccount } from '../../../state/staking'

export interface DropReward {
  config: LucraConfig
  connection: Connection
  payer: PublicKey
  rewardAccountKP?: Keypair
}

export const dropRewardInstruction = async ({
  config,
  connection,
  payer,
  rewardAccountKP,
}: DropReward): Promise<Instructions & Signers> => {
  const stakingState = await loadStakingStateAccount(
    connection,
    config.account.stake,
    config.programId
  )
  const rewardAccountKey = rewardAccountKP
    ? rewardAccountKP
    : await generateRewardAccountKP(config, stakingState.rewardCursor)

  const rewardAccount = await createProgramAccountInst(
    connection,
    rewardAccountKey,
    config.accountSize.reward,
    payer,
    config.programId
  )
  const oracleRewardsAtaInstruction = await createATAInst(
    connection,
    payer,
    config.mint.oracleReward.address
  )

  const data = Buffer.alloc(DropRewardLayout.span)
  DropRewardLayout.encode(
    {
      instruction: LucraInstruction.DropReward,
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
      isWritable: true,
    },
    {
      pubkey: MARINADE_MAINNET_CONFIG.stateAccount,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: rewardAccountKey.publicKey,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.mint.stLucra.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.account.msolVault.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.account.treasury.address,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.account.rewardsVault.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.account.arbCoffer.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.account.msolVault.authority,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: oracleRewardsAtaInstruction.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.mint.oracleReward.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.mint.oracleReward.authority,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: TOKEN_PROGRAM_ID,
      isSigner: false,
      isWritable: false,
    },
  ]

  return {
    instructions: [
      ...rewardAccount.instructions,
      ...oracleRewardsAtaInstruction.instructions,
      buildInstruction({ config, keys, data }),
    ],
    signers: [...rewardAccount.signers],
  }
}
