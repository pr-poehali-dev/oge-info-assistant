export type Section = "home" | "theory" | "tasks" | "solutions" | "ai" | "templates";

export const navItems = [
  { id: "home" as Section, label: "Главная", icon: "Home" },
  { id: "theory" as Section, label: "Теория", icon: "BookOpen" },
  { id: "tasks" as Section, label: "Задания", icon: "ClipboardList" },
  { id: "solutions" as Section, label: "Решения", icon: "CheckCircle" },
  { id: "ai" as Section, label: "ИИ-ассистент", icon: "Bot" },
  { id: "templates" as Section, label: "Шаблоны", icon: "LayoutTemplate" },
];

export const theoryTopics = [
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

export const tasks = [
  { id: 1, title: "Решить систему уравнений", topic: "Линейные уравнения", difficulty: "Лёгкий", points: 10, solved: 1245, color: "#00f5d4" },
  { id: 2, title: "Найти корни уравнения", topic: "Квадратные уравнения", difficulty: "Средний", points: 20, solved: 987, color: "#9b5de5" },
  { id: 3, title: "Вычислить угол треугольника", topic: "Тригонометрия", difficulty: "Сложный", points: 30, solved: 543, color: "#f72585" },
  { id: 4, title: "Найти производную", topic: "Производная", difficulty: "Средний", points: 20, solved: 765, color: "#fee440" },
  { id: 5, title: "Задача на вероятность", topic: "Статистика", difficulty: "Лёгкий", points: 10, solved: 1120, color: "#4cc9f0" },
  { id: 6, title: "Сумма прогрессии", topic: "Прогрессии", difficulty: "Средний", points: 20, solved: 632, color: "#00f5d4" },
];

export const solutions = [
  { id: 1, task: "Решение системы: 2x+y=5, x-y=1", steps: 4, method: "Метод подстановки", rating: 4.9, views: 3421 },
  { id: 2, task: "Нахождение корней x²-5x+6=0", steps: 3, method: "Формула дискриминанта", rating: 4.8, views: 2876 },
  { id: 3, task: "Производная f(x)=x³+2x", steps: 2, method: "Правила дифференцирования", rating: 5.0, views: 1987 },
];

export const templates = [
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

export const initMessages = [
  { role: "ai", text: "Привет! Я твой ИИ-ассистент по математике 🎓 Задай любой вопрос по теме, и я объясню пошагово." },
  { role: "user", text: "Как найти дискриминант?" },
  { role: "ai", text: "Дискриминант — это число, которое помогает понять, сколько корней у квадратного уравнения:\n\nD = b² - 4ac\n\n• D > 0 → два различных корня\n• D = 0 → один корень (два равных)\n• D < 0 → нет вещественных корней\n\nХочешь разберём пример?" },
];
