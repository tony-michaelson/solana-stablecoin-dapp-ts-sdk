import { NATIVE_MINT, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { AccountMeta, Connection, PublicKey } from '@solana/web3.js'
import { PROGRAM_IDS } from '../../../constants'
import { Instructions, Signers } from '../../../types/common'
import {
  Amm,
  Currency,
  LucraConfig,
  LucraInstruction,
} from '../../../types/lucra'
import { createATAInst, buildInstruction } from '../../common'
import { BuyBurnForArbLayout } from '../layouts'

export interface BuyBurnLucra {
  config: LucraConfig
  connection: Connection
  payer: PublicKey
  amm: Amm
  lamports: bigint
}

export const buyBurnLucraInstruction = async ({
  config,
  connection,
  payer,
  amm,
  lamports,
}: BuyBurnLucra): Promise<Instructions & Signers> => {
  switch (amm) {
    case Amm.Orca:
      return spendArbFundsForLucraUsingOrca({
        config,
        connection,
        payer,
        amm,
        lamports,
      })
    case Amm.Raydium:
      return spendArbFundsForLucraUsingRaydium({
        config,
        connection,
        payer,
        amm,
        lamports,
      })
  }

  return Promise.reject('Invalid amm')
}

const spendArbFundsForLucraUsingOrca = async ({
  config,
  connection,
  payer,
  amm,
  lamports,
}: BuyBurnLucra): Promise<Instructions & Signers> => {
  const lucraAtaInstruction = await createATAInst(
    connection,
    payer,
    config.mint.lucra.address
  )
  const wsolAtaInstruction = await createATAInst(connection, payer, NATIVE_MINT)

  const oracleRewardsAtaInstruction = await createATAInst(
    connection,
    payer,
    config.mint.oracleReward.address
  )

  const data = Buffer.alloc(BuyBurnForArbLayout.span)
  BuyBurnForArbLayout.encode(
    {
      instruction: LucraInstruction.BuyBurnForArb,
      source: Currency.Lucra,
      amm,
      lamports,
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
      pubkey: config.account.arb,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.account.arbFund.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.account.arbFund.authority,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.account.wsolHoldingVault.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.mint.lucra.address,
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
      pubkey: config.oracle.LUCRA_SOL.account,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: payer,
      isSigner: true,
      isWritable: false,
    },
    {
      pubkey: lucraAtaInstruction.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: wsolAtaInstruction.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: oracleRewardsAtaInstruction.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.oracle.LUCRA_SOL.orcaSwap,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.oracle.LUCRA_SOL.orcaAuthority,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.oracle.LUCRA_SOL.orcaBaseVault,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.oracle.LUCRA_SOL.orcaQuoteVault,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.oracle.LUCRA_SOL.orcaPoolMint,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.oracle.LUCRA_SOL.orcaFeeAccount,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: PROGRAM_IDS.devnet.orca,
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
      ...lucraAtaInstruction.instructions,
      ...wsolAtaInstruction.instructions,
      ...oracleRewardsAtaInstruction.instructions,
      buildInstruction({ config, keys, data }),
    ],
    signers: [],
  }
}

const spendArbFundsForLucraUsingRaydium = async ({
  config,
  connection,
  payer,
  amm,
  lamports,
}: BuyBurnLucra): Promise<Instructions & Signers> => {
  const lucraAtaInstruction = await createATAInst(
    connection,
    payer,
    config.mint.lucra.address
  )
  const wsolAtaInstruction = await createATAInst(connection, payer, NATIVE_MINT)

  const oracleRewardsAtaInstruction = await createATAInst(
    connection,
    payer,
    config.mint.oracleReward.address
  )

  const data = Buffer.alloc(BuyBurnForArbLayout.span)
  BuyBurnForArbLayout.encode(
    {
      instruction: LucraInstruction.BuyBurnForArb,
      source: Currency.Lucra,
      amm,
      lamports,
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
      pubkey: config.account.arb,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.account.arbFund.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.account.arbFund.authority,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.mint.lucra.address,
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
      pubkey: config.oracle.LUCRA_SOL.account,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.account.wsolHoldingVault.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: oracleRewardsAtaInstruction.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: payer,
      isSigner: true,
      isWritable: true,
    },
    {
      pubkey: lucraAtaInstruction.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: wsolAtaInstruction.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: PROGRAM_IDS.devnet.raydiumV4,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.oracle.LUCRA_SOL.ammBaseVault,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.oracle.LUCRA_SOL.ammQuoteVault,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: TOKEN_PROGRAM_ID,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.oracle.LUCRA_SOL.ammId,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.oracle.LUCRA_SOL.ammAuthority,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.oracle.LUCRA_SOL.ammOpenOrders,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.oracle.LUCRA_SOL.ammTargetOrders,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.oracle.LUCRA_SOL.market,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: PROGRAM_IDS.devnet.openbook,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.oracle.LUCRA_SOL.bids,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.oracle.LUCRA_SOL.asks,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.oracle.LUCRA_SOL.eventQ,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.oracle.LUCRA_SOL.baseVault,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.oracle.LUCRA_SOL.quoteVault,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.oracle.LUCRA_SOL.vaultSigner,
      isSigner: false,
      isWritable: false,
    },
  ]

  return {
    instructions: [
      ...lucraAtaInstruction.instructions,
      ...wsolAtaInstruction.instructions,
      ...oracleRewardsAtaInstruction.instructions,
      buildInstruction({ config, keys, data }),
    ],
    signers: [],
  }
}
