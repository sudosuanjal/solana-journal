import { Connection, PublicKey } from "@solana/web3.js";
import idl from "../idl/anchor_program.json";
import { AnchorProgram as Journal } from "../types/anchor_program";
import { Program, AnchorProvider, Wallet, BN } from "@coral-xyz/anchor";

const programId = new PublicKey(idl.address);

export const getProgram = (connection: Connection, wallet: Wallet) => {
  const provider = new AnchorProvider(connection, wallet, {});
  return new Program(idl as Journal, provider);
};
