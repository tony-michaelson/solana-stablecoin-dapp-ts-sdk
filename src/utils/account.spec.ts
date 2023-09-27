import { Keypair } from '@solana/web3.js'
import { generateStakeAcctKeypairs } from './account'

describe('Test Lib', () => {
  it('generateStakeAcctKeypairs is deterministic', async () => {
    const kp1 = Keypair.generate()
    const keypairs = await generateStakeAcctKeypairs(kp1.publicKey)
    const keypairs2 = await generateStakeAcctKeypairs(kp1.publicKey)

    const kp2 = Keypair.generate()
    const keypairs3 = await generateStakeAcctKeypairs(kp2.publicKey)

    // ST Lucra doesn't match any other keys, key is unique
    expect(keypairs.stakedLucraVaultKP.publicKey.toString()).not.toStrictEqual(
      keypairs.stakeVaultKP.publicKey.toString()
    )
    expect(keypairs.stakedLucraVaultKP.publicKey.toString()).not.toStrictEqual(
      keypairs.depositVaultKP.publicKey.toString()
    )
    expect(keypairs.stakedLucraVaultKP.publicKey.toString()).not.toStrictEqual(
      keypairs.pendingVaultKP.publicKey.toString()
    )
    expect(keypairs.stakedLucraVaultKP.publicKey.toString()).not.toStrictEqual(
      kp1.toString()
    )

    // keys are deterministic
    expect(keypairs.stakedLucraVaultKP.publicKey.toString()).toStrictEqual(
      keypairs2.stakedLucraVaultKP.publicKey.toString()
    )
    expect(keypairs.depositVaultKP.publicKey.toString()).toStrictEqual(
      keypairs2.depositVaultKP.publicKey.toString()
    )
    expect(keypairs.stakeVaultKP.publicKey.toString()).toStrictEqual(
      keypairs2.stakeVaultKP.publicKey.toString()
    )
    expect(keypairs.pendingVaultKP.publicKey.toString()).toStrictEqual(
      keypairs2.pendingVaultKP.publicKey.toString()
    )

    // Keys generated from different seeds are different
    expect(keypairs3.stakedLucraVaultKP.publicKey.toString()).not.toStrictEqual(
      keypairs2.stakedLucraVaultKP.publicKey.toString()
    )
    expect(keypairs3.depositVaultKP.publicKey.toString()).not.toStrictEqual(
      keypairs2.depositVaultKP.publicKey.toString()
    )
    expect(keypairs3.stakeVaultKP.publicKey.toString()).not.toStrictEqual(
      keypairs2.stakeVaultKP.publicKey.toString()
    )
    expect(keypairs3.pendingVaultKP.publicKey.toString()).not.toStrictEqual(
      keypairs2.pendingVaultKP.publicKey.toString()
    )
  })
})
