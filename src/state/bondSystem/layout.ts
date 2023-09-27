import { u8, struct, u32, seq } from '@solana/buffer-layout'
import { publicKey, bool, u64 } from '@solana/buffer-layout-utils'
import { BondSystemAccount } from '.'
import { MetaDataLayout, pubkeyOpt } from '../common'

export type BondSystemStructure = Omit<
BondSystemAccount,
'account' | 'name' | 'provider'
>

export const BondSystemLayout = struct<BondSystemStructure>([
  MetaDataLayout('metadata'),
  publicKey('authority'),
  publicKey('poolState'),
  publicKey('commonMint'),
  pubkeyOpt('treasuryOracle'),
  seq(u8(), 3, 'padding0'),
  u32('bondYield'),
  bool('closed'),
  u8('vaultBumpSeed'),
  u8('treasuryBumpSeed'),
  pubkeyOpt('baseOracle'),
  u8('poolType'),
  bool('paused'),
  seq(u8(), 5, 'padding1'),
  pubkeyOpt('quoteOracle'),
  seq(u8(), 7, 'padding2'),
  publicKey('vaultMint'),
  publicKey('vault'),
  publicKey('treasuryMint'),
  publicKey('treasury'),
  seq(u8(), 5, 'padding3'),
  u64('startOfEpoch'),
  u64('timelock'),
  u64('epoch'),
  u64('totalAmountToDistribute'),
  u64('maxAmountToDistributePerEpoch'),
  u64('maxAllowedToDistributeAtOneTime'),
  u64('estimatedAmountDistributed'),
  u64('estimatedAmountDistributedThisEpoch'),
  u64('totalAmountDistributed'),
  seq(u8(), 256, 'padding4'),
])
