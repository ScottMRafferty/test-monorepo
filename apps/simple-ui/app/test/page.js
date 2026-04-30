"use client";
import {useState} from 'react';
import Image from "next/image";
import { registration_schemas } from "../../../../packages/schemas";
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

// We use a named import within the dynamic loader
const Form = dynamic(
  () => import('../components').then((mod) => mod.Form),
  { ssr: false }
);

export default () => {

  	const searchParams = useSearchParams();

  	// If your URL is /page?id=123
  	const id = searchParams.get('id');
	const schema = registration_schemas[id||0];

	const handleSubmit = () => {
		// This is where we would determine bridge interfaces based on schema variable
		if (schema.plugin === 'JUCE') {
			if (schema.onSuccess?.redirect)
				window.location.href = schema.onSuccess.redirect;
			else if (window.__JUCE__)
				window.__JUCE__.postMessage(JSON.stringify({eventId: "submitForm",payload: "close"}));
		}

	}

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">

        <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
          <h1 className="max-w-xl text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Next.js JUCE Integration Demo
          </h1>
          <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400" style={{paddingBottom: '20px'}}>
            Testing JUCE Integration
		</p>
		<p>
			{!id&&<h5>Product not active</h5>}
		</p>



        </div>
				{id&&<Form 
			schema={schema}
			handleSubmit={handleSubmit}
		/>}
      </main>
    </div>
  );
}
