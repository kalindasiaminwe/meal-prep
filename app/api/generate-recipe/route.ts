import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { ingredients } = await req.json();

  const prompt = `
Using the following ingredients:

${ingredients.join('\n')}

Generate up to 7 simple home recipes.
Use as many of the ingredients as possible.
Avoid fancy or rare ingredients.

Return JSON ONLY in this format:

{
  "recipes": [
    {
      "title": "",
      "description": "",
      "ingredients": [
        { "name": "", "amount": "" }
      ],
      "steps": [""]
    }
  ]
}
`;

  const completion = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  const content = completion.choices[0].message.content;

  return NextResponse.json(JSON.parse(content!));
}
