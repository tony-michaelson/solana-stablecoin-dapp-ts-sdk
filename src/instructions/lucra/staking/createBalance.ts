import { AccountMeta, Connection, Keypair, PublicKey } from '@solana/web3.js'
import { CreateStakeBalanceLayout } from './layouts'
import {
  buildInstruction,
  createATAInst,
  createProgramAccountInst,
  createTokenAccountInsts,
} from '../../common'
import {
  LucraConfig,
  LucraInstruction,
  StakingTimeframe,
} from '../../../types/lucra'
import { TwoTransactions } from '../../../types/common'
import { MARINADE_MAINNET_CONFIG } from '../../../constants'

export interface CreateStakeBalance {
  config: LucraConfig
  connection: Connection
  owner: PublicKey
  timeframe: StakingTimeframe
  stakeBalanceAccountKP?: Keypair
  stakedLucraVaultKP?: Keypair
  depositVaultKP?: Keypair
  stakeVaultKP?: Keypair
  pendingVaultKP?: Keypair
}

export const createStakeBalanceInstruction = async ({
  config,
  connection,
  owner,
  timeframe,
  stakeBalanceAccountKP = Keypair.generate(),
  stakedLucraVaultKP = Keypair.generate(),
  depositVaultKP = Keypair.generate(),
  stakeVaultKP = Keypair.generate(),
  pendingVaultKP = Keypair.generate(),
}: CreateStakeBalance): Promise<TwoTransactions> => {
  const stakeBalanceAccount = await createProgramAccountInst(
    connection,
    stakeBalanceAccountKP,
    config.accountSize.staking.balances,
    owner,
    config.programId
  )

  const stakedLucraVaultInst = await createTokenAccountInsts(
    connection,
    owner,
    stakedLucraVaultKP,
    'StakedLucraVault',
    config.mint.stLucra.address,
    [owner, config.account.state],
    config.programId
  )

  const depositVaultInst = await createTokenAccountInsts(
    connection,
    owner,
    depositVaultKP,
    'DepositVault',
    config.mint.lucra.address,
    [owner, config.account.state],
    config.programId
  )

  const stakeVaultInst = await createTokenAccountInsts(
    connection,
    owner,
    stakeVaultKP,
    'StakeVault',
    config.mint.lucra.address,
    [owner, config.account.state],
    config.programId
  )

  const pendingVaultInst = await createTokenAccountInsts(
    connection,
    owner,
    pendingVaultKP,
    'PendingVault',
    config.mint.lucra.address,
    [owner, config.account.state],
    config.programId
  )

  const msolAtaInstruction = await createATAInst(
    connection,
    owner,
    MARINADE_MAINNET_CONFIG.msolMint
  )

  const data = Buffer.alloc(CreateStakeBalanceLayout.span)
  CreateStakeBalanceLayout.encode(
    {
      instruction: LucraInstruction.CreateStakeBalance,
      bumpSeed: depositVaultInst.bumpSeed,
      timeframe,
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
      pubkey: stakeBalanceAccountKP.publicKey,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: owner,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: stakedLucraVaultKP.publicKey,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: depositVaultKP.publicKey,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: stakeVaultKP.publicKey,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: pendingVaultKP.publicKey,
      isSigner: false,
      isWritable: false,
    },
  ]

  return {
    transaction1: {
      instructions: [
        ...stakeBalanceAccount.instructions,
        ...stakedLucraVaultInst.instructions,
        ...depositVaultInst.instructions,
        ...stakeVaultInst.instructions,
        ...pendingVaultInst.instructions,
      ],
      signers: [
        ...stakeBalanceAccount.signers,
        ...stakedLucraVaultInst.signers,
        ...depositVaultInst.signers,
        ...stakeVaultInst.signers,
        ...pendingVaultInst.signers,
      ],
      pdas: [
        {
          ...stakedLucraVaultInst,
          ...depositVaultInst,
          ...stakeVaultInst,
          ...pendingVaultInst,
        },
      ],
    },
    transaction2: {
      instructions: [
        ...msolAtaInstruction.instructions,
        buildInstruction({ config, keys, data }),
      ],
      signers: [],
      pdas: [],
    },
  }
}
