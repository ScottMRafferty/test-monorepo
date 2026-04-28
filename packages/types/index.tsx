export interface SolanaDataResponse {

  type: 'SOLANA'; // Discriminator

  /** The name of the Solana cluster (e.g., 'devnet') */
  network: string;
  
  /** The Base58 encoded public key of the account */
  account: string;
  
  /** The raw balance in Lamports (1 SOL = 1,000,000,000 Lamports) */
  balance_lamports: number;
  
  /** The balance converted to SOL for display */
  balance_sol: number;
  
  /** The current block height/slot of the ledger */
  current_slot: number;
  
  /** Status flag for the frontend to handle loading/error states */
  status: 'success' | 'error';
  
  /** Human-readable message or error details */
  message: string;
}

export interface HelloWasmResponse {
  type: 'WASM';
  message: string;
  engine: string;
  status: 'success';
}

// The Union Type
export type ApiResponse = SolanaDataResponse | HelloWasmResponse;