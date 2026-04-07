import json
import os
import urllib.request
import urllib.error

def handler(event: dict, context) -> dict:
    """ИИ-ассистент по математике — отвечает на вопросы учеников через OpenAI."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    messages = body.get('messages', [])

    system_prompt = (
        "Ты — дружелюбный ИИ-ассистент по математике для школьников. "
        "Объясняй темы просто и понятно, используй пошаговые разборы. "
        "Если задан вопрос не по математике — вежливо переведи разговор на математику. "
        "Отвечай на русском языке. Используй эмодзи умеренно для дружелюбности. "
        "При разборе примеров показывай каждый шаг отдельно."
    )

    openai_messages = [{"role": "system", "content": system_prompt}]
    for msg in messages:
        role = "assistant" if msg.get("role") == "ai" else "user"
        openai_messages.append({"role": role, "content": msg.get("text", "")})

    payload = json.dumps({
        "model": "gpt-4o-mini",
        "messages": openai_messages,
        "max_tokens": 600,
        "temperature": 0.7,
    }).encode("utf-8")

    req = urllib.request.Request(
        "https://api.openai.com/v1/chat/completions",
        data=payload,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {os.environ['OPENAI_API_KEY']}",
        },
        method="POST",
    )

    with urllib.request.urlopen(req) as resp:
        result = json.loads(resp.read())

    reply = result["choices"][0]["message"]["content"]

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"reply": reply}),
    }
