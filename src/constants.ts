import { PublicKey } from '@solana/web3.js'
import { BondConfig, BondSystems } from './types/bond'
import { TokenMint } from './types/common'
import { LucraConfig, MarinadeConfig } from './types/lucra'
import { OracleConfig } from './types/oracle'

export const PROGRAM_IDS = {
  devnet: {
    raydiumV4: new PublicKey('9rpQHSyFVM1dkkHFQ2TtTzPEW7DVmEyPmN8wVniqJtuC'),
    openbook: new PublicKey('EoTcMgcDRTJVZDMZWBoU6rhYHZfkNTVEAfz3uUJRcYGj'),
    orca: new PublicKey('3xQ8SWv2GaFXXpHZNqkXsdxq5DZciHBz6ZFoPPfbFd7U'),
  },
  mainnet: {
    raydiumV4: new PublicKey('675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8'),
    openbook: new PublicKey('srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX'),
    orca: new PublicKey('9W959DqEETiGZocYWCQPaJ6sBmUzgfxXfqGeTEdp3aQP'),
  },
}

export const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID: PublicKey = new PublicKey(
  'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
)

export const SOL_FEES_ACCOUNT = new PublicKey(
  'SysvarFees111111111111111111111111111111111'
)

export const SYSTEM_PROGRAM_ID = new PublicKey(
  '11111111111111111111111111111111'
)

export const TOKEN_PROGRAM_ID = new PublicKey(
  'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
)

// ****** //
// DEVNET //
// ****** //

export const DEVNET_TOKEN: Pick<
TokenMint,
'LUCRA' | 'MATA' | 'STLUCRA' | 'USDC' | 'USDT' | 'SOL' | 'ORACLEREWARD'
> = {
  LUCRA: new PublicKey('DjuM9Twvyzwqguq96cofg6gBCNvGz7P2sAbcy8FZsEc2'),
  MATA: new PublicKey('HF21DHbY496hhHHbKR1DHcwruJVU3AMkrWr8MJPqbcLJ'),
  STLUCRA: new PublicKey('rHnU7X2DQKJEaHLouYXCrCE1ueSmxUS7JEzPBBMGPHM'),
  ORACLEREWARD: new PublicKey('9qHqkU6k49NM7avoyQuTvkTeey3PYJFvr5Jm8Sd1abxF'),
  USDC: new PublicKey('USDCHdL2zd9fbJKcLssUnzGBeTAgfZzWDBC3uohgpRa'),
  USDT: new PublicKey('USDTgvXsaf7fQLhq4XcDYHDmimS3iKaqNbj74Dib8Md'),
  SOL: new PublicKey('So11111111111111111111111111111111111111112'),
}

