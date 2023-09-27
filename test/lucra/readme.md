# Devnet Testing Accounts

```
$ lucra-cli lucra initialize 1 150 100 1 5 0 0 0
programStateKey: 5WL2r7AfqpzG9arQaQTCkpQW1W8ax3ixjorKyPgrmaNU
programStakeKey: 2NDYUCZbyy89bSAFuo3pzfCxPB4JyQPgv8tfvs8dHZpT
msolAccountKey: HLQZkdxrHpZQXQikSX2JTTNvdD2t57jZA52GezvEbV7S
stakeTreasuryAccountKey: RUm2QncA6QcHTcGEPjZjM3DxxBca8Nm1xGCGC2g67F7
mintStableKey: A7CqJ8UazAu3av3jBwtzA1PQKTKAVDSbQzTdLuMvocQD
mintProtocolKey: DNvM98Sr19UUdKXC4PxZic5X6LD7qUiuUY2Rn4ncd726
mintStakedProtocolKey: BR8MeDTuXjBkXZmu9TBMSLPZZcDdAKS4U15jq9UTCoPL
----------------------------------------
Creator Authority:      LGNDSCoQfZZDZDBtVLgXvmJpqzRjRBcXSxwkSZjp3wN
----------------------------------------
Lucra Mint Created: DNvM98Sr19UUdKXC4PxZic5X6LD7qUiuUY2Rn4ncd726
Created Stake Treasury Token Account: RUm2QncA6QcHTcGEPjZjM3DxxBca8Nm1xGCGC2g67F7
Minted  200000000000000000  tokens to: RUm2QncA6QcHTcGEPjZjM3DxxBca8Nm1xGCGC2g67F7
txid: 2c4XHVmxYunRcdkgDzyCPbJFwgrpPYXmsoSeba5WJskXe1YS6D17EwHRhUaprL82xvDQEsDuZgFj3uyj8kbbmVt8
Created Team Token Account: 9Q9Ex3ePcgWYDABCGpNi1i7PMHnRuBFpCmXBKEeGh4bd
Minted  150000000000000000  tokens to: 9Q9Ex3ePcgWYDABCGpNi1i7PMHnRuBFpCmXBKEeGh4bd
txid: LFvjMA2d7LG2FbmF3LarVHLiYSgw9Vu2hRoAXVduSDzN6oR1FfrfN4u977KCSU6nFo4xY4juGCc7svncK2Cg2GW
Created Treasury Token Account: DECUqXJdkBtNFwrCw2VdSLwHMXLbHbRWdJLgbNw3HogL
Minted  150000000000000000  tokens to: DECUqXJdkBtNFwrCw2VdSLwHMXLbHbRWdJLgbNw3HogL
txid: EE5PXj25cguubDiGcEWMqFuHqgn1pxL7HVwii6RJbQa9HQE9c6Rv7S17HzD9szXTg9rvXcJbkggfti5NUgg11gW
Created LP Bonds Token Account: ACj1qJS44BgiAHz8QKx3ffgDUb5zbvvbiQuv31E8ynHL
Minted  500000000000000000  tokens to: ACj1qJS44BgiAHz8QKx3ffgDUb5zbvvbiQuv31E8ynHL
txid: VUTXVfMr3NKJDv2YmnVg3nDm4SpXDcK65tP1jVrfQxEFu6E9k6SHMBUHwaYegoddSzhuvt363SHAKTS8izrW5Lm
Mint Authority Is To Be Transferred to ProgramId: LUCRAvoUA2YJsZ3RcgL2gQLCF6jJTJjbjMV18zNmRaC
Token Account Owner Is To Be Transferred to ProgramId: LUCRAvoUA2YJsZ3RcgL2gQLCF6jJTJjbjMV18zNmRaC
success 5hu8H8CTaHdmyBPUfSkkZrNWXAmjZBgnFRvfX9kbfQc1uyBYxtDU8q2EWDnZeDChLfSUFxX1nt6vewBGuTVJ766w
success 2eGEQYWbLkntALkvgnPkbi54Fn3tnLjvg5kE4yTEBTvXgYpjLit5Yan1m1xjhXZUgysRdbs2CsAPVPWXmF7b887q
```

