import { envs } from "../../config";

export class DiscordService {

  private readonly discordWebhookUrl = envs.DISCORD_WEBHOOK_URL

  async notify(message: string) {
    const body = {
      content: message,
      embeds: [
        {
          image: { url: "https://t4.ftcdn.net/jpg/06/09/34/39/360_F_609343994_YZvLlJSVHMLQ7H7S68QnbTQ85sYOqmln.jpg" }
        }
      ]
    }

    const resp = await fetch(this.discordWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })

    if (!resp.ok) {
      console.log("Error sending message to discord");
      return false
    }
    return true
  }
}