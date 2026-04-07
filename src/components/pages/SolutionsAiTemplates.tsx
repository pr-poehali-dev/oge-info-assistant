import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";
import { solutions, templates, initMessages } from "@/data/content";

export function SolutionsPage() {
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
          <div key={sol.id} className="glass rounded-2xl p-6 glass-hover cursor-pointer animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#9b5de5]/20 border border-[#9b5de5]/30 flex items-center justify-center flex-shrink-0">
                <Icon name="Sparkles" size={20} className="text-[#9b5de5]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-heading font-bold">{sol.task}</h3>
                  <div className="flex items-center gap-1 text-[#fee440] flex-shrink-0">
                    <Icon name="Star" size={14} className="fill-[#fee440]" />
                    <span className="text-sm font-bold">{sol.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 flex-wrap">
                  <span className="flex items-center gap-1"><Icon name="ListOrdered" size={13} />{sol.steps} шага</span>
                  <span className="flex items-center gap-1"><Icon name="Layers" size={13} />{sol.method}</span>
                  <span className="flex items-center gap-1"><Icon name="Eye" size={13} />{sol.views.toLocaleString()}</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-1.5">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#9b5de5] to-[#4cc9f0]" style={{ width: `${(sol.steps / 5) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 glass rounded-2xl p-6 text-center border border-dashed border-white/10">
        <Icon name="Search" size={32} className="text-muted-foreground mx-auto mb-3" />
        <h3 className="font-heading font-bold mb-1">Не нашёл нужное решение?</h3>
        <p className="text-muted-foreground text-sm mb-4">Задай вопрос ИИ-ассистенту — он разберёт твою задачу пошагово</p>
        <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#9b5de5] to-[#4cc9f0] text-white font-medium text-sm hover:opacity-90 transition-opacity">
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

  const send = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: "user", text: input }]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "ai",
        text: "Отличный вопрос! Давай разберём это пошагово. Для более точного ответа уточни, какую тему мы изучаем — и я подготовлю подробное объяснение с примерами 🎯",
      }]);
      setIsTyping(false);
    }, 1500);
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
          disabled={!input.trim()}
          className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#9b5de5] to-[#4cc9f0] flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-30 flex-shrink-0"
        >
          <Icon name="Send" size={18} className="text-white" />
        </button>
      </div>
    </div>
  );
}

export function TemplatesPage() {
  const [expanded, setExpanded] = useState<number | null>(null);

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
                    <button className="mt-2 w-full py-2.5 rounded-xl border border-white/10 text-sm font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-2 text-foreground">
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
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#9b5de5] to-[#4cc9f0] text-white text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap">
            Создать
          </button>
        </div>
      </div>
    </div>
  );
}
