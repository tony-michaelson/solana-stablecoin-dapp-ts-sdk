import { u8, struct, u32 } from "@solana/buffer-layout"
import { publicKey, u64 } from '@solana/buffer-layout-utils'
import { PublicKey } from "@solana/web3.js"
import { OracleInstruction } from "../../types/oracle"

export const CreateOracleLayout = struct<{
  instruction: OracleInstruction.CreateOracle
  expo: number
  reward_bonus: number
  algorithm: number
}>([
  u32('instruction'),
  u8('expo'),
  u8('reward_bonus'),
  u32('algorithm'),
])

export const UpdateOracleLayout = struct<{
  instruction: OracleInstruction.UpdateOracle
  reward_bonus: number
  algorithm: number
}>([
  u32('instruction'),
  u32('algorithm'),
  u8('reward_bonus'),
])

export const FreezeOracleLayout = struct<{
  instruction: OracleInstruction.FreezeOracle
}>([u32('instruction')])

export const ThawOracleLayout = struct<{
  instruction: OracleInstruction.ThawOracle
}>([u32('instruction')])

export const CloseOracleLayout = struct<{
  instruction: OracleInstruction.CloseOracle
}>([u32('instruction')])

export const AddPriceSourceLayout = struct<{
  instruction: OracleInstruction.AddPriceSource
  market: PublicKey
  source: number
  algorithm: number
}>([
  u32('instruction'),
  publicKey('market'),
  u32('source'),
  u32('algorithm'),
])

export const FreezePriceSourceLayout = struct<{
  instruction: OracleInstruction.FreezePriceSource
  market: PublicKey
}>([
  u32('instruction'),
  publicKey('market'),
])

export const ThawPriceSourceLayout = struct<{
  instruction: OracleInstruction.ThawPriceSource
  market: PublicKey
}>([
  u32('instruction'),
  publicKey('market'),
])

export const RemovePriceSourceLayout = struct<{
  instruction: OracleInstruction.RemovePriceSource
  market: PublicKey
}>([
  u32('instruction'),
  publicKey('market'),
])

export const UpdatePriceLayout = struct<{
  instruction: OracleInstruction.UpdatePrice
  source: number
  market: PublicKey
}>([
  u32('instruction'),
  u32('source'),
  publicKey('market'),
])

export const UpdateAggPriceLayout = struct<{
  instruction: OracleInstruction.UpdateAggPrice
}>([
  u32('instruction'),
])

export const RedeemRewardLayout = struct<{
  instruction: OracleInstruction.RedeemReward
  amount: bigint
}>([
  u32('instruction'),
  u64('amount'),
])