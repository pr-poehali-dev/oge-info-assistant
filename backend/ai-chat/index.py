import json
import os
import re
import urllib.request

HEADERS = {"Access-Control-Allow-Origin": "*"}

KNOWLEDGE = {
    "дискриминант": "Дискриминант: D = b² - 4ac\n\n• D > 0 → два корня: x = (-b ± √D) / 2a\n• D = 0 → один корень: x = -b / 2a\n• D < 0 → нет вещественных корней\n\nПример: x² - 5x + 6 = 0\nD = 25 - 24 = 1\nx₁ = 3, x₂ = 2 ✓",
    "квадратн": "Квадратное уравнение: ax² + bx + c = 0\n\nРешение через дискриминант:\n1. D = b² - 4ac\n2. x = (-b ± √D) / 2a\n\nТеорема Виета: x₁ + x₂ = -b/a, x₁·x₂ = c/a\n\nПример: x² - 7x + 12 = 0 → x₁=4, x₂=3 ✓",
    "производн": "Производная — скорость изменения функции.\n\nПравила:\n• (C)' = 0\n• (xⁿ)' = n·xⁿ⁻¹\n• (sin x)' = cos x\n• (cos x)' = -sin x\n• (eˣ)' = eˣ\n• (u+v)' = u'+v'\n• (uv)' = u'v + uv'\n\nПример: f(x) = x³ + 2x → f'(x) = 3x² + 2 ✓",
    "тригоном|синус|косинус|тангенс": "Тригонометрия:\n• sin α = a/c (катет/гипотенуза)\n• cos α = b/c\n• tg α = sin α / cos α\n\nОсновное тождество: sin²α + cos²α = 1\n\nТаблица: sin 30°=1/2, sin 45°=√2/2, sin 60°=√3/2, sin 90°=1",
    "логарифм": "Логарифм: log_a(b) = x означает aˣ = b\n\nСвойства:\n• log(mn) = log(m) + log(n)\n• log(m/n) = log(m) - log(n)\n• log(mⁿ) = n·log(m)\n• log_a(a) = 1, log_a(1) = 0",
    "интеграл": "Интеграл — обратная операция к производной.\n\nФормулы:\n• ∫xⁿ dx = xⁿ⁺¹/(n+1) + C\n• ∫sin x dx = -cos x + C\n• ∫cos x dx = sin x + C\n• ∫eˣ dx = eˣ + C\n\nФормула Ньютона-Лейбница: ∫[a,b] f(x)dx = F(b) - F(a)",
    "прогресси": "Арифметическая: aₙ = a₁ + (n-1)·d, Sₙ = n(a₁+aₙ)/2\n\nГеометрическая: bₙ = b₁·qⁿ⁻¹, Sₙ = b₁(qⁿ-1)/(q-1)\n\nПример: b₁=2, q=3, n=4 → S₄ = 2(81-1)/2 = 80 ✓",
    "вероятност": "Вероятность: P(A) = m/n\nm — благоприятные исходы, n — всего исходов\n\nСвойства: 0 ≤ P ≤ 1, P(A) + P(Ā) = 1\n\nПример: 3 красных и 7 синих → P(красный) = 3/10 = 30% ✓",
    "линейн": "Линейное уравнение: ax + b = 0 → x = -b/a\n\nСистема (метод сложения):\n2x + y = 5\nx - y = 1\n→ сложить → 3x = 6 → x=2, y=1 ✓",
    "степен": "Свойства степеней:\n• aᵐ·aⁿ = aᵐ⁺ⁿ\n• aᵐ/aⁿ = aᵐ⁻ⁿ\n• (aᵐ)ⁿ = aᵐⁿ\n• a⁰ = 1\n• a⁻ⁿ = 1/aⁿ\n\nПоказательное уравнение: 2ˣ = 8 = 2³ → x=3 ✓",
    "корен": "Квадратный корень: √a = b если b²=a\n\nСвойства:\n• √(ab) = √a·√b\n• √(a/b) = √a/√b\n• (√a)² = a\n\nПример: √12 = √(4·3) = 2√3 ✓",
    "комбинатор|сочетани|перестановк|факториал": "Комбинаторика:\n• Перестановки: P(n) = n!\n• Размещения: A(n,k) = n!/(n-k)!\n• Сочетания: C(n,k) = n!/(k!(n-k)!)\n\nПример: C(5,2) = 10 (выбрать 2 из 5) ✓",
    "геометри|площадь|объём|треугольник|окружност": "Геометрия:\n• Треугольник: S = a·h/2\n• Пифагор: c² = a² + b²\n• Прямоугольник: S = a·b\n• Круг: S = πr², C = 2πr\n• Шар: V = 4/3·πr³",
}

