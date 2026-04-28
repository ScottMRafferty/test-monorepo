import Image from "next/image";
import ApiTester from '../app/components/ApiTester';

export default function Home() {

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">

        <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
          <h1 className="max-w-xl text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Next.js UI Demo app.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400" style={{paddingBottom: '20px'}}>
            Simple demo apps testing 2 API calls.  One to a compiled C++ WASM app and the other to Solana DevNet.  Project includes:
			<ul className="pt-8 pb-6">
				<li>Monorepo with Turbo</li>
				<li>Shared Types</li>
				<li>C++ to WASM</li>
				<li>Vercel Env. Var Use</li>
				<li>Vercel Deployment From Darwin ARM to Linux binaries using postinstall</li>
				<li>Simple use of @solana/web3.js to query DevNet</li>
				<li>Basic NextJS/React/Typescript Competence</li>
			</ul>
		</p>
		<ApiTester />
        </div>
      </main>
    </div>
  );
}
