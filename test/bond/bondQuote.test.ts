import { Connection } from '@solana/web3.js'
import Decimal from 'decimal.js'
import { Bond } from '../../src/bond'

const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

describe('getBondQuote', () => {
  const bondProgram = new Bond(connection)

  it('Gets a quote', async () => {
    const quote = await bondProgram.getQuote(
      'SOL_MATA_RAYDIUM',
      new Decimal(1000)
    )
    expect(quote.greaterThan(0)).toBeTruthy()
  })

  it('Build a request', async () => {
    const r = await bondProgram.buildQuoteRequest(
      bondProgram.getBondSystem('SOL_MATA_RAYDIUM'),
      new Decimal(1000)
    )
    expect(r.lp.lpTokenSupply.greaterThan(0)).toBeTruthy()
    expect(r.lp.tokenBal.base.greaterThan(0)).toBeTruthy()
    expect(r.lp.tokenBal.quote.greaterThan(0)).toBeTruthy()
    expect(r.bondYield.greaterThan(0)).toBeTruthy()
    expect(r.price.lucra.greaterThan(0)).toBeTruthy()
    expect(r.price.base.greaterThan(0)).toBeTruthy()
    expect(r.price.quote.greaterThan(0)).toBeTruthy()
  })
})
