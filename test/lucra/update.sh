#!/bin/bash

export KEY_DIR=$1

export PAYER_KEYFILE=$KEY_DIR/LGNDSCoQfZZDZDBtVLgXvmJpqzRjRBcXSxwkSZjp3wN.json

export PROGRAM_STATE_ACCT="6QcoovHrS51wwSWEwJe9wF2dGb3eAZmu2TQDRpWfW3Vr"
export ARB_STATE_ACCT="CQxf3Wt4mh3MQNB8Q7rH972waE5PPdJd1ZboqnFyZGcs"

yarn test:integration --testPathPattern lucra/update.test.ts --detectOpenHandles