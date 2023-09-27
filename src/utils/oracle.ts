import { Connection } from '@solana/web3.js'
import Decimal from 'decimal.js'
import { loadOracleAccount, OracleAccount } from '../state/oracle'
import { ArbitrageInfo, LucraConfig } from '../types/lucra'

export function getSolUSDPrice(
  solUsdc: OracleAccount,
  solUsdt: OracleAccount
): Decimal {
  const price =
    solUsdc.aggPrice < solUsdt.aggPrice
      ? new Decimal(solUsdc.aggPrice.toString())
      : new Decimal(solUsdt.aggPrice.toString())
  return price
}

export async function getArbitrageInfo(
  connection: Connection,
  config: LucraConfig
): Promise<ArbitrageInfo> {
  const solUsdcOracle = await loadOracleAccount(
    connection,
    config.oracle.SOL_USDC.account,
    config.programId
  )
  const solUsdtOracle = await loadOracleAccount(
    connection,
    config.oracle.SOL_USDT.account,
    config.programId
  )
  const solMataOracle = await loadOracleAccount(
    connection,
    config.oracle.SOL_MATA.account,
    config.programId
  )
  //   const lucraSolOracle = await loadOracleAccount(
  //     connection,
  //     config.oracle.LUCRA_SOL.account
  //   )

  const solUsdPrice = getSolUSDPrice(solUsdcOracle, solUsdtOracle)
  const solMataPrice = new Decimal(solMataOracle.aggPrice.toString())
  const ONE = new Decimal(1)
  const pegValue = ONE.div(solMataPrice).mul(solUsdPrice)
  const status = pegValue < ONE ? 'under' : 'over'
  //   const deepestMataAMM: Amm =
  //     status === 'over'
  //       ? solMataOracle.orcaVol > solMataOracle.raydiumVol
  //         ? Amm.Orca
  //         : Amm.Raydium
  //       : lucraSolOracle.orcaVol > lucraSolOracle.raydiumVol
  //       ? Amm.Orca
  //       : Amm.Raydium

  //   const lpFundSource = status === 'over' ? Currency.Mata : Currency.Lucra

  return {
    pegValue,
    status,
  }
}
