import { AccountMeta, Connection, Keypair, PublicKey } from '@solana/web3.js'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { BuyBondLayout } from './layouts'

import {
  buildInstruction,
  buildTransferAuthorityInst,
  createProgramAccountInst,
} from '../common'
import { BondConfig, BondInstruction, BondSystem } from '../../types/bond'
import { Instructions, Signers, SwapLPInfo } from '../../types/common'

export interface BuyBondInstruction {
  config: BondConfig
  connection: Connection
  bondSystem: BondSystem
  lpTokenAmount: bigint
  tokenAccount: PublicKey
  owner: PublicKey
  payer: PublicKey
  bondAcctKP?: Keypair
}

export const buyBondInstruction = async ({
  config,
  connection,
  bondSystem,
  lpTokenAmount,
  tokenAccount,
  owner,
  payer,
  bondAcctKP = new Keypair(),
}: BuyBondInstruction): Promise<Instructions & Signers> => {
  const data = Buffer.alloc(BuyBondLayout.span)
  BuyBondLayout.encode(
    {
      instruction: BondInstruction.BuyBond,
      lpTokens: BigInt(lpTokenAmount),
    },
    data
  )

  const bondAccountInst = await createProgramAccountInst(
    connection,
    bondAcctKP,
    config.accountSize.bond,
    payer,
    config.programId
  )

  const userTransferAuthorityKP = new Keypair()
  const transferAuthInst = buildTransferAuthorityInst(
    tokenAccount,
    lpTokenAmount,
    userTransferAuthorityKP,
    payer
  )

  let keys: AccountMeta[] = []
  if (bondSystem.lpInfo.openOrders) {
    keys = buyBondRaydiumKeys(
      bondSystem,
      bondAcctKP.publicKey,
      bondSystem.lpInfo.openOrders,
      owner,
      tokenAccount,
      userTransferAuthorityKP.publicKey
    )
  } else {
    keys = buyBondSwapKeys(
      bondSystem,
      bondSystem.lpInfo,
      bondAcctKP.publicKey,
      owner,
      tokenAccount,
      userTransferAuthorityKP.publicKey
    )
  }

  return {
    instructions: [
      transferAuthInst,
      ...bondAccountInst.instructions,
      buildInstruction({ config, keys, data }),
    ],
    signers: [userTransferAuthorityKP, ...bondAccountInst.signers],
  }
}

function buyBondRaydiumKeys(
  bondSystem: BondSystem,
  bondAccount: PublicKey,
  openOrders: PublicKey,
  owner: PublicKey,
  tokenAccount: PublicKey,
  transferAuth: PublicKey
): AccountMeta[] {
  return [
    { pubkey: bondSystem.account, isSigner: false, isWritable: true },
    { pubkey: bondAccount, isSigner: true, isWritable: true },
    { pubkey: bondSystem.vault, isSigner: false, isWritable: true },
    { pubkey: bondSystem.treasury, isSigner: false, isWritable: false },
    { pubkey: bondSystem.treasuryMint, isSigner: false, isWritable: false },
    { pubkey: owner, isSigner: false, isWritable: true },
    { pubkey: tokenAccount, isSigner: false, isWritable: true },
    { pubkey: transferAuth, isSigner: true, isWritable: false },
    {
      pubkey: bondSystem.lpInfo.account,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: openOrders,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: bondSystem.lpInfo.lpMint,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: bondSystem.baseMint,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: bondSystem.quoteMint,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: bondSystem.lpInfo.baseVault,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: bondSystem.lpInfo.quoteVault,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: bondSystem.lpInfo.baseOracle,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: bondSystem.lpInfo.quoteOracle,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: bondSystem.treasuryOracle,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
  ]
}

function buyBondSwapKeys(
  bondSystem: BondSystem,
  swapLPInfo: SwapLPInfo,
  bondAccount: PublicKey,
  owner: PublicKey,
  tokenAccount: PublicKey,
  transferAuth: PublicKey
): AccountMeta[] {
  return [
    { pubkey: bondSystem.account, isSigner: false, isWritable: true },
    { pubkey: bondAccount, isSigner: true, isWritable: true },
    { pubkey: bondSystem.vault, isSigner: false, isWritable: true },
    { pubkey: bondSystem.treasury, isSigner: false, isWritable: false },
    { pubkey: bondSystem.treasuryMint, isSigner: false, isWritable: false },
    { pubkey: owner, isSigner: false, isWritable: true },
    { pubkey: tokenAccount, isSigner: false, isWritable: true },
    { pubkey: transferAuth, isSigner: true, isWritable: false },
    {
      pubkey: swapLPInfo.account,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: swapLPInfo.baseVault,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: swapLPInfo.quoteVault,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: swapLPInfo.lpMint,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: bondSystem.baseMint,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: bondSystem.quoteMint,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: swapLPInfo.baseOracle,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: swapLPInfo.quoteOracle,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: bondSystem.treasuryOracle,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
  ]
}
