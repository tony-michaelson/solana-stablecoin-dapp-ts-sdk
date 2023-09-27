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
import { buildInstruction, createATAInst } from '../../common'
import { SellFundsForArbLayout } from '../layouts'

export interface SellMataForArbFunds {
  config: LucraConfig
  connection: Connection
  payer: PublicKey
  amm: Amm
  mata: bigint
}
export const sellMataForArbFundsInstruction = async ({
  config,
  connection,
  payer,
  amm,
  mata,
}: SellMataForArbFunds): Promise<Instructions & Signers> => {
  switch (amm) {
    case Amm.Orca:
      return sellMataForArbFundsUsingOrca({
        config,
        connection,
        payer,
        amm,
        mata,
      })
    case Amm.Raydium:
      return sellMataForArbFundsUsingRaydium({
        config,
        connection,
        payer,
        amm,
        mata,
      })
  }

  return Promise.reject('Invalid amm')
}

const sellMataForArbFundsUsingOrca = async ({
  config,
  connection,
  payer,
  amm,
  mata,
}: SellMataForArbFunds): Promise<Instructions & Signers> => {
  const mataAtaInstruction = await createATAInst(
    connection,
    payer,
    config.mint.mata.address
  )
  const wsolAtaInstruction = await createATAInst(connection, payer, NATIVE_MINT)

  const oracleRewardsAtaInstruction = await createATAInst(
    connection,
    payer,
    config.mint.oracleReward.address
  )

  const data = Buffer.alloc(SellFundsForArbLayout.span)
  SellFundsForArbLayout.encode(
    {
      instruction: LucraInstruction.SellFundsForArb,
      source: Currency.Mata,
      amm,
      lamports: mata,
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
      pubkey: config.account.mataHoldingVault.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.account.mataHoldingVault.authority,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.mint.mata.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: NATIVE_MINT,
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
      pubkey: oracleRewardsAtaInstruction.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: payer,
      isSigner: true,
      isWritable: false,
    },
    {
      pubkey: wsolAtaInstruction.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: mataAtaInstruction.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.oracle.SOL_MATA.orcaSwap,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.oracle.SOL_MATA.orcaAuthority,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.oracle.SOL_MATA.orcaBaseVault,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.oracle.SOL_MATA.orcaQuoteVault,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.oracle.SOL_MATA.orcaPoolMint,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.oracle.SOL_MATA.orcaFeeAccount,
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
      ...mataAtaInstruction.instructions,
      ...wsolAtaInstruction.instructions,
      ...oracleRewardsAtaInstruction.instructions,
      buildInstruction({ config, keys, data }),
    ],
    signers: [],
  }
}

const sellMataForArbFundsUsingRaydium = async ({
  config,
  connection,
  payer,
  amm,
  mata,
}: SellMataForArbFunds): Promise<Instructions & Signers> => {
  const mataAtaInstruction = await createATAInst(
    connection,
    payer,
    config.mint.mata.address
  )
  const wsolAtaInstruction = await createATAInst(connection, payer, NATIVE_MINT)

  const oracleRewardsAtaInstruction = await createATAInst(
    connection,
    payer,
    config.mint.oracleReward.address
  )

  const data = Buffer.alloc(SellFundsForArbLayout.span)
  SellFundsForArbLayout.encode(
    {
      instruction: LucraInstruction.SellFundsForArb,
      source: Currency.Mata,
      amm,
      lamports: mata,
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
      pubkey: config.account.mataHoldingVault.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.account.mataHoldingVault.authority,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.mint.mata.address,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: NATIVE_MINT,
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
      pubkey: config.oracle.SOL_MATA.account,
      isSigner: false,
      isWritable: false,
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
      pubkey: wsolAtaInstruction.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: mataAtaInstruction.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: PROGRAM_IDS.devnet.raydiumV4,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.oracle.SOL_MATA.ammBaseVault,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.oracle.SOL_MATA.ammQuoteVault,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: TOKEN_PROGRAM_ID,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.oracle.SOL_MATA.ammId,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.oracle.SOL_MATA.ammAuthority,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.oracle.SOL_MATA.ammOpenOrders,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.oracle.SOL_MATA.ammTargetOrders,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.oracle.SOL_MATA.market,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: PROGRAM_IDS.devnet.openbook,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.oracle.SOL_MATA.bids,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.oracle.SOL_MATA.asks,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.oracle.SOL_MATA.eventQ,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.oracle.SOL_MATA.baseVault,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.oracle.SOL_MATA.quoteVault,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.oracle.SOL_MATA.vaultSigner,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.mint.oracleReward.address,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.mint.oracleReward.authority,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.mint.stLucra.address,
      isSigner: false,
      isWritable: false,
    },
  ]

  return {
    instructions: [
      ...mataAtaInstruction.instructions,
      ...wsolAtaInstruction.instructions,
      ...oracleRewardsAtaInstruction.instructions,
      buildInstruction({ config, keys, data }),
    ],
    signers: [],
  }
}
