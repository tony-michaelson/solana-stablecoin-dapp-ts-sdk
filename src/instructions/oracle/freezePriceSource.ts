import { AccountMeta, PublicKey } from "@solana/web3.js"
import { Instructions, Signers } from "../../types/common"
import { PriceOracleV2, OracleConfig, OracleInstruction } from "../../types/oracle"
import { buildInstruction } from "../common"
import { FreezePriceSourceLayout } from "./layouts"

export interface FreezePriceSource {
  config: OracleConfig
  oracle: PriceOracleV2
  market: PublicKey
}

export const FreezePriceSourceInstruction = async ({
  config,
  oracle,
  market,
}: FreezePriceSource): Promise<Instructions & Signers> => {
  const data = Buffer.alloc(FreezePriceSourceLayout.span)
  FreezePriceSourceLayout.encode(
    {
      instruction: OracleInstruction.FreezePriceSource,
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