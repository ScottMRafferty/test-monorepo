// apps/vercel-test/app/api/hello/route.js

import wasmModuleFactory from '../../../lib/wasm/hello';

export async function GET() {
  try {
    // Initialize the WASM module
    const instance = await wasmModuleFactory();
    
    // Call the C++ function using ccall
    // ccall(name, returnType, argTypes, args)
    const jsonString = instance.ccall('get_json_response', 'string');

    return new Response(jsonString, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('WASM Error:', error);
    return new Response(JSON.stringify({ error: "Failed to execute WASM" }), { status: 500 });
  }
}


/*

OLD TEST SCRIPT

export async function GET(request) {
  return new Response(JSON.stringify({ 
    message: "Hello from the Zumo API test!",
    status: "success" 
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      // Adding CORS now so your UI on :3000 can talk to this on :3001
      'Access-Control-Allow-Origin': '*', 
    },
  });
}
*/