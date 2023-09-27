import { TOKEN_PROGRAM_ID } from "@solana/spl-token"
import { AccountMeta, Connection, PublicKey } from "@solana/web3.js"
import { Instructions } from "../../types/common"
import { PriceOracleV2, OracleConfig, OracleInstruction, SourceType } from "../../types/oracle"
import { buildInstruction, createATAInst } from "../common"
import { UpdatePriceLayout } from "./layouts"

export interface UpdatePrice {
  config: OracleConfig
  connection: Connection
  payer: PublicKey
  oracle: PriceOracleV2
}

export const updateSerumPrice = async ({
  config,
  connection,
  payer,
  oracle,
}: UpdatePrice): Promise<Instructions> => {
  const [rewardMintAuthority] = await PublicKey.findProgramAddress(
    [oracle.account.toBuffer(), Buffer.from(config.seed.rewardMint)],
    config.programId
  )
  const rewardAccount = await createATAInst(
    connection,
    payer,
    oracle.rewardMint
  )

  const data = Buffer.alloc(UpdatePriceLayout.span)
  UpdatePriceLayout.encode(
    {
      instruction: OracleInstruction.UpdatePrice,
      source: SourceType.Serum,
      market: oracle.market,
    },
    data
  )

  const keys: AccountMeta[] = [
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
      pubkey: rewardAccount.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: oracle.rewardMint,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: rewardMintAuthority,
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
      ...rewardAccount.instructions,
      buildInstruction({ config, keys, data }),
    ],
  }
}

export const updateRaydiumPrice = async ({
  config,
  connection,
  payer,
  oracle,
}: UpdatePrice): Promise<Instructions> => {
  const [rewardMintAuthority] = await PublicKey.findProgramAddress(
    [oracle.account.toBuffer(), Buffer.from(config.seed.rewardMint)],
    config.programId
  )
  const rewardAccount = await createATAInst(
    connection,
    payer,
    oracle.rewardMint
  )

  const data = Buffer.alloc(UpdatePriceLayout.span)
  UpdatePriceLayout.encode(
    {
      instruction: OracleInstruction.UpdatePrice,
      source: SourceType.Raydium,
      market: oracle.ammId,
    },
    data
  )

  const keys: AccountMeta[] = [
    {
      pubkey: oracle.account,
      isSigner: false,
      isWritable: true,
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
      pubkey: rewardAccount.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: oracle.rewardMint,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: rewardMintAuthority,
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
      ...rewardAccount.instructions,
      buildInstruction({ config, keys, data }),
    ],
  }
}

export const updateOrcaPrice = async ({
  config,
  connection,
  payer,
  oracle,
}: UpdatePrice): Promise<Instructions> => {
  const [rewardMintAuthority] = await PublicKey.findProgramAddress(
    [oracle.account.toBuffer(), Buffer.from(config.seed.rewardMint)],
    config.programId
  )
  const rewardAccount = await createATAInst(
    connection,
    payer,
    oracle.rewardMint
  )

  const data = Buffer.alloc(UpdatePriceLayout.span)
  UpdatePriceLayout.encode(
    {
      instruction: OracleInstruction.UpdatePrice,
      source: SourceType.Orca,
      market: oracle.orcaSwap,
    },
    data
  )

  const keys: AccountMeta[] = [
    {
      pubkey: oracle.account,
      isSigner: false,
      isWritable: true,
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
      pubkey: rewardAccount.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: oracle.rewardMint,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: rewardMintAuthority,
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
      ...rewardAccount.instructions,
      buildInstruction({ config, keys, data }),
    ],
  }
}

export const updateWhirlpoolPrice = async ({
  config,
  connection,
  payer,
  oracle,
}: UpdatePrice): Promise<Instructions> => {
  const [rewardMintAuthority] = await PublicKey.findProgramAddress(
    [oracle.account.toBuffer(), Buffer.from(config.seed.rewardMint)],
    config.programId
  )
  const rewardAccount = await createATAInst(
    connection,
    payer,
    oracle.rewardMint
  )

  const data = Buffer.alloc(UpdatePriceLayout.span)
  UpdatePriceLayout.encode(
    {
      instruction: OracleInstruction.UpdatePrice,
      source: SourceType.Whirlpool,
      market: oracle.wpId,
    },
    data
  )

  const keys: AccountMeta[] = [
    {
      pubkey: oracle.account,
      isSigner: false,
      isWritable: true,
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
      pubkey: oracle.wpId,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: oracle.wpBaseVault,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: oracle.wpQuoteVault,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: rewardAccount.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: oracle.rewardMint,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: rewardMintAuthority,
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
      ...rewardAccount.instructions,
      buildInstruction({ config, keys, data }),
    ],
  }
}