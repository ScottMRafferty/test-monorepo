"use client";

import {useState} from 'react';
import axios from 'axios';
import { getApiUrl } from '../libs/utils';

export default function ApiTester(): React.JSX.Element {

	const [response, setResponse] = useState(null);

	const callApi = async (endpoint: string) => {
		const API_PATH_DERIVED = `${getApiUrl()}/${endpoint}`;
    	const res = await axios.get(API_PATH_DERIVED);
		setResponse(res.data);
 	 };

	 return (<>
		<p>
            <a
              onClick={()=>callApi('api/hello')}
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Call WASM API
            </a>{" "}
            or {" "}
            <a
              onClick={()=>callApi('api/hello')}
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Call API (Include)
            </a>{" "}
			or {" "}
            <a
              onClick={()=>setResponse(null)}
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Clear
            </a>{" "}
          </p>
		{response&&<><hr style={{marginTop: '20px', marginBottom: '20px'}}/><pre>{JSON.stringify(response, null, 2)}</pre></>}
	</>);

}