export const LUCRA_DEVNET_CONFIG: LucraConfig = {
  programId: new PublicKey('LCu6pNvyoBkwCHYL6PbMLintScmZFrkDdbq1D7KZ4ay'),
  account: {
    state: new PublicKey('ELtjyeaQSpy48CuSGbkdNSZ49m1A4JD6FHWFSAxhL4q3'),
    stake: new PublicKey('3xroHvBp5HkWW3xB2c7gLiNWnn4MwS3WmnGP47dxq6a8'),
    arb: new PublicKey('GYYCvJAdMvvALXEKfA12gzVYnEs8w77jMzAR8u271Bbm'),
    priceHistory: new PublicKey('pYVZSidHAnvyQrKUuWfzzhu1FMvXWDG3VV71HgK1bgB'),
    msolVault: {
      address: new PublicKey('3fWdc7ALtU5QFUQ7vpQxpgEravGug8turPgLPN6RbMvw'),
      authority: new PublicKey('2zJfWNXTjqn8UaEYKko2RY5jq6AevW5RAHaB6ZG95v9p'),
      bumpSeed: 254,
    },
    treasury: {
      address: new PublicKey('BJiP8uwjrbQWhgrMBgUrU7Hr8qqo1Mywx2qAYkbtX6jv'),
      authority: new PublicKey('CgibZTa23ikf5bcQJhP9rbywMJ5xFX5xFSta1cSdtPay'),
      bumpSeed: 252,
    },
    arbCoffer: {
      address: new PublicKey('63QTFpMiVfpUHJyddou9HNrzARt6K8PuKJHXvneZHTY2'),
      authority: new PublicKey('AbgVq9ohBuZ41huXb5kWkNXZytuoxxSSQhc8sbNoG4B8'),
      bumpSeed: 253,
    },
    rewardsVault: {
      address: new PublicKey('cgjDCsaSE8TmzqpNoovFPKABzW9qkBgoKWPYtZZLd26'),
      authority: new PublicKey('D1xnyoRbGAA8hG8n5enRCxWCRfK1FYYjojirszFrKi7q'),
      bumpSeed: 255,
    },
    arbFund: {
      address: new PublicKey('FBdourY43eAAUQYj5XminDKFfcqdAPtHtCXR71scuZV5'),
      authority: new PublicKey('91H8n4cEgiUzAPgSrv3zumVTAfSCB7povUyD2kpNrAof'),
      bumpSeed: 255,
    },
    wsolHoldingVault: {
      address: new PublicKey('3c8wq3j6Lwiqm6nexC4KeNbvTHbHYiN8NPLktfRS6wFv'),
      authority: new PublicKey('BWxNej8ASPJd4JYydUF4rhc4BX6hgdnN9kDpGCeTWv8j'),
      bumpSeed: 255,
    },
    mataHoldingVault: {
      address: new PublicKey('BLMyWzBh3eLDBVyBdoK83axhZSw7zUuJpf8njyFDkNg3'),
      authority: new PublicKey('qz8Jz6nR29mmuBrbPjPwsxY5XEx3KShykZ1e1dP4RQQ'),
      bumpSeed: 254,
    },
    lucraHoldingVault: {
      address: new PublicKey('GWvNvuKE62go2f4sQHZkLmaXx4ywFvXp2CduEp6whMxW'),
      authority: new PublicKey('C3As7ySbcRwnyynbTwPUBgGZoQ9dx2kRX3Gx3HFqmovE'),
      bumpSeed: 252,
    },
  },
  mint: {
    mata: {
      address: DEVNET_TOKEN.MATA,
      authority: new PublicKey('F4hfaWAcfeADmsmd51SpJzmkLPbNW1MzqjhiZNGUc6VE'),
      bumpSeed: 254,
    },
    lucra: {
      address: DEVNET_TOKEN.LUCRA,
      authority: new PublicKey('4ZSgVAQ7Genjn7mqU3EAC4Mamo3jacB7keybkN5Vfjok'),
      bumpSeed: 255,
    },
    stLucra: {
      address: DEVNET_TOKEN.STLUCRA,
      authority: new PublicKey('9R6qW3b1WA3QZpGgFwJSgF2e1gDD8mWQvuxPhysKE9yt'),
      bumpSeed: 255,
    },
    oracleReward: {
      address: DEVNET_TOKEN.ORACLEREWARD,
      authority: new PublicKey('CyCfofD84RDGZrcweKrFzsMwYoXyjnhXen7qWDuhaPhG'),
      bumpSeed: 250,
    },
  },
  oracle: {
    SOL_USDC: {
      account: new PublicKey('o6AUA4qCJ4XHgQbLPopkw8SziZRvTKJBAXTjyMNewCP'),
      market: new PublicKey('2fUkPik49XussDNvGk642RcC153ptd7mgHh7iZgFjz96'),
      bids: new PublicKey('8UAeLfyJHKRAmNRJuGLpppTMQEqMBPtjeSei1NeJ5r54'),
      asks: new PublicKey('87SHLuyxewCkg288eh3S9TTPNJXJhW3RL5Ag2vxUhVNQ'),
      baseMint: DEVNET_TOKEN.SOL,
      quoteMint: DEVNET_TOKEN.USDC,
      eventQ: new PublicKey('jVfC1fKTh3TiKHf8h6cTM483EaPpstUbHApEj2j5sgM'),
      baseVault: new PublicKey('2SqRPX9nVJ1Totw1HKNEdn58NfzQAauvdz5m9N9QBPmM'),
      quoteVault: new PublicKey('D4HuLf9PcvsikwZmkMFfk2dmk4EuqWMiDTuEDyHjdbGS'),
      vaultSigner: new PublicKey(
        'EWUUCQw9BCA9tn8aQosaBkAB4HH458Ts4EnPsU1jGmqf'
      ),

      ammId: new PublicKey('HVvCUjJZp1nYiEmoR8WJsQbsR2ZxSKoUWu3uELuUMCR6'),
      ammAuthority: new PublicKey(
        'DhVpojXMTbZMuTaCgiiaFU7U8GvEEhnYo4G9BUdiEYGh'
      ),
      ammOpenOrders: new PublicKey(
        '8LuQTUg9MfDrqiPMgukgpvZCaRvFpE6JbeN1zSYjjzTh'
      ),
      ammTargetOrders: new PublicKey(
        'L5agTmx3kXPYotDNkN8MnrNFma1uUB2V2z4qCeNXdkn'
      ),
      ammBaseVault: new PublicKey(
        'FWfhwLBLVLsucVANWuD66B412J27aBSKhzfEdUPQNJwx'
      ),
      ammQuoteVault: new PublicKey(
        '2g2MKv1nf6GBXbwvmmj3vDWdYo4cNafVaLiap5vvik11'
      ),
      ammPoolMint: new PublicKey(
        '5jVMduoojpcHEccVQds24T6BTY7sZqiFvNXWhCkzsP1T'
      ),

      orcaSwap: new PublicKey('6FwMvbWLGnAJTdsrmTsg9HRpt3DNhKNVG1c8VZ1qbEZ7'),
      orcaAuthority: new PublicKey(
        '2v7inR1tfwJSed98vDWE6CdFk1R2ChNfj6FhhPQ4Bzza'
      ),
      orcaBaseVault: new PublicKey(
        '8X5BPaXaEM5tawPmCG4YbAzLE8TYCVtN3n2zC77jxgDR'
      ),
      orcaQuoteVault: new PublicKey(
        '31QnGrJ8e6xXkZguJ52kz15k6ZsmyvVCGcWG8n8nmKNB'
      ),
      orcaPoolMint: new PublicKey(
        'ECK1GhiVPszdFzE2rtgdst3efeMPHEX9LRRomVdH143C'
      ),
      orcaFeeAccount: new PublicKey(
        '28VmdteWvcs6ddTYBi5Nu1Eb87scAxFNMTnDJfQrna6s'
      ),
    },
    SOL_USDT: {
      account: new PublicKey('oKrUHgwBiZzPwwDenyRYHDmKwQDHAqgTEk1U4KfRXEM'),
      market: new PublicKey('8ch4NpSNUw95vKy5GEZFgxNZqdxnsKtHxuWAd9amDvYM'),
      bids: new PublicKey('4mqC2x73a3mfp4g2iQNnaYAts5M1o8opRu7nQHwLgjjv'),
      asks: new PublicKey('CFq1w6ub3T3awmqpvEZW7iwjAdL7kjnQqvReuFk4vZq2'),
      baseMint: DEVNET_TOKEN.SOL,
      quoteMint: DEVNET_TOKEN.USDT,
      eventQ: new PublicKey('69NYoH5a9sZBjUGjyWLjGYwmCoS8YpbG8bQN2NFRVG5d'),
      baseVault: new PublicKey('E1JFDLY9ZLwqP5dZkTLpynwXxFPide7Wi7hPPuYvMv9J'),
      quoteVault: new PublicKey('B1aJ1ngLcqpvdvzz7A9vbRp36aUQwk1eS39JB9U17zqC'),
      vaultSigner: new PublicKey(
        '3UDec8kQTCid4c1HxjTPiSKPDvKzooNid6MDHsU2889L'
      ),

      ammId: new PublicKey('JBp27pDbVogzRNsvUXwmLcrk5rk9mMqRdb67a8WoPv5i'),
      ammAuthority: new PublicKey(
        'DhVpojXMTbZMuTaCgiiaFU7U8GvEEhnYo4G9BUdiEYGh'
      ),
      ammOpenOrders: new PublicKey(
        'GUHKB9a7tGEEfkBMdAJ6zrMddvGQoCzALx9aDJKmTMSU'
      ),
      ammTargetOrders: new PublicKey(
        '53opu4nXYVzm4Zo3AGnUGoG9KoJoQW32ePBQkCeVDWur'
      ),
      ammBaseVault: new PublicKey(
        'Fhda5tbm7oTePKSis42Smr45XFfyhbC5ftM5DUMRnDjo'
      ),
      ammQuoteVault: new PublicKey(
        'GmPvjZMD4TSkBoAu95by9ZSYHSPAmFXCCARhHX3a6zdp'
      ),
      ammPoolMint: new PublicKey(
        'HP4KVCcRERdSnrsRqYfJVL9FRx3QdZyceutmoZa1eJZf'
      ),

      orcaSwap: new PublicKey('2nskMBef2WiZD1NUhiMaL1aQLVt1BeURPDod54RBT9zo'),
      orcaAuthority: new PublicKey(
        '9EzqNW5KsVkfzL6TV8WWNe6YVW4zSp4YEZwN45bcQA2B'
      ),
      orcaBaseVault: new PublicKey(
        '3Bg8eWNjhfxueDheeTRWp6DU4TuwwwhsQvZjz6dB6ZgX'
      ),
      orcaQuoteVault: new PublicKey(
        '4koHE5D1T17bK6Wfw16B8BtWy4fg5JiTGKFGsjNn49cA'
      ),
      orcaPoolMint: new PublicKey(
        'DrqhKJhHs6fJ75qkYqvWxrNX8RQscbXnRMXG7FDKz5nG'
      ),
      orcaFeeAccount: new PublicKey(
        '94stY1spUEiVfbFgkWrD6R65vBDBKNYhsTTizcq2phmq'
      ),
    },
    LUCRA_SOL: {
      account: new PublicKey('ouxWX8BuguuhrXfLzxRBHBRNPTSUwdgkWTwJmR6hgCi'),
      market: new PublicKey('EDSShLzZzkmSDbjHnbJFU8JpKCYFPFMY8oCmWvzULwnF'),
      bids: new PublicKey('CpUFn6yvhdDfZKdSxiTr4ZeZiwkcmJE8Z3r4PPKWMWtZ'),
      asks: new PublicKey('93MBa9AucDfwCDj8fcrwZeAAbcmFPqfytVd5RwmERihr'),
      baseMint: DEVNET_TOKEN.LUCRA,
      quoteMint: DEVNET_TOKEN.SOL,
      eventQ: new PublicKey('H1ukC8XPm2FLzBQwTq23WnfezuawYPeYeNNGGmJxjosj'),
      baseVault: new PublicKey('5KH8tbmdNRKshuUTGVt5diqLZK1Vj8UqwU655STfJC3E'),
      quoteVault: new PublicKey('Aihp7kBUzEMXKsSnxR2j6oXqxxErFgXmzy6dHrZ5j6nG'),
      vaultSigner: new PublicKey(
        'DgfwvNYJ8bK6N1X2wByZ1GnDBLQVjWbc1de6USwNyiPf'
      ),

      ammId: new PublicKey('iqwQ4XpSxUwJ4Dj7VJCnk5dajy3fgMZuVGftCwD87Ti'),
      ammAuthority: new PublicKey(
        'DhVpojXMTbZMuTaCgiiaFU7U8GvEEhnYo4G9BUdiEYGh'
      ),
      ammOpenOrders: new PublicKey(
        '2EkKhzhpomzvvYtZ4JsS2i8LXcECWiVBMFSjFfqWDtXX'
      ),
      ammTargetOrders: new PublicKey(
        'H1McovL2yr2zBg9tYHLWzqM5QE2sAxQAeTaGjriBpHfr'
      ),
      ammBaseVault: new PublicKey(
        '8gUE42T5tHo2deXLZNECRvqLJUp67h6NWBG2xPWhue6Y'
      ),
      ammQuoteVault: new PublicKey(
        '93Vc2P9JQHba9yytzTqtbypghqa7EzQzLibXFr2onuQf'
      ),
      ammPoolMint: new PublicKey(
        '9dz1eBYPTXvQHFPTF9L3qRSasPPMMCbyMofRmRc6Y1xs'
      ),

      orcaSwap: new PublicKey('HmVBPAR6hBch4zbj6hnboCqgeKF2AQkDa7bc2SL54fBp'),
      orcaAuthority: new PublicKey(
        '4MpFpU1Lm3UriTrdGtEbJvmfBZV3MihWLCxsxH9jVW6h'
      ),
      orcaBaseVault: new PublicKey(
        'HrV5iuqNZfkUU7sy5SjZQJDXXQSid5BhkLDbtEy45AE5'
      ),
      orcaQuoteVault: new PublicKey(
        'GwdFoo8gnBmsDcbX2ykU5GCv1vvBemRPUvcN7EweCATu'
      ),
      orcaPoolMint: new PublicKey(
        '3Aj4RuoU4Q9NyaEPparRjffNKEzAkt9xu7zYywShveXZ'
      ),
      orcaFeeAccount: new PublicKey(
        'FdhVeQNi4aKs5YiCgYCszXPNqSahX17ZNWrqS5weFC7d'
      ),
    },
    SOL_MATA: {
      account: new PublicKey('oVmf1NDUdsKB35hjZdpeCz3TkAr3CUuvKVws5nN8kZ1'),
      market: new PublicKey('E57VHAr3nRtJRK8Doib8WtfPT6uHsE6c5FSMfjXjUF1g'),
      bids: new PublicKey('6iLjY6dbNdY8fRckcmHhDrb6x4z929fLb5afw4r3omA5'),
      asks: new PublicKey('74DueTcToHkScV3fBPNroGuJEQD9gwSzXM9nDBVtB7DX'),
      baseMint: DEVNET_TOKEN.SOL,
      quoteMint: DEVNET_TOKEN.MATA,
      eventQ: new PublicKey('9MrQ8wiU427LRUaRfCg7CxPsm51Cy3QEk25HaryBxShP'),
      baseVault: new PublicKey('3rxkMoJbcNXGhS1rDSQd6w9bmffPmqnJFdbhuxbuxgh6'),
      quoteVault: new PublicKey('EHYCvjg2qGkcfzBF8CUxaXsgA5BV77hSFrm2RQM5bX5k'),
      vaultSigner: new PublicKey(
        'AohHq9JR5m49M7U19DqoSSLGLSsq1ak7JTa1P3iLJjwx'
      ),

      ammId: new PublicKey('ADrmye5mFj9yUKQFAybHvk9y8zamdRFkc5AaiezdfG72'),
      ammAuthority: new PublicKey(
        'DhVpojXMTbZMuTaCgiiaFU7U8GvEEhnYo4G9BUdiEYGh'
      ),
      ammOpenOrders: new PublicKey(
        '7EQbhyutcHGNnJctc8fYs6oHdLKDxd1zfcrLgxFfyEkR'
      ),
      ammTargetOrders: new PublicKey(
        '6RR3QSt1t5bcSMNzBxooys3dF7wWsFk3C77KZT9H7Fym'
      ),
      ammBaseVault: new PublicKey(
        '5Z5qTadB2wX8grmWfbT8Hs97S91jgXvboKmMLN7obHPR'
      ),
      ammQuoteVault: new PublicKey(
        'GwYdPQgr6twfHmhMqjCFMPu1Ny8qCitcQUyZbRrpuMyX'
      ),
      ammPoolMint: new PublicKey(
        '31mv33TjUCtuotLkCWhKvyFd3BzwjJ7nbpgLW9JV5xLP'
      ),

      orcaSwap: new PublicKey('2T9Csiqxm7cYhGKNvkhQNyGaUo1y9YiJm9xPPm58ymFL'),
      orcaAuthority: new PublicKey(
        'ABqQirHdqkmsk4z37FiiNS2Q94wXHeuK7qx8E7S1iHgV'
      ),
      orcaBaseVault: new PublicKey(
        '5ZHjUk91XdzVuNe2Tw7r1f3tv5vSq6JrUjhWE36Sdd2'
      ),
      orcaQuoteVault: new PublicKey(
        'EnZvwohTYUmXNQJKNQJwCVfHwU9ckYoW7Xz7k7nVMeyf'
      ),
      orcaPoolMint: new PublicKey(
        'cT4sdEAWZPjpYKLgtTijkZweJ6RogrJtngff7LwHvgx'
      ),
      orcaFeeAccount: new PublicKey(
        'BszRNNFx8guBNxiuHrcZZ1ewPvoC2Snc8n6HasthGs2m'
      ),
    },
  },
  accountSize: {
    program: { state: 616, staking: 432, arb: 960 },
    oracle: 1136,
    priceHistory: 1120,
    loan: 264,
    staking: {
      account: 184,
      balances: 296,
    },
    reward: 200,
    pendingWithdrawal: 64,
  },
  seed: {
    lucraMint: 'lucra_mint',
    stLucraMint: 'stake',
    mataMint: 'mata_mint',
    oracleRewardMint: 'reward_mint',
    rewardVault: 'rewards_vault',
    msolVault: 'msol_vault',
    treasury: 'treasury',
    stakeAccount: 'staking_account',
    arbFund: 'arb_fund',
    arbCoffer: 'arb_coffer',
    wsolHoldingVault: 'wsol_holding_vault',
    mataHoldingVault: 'mata_holding_vault',
    lucraHoldingVault: 'lucra_holding_vault',
  },
}

