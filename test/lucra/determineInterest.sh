#!/bin/bash

export KEY_DIR=$1

export PAYER_KEYFILE=$KEY_DIR/LGNDSCoQfZZDZDBtVLgXvmJpqzRjRBcXSxwkSZjp3wN.json

export LOAN_ACCOUNT="EFJR7k71vVE3Pzj9Gz9EjdfwwPkzKDfWKKZmRm94vEqp"

yarn test:integration --testPathPattern lucra/determineInterest.test.ts --detectOpenHandles