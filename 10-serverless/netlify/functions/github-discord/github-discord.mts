import type { Context } from "@netlify/functions";

const notify = async (message: string) => {
  const resp = await fetch(process.env.DISCORD_WEBHOOK_URL ?? "", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: message })
  })

  if (!resp.ok) {
    console.log("Error sending message to discord");
    return false
  }
}

const onStar = (payload: any): string => {
  const { action, sender, repository } = payload
  return `User ${sender.login} ${action} star on ${repository.full_name}`
}

const onIssue = (payload: any): string => {
  const { action, sender, repository } = payload
  return `An issue from ${repository.full_name} was ${action} by ${sender.login}`
}

export default async (req: Request, context: Context) => {
  const githubEvent = req.headers.get('x-github-event') ?? 'unknown'
  let payload

  if (req.body) {
    const reader = req.body.getReader()
    const result = await reader.read()
    const decoder = new TextDecoder('utf-8')
    const text = decoder.decode(result.value)
    payload = JSON.parse(text)
  }

  let message: string
  switch (githubEvent) {
    case "star":
      message = onStar(payload)
      break;
    case "issues":
      message = onIssue(payload)
      break;
    default:
      message = `Unknown event ${githubEvent}`
  }

  await notify(message)

  return new Response("Hello world!!", {
    status: 200,
    headers: { "content-type": "application/json" },
  });
};