export const MARINADE_DEVNET_CONFIG: MarinadeConfig = {
  programId: new PublicKey('MarBmsSgKXdrN1egZf5sqe1TMai9K1rChYNDJgjq7aD'),
  stateAccount: new PublicKey('8szGkuLTAux9XMgZ2vtY39jVSowEcpBfFfD8hXSEqdGC'),
  msolMint: new PublicKey('mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So'),
  msolMintAuth: new PublicKey('3JLPCS1qM2zRw3Dp6V4hZnYHd4toMNPkNesXdX9tg6KM'),
  solLeg: new PublicKey('UefNb6z6yvArqe4cJHTXCqStRsKmWhGxnZzuHbikP5Q'),
  msolLeg: new PublicKey('7GgPYjS5Dza89wV6FpZ23kUJRG5vbQ1GM25ezspYFSoE'),
  msolLegAuthorityInfo: new PublicKey(
    'EyaSjUtSgo9aRD1f8LWXwdvkpDTmXAW54yoSHZRF14WL'
  ),
  reservePDAInfo: new PublicKey('Du3Ysj1wKbxPKkuPPnvzQLQh8oMSVifs3jGZjJWXFmHN'),
  msolTreasury: new PublicKey('8ZUcztoAEhpAeC2ixWewJKQJsSUGYSGPVAjkhDJYf5Gd'),
}

export const BOND_DEVNET_CONFIG: BondConfig = {
  programId: new PublicKey('BnDdRbGzovtdXPLWjfPL77UjjdxF4XBYDmHXh713jSZ2'),
  authority: new PublicKey('LGNDSCoQfZZDZDBtVLgXvmJpqzRjRBcXSxwkSZjp3wN'),
  accountSize: {
    bondSystem: 688,
    bond: 304,
  },
  seed: {
    vault: 'vault',
    treasury: 'treasury',
  },
}

export const BOND_DEVNET_SYSTEMS: Omit<BondSystems, 'CUSTOM'> = {
  SOL_MATA_RAYDIUM: {
    name: 'SOL-MATA',
    provider: 'RAYDIUM',
    account: new PublicKey('AKP3rPoFvgeuGtumKodBWnNF4jLTYe1fryF5TeX9zfdv'),
    vault: new PublicKey('AYUdeMFPUUSP4TzcWrNE5guoSXuu4YH21c7mtiSSWHMT'),
    vaultNonce: 254,
    treasury: new PublicKey('oky9m2gHazaZELv4R3AYbGyoWbK2Qv6UWJs6iU7MNYz'),
    treasuryNonce: 255,
    treasuryMint: DEVNET_TOKEN.LUCRA,
    treasuryOracle: LUCRA_DEVNET_CONFIG.oracle.LUCRA_SOL.account,
    baseMint: DEVNET_TOKEN.SOL,
    quoteMint: DEVNET_TOKEN.MATA,
    lpInfo: {
      account: LUCRA_DEVNET_CONFIG.oracle.SOL_MATA.ammId,
      lpMint: LUCRA_DEVNET_CONFIG.oracle.SOL_MATA.ammPoolMint,
      baseVault: LUCRA_DEVNET_CONFIG.oracle.SOL_MATA.ammBaseVault,
      quoteVault: LUCRA_DEVNET_CONFIG.oracle.SOL_MATA.ammQuoteVault,
      openOrders: LUCRA_DEVNET_CONFIG.oracle.SOL_MATA.ammOpenOrders,
      baseOracle: LUCRA_DEVNET_CONFIG.oracle.SOL_MATA.account,
      quoteOracle: LUCRA_DEVNET_CONFIG.oracle.SOL_MATA.account,
    },
  },
  LUCRA_SOL_ORCA: {
    name: 'LUCRA-SOL',
    provider: 'ORCA',
    account: new PublicKey('7B9kvcS4kMyeGp3F24VPyaXr5RmnXiNhPjohszZ6R9Ws'),
    vault: new PublicKey('CLPxnNH4W73cDNmwLK7HiZ4gnNcPS5sqQbav9qbN7quk'),
    vaultNonce: 255,
    treasury: new PublicKey('5bQjKqYC8NCNUnaW7Ft5uxCeff9rWnV5hU1cbHVAsQvz'),
    treasuryNonce: 255,
    treasuryMint: DEVNET_TOKEN.LUCRA,
    treasuryOracle: LUCRA_DEVNET_CONFIG.oracle.LUCRA_SOL.account,
    baseMint: DEVNET_TOKEN.LUCRA,
    quoteMint: DEVNET_TOKEN.SOL,
    lpInfo: {
      account: LUCRA_DEVNET_CONFIG.oracle.LUCRA_SOL.orcaSwap,
      baseVault: LUCRA_DEVNET_CONFIG.oracle.LUCRA_SOL.orcaBaseVault,
      quoteVault: LUCRA_DEVNET_CONFIG.oracle.LUCRA_SOL.orcaQuoteVault,
      lpMint: LUCRA_DEVNET_CONFIG.oracle.LUCRA_SOL.orcaPoolMint,
      baseOracle: LUCRA_DEVNET_CONFIG.oracle.LUCRA_SOL.account,
      quoteOracle: LUCRA_DEVNET_CONFIG.oracle.LUCRA_SOL.account,
    },
  },
}

