import { NATIVE_MINT, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { AccountMeta, Connection, PublicKey } from '@solana/web3.js'
import { MARINADE_MAINNET_CONFIG } from '../../../constants'
import { Instructions, Signers } from '../../../types/common'
import {
  Amm,
  Currency,
  LucraConfig,
  LucraInstruction,
} from '../../../types/lucra'
import { buildInstruction, createATAInst } from '../../common'
import { MintFundsForArbLayout } from '../layouts'

export interface MintLucraForArbFunds {
  config: LucraConfig
  connection: Connection
  payer: PublicKey
  amm: Amm
  lamports: bigint
}

export const mintLucraForArbFundsInstruction = async ({
  config,
  connection,
  payer,
  amm,
  lamports,
}: MintLucraForArbFunds): Promise<Instructions & Signers> => {
  switch (amm) {
    case Amm.Orca:
      return mintLucraForArbFundsUsingOrcaInstruction({
        config,
        connection,
        payer,
        amm,
        lamports,
      })
    case Amm.Raydium:
      return mintLucraForArbFundsUsingRaydiumInstruction({
        config,
        connection,
        payer,
        amm,
        lamports,
      })
  }

  return Promise.reject('Invalid amm')
}

const mintLucraForArbFundsUsingOrcaInstruction = async ({
  config,
  connection,
  payer,
  amm,
  lamports,
}: MintLucraForArbFunds): Promise<Instructions & Signers> => {
  const data = Buffer.alloc(MintFundsForArbLayout.span)
  MintFundsForArbLayout.encode(
    {
      instruction: LucraInstruction.MintFundsForArb,
      amm: amm,
      source: Currency.Lucra,
      lamports: lamports,
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
      pubkey: config.account.arbCoffer.address,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.account.lucraHoldingVault.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.mint.lucra.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.mint.lucra.authority,
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
      pubkey: config.mint.mata.address,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.oracle.SOL_MATA.ammOpenOrders,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.oracle.SOL_MATA.ammBaseVault,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.oracle.SOL_MATA.ammQuoteVault,
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
      pubkey: MARINADE_MAINNET_CONFIG.stateAccount,
      isSigner: false,
      isWritable: false,
    },

    {
      pubkey: MARINADE_MAINNET_CONFIG.programId,
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
      ...oracleRewardsAtaInstruction.instructions,
      buildInstruction({ config, keys, data }),
    ],
    signers: [],
  }
}

const mintLucraForArbFundsUsingRaydiumInstruction = async ({
  config,
  connection,
  payer,
  amm,
  lamports,
}: MintLucraForArbFunds): Promise<Instructions & Signers> => {
  const data = Buffer.alloc(MintFundsForArbLayout.span)
  MintFundsForArbLayout.encode(
    {
      instruction: LucraInstruction.MintFundsForArb,
      amm: amm,
      source: Currency.Lucra,
      lamports: lamports,
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
      pubkey: config.account.arbCoffer.address,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.account.lucraHoldingVault.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.mint.lucra.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.mint.lucra.authority,
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
      pubkey: config.mint.mata.address,
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
      pubkey: config.oracle.SOL_MATA.orcaBaseVault,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.oracle.SOL_MATA.orcaQuoteVault,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.oracle.SOL_MATA.orcaSwap,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: oracleRewardsAtaInstruction.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: MARINADE_MAINNET_CONFIG.stateAccount,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: MARINADE_MAINNET_CONFIG.programId,
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
      ...oracleRewardsAtaInstruction.instructions,
      buildInstruction({ config, keys, data }),
    ],
    signers: [],
  }
}
