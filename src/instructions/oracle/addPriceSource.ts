import { AccountMeta, PublicKey } from "@solana/web3.js"
import { Instructions, Signers } from "../../types/common"
import { PriceOracleV2, OracleConfig, OracleInstruction } from "../../types/oracle"
import { buildInstruction } from "../common"
import { AddPriceSourceLayout } from "./layouts"

export interface AddPriceSource {
  config: OracleConfig
  oracle: PriceOracleV2
  market: PublicKey
  source: number
  algorithm: number
}

export const AddPriceSourceInstruction = async ({
  config,
  oracle,
  market,
  source,
  algorithm,
}: AddPriceSource): Promise<Instructions & Signers> => {
  const data = Buffer.alloc(AddPriceSourceLayout.span)
  AddPriceSourceLayout.encode(
    {
      instruction: OracleInstruction.AddPriceSource,
      market,
      source,
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