export const ORACLE_DEVNET_CONFIG: OracleConfig = {
  programId: new PublicKey('oRA1FDMia5faDKFt2epfNATSa6A33bgDmBa3ymMECTA'),
  oracles: {
    SOL_USDC: {
      account: new PublicKey('o6JD3jPKU5UcbJGrecRCqAcdrK8F51pdYKEjurP3RDS'),
      baseMint: DEVNET_TOKEN.SOL,
      quoteMint: DEVNET_TOKEN.USDC,
      authority: new PublicKey('LGNDSCoQfZZDZDBtVLgXvmJpqzRjRBcXSxwkSZjp3wN'),
      treasury: new PublicKey('ortFsCRA2VntRTYAaFrsrizQU19ZUjr4sBpugtH1tM2'),
      treasuryMint: DEVNET_TOKEN.MATA,
      rewardMint: new PublicKey('ormNChs7MTrG5atK2JXjbaxoczxsthYLtjCybmbeAHd'),

      market: new PublicKey('2fUkPik49XussDNvGk642RcC153ptd7mgHh7iZgFjz96'),
      bids: new PublicKey('8UAeLfyJHKRAmNRJuGLpppTMQEqMBPtjeSei1NeJ5r54'),
      asks: new PublicKey('87SHLuyxewCkg288eh3S9TTPNJXJhW3RL5Ag2vxUhVNQ'),
      eventQ: new PublicKey('jVfC1fKTh3TiKHf8h6cTM483EaPpstUbHApEj2j5sgM'),
      baseVault: new PublicKey('2SqRPX9nVJ1Totw1HKNEdn58NfzQAauvdz5m9N9QBPmM'),
      quoteVault: new PublicKey('D4HuLf9PcvsikwZmkMFfk2dmk4EuqWMiDTuEDyHjdbGS'),
      vaultSigner: new PublicKey(
        'EWUUCQw9BCA9tn8aQosaBkAB4HH458Ts4EnPsU1jGmqf'
      ),

      ammId: new PublicKey('HVvCUjJZp1nYiEmoR8WJsQbsR2ZxSKoUWu3uELuUMCR6'),
      ammAuthority: new PublicKey(
        'DhVpojXMTbZMuTaCgiiaFU7U8GvEEhnYo4G9BUdiEYGh'
      ),
      ammBaseVault: new PublicKey(
        'FWfhwLBLVLsucVANWuD66B412J27aBSKhzfEdUPQNJwx'
      ),
      ammQuoteVault: new PublicKey(
        '2g2MKv1nf6GBXbwvmmj3vDWdYo4cNafVaLiap5vvik11'
      ),
      ammOpenOrders: new PublicKey(
        '8LuQTUg9MfDrqiPMgukgpvZCaRvFpE6JbeN1zSYjjzTh'
      ),
      ammTargetOrders: new PublicKey(
        'L5agTmx3kXPYotDNkN8MnrNFma1uUB2V2z4qCeNXdkn'
      ),
      ammPoolMint: new PublicKey(
        '5jVMduoojpcHEccVQds24T6BTY7sZqiFvNXWhCkzsP1T'
      ),

      orcaSwap: new PublicKey('6FwMvbWLGnAJTdsrmTsg9HRpt3DNhKNVG1c8VZ1qbEZ7'),
      orcaAuthority: new PublicKey(
        '2v7inR1tfwJSed98vDWE6CdFk1R2ChNfj6FhhPQ4Bzza'
      ),
      orcaBaseVault: new PublicKey(
        '8X5BPaXaEM5tawPmCG4YbAzLE8TYCVtN3n2zC77jxgDR'
      ),
      orcaQuoteVault: new PublicKey(
        '31QnGrJ8e6xXkZguJ52kz15k6ZsmyvVCGcWG8n8nmKNB'
      ),
      orcaPoolMint: new PublicKey(
        'ECK1GhiVPszdFzE2rtgdst3efeMPHEX9LRRomVdH143C'
      ),
      orcaFeeAccount: new PublicKey(
        '28VmdteWvcs6ddTYBi5Nu1Eb87scAxFNMTnDJfQrna6s'
      ),

      wpId: new PublicKey('6FwMvbWLGnAJTdsrmTsg9HRpt3DNhKNVG1c8VZ1qbEZ7'),
      wpBaseVault: new PublicKey(
        '6FwMvbWLGnAJTdsrmTsg9HRpt3DNhKNVG1c8VZ1qbEZ7'
      ),
      wpQuoteVault: new PublicKey(
        '6FwMvbWLGnAJTdsrmTsg9HRpt3DNhKNVG1c8VZ1qbEZ7'
      ),
    },
    SOL_USDT: {
      account: new PublicKey('oJKV8GkHiZ2ZPxWvNqX42E82phqkqRw1S6tbb6hXRaA'),
      baseMint: DEVNET_TOKEN.SOL,
      quoteMint: DEVNET_TOKEN.USDT,
      authority: new PublicKey('LGNDSCoQfZZDZDBtVLgXvmJpqzRjRBcXSxwkSZjp3wN'),
      treasury: new PublicKey('ortP8s8rmxexqDT1TeEg9UWER7sg4LXjNkhsdzeUTDH'),
      treasuryMint: DEVNET_TOKEN.MATA,
      rewardMint: new PublicKey('ormzQkbSyeYcZrCFnC9wVHyrx5wDa7vGU8LHPiB2pJF'),

      market: new PublicKey('8ch4NpSNUw95vKy5GEZFgxNZqdxnsKtHxuWAd9amDvYM'),
      bids: new PublicKey('4mqC2x73a3mfp4g2iQNnaYAts5M1o8opRu7nQHwLgjjv'),
      asks: new PublicKey('CFq1w6ub3T3awmqpvEZW7iwjAdL7kjnQqvReuFk4vZq2'),
      eventQ: new PublicKey('69NYoH5a9sZBjUGjyWLjGYwmCoS8YpbG8bQN2NFRVG5d'),
      baseVault: new PublicKey('E1JFDLY9ZLwqP5dZkTLpynwXxFPide7Wi7hPPuYvMv9J'),
      quoteVault: new PublicKey('B1aJ1ngLcqpvdvzz7A9vbRp36aUQwk1eS39JB9U17zqC'),
      vaultSigner: new PublicKey(
        '3UDec8kQTCid4c1HxjTPiSKPDvKzooNid6MDHsU2889L'
      ),

      ammId: new PublicKey('JBp27pDbVogzRNsvUXwmLcrk5rk9mMqRdb67a8WoPv5i'),
      ammAuthority: new PublicKey(
        'DhVpojXMTbZMuTaCgiiaFU7U8GvEEhnYo4G9BUdiEYGh'
      ),
      ammBaseVault: new PublicKey(
        'Fhda5tbm7oTePKSis42Smr45XFfyhbC5ftM5DUMRnDjo'
      ),
      ammQuoteVault: new PublicKey(
        'GmPvjZMD4TSkBoAu95by9ZSYHSPAmFXCCARhHX3a6zdp'
      ),
      ammOpenOrders: new PublicKey(
        'GUHKB9a7tGEEfkBMdAJ6zrMddvGQoCzALx9aDJKmTMSU'
      ),
      ammTargetOrders: new PublicKey(
        '53opu4nXYVzm4Zo3AGnUGoG9KoJoQW32ePBQkCeVDWur'
      ),
      ammPoolMint: new PublicKey(
        'HP4KVCcRERdSnrsRqYfJVL9FRx3QdZyceutmoZa1eJZf'
      ),

      orcaSwap: new PublicKey('2nskMBef2WiZD1NUhiMaL1aQLVt1BeURPDod54RBT9zo'),
      orcaAuthority: new PublicKey(
        '9EzqNW5KsVkfzL6TV8WWNe6YVW4zSp4YEZwN45bcQA2B'
      ),
      orcaBaseVault: new PublicKey(
        '3Bg8eWNjhfxueDheeTRWp6DU4TuwwwhsQvZjz6dB6ZgX'
      ),
      orcaQuoteVault: new PublicKey(
        '4koHE5D1T17bK6Wfw16B8BtWy4fg5JiTGKFGsjNn49cA'
      ),
      orcaPoolMint: new PublicKey(
        'DrqhKJhHs6fJ75qkYqvWxrNX8RQscbXnRMXG7FDKz5nG'
      ),
      orcaFeeAccount: new PublicKey(
        '94stY1spUEiVfbFgkWrD6R65vBDBKNYhsTTizcq2phmq'
      ),

      wpId: new PublicKey('2nskMBef2WiZD1NUhiMaL1aQLVt1BeURPDod54RBT9zo'),
      wpBaseVault: new PublicKey(
        '2nskMBef2WiZD1NUhiMaL1aQLVt1BeURPDod54RBT9zo'
      ),
      wpQuoteVault: new PublicKey(
        '2nskMBef2WiZD1NUhiMaL1aQLVt1BeURPDod54RBT9zo'
      ),
    },
    SOL_MATA: {
      account: new PublicKey('oSMbDKyxK6aKorZVF3xj5kbnUDppXY7vDhmR4s8ps7v'),
      baseMint: DEVNET_TOKEN.SOL,
      quoteMint: DEVNET_TOKEN.MATA,
      authority: new PublicKey('LGNDSCoQfZZDZDBtVLgXvmJpqzRjRBcXSxwkSZjp3wN'),
      treasury: new PublicKey('trb9oJUYLUippmy46FwsazA3ZQuQdieKgxtHKrtixMi'),
      treasuryMint: DEVNET_TOKEN.MATA,
      rewardMint: new PublicKey('rMsK9uiqyMPBR77yCDpQ3Zg1KPNqoYYrQXAPSWKQFFx'),

      market: new PublicKey('E57VHAr3nRtJRK8Doib8WtfPT6uHsE6c5FSMfjXjUF1g'),
      bids: new PublicKey('6iLjY6dbNdY8fRckcmHhDrb6x4z929fLb5afw4r3omA5'),
      asks: new PublicKey('74DueTcToHkScV3fBPNroGuJEQD9gwSzXM9nDBVtB7DX'),
      eventQ: new PublicKey('9MrQ8wiU427LRUaRfCg7CxPsm51Cy3QEk25HaryBxShP'),
      baseVault: new PublicKey('3rxkMoJbcNXGhS1rDSQd6w9bmffPmqnJFdbhuxbuxgh6'),
      quoteVault: new PublicKey('EHYCvjg2qGkcfzBF8CUxaXsgA5BV77hSFrm2RQM5bX5k'),
      vaultSigner: new PublicKey(
        'AohHq9JR5m49M7U19DqoSSLGLSsq1ak7JTa1P3iLJjwx'
      ),

      ammId: new PublicKey('ADrmye5mFj9yUKQFAybHvk9y8zamdRFkc5AaiezdfG72'),
      ammAuthority: new PublicKey(
        'DhVpojXMTbZMuTaCgiiaFU7U8GvEEhnYo4G9BUdiEYGh'
      ),
      ammBaseVault: new PublicKey(
        '5Z5qTadB2wX8grmWfbT8Hs97S91jgXvboKmMLN7obHPR'
      ),
      ammQuoteVault: new PublicKey(
        'GwYdPQgr6twfHmhMqjCFMPu1Ny8qCitcQUyZbRrpuMyX'
      ),
      ammOpenOrders: new PublicKey(
        '7EQbhyutcHGNnJctc8fYs6oHdLKDxd1zfcrLgxFfyEkR'
      ),
      ammTargetOrders: new PublicKey(
        '6RR3QSt1t5bcSMNzBxooys3dF7wWsFk3C77KZT9H7Fym'
      ),
      ammPoolMint: new PublicKey(
        '31mv33TjUCtuotLkCWhKvyFd3BzwjJ7nbpgLW9JV5xLP'
      ),

      orcaSwap: new PublicKey('2T9Csiqxm7cYhGKNvkhQNyGaUo1y9YiJm9xPPm58ymFL'),
      orcaAuthority: new PublicKey(
        'ABqQirHdqkmsk4z37FiiNS2Q94wXHeuK7qx8E7S1iHgV'
      ),
      orcaBaseVault: new PublicKey(
        '5ZHjUk91XdzVuNe2Tw7r1f3tv5vSq6JrUjhWE36Sdd2'
      ),
      orcaQuoteVault: new PublicKey(
        'EnZvwohTYUmXNQJKNQJwCVfHwU9ckYoW7Xz7k7nVMeyf'
      ),
      orcaPoolMint: new PublicKey(
        'cT4sdEAWZPjpYKLgtTijkZweJ6RogrJtngff7LwHvgx'
      ),
      orcaFeeAccount: new PublicKey(
        'BszRNNFx8guBNxiuHrcZZ1ewPvoC2Snc8n6HasthGs2m'
      ),

      wpId: new PublicKey('2T9Csiqxm7cYhGKNvkhQNyGaUo1y9YiJm9xPPm58ymFL'),
      wpBaseVault: new PublicKey(
        '2T9Csiqxm7cYhGKNvkhQNyGaUo1y9YiJm9xPPm58ymFL'
      ),
      wpQuoteVault: new PublicKey(
        '2T9Csiqxm7cYhGKNvkhQNyGaUo1y9YiJm9xPPm58ymFL'
      ),
    },
    LUCRA_SOL: {
      account: new PublicKey('oLSvXsXkpSixGnLZW4e3jQZMsP5VpFXp6G84vXtxnjv'),
      baseMint: DEVNET_TOKEN.LUCRA,
      quoteMint: DEVNET_TOKEN.SOL,
      authority: new PublicKey('LGNDSCoQfZZDZDBtVLgXvmJpqzRjRBcXSxwkSZjp3wN'),
      treasury: new PublicKey('trWvVxWBMn2Ek67dmWZiPCn6YywuFJuArd2BrJJnTa6'),
      treasuryMint: DEVNET_TOKEN.MATA,
      rewardMint: new PublicKey('rMQvxvLdvbvTWXmqR9JXrQ8BLfGcPEpLu6rZspzWNm3'),

      market: new PublicKey('EDSShLzZzkmSDbjHnbJFU8JpKCYFPFMY8oCmWvzULwnF'),
      bids: new PublicKey('CpUFn6yvhdDfZKdSxiTr4ZeZiwkcmJE8Z3r4PPKWMWtZ'),
      asks: new PublicKey('93MBa9AucDfwCDj8fcrwZeAAbcmFPqfytVd5RwmERihr'),
      eventQ: new PublicKey('H1ukC8XPm2FLzBQwTq23WnfezuawYPeYeNNGGmJxjosj'),
      baseVault: new PublicKey('5KH8tbmdNRKshuUTGVt5diqLZK1Vj8UqwU655STfJC3E'),
      quoteVault: new PublicKey('Aihp7kBUzEMXKsSnxR2j6oXqxxErFgXmzy6dHrZ5j6nG'),
      vaultSigner: new PublicKey(
        'DgfwvNYJ8bK6N1X2wByZ1GnDBLQVjWbc1de6USwNyiPf'
      ),

      ammId: new PublicKey('iqwQ4XpSxUwJ4Dj7VJCnk5dajy3fgMZuVGftCwD87Ti'),
      ammAuthority: new PublicKey(
        'DhVpojXMTbZMuTaCgiiaFU7U8GvEEhnYo4G9BUdiEYGh'
      ),
      ammBaseVault: new PublicKey(
        '8gUE42T5tHo2deXLZNECRvqLJUp67h6NWBG2xPWhue6Y'
      ),
      ammQuoteVault: new PublicKey(
        '93Vc2P9JQHba9yytzTqtbypghqa7EzQzLibXFr2onuQf'
      ),
      ammOpenOrders: new PublicKey(
        '2EkKhzhpomzvvYtZ4JsS2i8LXcECWiVBMFSjFfqWDtXX'
      ),
      ammTargetOrders: new PublicKey(
        'H1McovL2yr2zBg9tYHLWzqM5QE2sAxQAeTaGjriBpHfr'
      ),
      ammPoolMint: new PublicKey(
        '9dz1eBYPTXvQHFPTF9L3qRSasPPMMCbyMofRmRc6Y1xs'
      ),

      orcaSwap: new PublicKey('HmVBPAR6hBch4zbj6hnboCqgeKF2AQkDa7bc2SL54fBp'),
      orcaAuthority: new PublicKey(
        '4MpFpU1Lm3UriTrdGtEbJvmfBZV3MihWLCxsxH9jVW6h'
      ),
      orcaBaseVault: new PublicKey(
        'HrV5iuqNZfkUU7sy5SjZQJDXXQSid5BhkLDbtEy45AE5'
      ),
      orcaQuoteVault: new PublicKey(
        'GwdFoo8gnBmsDcbX2ykU5GCv1vvBemRPUvcN7EweCATu'
      ),
      orcaPoolMint: new PublicKey(
        '3Aj4RuoU4Q9NyaEPparRjffNKEzAkt9xu7zYywShveXZ'
      ),
      orcaFeeAccount: new PublicKey(
        'FdhVeQNi4aKs5YiCgYCszXPNqSahX17ZNWrqS5weFC7d'
      ),

      wpId: new PublicKey('HmVBPAR6hBch4zbj6hnboCqgeKF2AQkDa7bc2SL54fBp'),
      wpBaseVault: new PublicKey(
        'HmVBPAR6hBch4zbj6hnboCqgeKF2AQkDa7bc2SL54fBp'
      ),
      wpQuoteVault: new PublicKey(
        'HmVBPAR6hBch4zbj6hnboCqgeKF2AQkDa7bc2SL54fBp'
      ),
    },
  },
  accountSize: {
    oracle: 11248,
  },
  seed: {
    rewardMint: 'reward_mint',
    treasury: 'treasury',
  },
}

