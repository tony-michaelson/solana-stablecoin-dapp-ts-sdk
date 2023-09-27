import { PublicKey } from '@solana/web3.js'
import { BondInstructionLayout } from './layouts'
import { buildInstruction } from '../common'
import { BondConfig, BondInstruction } from '../../types/bond'
import { Instructions, Signers } from '../../types/common'

export interface StartBondSysInstruction {
  config: BondConfig
  bondSystemAcct: PublicKey
  authority: PublicKey
}

export const startBondSystemInstuction = ({
  config,
  bondSystemAcct,
  authority,
}: StartBondSysInstruction): Instructions & Signers => {
  const data = Buffer.alloc(BondInstructionLayout.span)
  BondInstructionLayout.encode(
    {
      instruction: BondInstruction.StartBondSystem,
    },
    data
  )

  const keys = [
    { pubkey: bondSystemAcct, isSigner: false, isWritable: true },
    { pubkey: authority, isSigner: true, isWritable: false },
  ]

  return {
    instructions: [buildInstruction({ config, keys, data })],
    signers: [],
  }
}
