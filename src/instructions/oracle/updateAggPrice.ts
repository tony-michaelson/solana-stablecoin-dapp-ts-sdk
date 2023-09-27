import { TOKEN_PROGRAM_ID } from "@solana/spl-token"
import { AccountMeta, Connection, PublicKey } from "@solana/web3.js"
import { Instructions, Signers } from "../../types/common"
import { PriceOracleV2, OracleConfig, OracleInstruction } from "../../types/oracle"
import { buildInstruction, createATAInst } from "../common"
import { UpdateAggPriceLayout } from "./layouts"

export interface UpdateAggPrice {
  config: OracleConfig
  connection: Connection
  payer: PublicKey
  oracle: PriceOracleV2
}

export const updateAggPriceInstruction = async ({
  config,
  connection,
  payer,
  oracle,
}: UpdateAggPrice): Promise<Instructions & Signers> => {
  const rewardAccount = await createATAInst(
    connection,
    payer,
    oracle.rewardMint
  )

  const [rewardMintAuthority] = await PublicKey.findProgramAddress(
    [oracle.account.toBuffer(), Buffer.from(config.seed.rewardMint)],
    config.programId
  )

  const data = Buffer.alloc(UpdateAggPriceLayout.span)
  UpdateAggPriceLayout.encode(
    {
      instruction: OracleInstruction.UpdateAggPrice,
    },
    data
  )

  const keys: AccountMeta[] = []
  keys.push(
    {
      pubkey: oracle.account,
      isSigner: false,
      isWritable: true,
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
  )

  return {
    instructions: [
      ...rewardAccount.instructions,
      buildInstruction({ config, keys, data }),
    ],
    signers: [],
  }
}