// ******* //
// MAINNET //
// ******* //
export const MAINNET_TOKEN: Pick<
TokenMint,
'LUCRA' | 'MATA' | 'STLUCRA' | 'USDC' | 'USDT' | 'SOL' | 'ORACLEREWARD'
> = {
  LUCRA: new PublicKey('7A1T9eRQuxmkKNTrj5r9okDUNmRtWNwcyiE3ZRahHAE7'),
  MATA: new PublicKey('6jm1hFuCtHEKEzchVoJ1AiKjnfijy4rr6uF7ZMSPBekg'),
  STLUCRA: new PublicKey('BmyZ11s9r62YZfVnpS14zchA2n8CVKqJFxssEEPeZZnj'),
  ORACLEREWARD: new PublicKey('3o7bxsnMRGXiwX7Ds2oHpKoTborfoJN4VFj8L3w2spx9'),
  USDC: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
  USDT: new PublicKey('F5GuftC65xBqV3rbKN7xgJfZM8Xgma99E58gtgrrrDpR'),
  SOL: new PublicKey('So11111111111111111111111111111111111111112'),
}

export const LUCRA_MAINNET_CONFIG: LucraConfig = {
  programId: new PublicKey('LCP4AgomX2WFz772u4QnQ5tGqiKbQyG5NK3XuMKD4ct'),
  account: {
    state: new PublicKey('BD9CvXY2m575DsxPt6APdzYuK3gxfWuSgcwKUmv3ABeS'),
    stake: new PublicKey('G4o3VZdMZASTd82R9EUA8NjGqNzDujFoytHCgBVNxiJm'),
    arb: new PublicKey('FDiYtr6stfVmqer4jK8RDYQmhmdzuY2cqKgRRnDQtgUV'),
    priceHistory: new PublicKey('p2jG1AReLdffC1uPZuXsH4ygiJBQ5eKAtppw6BYP6h6'),
    msolVault: {
      address: new PublicKey('26ZzB3AEmQ1ccYUGK9J9icpJFLeLzuAjxiNhYxkf1xXM'),
      authority: new PublicKey('43Nb8GYCH9KNXyPin5QWFREFwmLZrrBEwKbhfSy3Y34q'),
      bumpSeed: 255,
    },
    treasury: {
      address: new PublicKey('272jDn6m24V3zFM2m1vuRaXecxsWACTCx3763CJLx4Wy'),
      authority: new PublicKey('5tLAexUVVB1z1Tpy9W6iZaYQjDvNBUoSnfvKSXpv9gDT'),
      bumpSeed: 255,
    },
    arbCoffer: {
      address: new PublicKey('2EkwQAnaP7HKATw1sSu7UTmLgBEPQw55JW3g1NbWMFce'),
      authority: new PublicKey('FAixRJkKPrVMhDX3yHShS2mB13Ca4ZsLvxtfRWiZCwiy'),
      bumpSeed: 253,
    },
    rewardsVault: {
      address: new PublicKey('8iXbJDZ4B2xF1b4nV1RicFAuQ1WJ1fvUpznGySQGJVZ8'),
      authority: new PublicKey('5zxjQva3hbJ2qKvGDhewPQgWCentqcUinHgD8fwpWFFz'),
      bumpSeed: 255,
    },
    arbFund: {
      address: new PublicKey('BtPwEB7X3UUvoKgmcQAK5MLzrezLoCt8ZnaSG5E938qD'),
      authority: new PublicKey('4Lkc2CpEr1SQqR72pEej55Co65Qbuh84RMA5a52JCHym'),
      bumpSeed: 255,
    },
    wsolHoldingVault: {
      address: new PublicKey('J7sn2yvJHoRNw797qcDPrGRcbETxMZVkCe2rqd21sJJ3'),
      authority: new PublicKey('HvJbaQxGBwa86MKPAUyd8KVzKnjB48Z4ufDPgSSzDgW6'),
      bumpSeed: 255,
    },
    mataHoldingVault: {
      address: new PublicKey('8QKLAPQVdFfvoTgtoyc7JciSZAeg9E9gZgZXgGLxwwd4'),
      authority: new PublicKey('CejKbxRdbVFiHY9PifAGetf8Lh4Yxew35i7EvJnEyHLb'),
      bumpSeed: 253,
    },
    lucraHoldingVault: {
      address: new PublicKey('HZHPQsmHUvLA14SibFkavEQVjbyqb9AkEm9vfQpATDci'),
      authority: new PublicKey('8A7r4VQ2wKBy7tnbg11eXyEp83vj158wNDA3h3tgcm6p'),
      bumpSeed: 251,
    },
  },
  mint: {
    mata: {
      address: MAINNET_TOKEN.MATA,
      authority: new PublicKey('6rWNnvAtW4QhcR3GWN9KUtbaBTVwQpzCtqShYdddmDZo'),
      bumpSeed: 255,
    },
    lucra: {
      address: MAINNET_TOKEN.LUCRA,
      authority: new PublicKey('35HASX9Q1dgbZqvH6NojwJu1kcbVTufgXf8raK98FqJA'),
      bumpSeed: 254,
    },
    stLucra: {
      address: MAINNET_TOKEN.STLUCRA,
      authority: new PublicKey('8KaNu4kzWdTUV9MKEDHkzjTxToHx8myCMQMMv1X5WzrQ'),
      bumpSeed: 255,
    },
    oracleReward: {
      address: MAINNET_TOKEN.ORACLEREWARD,
      authority: new PublicKey('3Z29ZjesyUUZKAEM9vWUUWoYSShvNkLb2QU2C1piC7vg'),
      bumpSeed: 255,
    },
  },
  oracle: {
    SOL_USDC: {
      account: new PublicKey('oBmAVqghFe2uxfWwCt1xn1G7coaphb7Fi2ggwsiJcpM'),
      market: new PublicKey('8BnEgHoWFysVcuFFX7QztDmzuH8r5ZFvyP3sYwn1XTh6'),
      bids: new PublicKey('5jWUncPNBMZJ3sTHKmMLszypVkoRK6bfEQMQUHweeQnh'),
      asks: new PublicKey('EaXdHx7x3mdGA38j5RSmKYSXMzAFzzUXCLNBEDXDn1d5'),
      baseMint: MAINNET_TOKEN.SOL,
      quoteMint: MAINNET_TOKEN.USDC,
      eventQ: new PublicKey('8CvwxZ9Db6XbLD46NZwwmVDZZRDy7eydFcAGkXKh9axa'),
      baseVault: new PublicKey('CKxTHwM9fPMRRvZmFnFoqKNd9pQR21c5Aq9bh5h9oghX'),
      quoteVault: new PublicKey('6A5NHCj1yF6urc9wZNe6Bcjj4LVszQNj5DwAWG97yzMu'),
      vaultSigner: new PublicKey(
        '3Woy2YKmiDkv6dFE9yZRnt6i37sdA9TQ5sqtxys7pxxA'
      ),

      ammId: new PublicKey('58oQChx4yWmvKdwLLZzBi4ChoCc2fqCUWBkwMihLYQo2'),
      ammAuthority: new PublicKey(
        '5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1'
      ),
      ammOpenOrders: new PublicKey(
        'HmiHHzq4Fym9e1D4qzLS6LDDM3tNsCTBPDWHTLZ763jY'
      ),
      ammTargetOrders: new PublicKey(
        'CZza3Ej4Mc58MnxWA385itCC9jCo3L1D7zc3LKy1bZMR'
      ),
      ammBaseVault: new PublicKey(
        'DQyrAcCrDXQ7NeoqGgDCZwBvWDcYmFCjSb9JtteuvPpz'
      ),
      ammQuoteVault: new PublicKey(
        'HLmqeL62xR1QoZ1HKKbXRrdN1p3phKpxRMb2VVopvBBz'
      ),
      ammPoolMint: new PublicKey(
        '8HoQnePLqPj4M7PUDzfw8e3Ymdwgc7NLGnaTUapubyvu'
      ),

      orcaSwap: new PublicKey('EGZ7tiLeH62TPV1gL8WwbXGzEPa9zmcpVnnkPKKnrE2U'),
      orcaAuthority: new PublicKey(
        'JU8kmKzDHF9sXWsnoznaFDFezLsE5uomX2JkRMbmsQP'
      ),
      orcaBaseVault: new PublicKey(
        'ANP74VNsHwSrq9uUSjiSNyNWvf6ZPrKTmE4gHoNd13Lg'
      ),
      orcaQuoteVault: new PublicKey(
        '75HgnSvXbWKZBpZHveX68ZzAhDqMzNDS29X6BGLtxMo1'
      ),
      orcaPoolMint: new PublicKey(
        'APDFRM3HMr8CAGXwKHiu2f5ePSpaiEJhaURwhsRrUUt9'
      ),
      orcaFeeAccount: new PublicKey(
        '8JnSiuvQq3BVuCU3n4DrSTw9chBSPvEMswrhtifVkr1o'
      ),
    },
    SOL_USDT: {
      account: new PublicKey('oKrUHgwBiZzPwwDenyRYHDmKwQDHAqgTEk1U4KfRXEM'),
      market: new PublicKey('2AdaV97p6SfkuMQJdu8DHhBhmJe7oWdvbm52MJfYQmfA'),
      bids: new PublicKey('F4LnU7SarP7nLmGPnDHxnCqZ8gRwiFRgbo5seifyicfo'),
      asks: new PublicKey('BKgZNz8tqJFoZ9gEHKR6k33wBMeXKAaSWpW5zMhSRhr3'),
      baseMint: MAINNET_TOKEN.SOL,
      quoteMint: MAINNET_TOKEN.USDT,
      eventQ: new PublicKey('9zw6ztEpHfcKccahzTKgPkQNYhJMPwL4iJJc8BAztNYY'),
      baseVault: new PublicKey('4zVFCGJVQhSvsJ625qTH4WKgvfPQpNpAVUfjpgCxbKh8'),
      quoteVault: new PublicKey('9aoqhYjXBqWsTVCEjwtxrotx6sVPGVLmbpVSpSRzTv54'),
      vaultSigner: new PublicKey(
        '3UDec8kQTCid4c1HxjTPiSKPDvKzooNid6MDHsU2889L'
      ),

      ammId: new PublicKey('7XawhbbxtsRcQA8KTkHT9f9nc6d69UwqCDh6U5EEbEmX'),
      ammAuthority: new PublicKey(
        'DhVpojXMTbZMuTaCgiiaFU7U8GvEEhnYo4G9BUdiEYGh'
      ),
      ammOpenOrders: new PublicKey(
        '3oWQRLewGsUMA2pebcpGPPGrzyRNfbs7fQEMUxPAGgff'
      ),
      ammTargetOrders: new PublicKey(
        '9x4knb3nuNAzxsV7YFuGLgnYqKArGemY54r2vFExM1dp'
      ),
      ammBaseVault: new PublicKey(
        '876Z9waBygfzUrwwKFfnRcc7cfY4EQf6Kz1w7GRgbVYW'
      ),
      ammQuoteVault: new PublicKey(
        'CB86HtaqpXbNWbq67L18y5x2RhqoJ6smb7xHUcyWdQAQ'
      ),
      ammPoolMint: new PublicKey(
        'Epm4KfTj4DMrvqn6Bwg2Tr2N8vhQuNbuK8bESFp4k33K'
      ),

      orcaSwap: new PublicKey('2nskMBef2WiZD1NUhiMaL1aQLVt1BeURPDod54RBT9zo'),
      orcaAuthority: new PublicKey(
        '9EzqNW5KsVkfzL6TV8WWNe6YVW4zSp4YEZwN45bcQA2B'
      ),
      orcaBaseVault: new PublicKey(
        '3Bg8eWNjhfxueDheeTRWp6DU4TuwwwhsQvZjz6dB6ZgX'
      ),
      orcaQuoteVault: new PublicKey(
        '4koHE5D1T17bK6Wfw16B8BtWy4fg5JiTGKFGsjNn49cA'
      ),
      orcaPoolMint: new PublicKey(
        'DrqhKJhHs6fJ75qkYqvWxrNX8RQscbXnRMXG7FDKz5nG'
      ),
      orcaFeeAccount: new PublicKey(
        '94stY1spUEiVfbFgkWrD6R65vBDBKNYhsTTizcq2phmq'
      ),
    },
    LUCRA_SOL: {
      account: new PublicKey('oM5wNvgj6Xcgzwsu2Ef6cwuk7wuemDR2NYLwKnBvfwp'),
      market: new PublicKey('4D2qCWbmVXBdDEupJbYZX7EZBE8SUVCQNGb6E2i1RcQh'),
      bids: new PublicKey('2xvdxr87KRkW2ixnqAxa8xuqednD7DxjwaVeRyvbmijM'),
      asks: new PublicKey('9dkLM8HAmiNrHvuXhjMmpFNDUKdo8ELjAn7t3ran6tZR'),
      baseMint: MAINNET_TOKEN.LUCRA,
      quoteMint: MAINNET_TOKEN.SOL,
      eventQ: new PublicKey('3Fo95EG3XcKN6ezHMWg7Hs8u5EkKp51iKypXoBsTF4Qf'),
      baseVault: new PublicKey('3eAKRBdDpk9C2Gx7SiAB4oKUguAXHiuAfoxLVDHbsGyx'),
      quoteVault: new PublicKey('74oCqiTURLXtY7p9v9xfsnbLEvjsuus3ziHJB8458yWJ'),
      vaultSigner: new PublicKey(
        'FDEyS2jHAz8DzLLDpiLzi6jYmVQZBVN3NdVukLkjFkvG'
      ),

      ammId: new PublicKey('8tpsuZJFSxBgVLkVbPua2fNUhqMcdJBFuB8a6y6eXrfp'),
      ammAuthority: new PublicKey(
        'DhVpojXMTbZMuTaCgiiaFU7U8GvEEhnYo4G9BUdiEYGh'
      ),
      ammOpenOrders: new PublicKey(
        '2PYZHnhf9qi4rKo3tDoAm2J4x3SaBu4mdiCzvW7LEne7'
      ),
      ammTargetOrders: new PublicKey(
        '8iibXUKKwrULwAvAKqWXVtYwUgprYfdSHhV8g5odf2qN'
      ),
      ammBaseVault: new PublicKey(
        'H5n2kGy24Cuxx3LQLJYCpPvF7VY4ZbByP76EzDX4tirX'
      ),
      ammQuoteVault: new PublicKey(
        'DKWHgV5gyEnji5NGZqWU1FZaedGwyJannLwNZ2LMAo8g'
      ),
      ammPoolMint: new PublicKey(
        'F8fftKEmKiVPrpBLmr28CcAzmS7yfXsFUUw8VSeZjxR8'
      ),

      orcaSwap: new PublicKey('AxL2hfEg2USZSn1FiXQbdieXrJfMfr6VUPevvpY7b7uV'),
      orcaAuthority: new PublicKey(
        'HyKaMGeTR5viNmq7tmQrsGAnd6qYUet6kwBqm2VntRFT'
      ),
      orcaBaseVault: new PublicKey(
        'Aa2CEDeLLYoBc1dw4zgUMQHtHcY7tX5to4ARpo2sSeq7'
      ),
      orcaQuoteVault: new PublicKey(
        '3mJdwSmCcy5VHER9vvrZeqmnHCLsVxEXU8eCVD8gG5m4'
      ),
      orcaPoolMint: new PublicKey(
        'HjZ8NWQ8t5tzKaYq4ghzNnpLCXtob2WTN19XkG5Fnb4M'
      ),
      orcaFeeAccount: new PublicKey(
        '5YXXrjzBGvVSHS3gxbqRF84bAVVyyiv2DfXzndSFGiEh'
      ),
    },
    SOL_MATA: {
      account: new PublicKey('oCUopCvpxPjkxdo4FpoFpaAWZbkCqujs3qGBYEYgMwW'),
      market: new PublicKey('7GJDKkh9ErQbKJiy8u58aSXkGdU8rnUSg6d4d8tK2X4F'),
      bids: new PublicKey('4W6neYjUv873pZgKbsdX2vobT9fMALfFeBmftgfn1Qpk'),
      asks: new PublicKey('EH57N5XFQvKTBwVBtsg6T9G37ywXVwi1gTB1L5Gun97d'),
      baseMint: MAINNET_TOKEN.SOL,
      quoteMint: MAINNET_TOKEN.MATA,
      eventQ: new PublicKey('Gt9GHzHpChhy1fzED4VJCfpQZRuYYd7s8gcvwr8CQfvn'),
      baseVault: new PublicKey('8MfdU1Vzs5inUNC59eJTMY82vWv7nrypB66Re8AVFnir'),
      quoteVault: new PublicKey('3VxG2A1ZiGaWLPJ3anWjS9Juh5gr2gifHfCLqVhVAZZ9'),
      vaultSigner: new PublicKey(
        '5tWpAedaEoNGNwZte5dbDhHdcNeTW8P4bnzAXkXoFciM'
      ),

      ammId: new PublicKey('37cAg9TGqSogttjX8Yy3AFZDA4xdRnHeaPL2gHEo2CYb'),
      ammAuthority: new PublicKey(
        'DhVpojXMTbZMuTaCgiiaFU7U8GvEEhnYo4G9BUdiEYGh'
      ),
      ammOpenOrders: new PublicKey(
        '4yGjqqErpXHpRffbrfgKX9bhqspyYJTmQwMUvADv7tPR'
      ),
      ammTargetOrders: new PublicKey(
        '97Hk62ehb7nRbbHRyZQBwTJHnR4jp7AEuZN63Tq4RWAi'
      ),
      ammBaseVault: new PublicKey(
        'DaWyR7TyLVDAgiAGfYAMvQgGEbWh69RPbact7zUFQ2uB'
      ),
      ammQuoteVault: new PublicKey(
        'HbGkRKsxE4vBvxpnRTBee3iy8XQ5rFXr7G1ac6X8Vmu6'
      ),
      ammPoolMint: new PublicKey(
        'ERLqRkPvaQ1Kh2YJC5H1XUVZuYeGmgYo8EnUB3oLWgqi'
      ),

      orcaSwap: new PublicKey('9ocCZGeRMNr35AH7BJeg66Ed677ii3YqNLLuKL2HtXGs'),
      orcaAuthority: new PublicKey(
        'A7needUVcYxp5GuP3MaUEnmEgMePfpWevnCgE4fnJE4o'
      ),
      orcaBaseVault: new PublicKey(
        'DvZEFQVNNxguGZ8TKdGHi83JbZxT2fKXQVpf9L74TkPg'
      ),
      orcaQuoteVault: new PublicKey(
        'G6T28gZahAzzeoMKH5P6TiA7pQY2nb1ygeuXgBxwzmsg'
      ),
      orcaPoolMint: new PublicKey(
        'AKcA1DBtshst3t6QgduBh2gRxVAcALUMzZEB5f2Xf5xk'
      ),
      orcaFeeAccount: new PublicKey(
        'Ho9CNHhLqgR8R8BHbzTmEVJdSHGLvBj6GvS5ZbNEqya2'
      ),
    },
  },
  accountSize: {
    program: { state: 616, staking: 432, arb: 960 },
    oracle: 1136,
    priceHistory: 1120,
    loan: 264,
    staking: {
      account: 184,
      balances: 296,
    },
    reward: 200,
    pendingWithdrawal: 64,
  },
  seed: {
    lucraMint: 'lucra_mint',
    stLucraMint: 'stake',
    mataMint: 'mata_mint',
    oracleRewardMint: 'reward_mint',
    rewardVault: 'rewards_vault',
    msolVault: 'msol_vault',
    treasury: 'treasury',
    stakeAccount: 'staking_account',
    arbFund: 'arb_fund',
    arbCoffer: 'arb_coffer',
    wsolHoldingVault: 'wsol_holding_vault',
    mataHoldingVault: 'mata_holding_vault',
    lucraHoldingVault: 'lucra_holding_vault',
  },
}

