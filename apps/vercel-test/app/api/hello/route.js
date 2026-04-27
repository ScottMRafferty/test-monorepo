// apps/vercel-test/app/api/hello/route.js

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

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