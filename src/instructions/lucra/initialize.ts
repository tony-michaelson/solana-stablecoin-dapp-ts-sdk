import { AccountMeta, Connection, Keypair, PublicKey } from '@solana/web3.js'
import { InitializationLayout } from './layouts'
import {
  buildInstruction,
  createMintInsts,
  createProgramAccountInst,
  createTokenAccountInsts,
} from '../common'
import { FourTransactions } from '../../types/common'
import {
  LucraConfig,
  LucraInstruction,
  LucraProgramSettings,
} from '../../types/lucra'
import { MARINADE_MAINNET_CONFIG } from '../../constants'

export interface Initialize {
  config: LucraConfig
  connection: Connection
  creatorAuthority: PublicKey
  payer: PublicKey
  marinadeState: PublicKey
  settings: LucraProgramSettings
  mataMint?: Keypair
  lucraMint?: Keypair
  oracleRewardMint?: Keypair
  stLucraMint?: Keypair
  msolVaultKP?: Keypair
  arbCofferKP?: Keypair
  rewardVaultKP?: Keypair
  lucraStateAcctKP?: Keypair
  arbStateAcctKP?: Keypair
  lucraStakingAcctKP?: Keypair
  arbFundAcctKP?: Keypair
  wsolHoldingVaultAcctKP?: Keypair
  mataHoldingVaultAcctKP?: Keypair
  lucraHoldingVaultAcctKP?: Keypair
}

