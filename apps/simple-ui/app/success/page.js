"use client";
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

	const handleSubmit = (payload) => {
		// This is where we would determine bridge interfaces based on schema variable
		if (schema.plugin === 'JUCE' && window.__JUCE__)
			window.__JUCE__.postMessage(JSON.stringify({eventId: "submitForm",payload: payload}));
	}

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">

        <div className="flex flex-col items-center text-center sm:items-start sm:text-left" style={{width: '100%'}}>
          <h1 className="max-w-xl text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Thank you
          </h1>

		
			<h3>Product successfully registered</h3>
		

		<button onClick={()=>handleSubmit('play')} className={'form-vanilla-button'}>Play a JUCE Drum</button>
		<button onClick={()=>handleSubmit('close')} className={'form-vanilla-button'}>Continue</button>

        </div>	
      </main>
    </div>
  );
}