export const MARINADE_MAINNET_CONFIG: MarinadeConfig = {
  programId: new PublicKey('MarBmsSgKXdrN1egZf5sqe1TMai9K1rChYNDJgjq7aD'),
  stateAccount: new PublicKey('8szGkuLTAux9XMgZ2vtY39jVSowEcpBfFfD8hXSEqdGC'),
  msolMint: new PublicKey('mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So'),
  msolMintAuth: new PublicKey('3JLPCS1qM2zRw3Dp6V4hZnYHd4toMNPkNesXdX9tg6KM'),
  solLeg: new PublicKey('UefNb6z6yvArqe4cJHTXCqStRsKmWhGxnZzuHbikP5Q'),
  msolLeg: new PublicKey('7GgPYjS5Dza89wV6FpZ23kUJRG5vbQ1GM25ezspYFSoE'),
  msolLegAuthorityInfo: new PublicKey(
    'EyaSjUtSgo9aRD1f8LWXwdvkpDTmXAW54yoSHZRF14WL'
  ),
  reservePDAInfo: new PublicKey('Du3Ysj1wKbxPKkuPPnvzQLQh8oMSVifs3jGZjJWXFmHN'),
  msolTreasury: new PublicKey('8ZUcztoAEhpAeC2ixWewJKQJsSUGYSGPVAjkhDJYf5Gd'),
}

