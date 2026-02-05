import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  console.log("Log desde hello");
  
  return new Response("Hello world!!", {
    status: 200,
    headers: { "content-type": "application/json" },
  });
};