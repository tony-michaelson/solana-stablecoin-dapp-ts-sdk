import { NATIVE_MINT, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { AccountMeta, Connection, PublicKey } from '@solana/web3.js'
import { Instructions, Signers } from '../../../types/common'
import {
  Amm,
  Currency,
  LucraConfig,
  LucraInstruction,
} from '../../../types/lucra'
import { buildInstruction, createATAInst } from '../../common'
import { MintFundsForArbLayout } from '../layouts'

export interface MintMataForArbFunds {
  config: LucraConfig
  connection: Connection
  payer: PublicKey
  amm: Amm
  mata: bigint
}

export const mintMataForArbFundsInstruction = async ({
  config,
  connection,
  payer,
  amm,
  mata,
}: MintMataForArbFunds): Promise<Instructions & Signers> => {
  switch (amm) {
    case Amm.Orca:
      return mintMataForArbFundsUsingOrcaInstruction({
        config,
        connection,
        payer,
        amm,
        mata,
      })
    case Amm.Raydium:
      return mintMataForArbFundsUsingRaydiumInstruction({
        config,
        connection,
        payer,
        amm,
        mata,
      })
  }

  return Promise.reject('Invalid amm')
}

const mintMataForArbFundsUsingOrcaInstruction = async ({
  config,
  connection,
  payer,
  amm,
  mata,
}: MintMataForArbFunds): Promise<Instructions & Signers> => {
  const data = Buffer.alloc(MintFundsForArbLayout.span)
  MintFundsForArbLayout.encode(
    {
      instruction: LucraInstruction.MintFundsForArb,
      amm: amm,
      source: Currency.Mata,
      lamports: mata,
    },
    data
  )

  const oracleRewardsAtaInstruction = await createATAInst(
    connection,
    payer,
    config.mint.oracleReward.address
  )

  const keys: AccountMeta[] = [
    {
      pubkey: config.account.state,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.account.arb,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.account.arbFund.address,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.account.mataHoldingVault.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.mint.mata.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.mint.mata.authority,
      isSigner: false,
      isWritable: false,
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
      pubkey: config.oracle.LUCRA_SOL.account,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.oracle.SOL_MATA.account,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.oracle.SOL_MATA.orcaSwap,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.oracle.SOL_MATA.orcaBaseVault,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: NATIVE_MINT,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.oracle.SOL_MATA.orcaQuoteVault,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: oracleRewardsAtaInstruction.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: TOKEN_PROGRAM_ID,
      isSigner: false,
      isWritable: false,
    },
  ]

  return {
    instructions: [
      ...oracleRewardsAtaInstruction.instructions,
      buildInstruction({ config, keys, data }),
    ],
    signers: [],
  }
}

const mintMataForArbFundsUsingRaydiumInstruction = async ({
  config,
  connection,
  payer,
  amm,
  mata,
}: MintMataForArbFunds): Promise<Instructions & Signers> => {
  const data = Buffer.alloc(MintFundsForArbLayout.span)
  MintFundsForArbLayout.encode(
    {
      instruction: LucraInstruction.MintFundsForArb,
      amm: amm,
      source: Currency.Mata,
      lamports: mata,
    },
    data
  )

  const oracleRewardsAtaInstruction = await createATAInst(
    connection,
    payer,
    config.mint.oracleReward.address
  )

  const keys: AccountMeta[] = [
    {
      pubkey: config.account.state,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.account.arb,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.account.arbFund.address,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.account.mataHoldingVault.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.mint.mata.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.mint.mata.authority,
      isSigner: false,
      isWritable: false,
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
      pubkey: config.oracle.LUCRA_SOL.account,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.oracle.SOL_MATA.account,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.oracle.SOL_MATA.ammBaseVault,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: NATIVE_MINT,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.oracle.SOL_MATA.ammQuoteVault,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.oracle.SOL_MATA.ammOpenOrders,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.oracle.SOL_MATA.ammId,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: oracleRewardsAtaInstruction.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: TOKEN_PROGRAM_ID,
      isSigner: false,
      isWritable: false,
    },
  ]

  return {
    instructions: [
      ...oracleRewardsAtaInstruction.instructions,
      buildInstruction({ config, keys, data }),
    ],
    signers: [],
  }
}
