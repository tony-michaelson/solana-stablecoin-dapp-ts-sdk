import { AccountMeta, Connection, PublicKey } from '@solana/web3.js'
import { UpdatePriceHistoryLayout } from './layouts'
import { buildInstruction, createATAInst } from '../common'
import { LucraConfig, LucraInstruction } from '../../types/lucra'
import { TOKEN_PROGRAM_ID } from '../../constants'
import { Instructions } from '../../types/common'

export interface UpdatePriceHistory {
  config: LucraConfig
  connection: Connection
  payer: PublicKey
}

export const updatePriceHistoryInstruction = async ({
  config,
  connection,
  payer,
}: UpdatePriceHistory): Promise<Instructions> => {
  const rewardsAtaInstruction = await createATAInst(
    connection,
    payer,
    config.mint.oracleReward.address
  )

  const data = Buffer.alloc(UpdatePriceHistoryLayout.span)
  UpdatePriceHistoryLayout.encode(
    {
      instruction: LucraInstruction.UpdatePriceHistory,
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
      pubkey: config.account.priceHistory,
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
      pubkey: rewardsAtaInstruction.address,
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
      ...rewardsAtaInstruction.instructions,
      buildInstruction({ config, keys, data }),
    ],
  }
}
