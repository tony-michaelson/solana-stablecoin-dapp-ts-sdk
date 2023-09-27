import { AccountMeta } from "@solana/web3.js"
import { Instructions, Signers } from "../../types/common"
import { PriceOracleV2, OracleConfig, OracleInstruction } from "../../types/oracle"
import { buildInstruction } from "../common"
import { FreezeOracleLayout } from "./layouts"

export interface FreezeOracle {
  config: OracleConfig
  oracle: PriceOracleV2
}

export const freezeOracleInstruction = async ({
  config,
  oracle,
}: FreezeOracle): Promise<Instructions & Signers> => {
  const data = Buffer.alloc(FreezeOracleLayout.span)
  FreezeOracleLayout.encode(
    {
      instruction: OracleInstruction.FreezeOracle,
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