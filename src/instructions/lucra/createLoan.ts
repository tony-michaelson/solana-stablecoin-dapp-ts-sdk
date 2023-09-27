import { AccountMeta, Connection, Keypair, PublicKey } from '@solana/web3.js'
import { CreateLoanLayout } from './layouts'
import {
  buildInstruction,
  createATAInst,
  createProgramAccountInst,
} from '../common'
import { LucraConfig, LucraInstruction } from '../../types/lucra'
import {
  MARINADE_MAINNET_CONFIG,
  TOKEN_PROGRAM_ID,
  SOL_FEES_ACCOUNT,
  SYSTEM_PROGRAM_ID,
} from '../../constants'
import { Instructions, Signers } from '../../types/common'

export interface CreateLoan {
  config: LucraConfig
  connection: Connection
  payer: PublicKey
  lamports: bigint
  loanAccountKP?: Keypair
  stakeAccount?: PublicKey
}

export const createLoanInstruction = async ({
  config,
  connection,
  payer,
  lamports,
  loanAccountKP = Keypair.generate(),
  stakeAccount,
}: CreateLoan): Promise<Instructions & Signers> => {
  const loanAccount = await createProgramAccountInst(
    connection,
    loanAccountKP,
    config.accountSize.loan,
    payer,
    config.programId
  )

  const mataAtaInstruction = await createATAInst(
    connection,
    payer,
    config.mint.mata.address
  )
  const msolAtaInstruction = await createATAInst(
    connection,
    payer,
    MARINADE_MAINNET_CONFIG.msolMint
  )

  const data = Buffer.alloc(CreateLoanLayout.span)
  CreateLoanLayout.encode(
    {
      instruction: LucraInstruction.CreateMataLoan,
      lamports,
    },
    data
  )

  const keys: AccountMeta[] = []

  keys.push(
    {
      pubkey: config.account.state,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: MARINADE_MAINNET_CONFIG.stateAccount,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: loanAccountKP.publicKey,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.account.msolVault.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.mint.mata.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.mint.mata.authority,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: payer,
      isSigner: true,
      isWritable: true,
    },
    {
      pubkey: mataAtaInstruction.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: msolAtaInstruction.address,
      isSigner: false,
      isWritable: true,
    }
  )

  if (stakeAccount) {
    keys.push({
      pubkey: stakeAccount,
      isSigner: false,
      isWritable: true,
    })
  }

  keys.push(
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
      pubkey: config.oracle.SOL_MATA.account,
      isSigner: false,
      isWritable: false,
    }
  )

  if (stakeAccount) {
    keys.push({
      pubkey: config.oracle.LUCRA_SOL.account,
      isSigner: false,
      isWritable: false,
    })
  }

  keys.push(
    {
      pubkey: MARINADE_MAINNET_CONFIG.msolMint,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: MARINADE_MAINNET_CONFIG.solLeg,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: MARINADE_MAINNET_CONFIG.msolLeg,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: MARINADE_MAINNET_CONFIG.msolLegAuthorityInfo,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: MARINADE_MAINNET_CONFIG.reservePDAInfo,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: MARINADE_MAINNET_CONFIG.msolMintAuth,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: SOL_FEES_ACCOUNT,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: SYSTEM_PROGRAM_ID,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: TOKEN_PROGRAM_ID,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: MARINADE_MAINNET_CONFIG.programId,
      isSigner: false,
      isWritable: false,
    }
  )

  return {
    instructions: [
      ...loanAccount.instructions,
      ...mataAtaInstruction.instructions,
      ...msolAtaInstruction.instructions,
      buildInstruction({ config, keys, data }),
    ],
    signers: [...loanAccount.signers],
  }
}
