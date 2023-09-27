import { AccountMeta, ComputeBudgetProgram, Connection, PublicKey } from '@solana/web3.js'
import { DetermineInterestLayout } from './layouts'
import { buildInstruction, createATAInst } from '../common'
import { LucraConfig, LucraInstruction } from '../../types/lucra'
import { Instructions } from '../../types/common'
import { TOKEN_PROGRAM_ID } from '../../constants'

export interface DetermineInterest {
  config: LucraConfig
  connection: Connection,
  payer: PublicKey,
  loanAccount: PublicKey
}

export const determineInterestInstruction = async ({
  config,
  connection,
  payer,
  loanAccount,
}: DetermineInterest): Promise<Instructions> => {
  const additionalComputeBudgetInstruction = ComputeBudgetProgram.requestUnits({
    units: 300000,
    additionalFee: 0,
  })

  const oracleRewardsAtaInstruction = await createATAInst(
    connection,
    payer,
    config.mint.oracleReward.address
  )

  const data = Buffer.alloc(DetermineInterestLayout.span)
  DetermineInterestLayout.encode(
    {
      instruction: LucraInstruction.DetermineInterest,
    },
    data
  )

  const keys: AccountMeta[] = [
    {
      pubkey: config.account.state,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: loanAccount,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.oracle.SOL_USDC.account,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.oracle.SOL_USDT.account,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.oracle.SOL_MATA.account,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.account.priceHistory,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: oracleRewardsAtaInstruction.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.mint.oracleReward.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.mint.oracleReward.authority,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: TOKEN_PROGRAM_ID,
      isSigner: false,
      isWritable: false,
    },
  ]

  return {
    instructions: [
      additionalComputeBudgetInstruction,
      ...oracleRewardsAtaInstruction.instructions,
      buildInstruction({ config, keys, data }),
    ],
  }
}
