import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from "@solana/spl-token"
import { Connection, PublicKey } from "@solana/web3.js"
import { Instructions, Signers } from "../../types/common"
import { PriceOracleV2, OracleConfig, OracleInstruction } from "../../types/oracle"
import { buildInstruction, createATAInst } from "../common"
import { RedeemRewardLayout } from "./layouts"

export interface RedeemReward {
  config: OracleConfig
  connection: Connection
  payer: PublicKey
  oracle: PriceOracleV2
  amount: bigint
}

export const redeemRewardInstruction = async ({
  config,
  connection,
  payer,
  oracle,
  amount,
}: RedeemReward): Promise<Instructions & Signers> => {
  const [treasuryAuthority] = await PublicKey.findProgramAddress(
    [oracle.account.toBuffer(), Buffer.from(config.seed.treasury)],
    config.programId
  )

  const oracleRewardAccount = await getAssociatedTokenAddress(
    oracle.rewardMint,
    payer,
    false
  )

  const treasuryRewardAccount = await createATAInst(
    connection,
    payer,
    oracle.treasuryMint
  )

  const data = Buffer.alloc(RedeemRewardLayout.span)
  RedeemRewardLayout.encode(
    {
      instruction: OracleInstruction.RedeemReward,
      amount,
    },
    data
  )

  const keys = [
    {
      pubkey: oracle.account,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: oracle.rewardMint,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: oracleRewardAccount,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: payer,
      isSigner: true,
      isWritable: false,
    },
    {
      pubkey: oracle.treasury,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: treasuryAuthority,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: treasuryRewardAccount.address,
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
      ...treasuryRewardAccount.instructions,
      buildInstruction({ config, keys, data }),
    ],
    signers: [],
  }
}