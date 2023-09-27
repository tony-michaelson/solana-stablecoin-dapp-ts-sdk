import { PriceLayout, PriceStructure } from "./layout"

describe('Price', () => {
  const price: PriceStructure = {
    expo: 6,
    price: BigInt('40001649'),
    vol: BigInt('100000'),
    slot: BigInt('165174130'),
  }

  const encodedData = Buffer.from(
    new Uint8Array([

    ])
  )

  it('encodes an price object properly', () => {
    const encoded = Buffer.alloc(PriceLayout.span)
    PriceLayout.encode(price, encoded)
    expect(encoded).toStrictEqual(encodedData)
  })

  it('decodes a Uint8Array properly', () => {
    const decoded = PriceLayout.decode(encodedData)

    expect(decoded.expo.toString()).toStrictEqual(
      price.expo.toString()
    )
    expect(decoded.price.toString()).toStrictEqual(
      price.price.toString()
    )
    expect(decoded.vol.toString()).toStrictEqual(
      price.vol.toString()
    )
    expect(decoded.slot.toString()).toStrictEqual(
      price.slot.toString()
    )
  })
})