import { PublicKey } from '@solana/web3.js'
import { BondInstructionLayout } from './layouts'
import { buildInstruction } from '../common'
import { BondConfig, BondInstruction } from '../../types/bond'
import { Instructions, Signers } from '../../types/common'

export interface TransferBondInstruction {
  config: BondConfig
  bond: PublicKey
  oldOwner: PublicKey
  newOwner: PublicKey
}

export const transferBondInstruction = async ({
  config,
  bond,
  oldOwner,
  newOwner,
}: TransferBondInstruction): Promise<Instructions & Signers> => {
  const data = Buffer.alloc(BondInstructionLayout.span)
  BondInstructionLayout.encode(
    {
      instruction: BondInstruction.TransferBond,
    },
    data
  )

  const keys = [
    { pubkey: bond, isSigner: false, isWritable: true },
    { pubkey: oldOwner, isSigner: false, isWritable: false },
    { pubkey: newOwner, isSigner: false, isWritable: false },
  ]

  return {
    instructions: [buildInstruction({ config, keys, data })],
    signers: [],
  }
}
