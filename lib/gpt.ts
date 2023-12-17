"use server";

export async function getChatGPTCompletion(input: string) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.GPT_API_KEY}`,
    "Access-Control-Allow-Origin": "*",
  };

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: process.env.GPT_MODEL ?? "gpt-3.5-turbo",
      messages: [{ role: "user", content: input }],
      temperature: parseInt(process.env.GPT_TEMPERATURE ?? "0.8"),
      max_tokens: parseInt(process.env.GPT_MAX_TOKENS ?? "1048"),
    }),
  });

  const data = await response.json();

  if (data.choices[0].finish_reason === "length") {
    throw new Error("Too long prompt");
  }

  return data.choices[0].message.content;
}
