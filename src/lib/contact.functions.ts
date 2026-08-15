import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  message: z.string().trim().min(10).max(2000),
});

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const webhook = process.env["N8N_WEBHOOK_URL"];

    if (webhook) {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, source: "portfolio", receivedAt: new Date().toISOString() }),
      });
      if (!res.ok) {
        const body = await res.text();
        console.error(`n8n webhook failed [${res.status}]: ${body}`);
        throw new Error("Message could not be delivered right now.");
      }
      return { delivered: true as const };
    }

    console.log("Contact message received (no webhook configured):", {
      name: data.name,
      email: data.email,
      length: data.message.length,
    });
    return { delivered: false as const };
  });
