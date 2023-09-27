#!/bin/bash

export KEY_DIR=$1

export PAYER_KEYFILE=$KEY_DIR/LGNDSCoQfZZDZDBtVLgXvmJpqzRjRBcXSxwkSZjp3wN.json

export LOAN_ACCOUNT="Hyv9WwThGHJXfkJTecdRCxtQqyYkL1Zv9iQRTGdJiPgX"
yarn test:integration --testPathPattern lucra/harvestInterest.test.ts --detectOpenHandles