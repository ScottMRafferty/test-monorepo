"use client";

import {useState} from 'react';
import axios from 'axios';
import { getApiUrl } from '../libs/utils';
import { ApiResponse, SolanaDataResponse, HelloWasmResponse} from '../../../../packages/types';

export default function ApiTester(): React.JSX.Element {

	const [data, setData] = useState<ApiResponse | null>(null);
	const [error, setError] = useState<string | null>(null);

	const reset = () => {
		setData(null);
		setError(null);
	};


	const fetchSolana = async () => {
		reset();
    	try {
      		const res = await axios.get<SolanaDataResponse>(`${getApiUrl()}/api/devnet`);      
      		setData({ ...res.data });
    	} catch (err) {
      		setError('Solana DevNet RPC Failed');
    	}
  	};

  	const fetchWasm = async () => {
		reset();
    	try {
      		const res = await axios.get<HelloWasmResponse>(`${getApiUrl()}/api/hello`);
      		setData({ ...res.data, type: 'WASM' });
    	} catch (err) {
      		setError('WASM execution failed');
    	}
  	};


	 return (<>
		<p>
            <a
              onClick={()=>fetchWasm()}
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Call WASM API
            </a> | <a
              onClick={()=>fetchSolana()}
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Call Solana DevNet API
            </a> | <a
              onClick={()=>reset()}
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              CLEAR
            </a>
          </p>
		{(data||error)&&<><hr style={{marginTop: '20px', marginBottom: '20px'}}/><pre>{JSON.stringify(data||error, null, 2)}</pre></>}
	</>);

}