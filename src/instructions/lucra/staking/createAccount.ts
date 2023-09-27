import { AccountMeta, Connection, PublicKey } from '@solana/web3.js'
import { CreateStakeAccountLayout } from './layouts'
import {
  buildInstruction,
  createProgramAccountInst,
  generateStakeAccountKP,
} from '../../common'
import { LucraConfig, LucraInstruction } from '../../../types/lucra'
import { Address, Instructions, Signers } from '../../../types/common'

export interface CreateStakeAccount {
  config: LucraConfig
  connection: Connection
  owner: PublicKey
}

export const createStakeAccountInstruction = async ({
  config,
  connection,
  owner,
}: CreateStakeAccount): Promise<Instructions & Signers & Address> => {
  const [stakeAccountKP, bumpSeed] = await generateStakeAccountKP(config, owner)

  if (await connection.getAccountInfo(stakeAccountKP.publicKey)) {
    return {
      instructions: [],
      signers: [],
      address: stakeAccountKP.publicKey,
    }
  } else {
    const stakeAccount = await createProgramAccountInst(
      connection,
      stakeAccountKP,
      config.accountSize.staking.account,
      owner,
      config.programId
    )

    const data = Buffer.alloc(CreateStakeAccountLayout.span)
    CreateStakeAccountLayout.encode(
      {
        instruction: LucraInstruction.CreateStakingAccount,
        bumpSeed,
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
        pubkey: stakeAccountKP.publicKey,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: owner,
        isSigner: false,
        isWritable: false,
      },
    ]

    return {
      instructions: [
        ...stakeAccount.instructions,
        buildInstruction({ config, keys, data }),
      ],
      signers: [...stakeAccount.signers],
      address: stakeAccountKP.publicKey,
    }
  }
}