export const createInitializeInstruction = async ({
  config,
  connection,
  payer,
  creatorAuthority,
  marinadeState,
  settings,
  mataMint = Keypair.generate(),
  lucraMint = Keypair.generate(),
  stLucraMint = Keypair.generate(),
  oracleRewardMint = Keypair.generate(),
  msolVaultKP = Keypair.generate(),
  arbCofferKP = Keypair.generate(),
  rewardVaultKP = Keypair.generate(),
  lucraStateAcctKP = Keypair.generate(),
  arbStateAcctKP = Keypair.generate(),
  lucraStakingAcctKP = Keypair.generate(),
  arbFundAcctKP = Keypair.generate(),
  wsolHoldingVaultAcctKP = Keypair.generate(),
  mataHoldingVaultAcctKP = Keypair.generate(),
  lucraHoldingVaultAcctKP = Keypair.generate(),
}: Initialize): Promise<FourTransactions> => {
  const lucraStateAccount = await createProgramAccountInst(
    connection,
    lucraStateAcctKP,
    config.accountSize.program.state,
    payer,
    config.programId
  )

  const arbStateAccount = await createProgramAccountInst(
    connection,
    arbStateAcctKP,
    config.accountSize.program.arb,
    payer,
    config.programId
  )

  const lucraStakingAccount = await createProgramAccountInst(
    connection,
    lucraStakingAcctKP,
    config.accountSize.program.staking,
    payer,
    config.programId
  )

  const mataMintInst = await createMintInsts(
    connection,
    payer,
    mataMint,
    'mata',
    6,
    null,
    lucraStateAcctKP.publicKey,
    config.seed.mataMint,
    config.programId
  )

  const lucraMintInst = await createMintInsts(
    connection,
    payer,
    lucraMint,
    'lucra',
    9,
    null,
    lucraStateAcctKP.publicKey,
    config.seed.lucraMint,
    config.programId
  )

  const oracleRewardMintInst = await createMintInsts(
    connection,
    payer,
    oracleRewardMint,
    'oracleReward',
    9,
    null,
    lucraStateAcctKP.publicKey,
    config.seed.oracleRewardMint,
    config.programId
  )

  const stLucraMintInst = await createMintInsts(
    connection,
    payer,
    stLucraMint,
    'stLucra',
    9,
    null,
    lucraStakingAcctKP.publicKey,
    config.seed.stLucraMint,
    config.programId
  )

  const createMsolVault = await createTokenAccountInsts(
    connection,
    payer,
    msolVaultKP,
    'msolVault',
    MARINADE_MAINNET_CONFIG.msolMint,
    [lucraStateAcctKP.publicKey],
    config.programId,
    config.seed.msolVault
  )

  const createRewardVault = await createTokenAccountInsts(
    connection,
    payer,
    rewardVaultKP,
    'rewardVault',
    MARINADE_MAINNET_CONFIG.msolMint,
    [lucraStateAcctKP.publicKey],
    config.programId,
    config.seed.rewardVault
  )

  const createArbFund = await createTokenAccountInsts(
    connection,
    payer,
    arbFundAcctKP,
    'arbFund',
    config.oracle.SOL_MATA.baseMint,
    [arbStateAcctKP.publicKey],
    config.programId,
    config.seed.arbFund
  )

  const createArbCoffer = await createTokenAccountInsts(
    connection,
    payer,
    arbCofferKP,
    'arbCoffer',
    MARINADE_MAINNET_CONFIG.msolMint,
    [lucraStateAcctKP.publicKey],
    config.programId,
    config.seed.arbCoffer
  )

  const createWsolHoldingVault = await createTokenAccountInsts(
    connection,
    payer,
    wsolHoldingVaultAcctKP,
    'wsolHoldingVault',
    config.oracle.SOL_MATA.baseMint,
    [arbStateAcctKP.publicKey],
    config.programId,
    config.seed.wsolHoldingVault
  )

  const createMataHoldingVault = await createTokenAccountInsts(
    connection,
    payer,
    mataHoldingVaultAcctKP,
    'mataHoldingVault',
    mataMint.publicKey,
    [arbStateAcctKP.publicKey],
    config.programId,
    config.seed.mataHoldingVault
  )

  const createLucraHoldingVault = await createTokenAccountInsts(
    connection,
    payer,
    lucraHoldingVaultAcctKP,
    'lucraHoldingVault',
    lucraMint.publicKey,
    [arbStateAcctKP.publicKey],
    config.programId,
    config.seed.lucraHoldingVault
  )

  const data = Buffer.alloc(InitializationLayout.span)
  InitializationLayout.encode(
    {
      instruction: LucraInstruction.Initialize,
      min_deposit: settings.min_deposit,
      collateral_requirement: settings.collateral_requirement,
      epoch: settings.epoch,
      loans_enabled: settings.loans_enabled,
      staking_enabled: settings.staking_enabled,
      arbitrage_enabled: settings.arbitrage_enabled,
      peg_check_enabled: settings.peg_check_enabled,
      maximum_lucra_to_mint: settings.maximum_lucra_to_mint,
      daily_arb_limit: settings.daily_arb_limit,
      maximum_outstanding_mata: settings.maximum_outstanding_mata,
      lcp: settings.lcp,
    },
    data
  )

  const keys: AccountMeta[] = [
    { pubkey: marinadeState, isSigner: false, isWritable: true },
    { pubkey: creatorAuthority, isSigner: true, isWritable: false },
    { pubkey: mataMint.publicKey, isSigner: false, isWritable: false },
    { pubkey: lucraMint.publicKey, isSigner: false, isWritable: true },
    { pubkey: oracleRewardMint.publicKey, isSigner: false, isWritable: false },
    { pubkey: stLucraMint.publicKey, isSigner: false, isWritable: false },
    {
      pubkey: lucraStateAcctKP.publicKey,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: arbStateAcctKP.publicKey,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: msolVaultKP.publicKey, isSigner: false, isWritable: false },
    { pubkey: arbCofferKP.publicKey, isSigner: false, isWritable: false },
    { pubkey: rewardVaultKP.publicKey, isSigner: false, isWritable: false },
    {
      pubkey: lucraStakingAcctKP.publicKey,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: arbFundAcctKP.publicKey, isSigner: false, isWritable: false },
    {
      pubkey: wsolHoldingVaultAcctKP.publicKey,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: mataHoldingVaultAcctKP.publicKey,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: lucraHoldingVaultAcctKP.publicKey,
      isSigner: false,
      isWritable: false,
    },
  ]

  return {
    transaction1: {
      instructions: [
        ...lucraStateAccount.instructions,
        ...arbStateAccount.instructions,
        ...lucraStakingAccount.instructions,
        ...mataMintInst.instructions,
        ...lucraMintInst.instructions,
      ],
      signers: [
        ...lucraStateAccount.signers,
        ...arbStateAccount.signers,
        ...lucraStakingAccount.signers,
        ...mataMintInst.signers,
        ...lucraMintInst.signers,
      ],
      pdas: [
        {
          name: mataMintInst.name,
          pda: mataMintInst.pda,
          bumpSeed: mataMintInst.bumpSeed,
        },
        {
          name: lucraMintInst.name,
          pda: lucraMintInst.pda,
          bumpSeed: lucraMintInst.bumpSeed,
        },
      ],
    },
    transaction2: {
      instructions: [
        ...stLucraMintInst.instructions,
        ...oracleRewardMintInst.instructions,
        ...createRewardVault.instructions,
        ...createArbCoffer.instructions,
      ],
      signers: [
        ...stLucraMintInst.signers,
        ...oracleRewardMintInst.signers,
        ...createRewardVault.signers,
        ...createArbCoffer.signers,
      ],
      pdas: [
        {
          name: oracleRewardMintInst.name,
          pda: oracleRewardMintInst.pda,
          bumpSeed: oracleRewardMintInst.bumpSeed,
        },
        {
          name: createArbCoffer.name,
          pda: createArbCoffer.pda,
          bumpSeed: createArbCoffer.bumpSeed,
        },
        {
          name: createRewardVault.name,
          pda: createRewardVault.pda,
          bumpSeed: createRewardVault.bumpSeed,
        },

        {
          name: stLucraMintInst.name,
          pda: stLucraMintInst.pda,
          bumpSeed: stLucraMintInst.bumpSeed,
        },
      ],
    },
    transaction3: {
      instructions: [
        ...createMsolVault.instructions,
        ...createArbFund.instructions,
        ...createWsolHoldingVault.instructions,
      ],
      signers: [
        ...createMsolVault.signers,
        ...createArbFund.signers,
        ...createWsolHoldingVault.signers,
      ],
      pdas: [
        {
          name: createMsolVault.name,
          pda: createMsolVault.pda,
          bumpSeed: createMsolVault.bumpSeed,
        },
        {
          name: createArbFund.name,
          pda: createArbFund.pda,
          bumpSeed: createArbFund.bumpSeed,
        },
        {
          name: createWsolHoldingVault.name,
          pda: createWsolHoldingVault.pda,
          bumpSeed: createWsolHoldingVault.bumpSeed,
        },
      ],
    },
    transaction4: {
      instructions: [
        ...createLucraHoldingVault.instructions,
        ...createMataHoldingVault.instructions,
        buildInstruction({ config, keys, data }),
      ],
      signers: [
        ...createLucraHoldingVault.signers,
        ...createMataHoldingVault.signers,
      ],
      pdas: [
        {
          name: createLucraHoldingVault.name,
          pda: createLucraHoldingVault.pda,
          bumpSeed: createLucraHoldingVault.bumpSeed,
        },
        {
          name: createMataHoldingVault.name,
          pda: createMataHoldingVault.pda,
          bumpSeed: createMataHoldingVault.bumpSeed,
        },
      ],
    },
  }
}
