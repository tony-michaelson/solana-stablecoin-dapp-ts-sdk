import { AccountMeta, Connection, PublicKey } from '@solana/web3.js'
import { UpdatePriceLayout } from './layouts'
import { buildInstruction, createATAInst } from '../common'
import { LucraConfig, LucraInstruction, PriceOracle } from '../../types/lucra'
import { Instructions } from '../../types/common'
import { TOKEN_PROGRAM_ID } from '../../constants'

export interface UpdatePrice {
  config: LucraConfig
  connection: Connection
  payer: PublicKey
  oracle: PriceOracle
}

export const createUpdatePriceInstruction = async ({
  config,
  connection,
  payer,
  oracle,
}: UpdatePrice): Promise<Instructions> => {
  const oracleRewardsAtaInstruction = await createATAInst(
    connection,
    payer,
    config.mint.oracleReward.address
  )

  const data = Buffer.alloc(UpdatePriceLayout.span)
  UpdatePriceLayout.encode(
    {
      instruction: LucraInstruction.UpdatePrice,
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
      pubkey: oracle.account,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: oracle.market,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: oracle.bids,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: oracle.baseMint,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: oracle.quoteMint,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: oracle.ammId,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: oracle.ammBaseVault,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: oracle.ammQuoteVault,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: oracle.ammOpenOrders,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: oracle.orcaSwap,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: oracle.orcaBaseVault,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: oracle.orcaQuoteVault,
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
      ...oracleRewardsAtaInstruction.instructions,
      buildInstruction({ config, keys, data }),
    ],
  }
}
