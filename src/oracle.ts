import { Connection, PublicKey } from "@solana/web3.js"
import { LUCRA_MAINNET_CONFIG, ORACLE_MAINNET_CONFIG } from "./constants"
import { loadOracleAccountV2, OracleV2Account } from "./state/oracleV2"
import { OracleConfig, Oracles, SourceType } from "./types/oracle"
import * as instructions from './instructions/oracle'
import { Instructions, Signers } from "./types/common"
import { LucraConfig } from "./types/lucra"

export class Oracle {
  public config: OracleConfig
  public lucraConfig: LucraConfig
  public connection: Connection
  constructor(
    connection: Connection,
    config?: OracleConfig,
    lucraConfig?: LucraConfig,
  ) {
    this.config = config || ORACLE_MAINNET_CONFIG
    this.lucraConfig = lucraConfig || LUCRA_MAINNET_CONFIG
    this.connection = connection
  }

  public async getOracleAccount(account: PublicKey): Promise<OracleV2Account> {
    return loadOracleAccountV2(this.connection, account, this.config.programId)
  }

  public async createOracle(
    args: Pick<
    instructions.CreateOracle,
    | 'payer'
    | 'baseMint'
    | 'quoteMint'
    | 'treasury'
    | 'authorityAcctKP'
    | 'rewardMint'
    | 'oracleAcctKP'
    | 'expo'
    | 'reward_bonus'
    | 'algorithm'
    >
  ): Promise<Instructions & Signers> {
    return instructions.createOracleInstruction({
      config: this.config,
      lucraConfig: this.lucraConfig,
      connection: this.connection,
      ...args,
    })
  }

  public async updateOracle(
    oracleName: Oracles,
    args: Pick<instructions.UpdateOracle, | 'algorithm' | 'rewardBonus'>,
  ): Promise<Instructions & Signers> {
    return instructions.updateOracleInstruction({
      config: this.config,
      oracle: this.config.oracles[oracleName],
      ...args,
    })
  }

  public async freezeOracle(
    oracleName: Oracles,
  ): Promise<Instructions & Signers> {
    return instructions.freezeOracleInstruction({
      config: this.config,
      oracle: this.config.oracles[oracleName],
    })
  }

  public async thawOracle(
    oracleName: Oracles,
  ): Promise<Instructions & Signers> {
    return instructions.ThawOracleInstruction({
      config: this.config,
      oracle: this.config.oracles[oracleName],
    })
  }

  public async closeOracle(
    oracleName: Oracles,
  ): Promise<Instructions & Signers> {
    return instructions.CloseOracleInstruction({
      config: this.config,
      oracle: this.config.oracles[oracleName],
    })
  }

  public async addPriceSource(
    oracleName: Oracles,
    args: Pick<
    instructions.AddPriceSource, 
    'algorithm'
    | 'market'
    | 'source'
    >
  ): Promise<Instructions & Signers> {
    return instructions.AddPriceSourceInstruction({
      config: this.config,
      oracle: this.config.oracles[oracleName],
      ...args,
    })
  }

  public async freezePriceSource(
    oracleName: Oracles,
    args: Pick<instructions.AddPriceSource, 'market'>
  ): Promise<Instructions & Signers> {
    return instructions.FreezePriceSourceInstruction({
      config: this.config,
      oracle: this.config.oracles[oracleName],
      ...args,
    })
  }

  public async thawPriceSource(
    oracleName: Oracles,
    args: Pick<instructions.AddPriceSource, 'market'>
  ): Promise<Instructions & Signers> {
    return instructions.ThawPriceSourceInstruction({
      config: this.config,
      oracle: this.config.oracles[oracleName],
      ...args,
    })
  }

  public async removePriceSource(
    oracleName: Oracles,
    args: Pick<instructions.AddPriceSource, 'market'>
  ): Promise<Instructions & Signers> {
    return instructions.RemovePriceSourceInstruction({
      config: this.config,
      oracle: this.config.oracles[oracleName],
      ...args,
    })
  }

  public async updateAggPrice(
    oracleName: Oracles,
    args: Pick<instructions.UpdateAggPrice, 'payer'>
  ): Promise<Instructions & Signers> {
    return instructions.updateAggPriceInstruction({
      config: this.config,
      connection: this.connection,
      oracle: this.config.oracles[oracleName],
      ...args,
    })
  }

  public async redeemReward(
    oracleName: Oracles,
    args: Pick<instructions.RedeemReward, 'payer' | 'amount'>
  ): Promise<Instructions & Signers> {
    return instructions.redeemRewardInstruction({
      config: this.config,
      connection: this.connection,
      oracle: this.config.oracles[oracleName],
      ...args,
    })
  }

  public async updatePrice(
    oracleName: Oracles,
    source: SourceType,
    args: Pick<instructions.UpdatePrice, 'payer'>
  ): Promise<Instructions> {
    switch(source) {
      case SourceType.Serum: return instructions.updateSerumPrice({
        config: this.config,
        connection: this.connection,
        oracle: this.config.oracles[oracleName],
        ...args,
      })
      case SourceType.Raydium: return instructions.updateRaydiumPrice({
        config: this.config,
        connection: this.connection,
        oracle: this.config.oracles[oracleName],
        ...args,
      })
      case SourceType.Orca: return instructions.updateOrcaPrice({
        config: this.config,
        connection: this.connection,
        oracle: this.config.oracles[oracleName],
        ...args,
      })
      case SourceType.Whirlpool: return instructions.updateWhirlpoolPrice({
        config: this.config,
        connection: this.connection,
        oracle: this.config.oracles[oracleName],
        ...args,
      })
      default: return { instructions: [] }
    }
  }
}