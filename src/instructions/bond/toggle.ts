import { PublicKey } from '@solana/web3.js'
import { BondInstructionLayout } from './layouts'
import { buildInstruction } from '../common'
import { BondConfig, BondInstruction, BondSystem } from '../../types/bond'
import { Instructions, Signers } from '../../types/common'

export interface ToggleBondSystemInstruction {
  config: BondConfig
  bondSystem: BondSystem
  authority: PublicKey
}

export const toggleBondSystemInstruction = async ({
  config,
  bondSystem,
  authority,
}: ToggleBondSystemInstruction): Promise<Instructions & Signers> => {
  const data = Buffer.alloc(BondInstructionLayout.span)
  BondInstructionLayout.encode(
    {
      instruction: BondInstruction.ToggleBondSystem,
    },
    data
  )

  const keys = [
    { pubkey: bondSystem.account, isSigner: false, isWritable: true },
    { pubkey: authority, isSigner: true, isWritable: false },
  ]

  return {
    instructions: [buildInstruction({ config, keys, data })],
    signers: [],
  }
}
