import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  console.log("Log desde vaiables");

  const myVariable = process.env.MY_VARIABLE

  if (!myVariable) throw "Missing MY_VARIABLE"

  return new Response(JSON.stringify({ myVariable }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
};