def find_answer(q: str):
    q = q.lower()
    for keys, ans in KNOWLEDGE.items():
        for kw in keys.split("|"):
            if kw in q:
                return ans
    return None

def smart_reply(messages: list) -> str:
    last = next((m.get("text","") for m in reversed(messages) if m.get("role")=="user"), "")
    if not last:
        return "Задай вопрос по математике — отвечу пошагово! 🎓"

    ans = find_answer(last)
    if ans:
        return ans

    q = last.lower()

    if any(w in q for w in ["привет","здравствуй","хай","добрый"]):
        return "Привет! 👋 Я ассистент по математике.\n\nМогу объяснить:\n• Уравнения (линейные, квадратные)\n• Тригонометрию\n• Производные и интегралы\n• Логарифмы и степени\n• Прогрессии и вероятность\n• Геометрию\n\nСпрашивай!"

    if any(w in q for w in ["спасибо","благодарю"]):
        return "Пожалуйста! 😊 Если ещё что-то непонятно — спрашивай!"

    if any(w in q for w in ["умеешь","можешь","помощь","что знаешь"]):
        return "Знаю математику! 🎓\n\nТемы: уравнения, тригонометрия, производные, интегралы, логарифмы, степени, прогрессии, вероятность, комбинаторика, геометрия.\n\nНапиши тему или задачу — объясню!"

    # Попытка вычислить выражение
    nums = re.findall(r'[\d\+\-\*\/\.\(\)\s\^]+', last)
    if any(w in q for w in ["сколько","вычисли","посчитай","чему равно"]) and nums:
        try:
            expr = max(nums, key=len).strip().replace("^","**")
            if len(expr) > 1:
                r = eval(expr, {"__builtins__": {}})
                return f"Вычисляю: {expr.replace('**','^')} = **{r}** ✓"
        except Exception:
            pass

    return f"Интересный вопрос! 🤔\n\nНапиши подробнее — какая тема или конкретная задача?\n\nЯ умею объяснять: уравнения, тригонометрию, производные, логарифмы, вероятность, геометрию и многое другое."


def handler(event: dict, context) -> dict:
    """ИИ-ассистент по математике. При наличии OPENAI_API_KEY использует GPT, иначе встроенную базу."""

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": {**HEADERS, "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type"}, "body": ""}

    body = json.loads(event.get("body") or "{}")
    messages = body.get("messages", [])
    api_key = os.environ.get("OPENAI_API_KEY", "")

    if api_key:
        openai_messages = [{"role": "system", "content": "Ты дружелюбный ИИ-ассистент по математике для школьников. Объясняй пошагово, на русском языке, с эмодзи."}]
        for m in messages:
            openai_messages.append({"role": "assistant" if m.get("role") == "ai" else "user", "content": m.get("text", "")})
        payload = json.dumps({"model": "gpt-4o-mini", "messages": openai_messages, "max_tokens": 600, "temperature": 0.7}).encode()
        req = urllib.request.Request("https://api.openai.com/v1/chat/completions", data=payload,
            headers={"Content-Type": "application/json", "Authorization": f"Bearer {api_key}"}, method="POST")
        with urllib.request.urlopen(req) as resp:
            reply = json.loads(resp.read())["choices"][0]["message"]["content"]
    else:
        reply = smart_reply(messages)

    return {"statusCode": 200, "headers": HEADERS, "body": json.dumps({"reply": reply}, ensure_ascii=False)}
