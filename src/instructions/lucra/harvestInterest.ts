import { AccountMeta, Connection, PublicKey } from '@solana/web3.js'
import { HarvestInterestLayout } from './layouts'
import { buildInstruction, createATAInst } from '../common'
import {
  Amm,
  LucraConfig,
  LucraInstruction,
  MarinadeConfig,
} from '../../types/lucra'
import {
  TOKEN_PROGRAM_ID,
  SYSTEM_PROGRAM_ID,
  PROGRAM_IDS,
} from '../../constants'
import { Instructions, Signers } from '../../types/common'
import { getAssociatedTokenAddress, NATIVE_MINT } from '@solana/spl-token'

export interface HarvestInterest {
  config: LucraConfig
  marinade: MarinadeConfig
  connection: Connection
  payer: PublicKey
  loanAccount: PublicKey
  amm: Amm
}

export const harvestInterestInstruction = async ({
  config,
  marinade,
  connection,
  payer,
  loanAccount,
  amm,
}: HarvestInterest): Promise<Instructions & Signers> => {
  switch (amm) {
    case Amm.Orca:
      return harvestInterestUsingOrcaInstruction({
        config,
        marinade,
        connection,
        payer,
        loanAccount,
        amm,
      })
    case Amm.Raydium:
      return harvestInterestUsingRaydiumInstruction({
        config,
        marinade,
        connection,
        payer,
        loanAccount,
        amm,
      })
  }

  return Promise.reject('Invalid amm option supplied')
}

export const harvestInterestUsingOrcaInstruction = async ({
  config,
  marinade,
  payer,
  loanAccount,
  amm,
}: HarvestInterest): Promise<Instructions & Signers> => {
  const mataAtaAddress = await getAssociatedTokenAddress(
    config.mint.mata.address,
    payer,
    false
  )
  const msolAtaAddress = await getAssociatedTokenAddress(
    marinade.msolMint,
    payer,
    false
  )
  const wsolAtaAddress = await getAssociatedTokenAddress(
    NATIVE_MINT,
    payer,
    false
  )
  const data = Buffer.alloc(HarvestInterestLayout.span)
  HarvestInterestLayout.encode(
    {
      instruction: LucraInstruction.HarvestInterest,
      amm,
    },
    data
  )

  const keys: AccountMeta[] = [
    {
      pubkey: config.account.state,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: marinade.stateAccount,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.account.msolVault.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.account.msolVault.authority,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.mint.mata.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: loanAccount,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.oracle.SOL_MATA.account,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: payer,
      isSigner: true,
      isWritable: true,
    },
    {
      pubkey: wsolAtaAddress,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: mataAtaAddress,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: msolAtaAddress,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: marinade.msolMint,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: marinade.solLeg,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: marinade.msolLeg,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: marinade.msolTreasury,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: SYSTEM_PROGRAM_ID,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: marinade.programId,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.oracle.SOL_MATA.orcaSwap,
      isSigner: false,
      isWritable: true,
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
    instructions: [buildInstruction({ config, keys, data })],
    signers: [],
  }
}

export const harvestInterestUsingRaydiumInstruction = async ({
  config,
  marinade,
  connection,
  payer,
  loanAccount,
  amm,
}: HarvestInterest): Promise<Instructions & Signers> => {
  const mataAtaInstruction = await createATAInst(
    connection,
    payer,
    config.mint.mata.address
  )
  const msolAtaInstruction = await createATAInst(
    connection,
    payer,
    marinade.msolMint
  )
  const wsolAtaInstruction = await createATAInst(connection, payer, NATIVE_MINT)

  const data = Buffer.alloc(HarvestInterestLayout.span)
  HarvestInterestLayout.encode(
    {
      instruction: LucraInstruction.HarvestInterest,
      amm,
    },
    data
  )

  const keys: AccountMeta[] = [
    {
      pubkey: config.account.state,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: marinade.stateAccount,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.account.msolVault.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.account.msolVault.authority,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: config.mint.mata.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: loanAccount,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: config.oracle.SOL_MATA.account,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: msolAtaInstruction.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: marinade.msolMint,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: marinade.solLeg,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: marinade.msolLeg,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: marinade.msolTreasury,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: SYSTEM_PROGRAM_ID,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: marinade.programId,
      isSigner: false,
      isWritable: false,
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
  ]

  return {
    instructions: [
      ...mataAtaInstruction.instructions,
      ...msolAtaInstruction.instructions,
      ...wsolAtaInstruction.instructions,
      buildInstruction({ config, keys, data }),
    ],
    signers: [],
  }
}
