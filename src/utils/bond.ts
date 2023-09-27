import { Connection } from '@solana/web3.js'
import Decimal from 'decimal.js'
import { BondQuoteRequest, BondSystem, BondSystemBalance } from '../types/bond'

export function estimateBondValue(r: BondQuoteRequest): Decimal {
  const poolTLV = r.price.base
    .mul(r.lp.tokenBal.base)
    .add(r.price.quote.mul(r.lp.tokenBal.quote))

  const lpTokenPrice = poolTLV.div(r.lp.lpTokenSupply)
  const suppliedValue = lpTokenPrice.mul(r.lpTokens)
  const bondYield = suppliedValue.mul(r.bondYield)
  const totalValue = suppliedValue.add(bondYield)
  const lucra = totalValue.div(r.price.lucra)

  return lucra
}

export async function getBondSystemBalances(
  connection: Connection,
  bondSystem: BondSystem
): Promise<BondSystemBalance> {
  const treasuryBal = await connection.getTokenAccountBalance(
    bondSystem.treasury
  )
  const lpBaseBal = await connection.getTokenAccountBalance(
    bondSystem.lpInfo.baseVault
  )
  const lpQuoteBal = await connection.getTokenAccountBalance(
    bondSystem.lpInfo.quoteVault
  )
  const lpTokenVaultBal = await connection.getTokenAccountBalance(
    bondSystem.vault
  )
  const lpTokenMintSupply = await connection.getTokenSupply(
    bondSystem.lpInfo.lpMint
  )

  return {
    treasury: treasuryBal.value,
    vault: lpTokenVaultBal.value,
    lp: {
      base: lpBaseBal.value,
      quote: lpQuoteBal.value,
      lpMintSupply: lpTokenMintSupply.value,
    },
  }
}
