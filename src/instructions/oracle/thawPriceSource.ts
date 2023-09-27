import { AccountMeta, PublicKey } from "@solana/web3.js"
import { Instructions, Signers } from "../../types/common"
import { PriceOracleV2, OracleConfig, OracleInstruction } from "../../types/oracle"
import { buildInstruction } from "../common"
import { ThawPriceSourceLayout } from "./layouts"

export interface ThawPriceSource {
  config: OracleConfig
  oracle: PriceOracleV2
  market: PublicKey
}

export const ThawPriceSourceInstruction = async ({
  config,
  oracle,
  market,
}: ThawPriceSource): Promise<Instructions & Signers> => {
  const data = Buffer.alloc(ThawPriceSourceLayout.span)
  ThawPriceSourceLayout.encode(
    {
      instruction: OracleInstruction.ThawPriceSource,
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