export const BOND_MAINNET_CONFIG: BondConfig = {
  programId: new PublicKey('BnDdRbGzovtdXPLWjfPL77UjjdxF4XBYDmHXh713jSZ2'),
  authority: new PublicKey('LGNDSCoQfZZDZDBtVLgXvmJpqzRjRBcXSxwkSZjp3wN'),
  accountSize: {
    bondSystem: 688,
    bond: 304,
  },
  seed: {
    vault: 'vault',
    treasury: 'treasury',
  },
}

export const BOND_MAINNET_SYSTEMS: Omit<BondSystems, 'CUSTOM'> = {
  SOL_MATA_RAYDIUM: {
    name: 'SOL-MATA',
    provider: 'RAYDIUM',
    account: new PublicKey('ABeu4kBJ5mh3VWHPYgonqBU2oZRjJgKBfH9e1CYuB3yv'),
    vault: new PublicKey('EkJBjHHXaigh1dB8aGb5GgYLGMoHu2cHoKwemU7HVgLa'),
    vaultNonce: 255,
    treasury: new PublicKey('4KrAYBUoENzCiH4ZK9RVjo5n8ee2uu7PHV56i6hG3ezM'),
    treasuryNonce: 254,
    treasuryMint: MAINNET_TOKEN.LUCRA,
    treasuryOracle: LUCRA_MAINNET_CONFIG.oracle.LUCRA_SOL.account,
    baseMint: MAINNET_TOKEN.SOL,
    quoteMint: MAINNET_TOKEN.MATA,
    lpInfo: {
      account: LUCRA_MAINNET_CONFIG.oracle.SOL_MATA.ammId,
      lpMint: LUCRA_MAINNET_CONFIG.oracle.SOL_MATA.ammPoolMint,
      baseVault: LUCRA_MAINNET_CONFIG.oracle.SOL_MATA.ammBaseVault,
      quoteVault: LUCRA_MAINNET_CONFIG.oracle.SOL_MATA.ammQuoteVault,
      openOrders: LUCRA_MAINNET_CONFIG.oracle.SOL_MATA.ammOpenOrders,
      baseOracle: LUCRA_MAINNET_CONFIG.oracle.SOL_MATA.account,
      quoteOracle: LUCRA_MAINNET_CONFIG.oracle.SOL_MATA.account,
    },
  },
  LUCRA_SOL_ORCA: {
    name: 'LUCRA-SOL',
    provider: 'ORCA',
    account: new PublicKey('EJEGsW6UQifARhPiPGGi2uRpou3fsF89faXGzdzMTkeX'),
    vault: new PublicKey('AcjdxGbaSxy4Ly9W3W9pKewVn8Xy9bBAcuLeJAaXoJVf'),
    vaultNonce: 254,
    treasury: new PublicKey('6X98xePGu2nw4eXWghSHdpR9CtsCxVATM7gGrSE1ovdK'),
    treasuryNonce: 255,
    treasuryMint: MAINNET_TOKEN.LUCRA,
    treasuryOracle: LUCRA_MAINNET_CONFIG.oracle.LUCRA_SOL.account,
    baseMint: MAINNET_TOKEN.LUCRA,
    quoteMint: MAINNET_TOKEN.SOL,
    lpInfo: {
      account: LUCRA_MAINNET_CONFIG.oracle.LUCRA_SOL.orcaSwap,
      baseVault: LUCRA_MAINNET_CONFIG.oracle.LUCRA_SOL.orcaBaseVault,
      quoteVault: LUCRA_MAINNET_CONFIG.oracle.LUCRA_SOL.orcaQuoteVault,
      lpMint: LUCRA_MAINNET_CONFIG.oracle.LUCRA_SOL.orcaPoolMint,
      baseOracle: LUCRA_MAINNET_CONFIG.oracle.LUCRA_SOL.account,
      quoteOracle: LUCRA_MAINNET_CONFIG.oracle.LUCRA_SOL.account,
    },
  },
}

