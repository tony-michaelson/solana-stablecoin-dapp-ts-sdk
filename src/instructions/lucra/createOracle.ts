import { AccountMeta, Connection, Keypair, PublicKey } from '@solana/web3.js'
import { CreateOracleLayout } from './layouts'
import { buildInstruction, createProgramAccountInst } from '../common'
import { LucraConfig, LucraInstruction, OracleMarket } from '../../types/lucra'
import { Instructions, Signers } from '../../types/common'

export interface CreateOracle {
  config: LucraConfig
  connection: Connection
  payer: PublicKey
  market: OracleMarket
  serumMarket: PublicKey
  raydiumAMM: PublicKey
  orcaSwap: PublicKey
  baseMint: PublicKey
  quoteMint: PublicKey
  oracleAccountKP?: Keypair
}

export const createOracleInstruction = async ({
  config,
  connection,
  payer,
  market,
  serumMarket,
  raydiumAMM,
  orcaSwap,
  baseMint,
  quoteMint,
  oracleAccountKP = Keypair.generate(),
}: CreateOracle): Promise<Instructions & Signers> => {
  const oracleAccount = await createProgramAccountInst(
    connection,
    oracleAccountKP,
    config.accountSize.oracle,
    payer,
    config.programId
  )

  const data = Buffer.alloc(CreateOracleLayout.span)
  CreateOracleLayout.encode(
    {
      instruction: LucraInstruction.CreateOracle,
      market,
    },
    data
  )

  const keys: AccountMeta[] = [
    {
      pubkey: payer,
      isSigner: true,
      isWritable: false,
    },
    {
      pubkey: oracleAccountKP.publicKey,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: serumMarket,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: raydiumAMM,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: orcaSwap,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: baseMint,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: quoteMint,
      isSigner: false,
      isWritable: false,
    },
  ]

  return {
    instructions: [
      ...oracleAccount.instructions,
      buildInstruction({ config, keys, data }),
    ],
    signers: [...oracleAccount.signers],
  }
}
