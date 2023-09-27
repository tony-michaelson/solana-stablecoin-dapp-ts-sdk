import { AccountMeta } from "@solana/web3.js"
import { Instructions, Signers } from "../../types/common"
import { PriceOracleV2, OracleConfig, OracleInstruction } from "../../types/oracle"
import { buildInstruction } from "../common"
import { ThawOracleLayout } from "./layouts"

export interface ThawOracle {
  config: OracleConfig
  oracle: PriceOracleV2
}

export const ThawOracleInstruction = async ({
  config,
  oracle,
}: ThawOracle): Promise<Instructions & Signers> => {
  const data = Buffer.alloc(ThawOracleLayout.span)
  ThawOracleLayout.encode(
    {
      instruction: OracleInstruction.ThawOracle,
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