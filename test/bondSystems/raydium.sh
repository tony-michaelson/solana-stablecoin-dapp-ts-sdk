#!/bin/bash

export KEY_DIR=$1

export PAYER_KEYFILE=$KEY_DIR/LGNDSCoQfZZDZDBtVLgXvmJpqzRjRBcXSxwkSZjp3wN.json
export LUCRA_ATA="2y822z2nxGdx2ir9inTH4y9oa6uSuvUzDAav418dEcUY"
export BOND_TREASURY_LUCRA_SOURCE_ACCOUNT="7xhfnZSsWFqtJDSvjRe4KUFN2kDjm3n1Nc4UZ79yCzxG"

export ALT_PAYER_KEYFILE=$KEY_DIR/LG8jNzPqUxKFQ34wRPHGrsE1gynwd1UHUkjprNX1QAh.json
export ALT_LUCRA_ATA="3kDkpKa38oYKwkFwmJ7dcf6g3SVdUQyTEiqnagxyWC56"

export RAYDIUM_LP_TOKEN_ACCOUNT="Hb8dmUWEWpqZET8Pj4DXCroKTDPZGGEGcqMJf6immbxW"

export BASE_MINT="So11111111111111111111111111111111111111112"
export QUOTE_MINT="84Jh5LVD6R7oCES6tunvsYiBcrN1unTFXmHXjrGBaE7T"
export LP_MINT="EapkuuX8uwMSLfsbY8SA4166rAjotgYTQY521z3T31ti"
export OPEN_ORDERS="3mrMAvQj8AmFR1Ko6ahgVkE7FaLZBpWnat1bAyvuTyGj"

export POOL_STATE_ACCOUNT="7hwQD5YnNtzubWETvRHoRk4sGSXb5FntJWUXw3QJuDKG"
export BASE_VAULT="2s32Q4ghKwh5ch5ZjzjCN1JTRd6pRDYR5PAkQ75h8tNb"
export QUOTE_VAULT="8Z1RtozTATJfKmV4zeeXXk6UmfXbrAK3JToHGqSjF6J9"

yarn test:integration --testPathPattern bondSystems/raydium.test.ts --detectOpenHandles