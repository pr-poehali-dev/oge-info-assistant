import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";
import { solutions, templates, initMessages, Section } from "@/data/content";

const AI_CHAT_URL = "https://functions.poehali.dev/ea22cfb5-abac-46f4-80d7-35a3c0644b15";

// --- Встроенный движок ответов ---
const KB: [string, string][] = [
  ["дискриминант", "Дискриминант: **D = b² - 4ac**\n\n• D > 0 → два корня: x = (-b ± √D) / 2a\n• D = 0 → один корень: x = -b / 2a\n• D < 0 → нет вещественных корней\n\nПример: x² - 5x + 6 = 0\nD = 25 - 24 = 1 → x₁=3, x₂=2 ✓"],
  ["квадратн", "Квадратное уравнение: **ax² + bx + c = 0**\n\n1. Найди D = b² - 4ac\n2. x = (-b ± √D) / 2a\n\nТеорема Виета: x₁+x₂ = -b/a, x₁·x₂ = c/a\n\nПример: x² - 7x + 12 = 0 → x₁=4, x₂=3 ✓"],
  ["производн", "Производная — скорость изменения функции.\n\n**Правила:**\n• (C)' = 0\n• (xⁿ)' = n·xⁿ⁻¹\n• (sin x)' = cos x\n• (cos x)' = -sin x\n• (eˣ)' = eˣ\n• (u+v)' = u'+v'\n• (uv)' = u'v + uv'\n\nПример: f(x) = x³+2x → f'(x) = 3x²+2 ✓"],
  ["интеграл", "Интеграл — обратная операция к производной.\n\n**Формулы:**\n• ∫xⁿ dx = xⁿ⁺¹/(n+1) + C\n• ∫sin x dx = -cos x + C\n• ∫cos x dx = sin x + C\n• ∫eˣ dx = eˣ + C\n\nНьютон-Лейбниц: ∫[a,b] f dx = F(b)-F(a)"],
  ["тригоном|синус|косинус|тангенс|sin|cos|tg", "Тригонометрия:\n• sin α = катет/гипотенуза\n• cos α = прилежащий/гипотенуза\n• tg α = sin/cos\n\n**Тождество:** sin²α + cos²α = 1\n\nТаблица: sin30°=0.5, sin45°=√2/2≈0.71, sin60°=√3/2≈0.87, sin90°=1"],
  ["логарифм", "Логарифм: **log_a(b) = x** → aˣ = b\n\n**Свойства:**\n• log(mn) = log m + log n\n• log(m/n) = log m - log n\n• log(mⁿ) = n·log m\n• log_a(a) = 1, log_a(1) = 0\n\nln x = log_e(x), lg x = log_10(x)"],
  ["прогресси", "**Арифметическая:** aₙ = a₁+(n-1)d, Sₙ = n(a₁+aₙ)/2\n\n**Геометрическая:** bₙ = b₁·qⁿ⁻¹, Sₙ = b₁(qⁿ-1)/(q-1)\nПри |q|<1: S∞ = b₁/(1-q)\n\nПример: b₁=2, q=3, n=4 → S=80 ✓"],
  ["вероятност", "Вероятность: **P(A) = m/n**\nm — благоприятные исходы, n — всего\n\n• 0 ≤ P ≤ 1\n• P(A) + P(Ā) = 1\n• P(A∪B) = P(A)+P(B)-P(A∩B)\n\nПример: 3 красных, 7 синих → P = 3/10 = 30% ✓"],
  ["линейн|систем", "Линейное уравнение: **ax + b = 0** → x = -b/a\n\nСистема (метод сложения):\n2x + y = 5\nx - y = 1\n→ Складываем → 3x=6 → x=2, y=1 ✓\n\nМетод подстановки: из одного выражаем, подставляем в другое"],
  ["степен|показател", "Свойства степеней:\n• aᵐ·aⁿ = aᵐ⁺ⁿ\n• aᵐ/aⁿ = aᵐ⁻ⁿ\n• (aᵐ)ⁿ = aᵐⁿ\n• a⁰ = 1, a⁻ⁿ = 1/aⁿ\n\nПоказательное уравнение: 2ˣ=8=2³ → x=3 ✓"],
  ["корен|√", "Квадратный корень: **√a = b** если b²=a (b≥0)\n\n• √(ab) = √a·√b\n• (√a)² = a, √(a²) = |a|\n• √12 = 2√3\n\nКорень n-й степени: ⁿ√a = a^(1/n)\nПример: ³√27 = 3, ⁴√16 = 2 ✓"],
  ["комбинатор|сочетани|перестановк|факториал|C(|A(|P(", "Комбинаторика:\n• **Перестановки:** P(n) = n!\n• **Размещения:** A(n,k) = n!/(n-k)!\n• **Сочетания:** C(n,k) = n!/(k!(n-k)!)\n\nПример: C(5,2) = 10 (выбрать 2 из 5)\nC(6,3) = 20 ✓"],
  ["площадь|периметр|объём|треугольник|прямоугольник|окружност|геометри", "Геометрия:\n• Треугольник: S = a·h/2; Пифагор: c²=a²+b²\n• Прямоугольник: S=a·b, P=2(a+b)\n• Круг: S=πr², C=2πr\n• Шар: V=4/3·πr³\n• Цилиндр: V=πr²h\n\nТеорема косинусов: c²=a²+b²-2ab·cosC"],
  ["функци|график|парабол", "Функции и графики:\n• Линейная: y=kx+b (прямая), k — наклон, b — сдвиг\n• Квадратная: y=ax²+bx+c (парабола), вершина x=-b/2a\n• Модуль: y=|x| (V-образный график)\n• Гипербола: y=k/x\n\nОбласть определения — допустимые значения x"],
  ["модул|абсолютн", "Модуль числа: **|a|** = a если a≥0, -a если a<0\n\n|a| ≥ 0 всегда\n\nУравнение |x| = a:\n• a > 0 → x = a или x = -a\n• a = 0 → x = 0\n• a < 0 → нет решений\n\nНеравенство |x| < a → -a < x < a ✓"],
  ["неравенств", "Линейное неравенство: ax + b > 0\n→ x > -b/a (при a>0) или x < -b/a (при a<0)\n\nКвадратное: x²-5x+6 > 0 → (x-2)(x-3) > 0 → x<2 или x>3\n\nОтрезок числовой оси — ответ неравенства.\nЗакрашенная точка ●=включено, открытая ○=не включено"],
];

