import {
  Connection,
  Keypair,
  sendAndConfirmTransaction,
  Transaction,
} from '@solana/web3.js'
import {
  createKeypairFromFile,
  transactionIsSuccessfull,
  watchTransaction,
} from '../lib'
import { Lucra } from '../../src/lucra'
import { StakingTimeframe } from '../../src/types/lucra'
import { generateStakeAcctKeypairs } from '../../src/utils/account'
import { getAssociatedTokenAddress, transfer } from '@solana/spl-token'
import { LUCRA_CONFIG, MARINADE_CONFIG } from '../../src/constants'
import {
  generateRewardAccountKP,
  generateStakeAccountKP,
} from '../../src/instructions/common'

const connection = new Connection('https://api.devnet.solana.com', {
  commitment: 'confirmed',
  confirmTransactionInitialTimeout: 60 * 1000,
})

describe('Staking', () => {
  jest.setTimeout(500 * 1000)
  const lucra = new Lucra(connection)
  const stakeBalanceAccountKP = Keypair.generate()
  const stakeBalanceAccount = stakeBalanceAccountKP.publicKey
  const pendingWithdrawalKP = Keypair.generate()
  const pendingWithdrawal = pendingWithdrawalKP.publicKey

  const signatures: {
    create: string | undefined
    createBalance: string | undefined
    depositStake: string | undefined
    transfer: string | undefined
    drop: string | undefined
    transfer2: string | undefined
    drop2: string | undefined
    claim: string | undefined
    startUnstake: string | undefined
    endUnstake: string | undefined
    withdrawStake: string | undefined
  } = {
    create: undefined,
    createBalance: undefined,
    depositStake: undefined,
    transfer: undefined,
    drop: undefined,
    transfer2: undefined,
    drop2: undefined,
    claim: undefined,
    startUnstake: undefined,
    endUnstake: undefined,
    withdrawStake: undefined,
  }

  it('create staking account if not exists', async () => {
    const payerKP = await createKeypairFromFile(process.env['PAYER_KEYFILE'])
    const createStakeAccount = await lucra.createStakeAccount({
      owner: payerKP.publicKey,
    })

    if (createStakeAccount.instructions.length) {
      const transaction = new Transaction().add(
        ...createStakeAccount.instructions
      )
      const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [payerKP, ...createStakeAccount.signers],
        { commitment: 'confirmed' }
      )
      console.log('staking account txid:', signature)
      signatures.create = signature
      const transactionSuccess = await watchTransaction(connection, signature)
      expect(transactionSuccess).toBeTruthy
    } else {
      signatures.create = 'skip'
      expect(true).toBeTruthy
    }
  })

  it('create staking balance', async () => {
    const payerKP = await createKeypairFromFile(process.env['PAYER_KEYFILE'])
    const keypairs = await generateStakeAcctKeypairs(stakeBalanceAccount)
    const createStakeBalance = await lucra.createStakeBalance({
      owner: payerKP.publicKey,
      timeframe: StakingTimeframe.Default,
      stakeBalanceAccountKP,
      ...keypairs,
    })

    if (await transactionIsSuccessfull(connection, signatures.create)) {
      console.log('create staking balance')
      // -- TRANSACTION 1 -- //
      const transaction = new Transaction().add(
        ...createStakeBalance.transaction1.instructions
      )
      const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [payerKP, ...createStakeBalance.transaction1.signers],
        { commitment: 'confirmed' }
      )
      console.log('staking balance txid:', signature)
      const transactionSuccess = await watchTransaction(connection, signature)
      expect(transactionSuccess).toBeTruthy

      // -- TRANSACTION 2 -- //
      const transaction2 = new Transaction().add(
        ...createStakeBalance.transaction2.instructions
      )
      const signature2 = await sendAndConfirmTransaction(
        connection,
        transaction2,
        [payerKP, ...createStakeBalance.transaction2.signers]
      )
      console.log('staking balance txid2:', signature2)
      const transactionSuccess2 = await watchTransaction(connection, signature2)
      signatures.createBalance = signature2
      expect(transactionSuccess2).toBeTruthy
    }
  })

  it('deposit & stake', async () => {
    const payerKP = await createKeypairFromFile(process.env['PAYER_KEYFILE'])
    const [stakeAccountKP] = await generateStakeAccountKP(
      LUCRA_CONFIG,
      payerKP.publicKey
    )
    const stakeAccount = stakeAccountKP.publicKey
    const keypairs = await generateStakeAcctKeypairs(stakeBalanceAccount)
    const depositVault = keypairs.depositVaultKP.publicKey
    const stakeVault = keypairs.stakeVaultKP.publicKey
    const stakedLucraVault = keypairs.stakedLucraVaultKP.publicKey
    if (await transactionIsSuccessfull(connection, signatures.createBalance)) {
      const deposit = await lucra.depositStake({
        owner: payerKP.publicKey,
        stakeBalanceAccount,
        depositVault,
        lucra: BigInt(1),
      })

      const stake = await lucra.stake({
        owner: payerKP.publicKey,
        stakeBalanceAccount,
        stakeAccount,
        depositVault,
        stakeVault,
        stakedLucraVault,
        lucra: BigInt(1),
      })

      const transaction = new Transaction().add(deposit).add(stake)
      console.log('sending transaction for deposit & stake')
      const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [payerKP],
        { skipPreflight: true }
      )
      console.log('deposit & stake txid:', signature)
      const transactionSuccess = await watchTransaction(connection, signature)
      signatures.depositStake = signature
      expect(transactionSuccess).toBeTruthy
    }
  })

  it('simulate reward; transfer mSol to mSolVault', async () => {
    const payerKP = await createKeypairFromFile(process.env['PAYER_KEYFILE'])
    const msolAtaAddress = await getAssociatedTokenAddress(
      MARINADE_CONFIG.msolMint,
      payerKP.publicKey
    )

    if (await transactionIsSuccessfull(connection, signatures.depositStake)) {
      const signature = await transfer(
        connection,
        payerKP,
        msolAtaAddress,
        LUCRA_CONFIG.account.msolVault.address,
        payerKP,
        BigInt(1000)
      )
      console.log('transfer mSOL txid:', signature)
      const transactionSuccess = await watchTransaction(connection, signature)
      signatures.transfer = signature
      expect(transactionSuccess).toBeTruthy
    }
  })

  it('drop reward', async () => {
    const payerKP = await createKeypairFromFile(process.env['PAYER_KEYFILE'])
    const stakingState = await lucra.getStakingStateAccount()
    const rewardAccountKP = await generateRewardAccountKP(
      LUCRA_CONFIG,
      stakingState.rewardCursor + 1
    )

    if (await transactionIsSuccessfull(connection, signatures.transfer)) {
      const drop = await lucra.dropReward({
        payer: payerKP.publicKey,
        rewardAccountKP,
      })

      const transaction = new Transaction().add(...drop.instructions)
      const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [payerKP, ...drop.signers],
        { skipPreflight: true }
      )
      console.log('drop txid:', signature)
      const transactionSuccess = await watchTransaction(connection, signature)
      signatures.drop = signature
      expect(transactionSuccess).toBeTruthy
    }
  })

  it('simulate reward 2; transfer mSol to mSolVault', async () => {
    const payerKP = await createKeypairFromFile(process.env['PAYER_KEYFILE'])
    const msolAtaAddress = await getAssociatedTokenAddress(
      MARINADE_CONFIG.msolMint,
      payerKP.publicKey
    )

    if (await transactionIsSuccessfull(connection, signatures.drop)) {
      const signature = await transfer(
        connection,
        payerKP,
        msolAtaAddress,
        LUCRA_CONFIG.account.msolVault.address,
        payerKP,
        BigInt(1000)
      )
      console.log('transfer mSQL txid:', signature)
      const transactionSuccess = await watchTransaction(connection, signature)
      signatures.transfer2 = signature
      expect(transactionSuccess).toBeTruthy
    }
  })

  it('drop reward 2', async () => {
    const payerKP = await createKeypairFromFile(process.env['PAYER_KEYFILE'])
    const stakingState = await lucra.getStakingStateAccount()
    const rewardAccountKP2 = await generateRewardAccountKP(
      LUCRA_CONFIG,
      stakingState.rewardCursor + 1
    )

    if (await transactionIsSuccessfull(connection, signatures.transfer2)) {
      const drop = await lucra.dropReward({
        payer: payerKP.publicKey,
        rewardAccountKP: rewardAccountKP2,
      })

      const transaction = new Transaction().add(...drop.instructions)
      const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [payerKP, ...drop.signers],
        { skipPreflight: true }
      )
      console.log('drop 2 txid:', signature)
      const transactionSuccess = await watchTransaction(connection, signature)
      signatures.drop2 = signature
      expect(transactionSuccess).toBeTruthy
    }
  })

  it('Claim Reward', async () => {
    const payerKP = await createKeypairFromFile(process.env['PAYER_KEYFILE'])
    const stakingState = await lucra.getStakingStateAccount()
    const rewardAccountKP2 = await generateRewardAccountKP(
      LUCRA_CONFIG,
      stakingState.rewardCursor
    )
    const keypairs = await generateStakeAcctKeypairs(stakeBalanceAccount)
    const stakeVault = keypairs.stakeVaultKP.publicKey
    const stakedLucraVault = keypairs.stakedLucraVaultKP.publicKey
    if (await transactionIsSuccessfull(connection, signatures.drop2)) {
      const claim = await lucra.claimReward({
        owner: payerKP.publicKey,
        stakeBalanceAccount,
        rewardAccount: rewardAccountKP2.publicKey,
        stakeVault,
        stakedLucraVault,
      })

      const transaction = new Transaction().add(claim)
      const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [payerKP],
        { skipPreflight: true }
      )
      console.log('claim txid:', signature)
      const transactionSuccess = await watchTransaction(connection, signature)
      signatures.claim = signature
      expect(transactionSuccess).toBeTruthy
    }
  })

  it('start unstake', async () => {
    const payerKP = await createKeypairFromFile(process.env['PAYER_KEYFILE'])
    const [stakeAccountKP] = await generateStakeAccountKP(
      LUCRA_CONFIG,
      payerKP.publicKey
    )
    const stakeAccount = stakeAccountKP.publicKey
    const keypairs = await generateStakeAcctKeypairs(stakeBalanceAccount)
    const pendingVault = keypairs.pendingVaultKP.publicKey
    const stakeVault = keypairs.stakeVaultKP.publicKey
    const stakedLucraVault = keypairs.stakedLucraVaultKP.publicKey
    if (await transactionIsSuccessfull(connection, signatures.claim)) {
      const startUnstake = await lucra.startUnstake({
        owner: payerKP.publicKey,
        pendingWithdrawalKP,
        stakeAccount,
        stakeBalanceAccount,
        pendingVault,
        stakeVault,
        stakedLucraVault,
        lucra: BigInt(1),
      })

      const transaction = new Transaction().add(...startUnstake.instructions)
      const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [payerKP, ...startUnstake.signers],
        { skipPreflight: true }
      )
      console.log('start unstake txid:', signature)
      const transactionSuccess = await watchTransaction(connection, signature)
      signatures.startUnstake = signature
      expect(transactionSuccess).toBeTruthy
    }
  })

  it('End unstake', async () => {
    const payerKP = await createKeypairFromFile(process.env['PAYER_KEYFILE'])
    const keypairs = await generateStakeAcctKeypairs(stakeBalanceAccount)
    const pendingVault = keypairs.pendingVaultKP.publicKey
    const depositVault = keypairs.depositVaultKP.publicKey
    if (await transactionIsSuccessfull(connection, signatures.startUnstake)) {
      const endUnstake = await lucra.endUnstake({
        owner: payerKP.publicKey,
        stakeBalanceAccount,
        pendingVault,
        depositVault,
        pendingWithdrawal,
      })

      const transaction = new Transaction().add(endUnstake)
      const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [payerKP],
        { skipPreflight: true }
      )
      console.log('end unstake txid:', signature)
      const transactionSuccess = await watchTransaction(connection, signature)
      signatures.endUnstake = signature
      expect(transactionSuccess).toBeTruthy
    }
  })

  it('withdraw stake', async () => {
    const payerKP = await createKeypairFromFile(process.env['PAYER_KEYFILE'])
    const keypairs = await generateStakeAcctKeypairs(stakeBalanceAccount)
    const pendingVault = keypairs.pendingVaultKP.publicKey
    const stakeVault = keypairs.stakeVaultKP.publicKey
    const stakedLucraVault = keypairs.stakedLucraVaultKP.publicKey
    const depositVault = keypairs.depositVaultKP.publicKey
    if (await transactionIsSuccessfull(connection, signatures.endUnstake)) {
      const withdrawStake = await lucra.withdrawStake({
        owner: payerKP.publicKey,
        stakeBalanceAccount,
        depositVault,
        pendingVault,
        stakedLucraVault,
        stakeVault,
        lucra: BigInt(1),
      })

      const transaction = new Transaction().add(withdrawStake)
      const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [payerKP],
        { skipPreflight: true }
      )
      console.log('withdraw stake txid:', signature)
      const transactionSuccess = await watchTransaction(connection, signature)
      signatures.withdrawStake = signature
      expect(transactionSuccess).toBeTruthy
    }

    console.dir(signatures, { maxArrayLength: null })
  })
})
