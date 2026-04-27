import Image from "next/image";
import ApiTester from '../app/components/ApiTester';

export default function Home() {

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">

        <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
          <h1 className="max-w-xl text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Next.js UI app.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400" style={{paddingBottom: '20px'}}>
            We're testing API calls to another Next.js API app in a monorepo that will query a WASM app compiled from a C++ app and actually calling a C++ app.
		</p>
		<ApiTester />
        </div>
      </main>
    </div>
  );
}
