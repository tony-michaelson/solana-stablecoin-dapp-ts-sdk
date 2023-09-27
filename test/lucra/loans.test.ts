import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  // LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
  Transaction,
} from '@solana/web3.js'
import {
  createKeypairFromFile,
  transactionIsSuccessfull,
  watchTransaction,
} from '../lib'
import { Lucra } from '../../src/lucra'

const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

const signatures: {
  open: string | undefined
  verify: string | undefined
  addCollateral: string | undefined
  close: string | undefined
} = {
  open: undefined,
  verify: undefined,
  addCollateral: undefined,
  close: undefined,
}

describe('Open & Close a Loan', () => {
  jest.setTimeout(120 * 1000)
  const lucra = new Lucra(connection)
  const loanAccountKP = Keypair.generate()
  let loanAccountsTotal = 0

  it('opens a loan', async () => {
    const payerKP = await createKeypairFromFile(process.env['PAYER_KEYFILE'])
    const loans = await lucra.getUnpaidLoanAccounts(payerKP.publicKey)
    loanAccountsTotal = loans.length
    const createLoan = await lucra.createLoan({
      payer: payerKP.publicKey,
      loanAccountKP: loanAccountKP,
      lamports: BigInt(1000000000),
    })

    const transaction = new Transaction().add(...createLoan.instructions)
    const signature = await sendAndConfirmTransaction(
      connection,
      transaction,
      [payerKP, ...createLoan.signers],
      { skipPreflight: true }
    )
    console.log('txid:', signature)
    const transactionSuccess = await watchTransaction(connection, signature)
    signatures.open = signature
    expect(transactionSuccess).toBeTruthy
  })

  it('verify loan list has increased', async () => {
    const payerKP = await createKeypairFromFile(process.env['PAYER_KEYFILE'])
    if (await transactionIsSuccessfull(connection, signatures.open)) {
      const loans = await lucra.getUnpaidLoanAccounts(payerKP.publicKey)
      signatures.verify = 'skip'
      expect(loans.length > loanAccountsTotal).toBeTruthy
    }
  })

  it('add collateral', async () => {
    if (await transactionIsSuccessfull(connection, signatures.verify)) {
      const payerKP = await createKeypairFromFile(process.env['PAYER_KEYFILE'])

      const addCollateralInst = await lucra.addCollateral({
        payer: payerKP.publicKey,
        loanAccount: loanAccountKP.publicKey,
        lamports: BigInt(LAMPORTS_PER_SOL),
      })

      const transaction = new Transaction().add(...addCollateralInst)
      const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [payerKP]
      )
      const transactionSuccess = await watchTransaction(connection, signature)
      signatures.addCollateral = signature
      console.log('txid:', signature)
      expect(transactionSuccess).toBeTruthy
    }
  })

  it('closes a loan', async () => {
    const payerKP = await createKeypairFromFile(process.env['PAYER_KEYFILE'])

    if (await transactionIsSuccessfull(connection, signatures.addCollateral)) {
      // Update program
      const closeLoan = await lucra.closeLoan({
        payer: payerKP.publicKey,
        loanAccount: loanAccountKP.publicKey,
        unstakeMsol: true,
      })

      const transaction = new Transaction().add(closeLoan)
      const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [payerKP]
      )
      const transactionSuccess = await watchTransaction(connection, signature)
      console.log('txid:', signature)
      expect(transactionSuccess).toBeTruthy
    }
  })
})
