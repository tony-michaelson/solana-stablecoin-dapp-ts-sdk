import { AccountMeta } from "@solana/web3.js"
import { Instructions, Signers } from "../../types/common"
import { PriceOracleV2, OracleConfig, OracleInstruction } from "../../types/oracle"
import { buildInstruction } from "../common"
import { CloseOracleLayout } from "./layouts"

export interface CloseOracle {
  config: OracleConfig
  oracle: PriceOracleV2
}

export const CloseOracleInstruction = async ({
  config,
  oracle,
}: CloseOracle): Promise<Instructions & Signers> => {
  const data = Buffer.alloc(CloseOracleLayout.span)
  CloseOracleLayout.encode(
    {
      instruction: OracleInstruction.CloseOracle,
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