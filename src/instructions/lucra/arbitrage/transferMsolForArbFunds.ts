import { NATIVE_MINT, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { AccountMeta, Connection, PublicKey } from '@solana/web3.js'
import { MARINADE_MAINNET_CONFIG, SYSTEM_PROGRAM_ID } from '../../../constants'
import { Instructions, Signers } from '../../../types/common'
import {
  Amm,
  Currency,
  LucraConfig,
  LucraInstruction,
} from '../../../types/lucra'
import { buildInstruction, createATAInst } from '../../common'
import { MintFundsForArbLayout } from '../layouts'

export interface TransferMsolForArbFunds {
  config: LucraConfig
  connection: Connection
  payer: PublicKey
  amm: Amm
  lamports: bigint
}

export const transferMsolForArbFundsInstruction = async ({
  config,
  connection,
  payer,
  amm,
  lamports,
}: TransferMsolForArbFunds): Promise<Instructions & Signers> => {
  switch (amm) {
    case Amm.None:
      return transferMsolForArbFunds({
        config,
        connection,
        payer,
        amm,
        lamports,
      })
    case Amm.Orca:
      return transferMsolForArbFundsCheckingOrca({
        config,
        connection,
        payer,
        amm,
        lamports,
      })
    case Amm.Raydium:
      return transferMsolForArbFundsCheckingRaydium({
        config,
        connection,
        payer,
        amm,
        lamports,
      })
  }
}

const transferMsolForArbFunds = async ({
  config,
  connection,
  payer,
  amm,
  lamports,
}: TransferMsolForArbFunds): Promise<Instructions & Signers> => {
  const msolAtaInstruction = await createATAInst(
    connection,
    payer,
    MARINADE_MAINNET_CONFIG.msolMint
  )

  const oracleRewardsAtaInstruction = await createATAInst(
    connection,
    payer,
    config.mint.oracleReward.address
  )

  const data = Buffer.alloc(MintFundsForArbLayout.span)
  MintFundsForArbLayout.encode(
    {
      instruction: LucraInstruction.MintFundsForArb,
      amm,
      source: Currency.Msol,
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
      pubkey: config.account.arbCoffer.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.account.arbCoffer.authority,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.account.arbFund.address,
      isSigner: false,
      isWritable: true,
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
      pubkey: payer,
      isSigner: true,
      isWritable: true,
    },
    {
      pubkey: msolAtaInstruction.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: oracleRewardsAtaInstruction.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: MARINADE_MAINNET_CONFIG.msolMint,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: MARINADE_MAINNET_CONFIG.solLeg,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: MARINADE_MAINNET_CONFIG.msolLeg,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: MARINADE_MAINNET_CONFIG.msolTreasury,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: MARINADE_MAINNET_CONFIG.stateAccount,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: MARINADE_MAINNET_CONFIG.programId,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: SYSTEM_PROGRAM_ID,
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
      ...msolAtaInstruction.instructions,
      ...oracleRewardsAtaInstruction.instructions,
      buildInstruction({ config, keys, data }),
    ],
    signers: [],
  }
}

const transferMsolForArbFundsCheckingOrca = async ({
  config,
  connection,
  payer,
  amm,
  lamports,
}: TransferMsolForArbFunds): Promise<Instructions & Signers> => {
  const msolAtaInstruction = await createATAInst(
    connection,
    payer,
    MARINADE_MAINNET_CONFIG.msolMint
  )

  const oracleRewardsAtaInstruction = await createATAInst(
    connection,
    payer,
    config.mint.oracleReward.address
  )

  const data = Buffer.alloc(MintFundsForArbLayout.span)
  MintFundsForArbLayout.encode(
    {
      instruction: LucraInstruction.MintFundsForArb,
      amm,
      source: Currency.Msol,
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
      pubkey: config.account.arbCoffer.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.account.arbCoffer.authority,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.account.arbFund.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.mint.mata.address,
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
      pubkey: config.oracle.SOL_MATA.orcaSwap,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: payer,
      isSigner: true,
      isWritable: true,
    },
    {
      pubkey: msolAtaInstruction.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: oracleRewardsAtaInstruction.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: MARINADE_MAINNET_CONFIG.msolMint,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: MARINADE_MAINNET_CONFIG.solLeg,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: MARINADE_MAINNET_CONFIG.msolLeg,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: MARINADE_MAINNET_CONFIG.msolTreasury,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: MARINADE_MAINNET_CONFIG.stateAccount,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: MARINADE_MAINNET_CONFIG.programId,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: SYSTEM_PROGRAM_ID,
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
      ...msolAtaInstruction.instructions,
      ...oracleRewardsAtaInstruction.instructions,
      buildInstruction({ config, keys, data }),
    ],
    signers: [],
  }
}

const transferMsolForArbFundsCheckingRaydium = async ({
  config,
  connection,
  payer,
  amm,
  lamports,
}: TransferMsolForArbFunds): Promise<Instructions & Signers> => {
  const msolAtaInstruction = await createATAInst(
    connection,
    payer,
    MARINADE_MAINNET_CONFIG.msolMint
  )

  const oracleRewardsAtaInstruction = await createATAInst(
    connection,
    payer,
    config.mint.oracleReward.address
  )

  const data = Buffer.alloc(MintFundsForArbLayout.span)
  MintFundsForArbLayout.encode(
    {
      instruction: LucraInstruction.MintFundsForArb,
      amm,
      source: Currency.Msol,
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
      pubkey: config.account.arbCoffer.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.account.arbCoffer.authority,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.account.arbFund.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.mint.mata.address,
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
      pubkey: config.oracle.SOL_MATA.ammBaseVault,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: NATIVE_MINT,
      isSigner: false,
      isWritable: true,
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
      pubkey: payer,
      isSigner: true,
      isWritable: true,
    },
    {
      pubkey: msolAtaInstruction.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: oracleRewardsAtaInstruction.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: MARINADE_MAINNET_CONFIG.msolMint,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: MARINADE_MAINNET_CONFIG.solLeg,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: MARINADE_MAINNET_CONFIG.msolLeg,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: MARINADE_MAINNET_CONFIG.msolTreasury,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: MARINADE_MAINNET_CONFIG.stateAccount,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: MARINADE_MAINNET_CONFIG.programId,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: SYSTEM_PROGRAM_ID,
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
      ...msolAtaInstruction.instructions,
      ...oracleRewardsAtaInstruction.instructions,
      buildInstruction({ config, keys, data }),
    ],
    signers: [],
  }
}