```json
[
  {
    "name": "glyph",
    "pda": "C25HCi3aPknEdUhi9GiLnH8bS3p9Z5V3aYp14E1ue1nM",
    "bumpSeed": 255
  },
  {
    "name": "lucra",
    "pda": "C9T7qvUcANnk7iZKnVS8mmLu12nyms1urrW6jN5fRM8w",
    "bumpSeed": 255
  },
  {
    "name": "stLucra",
    "pda": "a7QGCV6A24qYLNtCk9H8sPZDXhfsGCG8gCCht8NyyUh",
    "bumpSeed": 252
  },
  {
    "name": "msolVault",
    "pda": "CLK7pj6SfGvDKQWCrDR6wXkiEEBAnMDoNsB6zegnn66e",
    "bumpSeed": 253
  },
  {
    "name": "stakingTreasury",
    "pda": "6n4oNi4EDRe2bzS8BiC1G7wxhACbiztikD39b8f4is35",
    "bumpSeed": 255
  }
]
```

# Mata/Lucra Raydium LP

## Serum

```
$ ./crank https://api.devnet.solana.com list-market ~/Projects/lucra/keys/LGNDSCoQfZZDZDBtVLgXvmJpqzRjRBcXSxwkSZjp3wN.json DESVgJVGajEgKGXhb6XmqDHGz3VjdgP7rEVESBgxmroY --coin-mint A7CqJ8UazAu3av3jBwtzA1PQKTKAVDSbQzTdLuMvocQD --pc-mint DNvM98Sr19UUdKXC4PxZic5X6LD7qUiuUY2Rn4ncd726
Listed market: MarketPubkeys {
    market: B3Fr8mn39nrdRsjGhf2VPcLXsW6KVnnGi1eWkj2B3mud,
    req_q: BbQBq4fWz6RzbrreMg95kQqYBrxBbF21wi2ryz5bwEzM,
    event_q: 6Ndu96X9mE3xStPCDPrkogzkpSMN2MkAUi4c4NRapg5J,
    bids: HKE3RQUuXN7sk8gjHSRLFycgNTnEe6pQ2GQpDku3N1dE,
    asks: 37Gg9iQiaoPQA9sVsg6MtcCDFK5DY7tQWEkrWFna7Wsg,
    coin_vault: J6iwj3t9Bi4N9EnGJmGzhr4rCiPQSwhk15YEs2orZD9r,
    pc_vault: CoP9YnnUL1d85DehPtbAhdAzPehhpBninLJW9oa1DuNU,
    vault_signer_key: CXawCSVTRtrmpKnkbyevuaxRxzRs1Vf7KS8pJ2eVfGto,
}
```

## Raydium Pool

```
lucra-util-cli raydium createPool B3Fr8mn39nrdRsjGhf2VPcLXsW6KVnnGi1eWkj2B3mud 1000 1000
$ lucra-util-cli raydium createPool B3Fr8mn39nrdRsjGhf2VPcLXsW6KVnnGi1eWkj2B3mud 1000 1000
const ammAuthority = new PublicKey('DhVpojXMTbZMuTaCgiiaFU7U8GvEEhnYo4G9BUdiEYGh')
const nonce = 254
const ammId = new PublicKey('CYJsP5nGtKbj6uFfkBfYFFdHoENjEGkKE5yP5LhC9A4r')
const poolCoinTokenAccount = new PublicKey('5ZNWxcbPFsQzCTYEcMNXvJkcAkgirkQjXXXrysnGVdwB')
const poolPcTokenAccount = new PublicKey('FURQodjpX5mGC5vSGwN1GFKLqikZYiux5aE6EpQ5gRAU')
const lpMintAddress = new PublicKey('8dfYdSw8rbCgbeNTBfFGeYy6HuQdTkRoDe6qobQpAaCV')
const poolTempLpTokenAccount = new PublicKey('HdZe6Mp98L86Ha7JcFxnG35Rtu2H6f1Jpii1ZK9jJLyE')
const ammTargetOrders = new PublicKey('2FifcuDMCs46SKTF5KcCoxsvKWj4JP2wKbawtfRrpdGj')
const poolWithdrawQueue = new PublicKey('7HcbXyXDUcaDEFw2qMqTWLTaRUhiyWn3KMpEhWyQQf6F')
const ammOpenOrders = new PublicKey('3tJFPWakEER55WAQZe1wqaSUyVn7zPYyzXe58DJ2Sd2q')
txid UJFKvNtvwrBNM9JN9dn18jiVrfRT4smFWWapjtS9c4jnS3oTLRJ4ah14rmZuokWeD51bHbV2vcC5ciXVVaEHnHi
Transfer: 1000000000000 To: poolCoinTokenAccount
Transfer: 1000000000000 To: poolPcTokenAccount
txid 5a7jXnrWfcRqp2Ws4MDvLDtzzg44MH6As8RtkfFsvbYbEhsagLgEvgWyfweVgQfhbGjhP8Svj4zStn1Z1uY4oDRm
AmmID: CYJsP5nGtKbj6uFfkBfYFFdHoENjEGkKE5yP5LhC9A4r
```