export const ORACLE_MAINNET_CONFIG: OracleConfig = {
  programId: new PublicKey('oRA1FDMia5faDKFt2epfNATSa6A33bgDmBa3ymMECTA'),
  oracles: {
    SOL_USDC: {
      account: new PublicKey('oSCF1qMmJYPB4Ye3SDmz8fpUfykzhXrnhakEkTAFuWp'),
      baseMint: MAINNET_TOKEN.SOL,
      quoteMint: MAINNET_TOKEN.USDC,
      authority: new PublicKey('LGNDSCoQfZZDZDBtVLgXvmJpqzRjRBcXSxwkSZjp3wN'),
      treasury: new PublicKey('tr4Az1qSCrpm5VADJ4SubJDwviHGjBbQyBHnt1ypi5b'),
      treasuryMint: MAINNET_TOKEN.MATA,
      rewardMint: new PublicKey('rMozNxoW3D1F9mNfVgfsS1Kfrdr9jaeqb6PQLhpK3Mt'),

      market: new PublicKey('8BnEgHoWFysVcuFFX7QztDmzuH8r5ZFvyP3sYwn1XTh6'),
      bids: new PublicKey('5jWUncPNBMZJ3sTHKmMLszypVkoRK6bfEQMQUHweeQnh'),
      asks: new PublicKey('EaXdHx7x3mdGA38j5RSmKYSXMzAFzzUXCLNBEDXDn1d5'),
      eventQ: new PublicKey('8CvwxZ9Db6XbLD46NZwwmVDZZRDy7eydFcAGkXKh9axa'),
      baseVault: new PublicKey('CKxTHwM9fPMRRvZmFnFoqKNd9pQR21c5Aq9bh5h9oghX'),
      quoteVault: new PublicKey('6A5NHCj1yF6urc9wZNe6Bcjj4LVszQNj5DwAWG97yzMu'),
      vaultSigner: new PublicKey(
        '3Woy2YKmiDkv6dFE9yZRnt6i37sdA9TQ5sqtxys7pxxA'
      ),

      ammId: new PublicKey('58oQChx4yWmvKdwLLZzBi4ChoCc2fqCUWBkwMihLYQo2'),
      ammAuthority: new PublicKey(
        '5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1'
      ),
      ammBaseVault: new PublicKey(
        'DQyrAcCrDXQ7NeoqGgDCZwBvWDcYmFCjSb9JtteuvPpz'
      ),
      ammQuoteVault: new PublicKey(
        'HLmqeL62xR1QoZ1HKKbXRrdN1p3phKpxRMb2VVopvBBz'
      ),
      ammOpenOrders: new PublicKey(
        'HmiHHzq4Fym9e1D4qzLS6LDDM3tNsCTBPDWHTLZ763jY'
      ),
      ammTargetOrders: new PublicKey(
        'CZza3Ej4Mc58MnxWA385itCC9jCo3L1D7zc3LKy1bZMR'
      ),
      ammPoolMint: new PublicKey(
        '8HoQnePLqPj4M7PUDzfw8e3Ymdwgc7NLGnaTUapubyvu'
      ),

      orcaSwap: new PublicKey('EGZ7tiLeH62TPV1gL8WwbXGzEPa9zmcpVnnkPKKnrE2U'),
      orcaAuthority: new PublicKey(
        'JU8kmKzDHF9sXWsnoznaFDFezLsE5uomX2JkRMbmsQP'
      ),
      orcaBaseVault: new PublicKey(
        'ANP74VNsHwSrq9uUSjiSNyNWvf6ZPrKTmE4gHoNd13Lg'
      ),
      orcaQuoteVault: new PublicKey(
        '75HgnSvXbWKZBpZHveX68ZzAhDqMzNDS29X6BGLtxMo1'
      ),
      orcaPoolMint: new PublicKey(
        'APDFRM3HMr8CAGXwKHiu2f5ePSpaiEJhaURwhsRrUUt9'
      ),
      orcaFeeAccount: new PublicKey(
        '8JnSiuvQq3BVuCU3n4DrSTw9chBSPvEMswrhtifVkr1o'
      ),

      wpId: new PublicKey('EGZ7tiLeH62TPV1gL8WwbXGzEPa9zmcpVnnkPKKnrE2U'),
      wpBaseVault: new PublicKey(
        'EGZ7tiLeH62TPV1gL8WwbXGzEPa9zmcpVnnkPKKnrE2U'
      ),
      wpQuoteVault: new PublicKey(
        'EGZ7tiLeH62TPV1gL8WwbXGzEPa9zmcpVnnkPKKnrE2U'
      ),
    },
    SOL_USDT: {
      account: new PublicKey('oSTagRMRRCXgau1fh5thjmYnyTFs2KP75q614xt3XPU'),
      baseMint: MAINNET_TOKEN.SOL,
      quoteMint: MAINNET_TOKEN.USDT,
      authority: new PublicKey('LGNDSCoQfZZDZDBtVLgXvmJpqzRjRBcXSxwkSZjp3wN'),
      treasury: new PublicKey('trCZZLZvBCqLbBBhkmFkbyjcUJ3sLkqw8qwGcp3iA3x'),
      treasuryMint: MAINNET_TOKEN.MATA,
      rewardMint: new PublicKey('rMCEjoykvPMR2U8wGEgy9owrqx6aQySeXShkyYXJeVZ'),

      market: new PublicKey('2AdaV97p6SfkuMQJdu8DHhBhmJe7oWdvbm52MJfYQmfA'),
      bids: new PublicKey('F4LnU7SarP7nLmGPnDHxnCqZ8gRwiFRgbo5seifyicfo'),
      asks: new PublicKey('BKgZNz8tqJFoZ9gEHKR6k33wBMeXKAaSWpW5zMhSRhr3'),
      eventQ: new PublicKey('9zw6ztEpHfcKccahzTKgPkQNYhJMPwL4iJJc8BAztNYY'),
      baseVault: new PublicKey('4zVFCGJVQhSvsJ625qTH4WKgvfPQpNpAVUfjpgCxbKh8'),
      quoteVault: new PublicKey('9aoqhYjXBqWsTVCEjwtxrotx6sVPGVLmbpVSpSRzTv54'),
      vaultSigner: new PublicKey(
        '3UDec8kQTCid4c1HxjTPiSKPDvKzooNid6MDHsU2889L'
      ),

      ammId: new PublicKey('7XawhbbxtsRcQA8KTkHT9f9nc6d69UwqCDh6U5EEbEmX'),
      ammAuthority: new PublicKey(
        'DhVpojXMTbZMuTaCgiiaFU7U8GvEEhnYo4G9BUdiEYGh'
      ),
      ammBaseVault: new PublicKey(
        '876Z9waBygfzUrwwKFfnRcc7cfY4EQf6Kz1w7GRgbVYW'
      ),
      ammQuoteVault: new PublicKey(
        'CB86HtaqpXbNWbq67L18y5x2RhqoJ6smb7xHUcyWdQAQ'
      ),
      ammOpenOrders: new PublicKey(
        '3oWQRLewGsUMA2pebcpGPPGrzyRNfbs7fQEMUxPAGgff'
      ),
      ammTargetOrders: new PublicKey(
        '9x4knb3nuNAzxsV7YFuGLgnYqKArGemY54r2vFExM1dp'
      ),
      ammPoolMint: new PublicKey(
        'Epm4KfTj4DMrvqn6Bwg2Tr2N8vhQuNbuK8bESFp4k33K'
      ),

      orcaSwap: new PublicKey('2nskMBef2WiZD1NUhiMaL1aQLVt1BeURPDod54RBT9zo'),
      orcaAuthority: new PublicKey(
        '9EzqNW5KsVkfzL6TV8WWNe6YVW4zSp4YEZwN45bcQA2B'
      ),
      orcaBaseVault: new PublicKey(
        '3Bg8eWNjhfxueDheeTRWp6DU4TuwwwhsQvZjz6dB6ZgX'
      ),
      orcaQuoteVault: new PublicKey(
        '4koHE5D1T17bK6Wfw16B8BtWy4fg5JiTGKFGsjNn49cA'
      ),
      orcaPoolMint: new PublicKey(
        'DrqhKJhHs6fJ75qkYqvWxrNX8RQscbXnRMXG7FDKz5nG'
      ),
      orcaFeeAccount: new PublicKey(
        '94stY1spUEiVfbFgkWrD6R65vBDBKNYhsTTizcq2phmq'
      ),

      wpId: new PublicKey('2nskMBef2WiZD1NUhiMaL1aQLVt1BeURPDod54RBT9zo'),
      wpBaseVault: new PublicKey(
        '2nskMBef2WiZD1NUhiMaL1aQLVt1BeURPDod54RBT9zo'
      ),
      wpQuoteVault: new PublicKey(
        '2nskMBef2WiZD1NUhiMaL1aQLVt1BeURPDod54RBT9zo'
      ),
    },
    SOL_MATA: {
      account: new PublicKey('oSMbDKyxK6aKorZVF3xj5kbnUDppXY7vDhmR4s8ps7v'),
      baseMint: MAINNET_TOKEN.SOL,
      quoteMint: MAINNET_TOKEN.MATA,
      authority: new PublicKey('LGNDSCoQfZZDZDBtVLgXvmJpqzRjRBcXSxwkSZjp3wN'),
      treasury: new PublicKey('trb9oJUYLUippmy46FwsazA3ZQuQdieKgxtHKrtixMi'),
      treasuryMint: MAINNET_TOKEN.MATA,
      rewardMint: new PublicKey('rMsK9uiqyMPBR77yCDpQ3Zg1KPNqoYYrQXAPSWKQFFx'),

      market: new PublicKey('7GJDKkh9ErQbKJiy8u58aSXkGdU8rnUSg6d4d8tK2X4F'),
      bids: new PublicKey('4W6neYjUv873pZgKbsdX2vobT9fMALfFeBmftgfn1Qpk'),
      asks: new PublicKey('EH57N5XFQvKTBwVBtsg6T9G37ywXVwi1gTB1L5Gun97d'),
      eventQ: new PublicKey('Gt9GHzHpChhy1fzED4VJCfpQZRuYYd7s8gcvwr8CQfvn'),
      baseVault: new PublicKey('8MfdU1Vzs5inUNC59eJTMY82vWv7nrypB66Re8AVFnir'),
      quoteVault: new PublicKey('3VxG2A1ZiGaWLPJ3anWjS9Juh5gr2gifHfCLqVhVAZZ9'),
      vaultSigner: new PublicKey(
        '5tWpAedaEoNGNwZte5dbDhHdcNeTW8P4bnzAXkXoFciM'
      ),

      ammId: new PublicKey('37cAg9TGqSogttjX8Yy3AFZDA4xdRnHeaPL2gHEo2CYb'),
      ammAuthority: new PublicKey(
        'DhVpojXMTbZMuTaCgiiaFU7U8GvEEhnYo4G9BUdiEYGh'
      ),
      ammBaseVault: new PublicKey(
        'DaWyR7TyLVDAgiAGfYAMvQgGEbWh69RPbact7zUFQ2uB'
      ),
      ammQuoteVault: new PublicKey(
        'HbGkRKsxE4vBvxpnRTBee3iy8XQ5rFXr7G1ac6X8Vmu6'
      ),
      ammOpenOrders: new PublicKey(
        '4yGjqqErpXHpRffbrfgKX9bhqspyYJTmQwMUvADv7tPR'
      ),
      ammTargetOrders: new PublicKey(
        '97Hk62ehb7nRbbHRyZQBwTJHnR4jp7AEuZN63Tq4RWAi'
      ),
      ammPoolMint: new PublicKey(
        'ERLqRkPvaQ1Kh2YJC5H1XUVZuYeGmgYo8EnUB3oLWgqi'
      ),

      orcaSwap: new PublicKey('9ocCZGeRMNr35AH7BJeg66Ed677ii3YqNLLuKL2HtXGs'),
      orcaAuthority: new PublicKey(
        'A7needUVcYxp5GuP3MaUEnmEgMePfpWevnCgE4fnJE4o'
      ),
      orcaBaseVault: new PublicKey(
        'DvZEFQVNNxguGZ8TKdGHi83JbZxT2fKXQVpf9L74TkPg'
      ),
      orcaQuoteVault: new PublicKey(
        'G6T28gZahAzzeoMKH5P6TiA7pQY2nb1ygeuXgBxwzmsg'
      ),
      orcaPoolMint: new PublicKey(
        'AKcA1DBtshst3t6QgduBh2gRxVAcALUMzZEB5f2Xf5xk'
      ),
      orcaFeeAccount: new PublicKey(
        'Ho9CNHhLqgR8R8BHbzTmEVJdSHGLvBj6GvS5ZbNEqya2'
      ),

      wpId: new PublicKey('9ocCZGeRMNr35AH7BJeg66Ed677ii3YqNLLuKL2HtXGs'),
      wpBaseVault: new PublicKey(
        '9ocCZGeRMNr35AH7BJeg66Ed677ii3YqNLLuKL2HtXGs'
      ),
      wpQuoteVault: new PublicKey(
        '9ocCZGeRMNr35AH7BJeg66Ed677ii3YqNLLuKL2HtXGs'
      ),
    },
    LUCRA_SOL: {
      account: new PublicKey('oLSvXsXkpSixGnLZW4e3jQZMsP5VpFXp6G84vXtxnjv'),
      baseMint: MAINNET_TOKEN.LUCRA,
      quoteMint: MAINNET_TOKEN.SOL,
      authority: new PublicKey('LGNDSCoQfZZDZDBtVLgXvmJpqzRjRBcXSxwkSZjp3wN'),
      treasury: new PublicKey('trWvVxWBMn2Ek67dmWZiPCn6YywuFJuArd2BrJJnTa6'),
      treasuryMint: MAINNET_TOKEN.MATA,
      rewardMint: new PublicKey('rMQvxvLdvbvTWXmqR9JXrQ8BLfGcPEpLu6rZspzWNm3'),

      market: new PublicKey('4D2qCWbmVXBdDEupJbYZX7EZBE8SUVCQNGb6E2i1RcQh'),
      bids: new PublicKey('2xvdxr87KRkW2ixnqAxa8xuqednD7DxjwaVeRyvbmijM'),
      asks: new PublicKey('9dkLM8HAmiNrHvuXhjMmpFNDUKdo8ELjAn7t3ran6tZR'),
      eventQ: new PublicKey('3Fo95EG3XcKN6ezHMWg7Hs8u5EkKp51iKypXoBsTF4Qf'),
      baseVault: new PublicKey('3eAKRBdDpk9C2Gx7SiAB4oKUguAXHiuAfoxLVDHbsGyx'),
      quoteVault: new PublicKey('74oCqiTURLXtY7p9v9xfsnbLEvjsuus3ziHJB8458yWJ'),
      vaultSigner: new PublicKey(
        'FDEyS2jHAz8DzLLDpiLzi6jYmVQZBVN3NdVukLkjFkvG'
      ),

      ammId: new PublicKey('8tpsuZJFSxBgVLkVbPua2fNUhqMcdJBFuB8a6y6eXrfp'),
      ammAuthority: new PublicKey(
        'DhVpojXMTbZMuTaCgiiaFU7U8GvEEhnYo4G9BUdiEYGh'
      ),
      ammBaseVault: new PublicKey(
        'H5n2kGy24Cuxx3LQLJYCpPvF7VY4ZbByP76EzDX4tirX'
      ),
      ammQuoteVault: new PublicKey(
        'DKWHgV5gyEnji5NGZqWU1FZaedGwyJannLwNZ2LMAo8g'
      ),
      ammOpenOrders: new PublicKey(
        '2PYZHnhf9qi4rKo3tDoAm2J4x3SaBu4mdiCzvW7LEne7'
      ),
      ammTargetOrders: new PublicKey(
        '8iibXUKKwrULwAvAKqWXVtYwUgprYfdSHhV8g5odf2qN'
      ),
      ammPoolMint: new PublicKey(
        'F8fftKEmKiVPrpBLmr28CcAzmS7yfXsFUUw8VSeZjxR8'
      ),

      orcaSwap: new PublicKey('AxL2hfEg2USZSn1FiXQbdieXrJfMfr6VUPevvpY7b7uV'),
      orcaAuthority: new PublicKey(
        'HyKaMGeTR5viNmq7tmQrsGAnd6qYUet6kwBqm2VntRFT'
      ),
      orcaBaseVault: new PublicKey(
        'Aa2CEDeLLYoBc1dw4zgUMQHtHcY7tX5to4ARpo2sSeq7'
      ),
      orcaQuoteVault: new PublicKey(
        '3mJdwSmCcy5VHER9vvrZeqmnHCLsVxEXU8eCVD8gG5m4'
      ),
      orcaPoolMint: new PublicKey(
        'HjZ8NWQ8t5tzKaYq4ghzNnpLCXtob2WTN19XkG5Fnb4M'
      ),
      orcaFeeAccount: new PublicKey(
        '5YXXrjzBGvVSHS3gxbqRF84bAVVyyiv2DfXzndSFGiEh'
      ),

      wpId: new PublicKey('AxL2hfEg2USZSn1FiXQbdieXrJfMfr6VUPevvpY7b7uV'),
      wpBaseVault: new PublicKey(
        'AxL2hfEg2USZSn1FiXQbdieXrJfMfr6VUPevvpY7b7uV'
      ),
      wpQuoteVault: new PublicKey(
        'AxL2hfEg2USZSn1FiXQbdieXrJfMfr6VUPevvpY7b7uV'
      ),
    },
  },
  accountSize: {
    oracle: 11248,
  },
  seed: {
    rewardMint: 'reward_mint',
    treasury: 'treasury',
  },
}
