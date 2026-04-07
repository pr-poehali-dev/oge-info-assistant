import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

type Section = "home" | "theory" | "tasks" | "solutions" | "ai" | "templates";

const navItems = [
  { id: "home" as Section, label: "Главная", icon: "Home" },
  { id: "theory" as Section, label: "Теория", icon: "BookOpen" },
  { id: "tasks" as Section, label: "Задания", icon: "ClipboardList" },
  { id: "solutions" as Section, label: "Решения", icon: "CheckCircle" },
  { id: "ai" as Section, label: "ИИ-ассистент", icon: "Bot" },
  { id: "templates" as Section, label: "Шаблоны", icon: "LayoutTemplate" },
];

const theoryTopics = [
  {
    id: 1,
    title: "Линейные уравнения",
    description: "Основы решения уравнений первой степени с одной переменной",
    duration: "12 мин",
    level: "Базовый",
    color: "from-[#9b5de5] to-[#4cc9f0]",
    icon: "Equal",
    tags: ["Алгебра", "ОГЭ"],
  },
  {
    id: 2,
    title: "Квадратные уравнения",
    description: "Дискриминант, формулы корней, теорема Виета",
    duration: "18 мин",
    level: "Средний",
    color: "from-[#f72585] to-[#fee440]",
    icon: "TrendingUp",
    tags: ["Алгебра", "ЕГЭ"],
  },
  {
    id: 3,
    title: "Тригонометрия",
    description: "Синус, косинус, тангенс — определения и основные формулы",
    duration: "25 мин",
    level: "Продвинутый",
    color: "from-[#00f5d4] to-[#9b5de5]",
    icon: "Activity",
    tags: ["Геометрия", "ЕГЭ"],
  },
  {
    id: 4,
    title: "Производная функции",
    description: "Правила дифференцирования и их применение",
    duration: "22 мин",
    level: "Продвинутый",
    color: "from-[#4cc9f0] to-[#f72585]",
    icon: "Zap",
    tags: ["Анализ", "ЕГЭ"],
  },
  {
    id: 5,
    title: "Геометрическая прогрессия",
    description: "Формулы суммы и n-го члена прогрессии",
    duration: "15 мин",
    level: "Средний",
    color: "from-[#fee440] to-[#00f5d4]",
    icon: "BarChart2",
    tags: ["Алгебра", "ОГЭ"],
  },
  {
    id: 6,
    title: "Вероятность и статистика",
    description: "Классическое определение, формулы подсчёта",
    duration: "20 мин",
    level: "Средний",
    color: "from-[#9b5de5] to-[#f72585]",
    icon: "PieChart",
    tags: ["Статистика", "ОГЭ"],
  },
];

const tasks = [
  { id: 1, title: "Решить систему уравнений", topic: "Линейные уравнения", difficulty: "Лёгкий", points: 10, solved: 1245, color: "#00f5d4" },
  { id: 2, title: "Найти корни уравнения", topic: "Квадратные уравнения", difficulty: "Средний", points: 20, solved: 987, color: "#9b5de5" },
  { id: 3, title: "Вычислить угол треугольника", topic: "Тригонометрия", difficulty: "Сложный", points: 30, solved: 543, color: "#f72585" },
  { id: 4, title: "Найти производную", topic: "Производная", difficulty: "Средний", points: 20, solved: 765, color: "#fee440" },
  { id: 5, title: "Задача на вероятность", topic: "Статистика", difficulty: "Лёгкий", points: 10, solved: 1120, color: "#4cc9f0" },
  { id: 6, title: "Сумма прогрессии", topic: "Прогрессии", difficulty: "Средний", points: 20, solved: 632, color: "#00f5d4" },
];

const solutions = [
  { id: 1, task: "Решение системы: 2x+y=5, x-y=1", steps: 4, method: "Метод подстановки", rating: 4.9, views: 3421 },
  { id: 2, task: "Нахождение корней x²-5x+6=0", steps: 3, method: "Формула дискриминанта", rating: 4.8, views: 2876 },
  { id: 3, task: "Производная f(x)=x³+2x", steps: 2, method: "Правила дифференцирования", rating: 5.0, views: 1987 },
];

const templates = [
  {
    id: 1,
    title: "Решение квадратного уравнения",
    icon: "FileText",
    color: "from-[#9b5de5] to-[#4cc9f0]",
    steps: ["Запиши уравнение в стандартной форме", "Найди дискриминант D = b²-4ac", "Вычисли корни по формуле", "Проверь ответ подстановкой"],
  },
  {
    id: 2,
    title: "Нахождение производной",
    icon: "Zap",
    color: "from-[#f72585] to-[#fee440]",
    steps: ["Определи тип функции", "Применяй правила дифференцирования", "Упрости результат", "Найди область определения"],
  },
  {
    id: 3,
    title: "Задача на вероятность",
    icon: "PieChart",
    color: "from-[#00f5d4] to-[#9b5de5]",
    steps: ["Определи пространство элементарных исходов", "Запиши благоприятные исходы", "Применяй формулу P = m/n", "Убедись что 0 ≤ P ≤ 1"],
  },
  {
    id: 4,
    title: "Тригонометрическое уравнение",
    icon: "Activity",
    color: "from-[#4cc9f0] to-[#f72585]",
    steps: ["Приведи к табличному виду", "Найди основное решение", "Запиши общую формулу", "Учти ОДЗ"],
  },
];

