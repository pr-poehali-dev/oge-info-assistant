import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Section, navItems, theoryTopics, tasks } from "@/data/content";

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

export function HomePage({ onNavigate }: { onNavigate: (s: Section) => void }) {
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

export function TheoryPage() {
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

export function TasksPage() {
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
