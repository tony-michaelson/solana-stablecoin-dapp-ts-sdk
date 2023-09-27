import { BondQuoteRequest } from '../types/bond'
import { estimateBondValue } from './bond'
import Decimal from 'decimal.js'

describe('fn estimatedBondValue', () => {
  it('Decimal.js handles decimal values', () => {
    const number = new Decimal(1.5205420543207)
    expect(number.toString()).toStrictEqual('1.5205420543207')
  })

  it('Saber LP Token bond 100 LP Tokens', () => {
    const r1: BondQuoteRequest = {
      lpTokens: new Decimal(100),
      bondYield: new Decimal(0.09),
      lp: {
        lpTokenSupply: new Decimal(2000),
        tokenBal: {
          base: new Decimal(1000),
          quote: new Decimal(1000),
        },
      },
      price: {
        lucra: new Decimal(124.748595),
        base: new Decimal(1.0000005),
        quote: new Decimal(1.0000005),
      },
    }
    const lucra = estimateBondValue(r1)
    expect(lucra.toString()).toStrictEqual('0.8737577725825288854')
  })

  it('Saber LP Token bond 500 LP Tokens', () => {
    const r1: BondQuoteRequest = {
      lpTokens: new Decimal(500),
      bondYield: new Decimal(0.09),
      lp: {
        lpTokenSupply: new Decimal(2000),
        tokenBal: {
          base: new Decimal(1000),
          quote: new Decimal(1000),
        },
      },
      price: {
        lucra: new Decimal(124.748595),
        base: new Decimal(1.0000005),
        quote: new Decimal(1.0000005),
      },
    }
    const lucra = estimateBondValue(r1)
    expect(lucra.toString()).toStrictEqual('4.368788862912644427')
  })

  it('Saber LP Token bond Max LP Tokens', () => {
    const r1: BondQuoteRequest = {
      lpTokens: new Decimal(2000),
      bondYield: new Decimal(0.09),
      lp: {
        lpTokenSupply: new Decimal(2000),
        tokenBal: {
          base: new Decimal(1000),
          quote: new Decimal(1000),
        },
      },
      price: {
        lucra: new Decimal(124.748595),
        base: new Decimal(1.0000005),
        quote: new Decimal(1.0000005),
      },
    }
    const lucra = estimateBondValue(r1)
    expect(lucra.toString()).toStrictEqual('17.475155451650577708')
  })

  it('Orca LP Token bond max LP tokens', () => {
    const r1: BondQuoteRequest = {
      lpTokens: new Decimal(1479520479),
      bondYield: new Decimal(0.09),
      lp: {
        lpTokenSupply: new Decimal(1479520479),
        tokenBal: {
          base: new Decimal(1.479520479),
          quote: new Decimal(1.48),
        },
      },
      price: {
        lucra: new Decimal(125.19041),
        base: new Decimal(125.19041),
        quote: new Decimal(125.19041),
      },
    }
    const lucra = estimateBondValue(r1)
    expect(lucra.toString()).toStrictEqual('3.22587732211')
  })

  it('Orca LP Token bond 1 LP token', () => {
    const r1: BondQuoteRequest = {
      lpTokens: new Decimal(1),
      bondYield: new Decimal(0.09),
      lp: {
        lpTokenSupply: new Decimal(1479520479),
        tokenBal: {
          base: new Decimal(1.479520479),
          quote: new Decimal(1.48),
        },
      },
      price: {
        lucra: new Decimal(125.19041),
        base: new Decimal(125.19041),
        quote: new Decimal(125.19041),
      },
    }
    const lucra = estimateBondValue(r1)
    expect(lucra.toFixed(16).toString()).toStrictEqual('0.0000000021803533')
  })
})
