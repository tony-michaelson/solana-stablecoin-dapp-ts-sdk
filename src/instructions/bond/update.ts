import { PublicKey } from "@solana/web3.js"
import { BondConfig, BondInstruction, BondSystem } from "../../types/bond"
import { Instructions, Signers } from "../../types/common"
import { buildInstruction } from "../common"
import { UpdateBondSystemLayout } from "./layouts"

export interface UpdateBondSystemInstruction {
  config: BondConfig,
  bondSystem: BondSystem,
  authority: PublicKey,
  bondYield: number,
  timelock: bigint,
  maxAmountToDistributePerEpoch: bigint,
  maxAllowedToDistributeAtOneTime: bigint,
}

export const updateBondSystemInstruction = async ({
  config,
  bondSystem,
  authority,
  bondYield,
  timelock,
  maxAmountToDistributePerEpoch,
  maxAllowedToDistributeAtOneTime,
}: UpdateBondSystemInstruction): Promise<Instructions & Signers> => {
  const data = Buffer.alloc(UpdateBondSystemLayout.span)
  UpdateBondSystemLayout.encode(
    {
      instruction: BondInstruction.UpdateBondSystem,
      bond_yield: bondYield,
      timelock: timelock,
      max_amount_to_distribute_per_epoch: maxAmountToDistributePerEpoch,
      max_allowed_to_distribute_at_one_time: maxAllowedToDistributeAtOneTime,
    },
    data
  )

  const keys = [
    { pubkey: bondSystem.account, isSigner: false, isWritable: true },
    { pubkey: authority, isSigner: true, isWritable: false},
  ]

  return {
    instructions: [buildInstruction({ config, keys, data })],
    signers: [],
  }
}