function localReply(messages: { role: string; text: string }[]): string {
  const last = [...messages].reverse().find(m => m.role === "user")?.text ?? "";
  const q = last.toLowerCase();

  for (const [keys, ans] of KB) {
    if (keys.split("|").some(k => q.includes(k))) return ans;
  }

  if (/привет|здравствуй|хай|добрый/.test(q))
    return "Привет! 👋 Я ИИ-ассистент по математике.\n\nСпрашивай по любой теме:\nуравнения, тригонометрия, производные, интегралы, логарифмы, вероятность, геометрия и многое другое!";

  if (/спасибо|благодарю/.test(q))
    return "Пожалуйста! 😊 Если ещё что-то непонятно — спрашивай!";

  if (/умеешь|можешь|помоги|что знаешь/.test(q))
    return "Знаю всю школьную математику! 🎓\n\nТемы:\n• Уравнения (линейные, квадратные, системы)\n• Тригонометрия (sin, cos, tg)\n• Производные и интегралы\n• Логарифмы и степени\n• Прогрессии\n• Вероятность и комбинаторика\n• Геометрия\n• Функции и графики";

  // Простые вычисления
  if (/сколько|вычисли|посчитай|чему равно|реши/.test(q)) {
    const m = last.match(/[\d\s+\-*/.()+]+/);
    if (m && m[0].trim().length > 1) {
      try {
        const r = Function('"use strict"; return (' + m[0].trim() + ')')();
        if (typeof r === "number" && isFinite(r)) return `${m[0].trim()} = **${r}** ✓`;
      } catch { /* ignore */ }
    }
  }

  return `Хороший вопрос про «${last.slice(0, 40)}»! 🤔\n\nУточни — какая тема или конкретная задача?\n\nЯ знаю: уравнения, тригонометрию, производные, логарифмы, вероятность, геометрию и многое другое!`;
}

