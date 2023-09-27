#!/bin/bash

export KEY_DIR=$1

export PAYER_KEYFILE=$KEY_DIR/LGNDSCoQfZZDZDBtVLgXvmJpqzRjRBcXSxwkSZjp3wN.json
export ORACLE_KEYFILE=$KEY_DIR/vanities_3/oCcVTmSvCdXQUDyAEqjQTKQjujaMT7ndiUHvfL5pqU1.json

export SERUM_MARKET="AGDQ3J2fGnu12ZZEVbzHm8KHspJ8gNk19udHz2CepkDU"
export RAYDIUM_AMM="4e7xHVoRVDZfG4MhthCshnFfWt3PSgvywVwPo5oZBtgi"
export ORCA_SWAP="DvNRtxXGJjCbSr9xumKRiPPufmAnuAhNqy1kktQboEnu"
export BASE_MINT="SoLAhoNCn98XFxv7jdAeRmNGh9wWvSH4cLsU7LR1Rsx"
export QUOTE_MINT="USDFCbtaLoNWzatEY6yMSStQFpbdREuzq1YCpmahkfo"

yarn test:integration --testPathPattern lucra/createOracle.test.ts --detectOpenHandles