import { Connection } from '@solana/web3.js'
import { Lucra } from '.'
import { LUCRA_MAINNET_CONFIG } from './constants'

const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

describe('Lucra', () => {
  it('object is constructed properly', () => {
    const lucra = new Lucra(connection)
    expect(lucra.config.programId).toStrictEqual(LUCRA_MAINNET_CONFIG.programId)
  })
})