export function SolutionsPage({ onNavigate }: { onNavigate: (s: Section) => void }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h2 className="text-4xl font-heading font-black mb-3">
          <span className="text-gradient-fire">Решения</span>
        </h2>
        <p className="text-muted-foreground">Пошаговые разборы от ИИ-ассистента</p>
      </div>
      <div className="flex flex-col gap-5">
        {solutions.map((sol, i) => (
          <div key={sol.id} className="glass rounded-2xl overflow-hidden animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
            <div
              className="p-6 cursor-pointer glass-hover"
              onClick={() => setExpanded(expanded === sol.id ? null : sol.id)}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#9b5de5]/20 border border-[#9b5de5]/30 flex items-center justify-center flex-shrink-0">
                  <Icon name="Sparkles" size={20} className="text-[#9b5de5]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-heading font-bold">{sol.task}</h3>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="flex items-center gap-1 text-[#fee440]">
                        <Icon name="Star" size={14} className="fill-[#fee440]" />
                        <span className="text-sm font-bold">{sol.rating}</span>
                      </div>
                      <Icon name={expanded === sol.id ? "ChevronUp" : "ChevronDown"} size={16} className="text-muted-foreground" />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                    <span className="flex items-center gap-1"><Icon name="ListOrdered" size={13} />{sol.steps} шага</span>
                    <span className="flex items-center gap-1"><Icon name="Layers" size={13} />{sol.method}</span>
                    <span className="flex items-center gap-1"><Icon name="Eye" size={13} />{sol.views.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {expanded === sol.id && (
              <div className="border-t border-white/5 px-6 pb-6 pt-4 animate-fade-in">
                <div className="space-y-3">
                  {sol.stepDetails.map((step, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#9b5de5] to-[#4cc9f0] flex items-center justify-center flex-shrink-0 text-white text-xs font-bold mt-0.5">
                        {j + 1}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => onNavigate("ai")}
                  className="mt-4 flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  <Icon name="Bot" size={15} />
                  Задать уточняющий вопрос ИИ
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-8 glass rounded-2xl p-6 text-center border border-dashed border-white/10">
        <Icon name="Search" size={32} className="text-muted-foreground mx-auto mb-3" />
        <h3 className="font-heading font-bold mb-1">Не нашёл нужное решение?</h3>
        <p className="text-muted-foreground text-sm mb-4">Задай вопрос ИИ-ассистенту — он разберёт твою задачу пошагово</p>
        <button
          onClick={() => onNavigate("ai")}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#9b5de5] to-[#4cc9f0] text-white font-medium text-sm hover:opacity-90 transition-opacity"
        >
          Открыть ИИ-ассистент
        </button>
      </div>
    </div>
  );
}

export function AiPage() {
  const [messages, setMessages] = useState(initMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const send = async () => {
    if (!input.trim() || isTyping) return;
    const userText = input.trim();
    const newMessages = [...messages, { role: "user", text: userText }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);
    try {
      const res = await fetch(AI_CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
        signal: AbortSignal.timeout(8000),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "ai", text: data.reply }]);
    } catch {
      // Бэкенд недоступен — отвечаем локально
      const fallback = localReply(newMessages);
      setMessages(prev => [...prev, { role: "ai", text: fallback }]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10" style={{ height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
      <div className="mb-6 flex-shrink-0">
        <h2 className="text-4xl font-heading font-black mb-2">
          <span className="text-gradient-purple">ИИ-ассистент</span>
        </h2>
        <p className="text-muted-foreground">Задавай вопросы — получай пошаговые объяснения</p>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin space-y-4 pb-4 min-h-0">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 animate-fade-in ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            {msg.role === "ai" && (
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#9b5de5] to-[#4cc9f0] flex items-center justify-center flex-shrink-0">
                <Icon name="Sparkles" size={16} className="text-white" />
              </div>
            )}
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${msg.role === "user" ? "bg-primary text-white rounded-tr-sm" : "glass rounded-tl-sm"}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3 animate-fade-in">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#9b5de5] to-[#4cc9f0] flex items-center justify-center flex-shrink-0">
              <Icon name="Sparkles" size={16} className="text-white" />
            </div>
            <div className="glass rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1 items-center h-5">
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="flex gap-3 pt-4 border-t border-white/5 flex-shrink-0">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
          placeholder="Напиши свой вопрос..."
          className="flex-1 glass rounded-xl px-4 py-3 text-sm outline-none focus:border-primary/50 border border-transparent transition-colors placeholder:text-muted-foreground bg-transparent"
        />
        <button
          onClick={send}
          disabled={!input.trim() || isTyping}
          className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#9b5de5] to-[#4cc9f0] flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-30 flex-shrink-0"
        >
          <Icon name="Send" size={18} className="text-white" />
        </button>
      </div>
    </div>
  );
}

export function TemplatesPage({ onNavigate }: { onNavigate: (s: Section) => void }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  const copyTemplate = (tpl: typeof templates[0]) => {
    const text = tpl.steps.map((s, i) => `${i + 1}. ${s}`).join("\n");
    navigator.clipboard.writeText(`${tpl.title}\n\n${text}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h2 className="text-4xl font-heading font-black mb-3">
          <span className="text-gradient-ocean">Шаблоны</span> решений
        </h2>
        <p className="text-muted-foreground">Готовые алгоритмы для каждого типа задач</p>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {templates.map((tpl, i) => (
          <div key={tpl.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
            <div
              className={`glass rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${expanded === tpl.id ? 'glow-purple' : 'glass-hover'}`}
              onClick={() => setExpanded(expanded === tpl.id ? null : tpl.id)}
            >
              <div className={`h-1.5 bg-gradient-to-r ${tpl.color}`} />
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tpl.color} flex items-center justify-center`}>
                      <Icon name={tpl.icon} size={18} className="text-white" />
                    </div>
                    <h3 className="font-heading font-bold">{tpl.title}</h3>
                  </div>
                  <Icon name={expanded === tpl.id ? "ChevronUp" : "ChevronDown"} size={18} className="text-muted-foreground" />
                </div>
                {expanded === tpl.id && (
                  <div className="mt-5 space-y-3 animate-fade-in">
                    {tpl.steps.map((step, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${tpl.color} flex items-center justify-center flex-shrink-0 text-white text-xs font-bold mt-0.5`}>
                          {j + 1}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{step}</p>
                      </div>
                    ))}
                    <button
                      onClick={e => { e.stopPropagation(); copyTemplate(tpl); }}
                      className="mt-2 w-full py-2.5 rounded-xl border border-white/10 text-sm font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-2 text-foreground"
                    >
                      <Icon name="Copy" size={14} />
                      Скопировать шаблон
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 glass rounded-2xl p-6 bg-gradient-to-r from-[#9b5de5]/10 to-[#4cc9f0]/10 border border-[#9b5de5]/20">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#9b5de5] to-[#4cc9f0] flex items-center justify-center flex-shrink-0">
            <Icon name="Wand2" size={22} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-heading font-bold mb-1">Нужен персональный шаблон?</h3>
            <p className="text-sm text-muted-foreground">ИИ-ассистент создаст шаблон специально под твою задачу</p>
          </div>
          <button
            onClick={() => onNavigate("ai")}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#9b5de5] to-[#4cc9f0] text-white text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Создать
          </button>
        </div>
      </div>
    </div>
  );
}