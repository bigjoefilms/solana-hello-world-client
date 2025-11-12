import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction,
  TransactionInstruction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import dotenv from "dotenv";

dotenv.config();

const programId = new PublicKey("5k7DV92TujuPpXxpGX6BQ38v5Lsg38BaXDxebgephoK4");
const connection = new Connection((`https://devnet.helius-rpc.com/?api-key=${process.env.ENV_HELIUS_API_KEY}`));

export const sayHello = async (payer: Keypair): Promise<string> => {
    const tx = new Transaction();
    const instruction = new TransactionInstruction({
        keys: [],
        programId: programId,
    })
    tx.add(instruction);
    return sendAndConfirmTransaction(connection, tx, [payer]);
}

    try{
        const payer = Keypair.generate();
        console.log("Public Key:", payer.publicKey.toBase58());
        await connection.requestAirdrop(payer.publicKey, LAMPORTS_PER_SOL * 1 );
        const transactionSignature = await sayHello(payer);
        console.log(
            `Transaction: https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`
          );
          console.log("Finished successfully");

    }

    catch (error) {
        if (error instanceof Error) {
          throw new Error(`An error occurred: ${error.message}`);
        } else {
          throw new Error("An unknown error occurred");
        }
    }

   