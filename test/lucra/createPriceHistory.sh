#!/bin/bash

export KEY_DIR=$1

export PAYER_KEYFILE=$KEY_DIR/LGNDSCoQfZZDZDBtVLgXvmJpqzRjRBcXSxwkSZjp3wN.json
export PRICE_HISTORY_KEYFILE=$KEY_DIR/phJLWMGGf5vyrcU6T7AcrC8SV4SkhyX2hfCmTxBkCt2.json

yarn test:integration --testPathPattern lucra/createPriceHistory.test.ts --detectOpenHandles