import { TOKEN_PROGRAM_ID } from "@solana/spl-token"
import { AccountMeta, Connection, Keypair, PublicKey } from "@solana/web3.js"
import { Instructions, Signers } from "../../types/common"
import { LucraConfig } from "../../types/lucra"
import { OracleConfig, OracleInstruction } from "../../types/oracle"
import { buildInstruction, createATAInst, createProgramAccountInst } from "../common"
import { CreateOracleLayout } from "../oracle/layouts"

export interface CreateOracle {
  config: OracleConfig
  lucraConfig: LucraConfig
  connection: Connection
  payer: PublicKey
  baseMint: PublicKey
  quoteMint: PublicKey
  treasury: PublicKey // The treasury needs to be funded before creating the oracle
  authorityAcctKP?: Keypair
  rewardMint?: Keypair
  oracleAcctKP?: Keypair
  expo: number,
  reward_bonus: number,
  algorithm: number,
}

export const createOracleInstruction = async ({
  config,
  lucraConfig,
  connection,
  payer,
  baseMint,
  quoteMint,
  treasury,
  authorityAcctKP = Keypair.generate(),
  rewardMint = Keypair.generate(),
  oracleAcctKP = Keypair.generate(),
  expo,
  reward_bonus,
  algorithm,
}: CreateOracle): Promise<Instructions & Signers> => {
  const oracleAccount = await createProgramAccountInst(
    connection,
    oracleAcctKP,
    config.accountSize.oracle,
    payer,
    config.programId
  )

  const mataAtaInstruction = await createATAInst(
    connection,
    payer,
    lucraConfig.mint.mata.address
  )

  const data = Buffer.alloc(CreateOracleLayout.span)
  CreateOracleLayout.encode(
    {
      instruction: OracleInstruction.CreateOracle,
      expo,
      reward_bonus,
      algorithm,
    },
    data
  )

  const keys: AccountMeta[] = []
  keys.push(
    {
      pubkey: oracleAcctKP.publicKey,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: authorityAcctKP.publicKey,
      isSigner: true,
      isWritable: false,
    },
    {
      pubkey: treasury,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: rewardMint.publicKey,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: baseMint,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: quoteMint,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: payer,
      isSigner: true,
      isWritable: false,
    },
    {
      pubkey: mataAtaInstruction.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: lucraConfig.account.mataHoldingVault.address,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: TOKEN_PROGRAM_ID,
      isSigner: false,
      isWritable: false,
    },
  )

  return {
    instructions: [
      ...oracleAccount.instructions,
      ...mataAtaInstruction.instructions,
      buildInstruction({ config, keys, data }),
    ],
    signers: [
      ...oracleAccount.signers,
      authorityAcctKP,
    ],
  }
}