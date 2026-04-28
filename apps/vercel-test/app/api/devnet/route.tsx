import { Connection, PublicKey, clusterApiUrl} from '@solana/web3.js';
import { NextResponse } from 'next/server';
import { SolanaDataResponse } from '../../../../../packages/types';

export const dynamic = 'force-dynamic';

export async function GET(): Promise<NextResponse> {
  try {
    // 1. Establish connection to Solana Devnet
    // Using 'confirmed' commitment for a balance between speed and certainty
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    // 2. Use a known public key for our demo
    const walletAddress = '11111111111111111111111111111111';
    const publicKey = new PublicKey(walletAddress);

    // 3. Fetch Balance and Current Slot in parallel for performance
    const [balance, slot] = await Promise.all([
      connection.getBalance(publicKey),
      connection.getSlot()
    ]);

    const data: SolanaDataResponse = {
	  type: 'SOLANA',
      network: "Solana Devnet",
      account: publicKey.toBase58(),
      balance_lamports: balance,
      balance_sol: balance / 1000000000,
      current_slot: slot,
      status: "success",
      message: "Successfully queried the Solana Ledger!"
    };

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
      },
    });

  } catch (error: unknown) {

    console.error('Solana RPC Error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown blockchain error';
    
    return NextResponse.json(
      { error: "Failed to connect to Solana", details: errorMessage },
      { status: 500 }
    );
  }
}