const initMessages = [
  { role: "ai", text: "Привет! Я твой ИИ-ассистент по математике 🎓 Задай любой вопрос по теме, и я объясню пошагово." },
  { role: "user", text: "Как найти дискриминант?" },
  { role: "ai", text: "Дискриминант — это число, которое помогает понять, сколько корней у квадратного уравнения:\n\nD = b² - 4ac\n\n• D > 0 → два различных корня\n• D = 0 → один корень (два равных)\n• D < 0 → нет вещественных корней\n\nХочешь разберём пример?" },
];

function VideoModal({ topic, onClose }: { topic: typeof theoryTopics[0]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-2xl glass rounded-2xl overflow-hidden animate-fade-in" onClick={e => e.stopPropagation()}>
        <div className={`h-72 bg-gradient-to-br ${topic.color} flex items-center justify-center relative`}>
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
            <Icon name="Play" size={32} className="text-white ml-1" />
          </div>
          <div className="absolute bottom-4 left-4">
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <Icon name="Sparkles" size={14} />
              <span>ИИ-объяснение • {topic.duration}</span>
            </div>
          </div>
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/50 transition-colors">
            <Icon name="X" size={16} />
          </button>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-heading font-bold text-white mb-2">{topic.title}</h3>
          <p className="text-muted-foreground mb-4">{topic.description}</p>
          <div className="flex gap-2 flex-wrap">
            {topic.tags.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">{tag}</span>
            ))}
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent">{topic.level}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePage({ onNavigate }: { onNavigate: (s: Section) => void }) {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden py-24 px-6">
        <div className="absolute inset-0 bg-mesh" />
        <div className="absolute top-20 left-1/4 w-72 h-72 rounded-full bg-[#9b5de5]/20 blur-[80px] animate-float" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-[#00f5d4]/15 blur-[100px] animate-float" style={{ animationDelay: '3s' }} />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 text-sm animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-[#00f5d4] animate-pulse" />
            <span className="text-muted-foreground">Платформа с ИИ-объяснениями</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-black mb-6 leading-tight animate-slide-up">
            Учись <span className="text-gradient-purple">умнее</span>,<br />
            решай <span className="text-gradient-fire">быстрее</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Интерактивные уроки, задания с разбором, ИИ-ассистент и видео-объяснения к каждой теме — всё в одном месте
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <button
              onClick={() => onNavigate("theory")}
              className="px-8 py-4 rounded-xl font-heading font-bold text-white bg-gradient-to-r from-[#9b5de5] to-[#4cc9f0] hover:opacity-90 transition-all hover:scale-105 glow-purple text-lg"
            >
              Начать обучение
            </button>
            <button
              onClick={() => onNavigate("ai")}
              className="px-8 py-4 rounded-xl font-heading font-bold glass hover:bg-white/10 transition-all hover:scale-105 border border-white/10 text-lg text-foreground"
            >
              <span className="flex items-center gap-2 justify-center">
                <Icon name="Bot" size={20} />
                Спросить ИИ
              </span>
            </button>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "50+", label: "Тем", color: "#9b5de5" },
            { value: "200+", label: "Заданий", color: "#00f5d4" },
            { value: "100%", label: "Разборов ИИ", color: "#f72585" },
            { value: "∞", label: "Попыток", color: "#fee440" },
          ].map((stat, i) => (
            <div key={i} className="glass rounded-2xl p-6 text-center glass-hover animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="text-3xl font-heading font-black mb-1" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-3">Всё для успешной учёбы</h2>
          <p className="text-center text-muted-foreground mb-12">Умная система, которая подстраивается под тебя</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "Video", title: "Видео с ИИ", desc: "Каждая тема — короткое видео с пошаговым объяснением от искусственного интеллекта", color: "#9b5de5", bg: "from-[#9b5de5]/10 to-transparent" },
              { icon: "Bot", title: "Чат-ассистент", desc: "Задавай вопросы в любое время — ИИ объяснит, подскажет и поможет разобраться", color: "#00f5d4", bg: "from-[#00f5d4]/10 to-transparent" },
              { icon: "LayoutTemplate", title: "Шаблоны решений", desc: "Готовые алгоритмы для каждого типа задач — следуй шагам и получай правильный ответ", color: "#f72585", bg: "from-[#f72585]/10 to-transparent" },
            ].map((f, i) => (
              <div key={i} className={`glass rounded-2xl p-6 glass-hover bg-gradient-to-br ${f.bg} animate-fade-in`} style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${f.color}20`, border: `1px solid ${f.color}40` }}>
                  <Icon name={f.icon} size={24} style={{ color: f.color }} />
                </div>
                <h3 className="text-lg font-heading font-bold mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-center mb-8">Быстрый доступ</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {navItems.slice(1).map((item, i) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="glass rounded-2xl p-5 flex items-center gap-3 glass-hover text-left animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Icon name={item.icon} size={20} className="text-primary" />
                </div>
                <span className="font-heading font-semibold text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function TheoryPage() {
  const [selectedTopic, setSelectedTopic] = useState<typeof theoryTopics[0] | null>(null);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h2 className="text-4xl font-heading font-black mb-3">
          <span className="text-gradient-purple">Теория</span>
        </h2>
        <p className="text-muted-foreground">Каждая тема сопровождается видео с ИИ-объяснением</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {theoryTopics.map((topic, i) => (
          <div
            key={topic.id}
            className="glass rounded-2xl overflow-hidden glass-hover cursor-pointer animate-fade-in"
            style={{ animationDelay: `${i * 0.1}s` }}
            onClick={() => setSelectedTopic(topic)}
          >
            <div className={`h-1.5 bg-gradient-to-r ${topic.color}`} />
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center`}>
                  <Icon name={topic.icon} size={18} className="text-white" />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Icon name="Clock" size={12} />
                  {topic.duration}
                </div>
              </div>
              <h3 className="font-heading font-bold text-base mb-1.5">{topic.title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed mb-3">{topic.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5 flex-wrap">
                  {topic.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-xs text-[#9b5de5] ml-2">
                  <Icon name="Video" size={12} />
                  <span>ИИ</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedTopic && <VideoModal topic={selectedTopic} onClose={() => setSelectedTopic(null)} />}
    </div>
  );
}

function TasksPage() {
  const [filter, setFilter] = useState("Все");
  const levels = ["Все", "Лёгкий", "Средний", "Сложный"];
  const filtered = filter === "Все" ? tasks : tasks.filter(t => t.difficulty === filter);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h2 className="text-4xl font-heading font-black mb-3">
          <span className="text-gradient-ocean">Задания</span>
        </h2>
        <p className="text-muted-foreground">Практикуйся — от простого к сложному</p>
      </div>
      <div className="flex gap-2 mb-8 flex-wrap">
        {levels.map(level => (
          <button
            key={level}
            onClick={() => setFilter(level)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === level ? "bg-primary text-white" : "glass hover:bg-white/10 text-muted-foreground"}`}
          >
            {level}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((task, i) => (
          <div key={task.id} className="glass rounded-2xl p-5 glass-hover animate-fade-in cursor-pointer" style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${task.color}20`, border: `1px solid ${task.color}40` }}>
                <Icon name="FileText" size={18} style={{ color: task.color }} />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${task.color}20`, color: task.color }}>{task.difficulty}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground">+{task.points} очков</span>
              </div>
            </div>
            <h3 className="font-heading font-bold mb-1">{task.title}</h3>
            <p className="text-xs text-muted-foreground mb-4">{task.topic}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Icon name="Users" size={12} />
                <span>{task.solved.toLocaleString()} решений</span>
              </div>
              <button className="flex items-center gap-1.5 text-xs font-medium text-primary hover:gap-2.5 transition-all">
                Решить <Icon name="ArrowRight" size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SolutionsPage() {
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

function AiPage() {
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

function TemplatesPage() {
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

export default function App() {
  const [active, setActive] = useState<Section>("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderPage = () => {
    switch (active) {
      case "home": return <HomePage onNavigate={setActive} />;
      case "theory": return <TheoryPage />;
      case "tasks": return <TasksPage />;
      case "solutions": return <SolutionsPage />;
      case "ai": return <AiPage />;
      case "templates": return <TemplatesPage />;
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-mesh opacity-60" />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-40">
        <div className="glass border-b border-white/5 px-6 py-3">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <button onClick={() => setActive("home")} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#9b5de5] to-[#4cc9f0] flex items-center justify-center">
                <Icon name="GraduationCap" size={16} className="text-white" />
              </div>
              <span className="font-heading font-black text-lg hidden sm:block">
                Edu<span className="text-gradient-purple">AI</span>
              </span>
            </button>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    active === item.id
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  <Icon name={item.icon} size={15} />
                  {item.label}
                </button>
              ))}
            </div>

            <button
              className="md:hidden glass w-9 h-9 rounded-xl flex items-center justify-center"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <Icon name={mobileOpen ? "X" : "Menu"} size={18} />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden glass border-b border-white/5 px-6 py-3 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => { setActive(item.id); setMobileOpen(false); }}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                    active === item.id
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  <Icon name={item.icon} size={16} />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="pt-16 relative z-10">
        {renderPage()}
      </main>
    </div>
  );
}
