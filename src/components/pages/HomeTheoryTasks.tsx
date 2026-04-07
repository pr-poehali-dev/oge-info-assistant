import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Section, navItems, theoryTopics, tasks } from "@/data/content";

function VideoModal({ topic, onClose, onNavigate }: { topic: typeof theoryTopics[0]; onClose: () => void; onNavigate: (s: Section) => void }) {
  const [tab, setTab] = useState<"video" | "theory">("video");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-2xl glass rounded-2xl overflow-hidden animate-fade-in" onClick={e => e.stopPropagation()}>
        {/* Tabs */}
        <div className="flex border-b border-white/10">
          <button
            onClick={() => setTab("video")}
            className={`flex-1 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${tab === "video" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Icon name="PlayCircle" size={15} />
            Видео-объяснение
          </button>
          <button
            onClick={() => setTab("theory")}
            className={`flex-1 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${tab === "theory" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Icon name="BookOpen" size={15} />
            Теория
          </button>
          <button onClick={onClose} className="px-4 text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="X" size={18} />
          </button>
        </div>

        {tab === "video" ? (
          <div>
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${topic.videoId}?rel=0&modestbranding=1`}
                title={topic.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-4 flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${topic.color} flex items-center justify-center flex-shrink-0`}>
                <Icon name="Sparkles" size={14} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-medium">{topic.title}</p>
                <p className="text-xs text-muted-foreground">{topic.duration} • {topic.level}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <h3 className="text-xl font-heading font-bold mb-4">{topic.title}</h3>
            <pre className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap font-sans">{topic.content}</pre>
            <div className="mt-5 flex gap-2 flex-wrap">
              {topic.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">{tag}</span>
              ))}
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent">{topic.level}</span>
            </div>
            <button
              onClick={() => { onClose(); onNavigate("ai"); }}
              className="mt-5 flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
            >
              <Icon name="Bot" size={15} />
              Задать вопрос ИИ-ассистенту
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function TaskModal({ task, onClose, onNavigate }: { task: typeof tasks[0]; onClose: () => void; onNavigate: (s: Section) => void }) {
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-lg glass rounded-2xl overflow-hidden animate-fade-in" onClick={e => e.stopPropagation()}>
        <div className={`h-1.5 bg-gradient-to-r`} style={{ background: `linear-gradient(to right, ${task.color}, ${task.color}88)` }} />
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${task.color}20`, color: task.color }}>{task.difficulty}</span>
                <span className="text-xs text-muted-foreground">+{task.points} очков</span>
              </div>
              <h3 className="text-lg font-heading font-bold">{task.title}</h3>
              <p className="text-xs text-muted-foreground">{task.topic}</p>
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="X" size={18} />
            </button>
          </div>

          {/* Условие */}
          <div className="glass rounded-xl p-4 mb-4">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{task.condition}</p>
          </div>

          {/* Подсказка */}
          {!showHint ? (
            <button
              onClick={() => setShowHint(true)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3"
            >
              <Icon name="Lightbulb" size={14} />
              Показать подсказку
            </button>
          ) : (
            <div className="flex items-start gap-2 bg-[#fee440]/10 border border-[#fee440]/20 rounded-xl p-3 mb-4 animate-fade-in">
              <Icon name="Lightbulb" size={14} className="text-[#fee440] mt-0.5 flex-shrink-0" />
              <p className="text-sm text-[#fee440]">{task.hint}</p>
            </div>
          )}

          {/* Решение */}
          {!showSolution ? (
            <button
              onClick={() => setShowSolution(true)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#9b5de5] to-[#4cc9f0] text-white font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Показать решение
            </button>
          ) : (
            <div className="animate-fade-in">
              <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wide">Пошаговое решение</p>
              <div className="space-y-2 mb-4">
                {task.solution.map((step, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#9b5de5] to-[#4cc9f0] flex items-center justify-center flex-shrink-0 text-white text-xs font-bold mt-0.5">
                      {j + 1}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 bg-[#00f5d4]/10 border border-[#00f5d4]/20 rounded-xl p-3">
                <Icon name="CheckCircle" size={14} className="text-[#00f5d4] flex-shrink-0" />
                <p className="text-sm font-medium text-[#00f5d4]">Ответ: {task.answer}</p>
              </div>
              <button
                onClick={() => { onClose(); onNavigate("ai"); }}
                className="mt-3 flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
              >
                <Icon name="Bot" size={15} />
                Задать вопрос ИИ по этой задаче
              </button>
            </div>
          )}
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
              { icon: "Video", title: "Видео с ИИ", desc: "Каждая тема — короткое видео с пошаговым объяснением от искусственного интеллекта", color: "#9b5de5", bg: "from-[#9b5de5]/10 to-transparent", nav: "theory" as Section },
              { icon: "Bot", title: "Чат-ассистент", desc: "Задавай вопросы в любое время — ИИ объяснит, подскажет и поможет разобраться", color: "#00f5d4", bg: "from-[#00f5d4]/10 to-transparent", nav: "ai" as Section },
              { icon: "LayoutTemplate", title: "Шаблоны решений", desc: "Готовые алгоритмы для каждого типа задач — следуй шагам и получай правильный ответ", color: "#f72585", bg: "from-[#f72585]/10 to-transparent", nav: "templates" as Section },
            ].map((f, i) => (
              <div
                key={i}
                onClick={() => onNavigate(f.nav)}
                className={`glass rounded-2xl p-6 glass-hover bg-gradient-to-br ${f.bg} animate-fade-in cursor-pointer`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${f.color}20`, border: `1px solid ${f.color}40` }}>
                  <Icon name={f.icon} size={24} style={{ color: f.color }} />
                </div>
                <h3 className="text-lg font-heading font-bold mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                <div className="mt-3 flex items-center gap-1 text-sm font-medium" style={{ color: f.color }}>
                  Перейти <Icon name="ArrowRight" size={13} />
                </div>
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

export function TheoryPage({ onNavigate }: { onNavigate: (s: Section) => void }) {
  const [selectedTopic, setSelectedTopic] = useState<typeof theoryTopics[0] | null>(null);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h2 className="text-4xl font-heading font-black mb-3">
          <span className="text-gradient-purple">Теория</span>
        </h2>
        <p className="text-muted-foreground">Нажми на тему — откроется видео-объяснение и теория</p>
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
                  <Icon name="PlayCircle" size={13} />
                  <span>Видео + теория</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedTopic && <VideoModal topic={selectedTopic} onClose={() => setSelectedTopic(null)} onNavigate={onNavigate} />}
    </div>
  );
}

export function TasksPage({ onNavigate }: { onNavigate: (s: Section) => void }) {
  const [filter, setFilter] = useState("Все");
  const [selectedTask, setSelectedTask] = useState<typeof tasks[0] | null>(null);
  const levels = ["Все", "Лёгкий", "Средний", "Сложный"];
  const filtered = filter === "Все" ? tasks : tasks.filter(t => t.difficulty === filter);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h2 className="text-4xl font-heading font-black mb-3">
          <span className="text-gradient-ocean">Задания</span>
        </h2>
        <p className="text-muted-foreground">Нажми на задачу — увидишь условие, подсказку и разбор</p>
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
          <div
            key={task.id}
            className="glass rounded-2xl p-5 glass-hover animate-fade-in cursor-pointer"
            style={{ animationDelay: `${i * 0.08}s` }}
            onClick={() => setSelectedTask(task)}
          >
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
              <div className="flex items-center gap-1.5 text-xs font-medium text-primary">
                Открыть <Icon name="ArrowRight" size={12} />
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedTask && <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} onNavigate={onNavigate} />}
    </div>
  );
}
