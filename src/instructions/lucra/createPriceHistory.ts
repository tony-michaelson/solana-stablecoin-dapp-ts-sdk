import { AccountMeta, Connection, Keypair, PublicKey } from '@solana/web3.js'
import { CreatePriceHistoryLayout } from './layouts'
import { buildInstruction, createProgramAccountInst } from '../common'
import { LucraConfig, LucraInstruction } from '../../types/lucra'
import { Instructions, Signers } from '../../types/common'

export interface CreatePriceHistory {
  config: LucraConfig
  connection: Connection
  creatorAuthority: PublicKey
  priceHistoryAccountKP?: Keypair
}

export const createPriceHistoryInstruction = async ({
  config,
  connection,
  creatorAuthority,
  priceHistoryAccountKP = Keypair.generate(),
}: CreatePriceHistory): Promise<Instructions & Signers> => {
  const priceHistoryAccount = await createProgramAccountInst(
    connection,
    priceHistoryAccountKP,
    config.accountSize.priceHistory,
    creatorAuthority,
    config.programId
  )

  const data = Buffer.alloc(CreatePriceHistoryLayout.span)
  CreatePriceHistoryLayout.encode(
    {
      instruction: LucraInstruction.CreatePriceHistory,
    },
    data
  )

  const keys: AccountMeta[] = [
    {
      pubkey: creatorAuthority,
      isSigner: true,
      isWritable: false,
    },
    {
      pubkey: priceHistoryAccountKP.publicKey,
      isSigner: false,
      isWritable: true,
    },
  ]

  return {
    instructions: [
      ...priceHistoryAccount.instructions,
      buildInstruction({ config, keys, data }),
    ],
    signers: [...priceHistoryAccount.signers],
  }
}
