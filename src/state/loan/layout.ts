import { u8, struct, seq, u32 } from '@solana/buffer-layout'
import { publicKey, u64, bool } from '@solana/buffer-layout-utils'
import { LoanAccount } from '.'
import { MetaDataLayout } from '../common'

export type LoanStructure = Omit<LoanAccount, 'account'>

export const LoanLayout = struct<LoanStructure>([
  MetaDataLayout('metadata'),
  publicKey('owner'),
  u64('solCollateralAmount'),
  u64('stakingCollateralAmount'),
  u64('marketPrice'),
  u64('loanAmount'),
  u64('penaltyHarvested'),
  u64('penaltyToHarvest'),
  publicKey('loanMint'),
  u64('creationDate'),
  u64('lastDayPenaltyWasChecked'),
  u32('collateralRate'),
  u8('loanType'),
  bool('repaid'),
  seq(u8(), 122, 'padding'),
])
