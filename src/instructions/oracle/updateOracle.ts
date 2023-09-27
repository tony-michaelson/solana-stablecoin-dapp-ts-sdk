import { AccountMeta } from "@solana/web3.js"
import { Instructions, Signers } from "../../types/common"
import { PriceOracleV2, OracleConfig, OracleInstruction } from "../../types/oracle"
import { buildInstruction } from "../common"
import { UpdateOracleLayout } from "./layouts"

export interface UpdateOracle {
  config: OracleConfig
  oracle: PriceOracleV2
  rewardBonus: number
  algorithm: number
}

export const updateOracleInstruction = async ({
  config,
  oracle,
  rewardBonus,
  algorithm,
}: UpdateOracle): Promise<Instructions & Signers> => {
  const data = Buffer.alloc(UpdateOracleLayout.span)
  UpdateOracleLayout.encode(
    {
      instruction: OracleInstruction.UpdateOracle,
      reward_bonus: rewardBonus,
      algorithm,
    },
    data
  )

  const keys: AccountMeta[] = []
  keys.push(
    { pubkey: oracle.account, isSigner: false, isWritable: true },
    { pubkey: oracle.authority, isSigner: true, isWritable: false },
  )

  return {
    instructions: [buildInstruction({ config, keys, data })],
    signers: [],
  }
}