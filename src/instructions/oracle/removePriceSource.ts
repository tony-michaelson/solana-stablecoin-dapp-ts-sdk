import { AccountMeta, PublicKey } from "@solana/web3.js"
import { Instructions, Signers } from "../../types/common"
import { PriceOracleV2, OracleConfig, OracleInstruction } from "../../types/oracle"
import { buildInstruction } from "../common"
import { RemovePriceSourceLayout } from "./layouts"

export interface RemovePriceSource {
  config: OracleConfig
  oracle: PriceOracleV2
  market: PublicKey
}

export const RemovePriceSourceInstruction = async ({
  config,
  oracle,
  market,
}: RemovePriceSource): Promise<Instructions & Signers> => {
  const data = Buffer.alloc(RemovePriceSourceLayout.span)
  RemovePriceSourceLayout.encode(
    {
      instruction: OracleInstruction.RemovePriceSource,
      market,
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