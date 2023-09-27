import { AccountMeta, PublicKey, TransactionInstruction } from '@solana/web3.js'
import { UpdateLayout } from './layouts'
import { buildInstruction } from '../common'
import {
  LucraConfig,
  LucraInstruction,
  LucraProgramUpdateSettings,
} from '../../types/lucra'

export interface Update {
  config: LucraConfig
  settings: LucraProgramUpdateSettings
  lucraStateAcct: PublicKey
  arbStateAcct: PublicKey
  daoAuthority: PublicKey
}

export const createUpdateInstruction = ({
  config,
  settings,
  lucraStateAcct,
  arbStateAcct,
  daoAuthority,
}: Update): TransactionInstruction => {
  const data = Buffer.alloc(UpdateLayout.span)
  UpdateLayout.encode(
    {
      instruction: LucraInstruction.UpdateState,
      min_deposit: settings.min_deposit,
      collateral_requirement: settings.collateral_requirement,
      loans_enabled: settings.loans_enabled,
      staking_enabled: settings.staking_enabled,
      arbitrage_enabled: settings.arbitrage_enabled,
      peg_check_enabled: settings.peg_check_enabled,
      maximum_lucra_to_mint: settings.maximum_lucra_to_mint,
      daily_arb_limit: settings.daily_arb_limit,
      maximum_outstanding_mata: settings.maximum_outstanding_mata,
      minimum_harvest_amount: settings.minimum_harvest_amount,
      reward_fee: settings.reward_fee,
      lcp: settings.lcp,
    },
    data
  )

  const keys: AccountMeta[] = [
    {
      pubkey: lucraStateAcct,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: arbStateAcct,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: daoAuthority, isSigner: true, isWritable: false },
  ]

  return buildInstruction({ config, keys, data })
}
