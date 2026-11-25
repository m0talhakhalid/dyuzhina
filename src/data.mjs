// All site content lives here, in Russian (ru) and English (en).
// Edit this file, then run:  node src/build.mjs
// The build regenerates every HTML page in the repository root.

// ---------------------------------------------------------------------------
// Brand and contact details. The name is not final yet: change it here only.
// ---------------------------------------------------------------------------
export const site = {
  brand: { ru: 'Дюжина', en: 'Дюжина' },
  // Shown in the browser tab and search results after the page name.
  tagline: { ru: 'инжиниринг, софт и рост', en: 'engineering, software and growth' },
  // Public site address, used for canonical links and social previews.
  url: 'https://m0talhakhalid.github.io/dyuzhina/',
  // TODO: replace with an address on the company domain (for example hello@<domain>)
  // once the name is final. Every email link and button on the site reads from here.
  email: 'talhakhalidraja692@gmail.com',
  phone: '+79685849438',
  phoneDisplay: '+7 968 584-94-38',
  // WhatsApp number in international format, digits only.
  whatsapp: '79685849438',
  // Telegram username without "@" (preferred), or the phone number with "+".
  // A phone number only opens a chat if the account allows being found by number.
  telegram: '+79685849438',
};

// ---------------------------------------------------------------------------
// Services. Order here is the order on the site. "group" is growth or engineering.
// ---------------------------------------------------------------------------
export const groups = {
  growth: { ru: "Рост и цифра", en: "Growth & digital" },
  engineering: { ru: "Инженерия", en: "Engineering" },
};

export const services = [
  {
    slug: "marketing",
    group: "growth",
    color: "c-white",
    title: { ru: "Цифровой маркетинг и рост", en: "Digital marketing and growth" },
    intro: { ru: "B2B-кампании, аутрич и продающие материалы, которые приводят лиды и делают воронку прозрачной.", en: "B2B campaigns, outreach and sales material that bring in leads and keep the pipeline visible." },
    skills: [
      { ru: "B2B-маркетинг", en: "B2B marketing" },
      { ru: "Таргетированная реклама в соцсетях и ведение кампаний", en: "Paid social advertising and campaign management" },
      { ru: "Баннеры и креативы для разных стран, SMM и блогов Google", en: "Banners and creatives for different countries, SMM and Google blogs" },
      { ru: "Email-маркетинг: цепочки писем по жизненному циклу с сегментацией", en: "Email marketing: lifecycle sequences with segmentation" },
      { ru: "Базы лидов и поиск контактов", en: "Lead lists and contact sourcing" },
      { ru: "Персонализированные холодные письма и аутрич в LinkedIn", en: "Personalised cold email and LinkedIn outreach" },
      { ru: "Презентации и продающие материалы в фирменном стиле", en: "Brand-aligned decks and sales collateral" },
      { ru: "Отслеживание воронки и пайплайна", en: "Funnel and pipeline tracking" },
    ],
    tools: ["Google Workspace","Excel","PowerPoint","n8n"],
  },
  {
    slug: "automation",
    group: "growth",
    color: "c-blue",
    title: { ru: "Автоматизация процессов и RPA", en: "Workflow automation and RPA" },
    intro: { ru: "Убираем рутину из таблиц, почты и десктопных систем и превращаем её в надёжные процессы, которые работают по расписанию.", en: "We take repetitive work out of spreadsheets, inboxes and desktop systems and turn it into reliable, scheduled workflows." },
    skills: [
      { ru: "Сценарии n8n: сегментация клиентов и автоматизация между отделами", en: "n8n workflows for customer segmentation and cross-department automation" },
      { ru: "Google Apps Script и Sheets: письма должникам, плановая очистка данных", en: "Google Apps Script and Sheets: dunning emails, scheduled data cleaning" },
      { ru: "Трекинг продлений, рассылок и учёта обучения", en: "Tracking pipelines for renewals, outreach and training logs" },
      { ru: "Выдача лицензионных ключей на Python, gspread, Excel и email", en: "Licence-key fulfilment with Python, gspread, Excel and email" },
      { ru: "Веб-автоматизация на Playwright и Selenium", en: "Web automation with Playwright and Selenium" },
      { ru: "Десктопная RPA на pywinauto и pyautogui для выгрузки данных из ERP", en: "Desktop RPA with pywinauto and pyautogui for ERP data extraction" },
      { ru: "Скрипты PowerShell под Windows", en: "PowerShell scripting on Windows" },
      { ru: "Бизнес-автоматизация с ИИ на n8n и Gemini", en: "AI-backed business automations with n8n and Gemini" },
      { ru: "OCR и извлечение данных из документов: Tesseract, EasyOCR", en: "Document OCR and data extraction with Tesseract and EasyOCR" },
    ],
    tools: ["n8n","Apps Script","Python","Playwright","Selenium","pywinauto","PowerShell","Gemini","Tesseract"],
  },
  {
    slug: "ai",
    group: "growth",
    color: "c-red",
    title: { ru: "ИИ и машинное обучение", en: "AI and machine learning" },
    intro: { ru: "От RAG-чат-ботов и мультиагентных систем до компьютерного зрения и дообученных моделей: разрабатываем, проверяем и разворачиваем.", en: "From RAG chatbots and multi-agent systems to computer vision and fine-tuned models: built, evaluated and deployed." },
    skills: [
      { ru: "RAG-чат-боты: разбиение на фрагменты, эмбеддинги, векторный поиск, реранкинг, ссылки на источники", en: "RAG chatbots: chunking, embeddings, vector search, reranking, cited sources" },
      { ru: "Мультиагентные системы на LangGraph и LangChain, GraphRAG", en: "Multi-agent systems in LangGraph and LangChain, GraphRAG" },
      { ru: "Дообучение трансформеров в PyTorch: BERT, PubMedBERT, CLIP, GPT-2", en: "Fine-tuning transformers in PyTorch: BERT, PubMedBERT, CLIP, GPT-2" },
      { ru: "Компьютерное зрение: синтез и распознавание лиц, виртуальная примерка, жестовый язык, классификация изображений", en: "Computer vision: face synthesis and detection, virtual try-on, sign language, image classification" },
      { ru: "Генеративные модели: GAN, CycleGAN, диффузия, TimeGAN", en: "Generative models: GANs, CycleGAN, diffusion, TimeGAN" },
      { ru: "NLP: детекция ИИ-текста, анализ документов, моделирование персон", en: "NLP: AI-text detection, document analysis, persona modelling" },
      { ru: "Аудио-ML: распознавание музыки, созданной ИИ", en: "Audio ML: detecting AI-generated music" },
      { ru: "Физически информированные цифровые двойники для охлаждения дата-центров", en: "Physics-informed digital twins for data-centre cooling" },
      { ru: "Автономная миграция кода с TensorFlow на PyTorch", en: "Autonomous code migration, TensorFlow to PyTorch" },
      { ru: "Оценочные стенды, тестирование отказов и бюджеты задержек", en: "Evaluation harnesses, failure-mode testing and latency budgets" },
      { ru: "Развёртывание на Hugging Face, Gradio и Streamlit", en: "Deployment on Hugging Face, Gradio and Streamlit" },
    ],
    tools: ["PyTorch","TensorFlow","Hugging Face","LangChain","LangGraph","FAISS","ChromaDB","OpenAI","Anthropic","Gemini","OpenCV","MediaPipe"],
  },
  {
    slug: "software",
    group: "growth",
    color: "c-ice",
    title: { ru: "Веб, приложения и ПО", en: "Web, app and software" },
    intro: { ru: "Веб-платформы, бизнес-системы, мобильные и десктопные приложения: от базы данных до интерфейса.", en: "Web platforms, business systems, mobile and desktop apps, from the database to the interface." },
    skills: [
      { ru: "Full-stack веб-приложения: Next.js, React, TypeScript, Node.js, Express", en: "Full-stack web apps: Next.js, React, TypeScript, Node.js, Express" },
      { ru: "Бизнес-системы и ERP: коммерческие предложения, склад, закупки, учёт", en: "Business systems and ERP: quotations, inventory, procurement, accounting" },
      { ru: "Маркетплейсы и e-commerce с чатом в реальном времени", en: "Marketplaces and e-commerce with real-time chat" },
      { ru: "Мобильные приложения на Flutter и Android", en: "Mobile apps in Flutter and Android" },
      { ru: "Бэкенд и API: FastAPI, Flask, Go, GraphQL", en: "Backend APIs: FastAPI, Flask, Go, GraphQL" },
      { ru: "Базы данных: PostgreSQL, Supabase, MySQL, MongoDB, SQL Server, Neo4j", en: "Databases: PostgreSQL, Supabase, MySQL, MongoDB, SQL Server, Neo4j" },
      { ru: "Десктопные приложения на JavaFX и C# .NET", en: "Desktop apps in JavaFX and C# .NET" },
      { ru: "Дизайн сайтов и пользовательский опыт (UX)", en: "Website design and user experience" },
      { ru: "Сайты-портфолио и корпоративные сайты", en: "Portfolio and business websites" },
      { ru: "Скрипты для сайтов и баннеров", en: "Scripts for websites and banners" },
      { ru: "Инструменты на Python и интеграции с REST API", en: "Python tools and REST API integrations" },
      { ru: "Системная разработка на C++: параллельные вычисления (MPI, OpenMP), игры", en: "Systems work in C++: parallel computing with MPI and OpenMP, games" },
    ],
    tools: ["Next.js","React","TypeScript","Node.js","FastAPI","Go","GraphQL","Flutter","PostgreSQL","Supabase","MongoDB","Neo4j"],
  },
  {
    slug: "cloud",
    group: "growth",
    color: "c-white",
    title: { ru: "Облака, DevOps и инфраструктура", en: "Cloud, DevOps and infrastructure" },
    intro: { ru: "Контейнеры, инфраструктура как код, CI/CD и мониторинг, чтобы системы работали стабильно.", en: "Containers, infrastructure as code, CI/CD and monitoring that keep systems running." },
    skills: [
      { ru: "Развёртывание в Docker и Kubernetes", en: "Docker and Kubernetes deployments" },
      { ru: "CI/CD на GitHub Actions, GitOps с ArgoCD", en: "CI/CD with GitHub Actions, GitOps with ArgoCD" },
      { ru: "AWS EKS, Terraform и Ansible: инфраструктура как код", en: "AWS EKS, Terraform and Ansible infrastructure as code" },
      { ru: "Микросервисная архитектура", en: "Microservices architecture" },
      { ru: "Потоки Kafka, кэш Redis, векторные хранилища (pgvector, FAISS, ChromaDB)", en: "Kafka streaming, Redis caching, vector stores (pgvector, FAISS, ChromaDB)" },
      { ru: "Мониторинг в Prometheus и Grafana", en: "Monitoring with Prometheus and Grafana" },
      { ru: "Проектирование сетей: маршрутизация Cisco, DHCP, NAT, межсетевые экраны", en: "Network design: Cisco routing, DHCP, NAT, firewalls" },
      { ru: "Проверка типов, линтинг и превью-деплой на каждый pull request", en: "Type checks, linting and preview deploys on every pull request" },
      { ru: "Хостинг на Vercel и GitHub Pages", en: "Hosting on Vercel and GitHub Pages" },
    ],
    tools: ["Docker","Kubernetes","AWS EKS","Terraform","Ansible","ArgoCD","GitHub Actions","Prometheus","Grafana","Kafka","Redis","Vercel"],
  },
  {
    slug: "research",
    group: "growth",
    color: "c-blue",
    title: { ru: "Исследования, данные и тексты", en: "Research, data and technical writing" },
    intro: { ru: "Расчётные исследования, анализ данных и технические тексты уровня научной публикации.", en: "Simulation studies, data analysis and technical documents written to publication standard." },
    skills: [
      { ru: "Исследования CFD, FSI и мультифизики", en: "CFD, FSI and multiphysics research studies" },
      { ru: "Обзоры литературы и журнальные статьи в LaTeX и Overleaf", en: "Literature reviews and journal manuscripts in LaTeX and Overleaf" },
      { ru: "Научные статьи по ML с опубликованными препринтами", en: "ML research papers with published preprints" },
      { ru: "Анализ данных: pandas, статистические тесты, прогнозирование временных рядов", en: "Data analysis: pandas, statistical testing, time-series forecasting" },
      { ru: "Исследования в нефтяной геологии", en: "Petroleum geology research" },
      { ru: "Технические отчёты и регламенты (SOP)", en: "Technical reports and SOPs" },
    ],
    tools: ["LaTeX","pandas","Fortran","Tecplot","COMSOL","ANSYS Fluent"],
  },
  {
    slug: "sales",
    group: "growth",
    color: "c-red",
    title: { ru: "Продажи, клиентский успех и операции", en: "Sales, customer success and operations" },
    intro: { ru: "Развитие бизнеса, продления и цикл от заказа до оплаты, выстроенные так же тщательно, как инженерия.", en: "Business development, renewals and order-to-cash operations, run with the same care as engineering." },
    skills: [
      { ru: "Стратегия продаж и развитие нового бизнеса", en: "Sales strategy and new business development" },
      { ru: "Отношения с клиентами, коммуникация и переговоры", en: "Client relationships, communication and negotiation" },
      { ru: "Путь клиента (Customer Success Journey): Activate, Adopt, Advocate", en: "Customer Success Journeys: Activate, Adopt, Advocate" },
      { ru: "Продления для клиентов из США и Канады", en: "Renewals management for US and Canadian accounts" },
      { ru: "Order-to-cash: выдача лицензий, логистика, работа с дебиторкой", en: "Order-to-cash: licence fulfilment, logistics, AR follow-up" },
      { ru: "Продуктовые операции и поддержка", en: "Product operations and support" },
      { ru: "Руководство командой", en: "Team supervision" },
    ],
    tools: ["Google Workspace","Excel","PowerPoint","n8n"],
  },
  {
    slug: "training",
    group: "growth",
    color: "c-ice",
    title: { ru: "Обучение и образование", en: "Training and education" },
    intro: { ru: "Онбординг, программы для партнёров и лекции на русском и английском.", en: "Onboarding, partner programmes and lectures, delivered in English and Russian." },
    skills: [
      { ru: "Онбординг и обучение клиентов и партнёров", en: "Customer and partner onboarding and training" },
      { ru: "Программы обучения для ODM-партнёров", en: "Training programmes for ODM partners" },
      { ru: "Учёт обучения по всей команде", en: "Tracking team-wide training activity" },
      { ru: "Преподавание на университетском уровне", en: "University-level lecturing" },
      { ru: "Выступления перед разной аудиторией", en: "Presenting to a variety of audiences" },
      { ru: "Обучение на русском и английском", en: "Training delivered in English and Russian" },
    ],
    tools: ["PowerPoint","Google Workspace"],
  },
  {
    slug: "mechanical",
    group: "engineering",
    color: "c-white",
    title: { ru: "Конструирование и инженерные расчёты", en: "Mechanical design and simulation" },
    intro: { ru: "CAD, размерный анализ, прочностные, CFD- и мультифизические расчёты: от концепции до конструкции, готовой к производству.", en: "CAD, tolerance analysis, FEA, CFD and multiphysics, from first concept to a production-ready design." },
    skills: [
      { ru: "3D-моделирование и рабочие чертежи в SolidWorks", en: "3D CAD modelling and manufacturing drawings in SolidWorks" },
      { ru: "GD&T и размерные цепи: метод максимума-минимума и RSS", en: "GD&T and tolerance stack-ups, worst-case and RSS" },
      { ru: "Прочностной анализ (FEA) в ANSYS и SolidWorks", en: "FEA for structural integrity in ANSYS and SolidWorks" },
      { ru: "CFD-расчёты теплоотвода и течений в ANSYS Fluent", en: "CFD for thermal management and flow in ANSYS Fluent" },
      { ru: "Мультифизика в COMSOL: ламинарные течения, трассировка частиц, микрофлюидика", en: "Multiphysics in COMSOL: laminar flow, particle tracing, microfluidics" },
      { ru: "Взаимодействие жидкости и конструкции (FSI) на решателе на Fortran, обработка в Tecplot", en: "Fluid-structure interaction on a Fortran research solver, post-processed in Tecplot" },
      { ru: "Теплопередача, ОВиК и охлаждение дата-центров: жидкостное, иммерсионное, двухфазное", en: "Heat transfer, HVAC and data-centre cooling: liquid, immersion, two-phase" },
      { ru: "Мехатроника и управление: ПИД-регуляторы, фильтр Калмана, IMU, BLDC-двигатели", en: "Mechatronics and control: PID, Kalman filtering, IMU sensing, BLDC motors" },
      { ru: "Трибология: лазерное текстурирование поверхностей подшипников", en: "Tribology: laser surface texturing of bearings" },
      { ru: "Архитектура продукта от концепции до серийного производства", en: "Product architecture from concept to mass production" },
    ],
    tools: ["SolidWorks","ANSYS Mechanical","ANSYS Fluent","COMSOL","Tecplot","Fortran"],
  },
  {
    slug: "product",
    group: "engineering",
    color: "c-blue",
    title: { ru: "Разработка продукта и DFM", en: "Product development and DFM" },
    intro: { ru: "Детали, спроектированные под технологию изготовления: мехобработку, листовой металл, литьё под давлением или в песчаные формы.", en: "Parts designed for the process that will make them: machining, sheet metal, injection moulding or casting." },
    skills: [
      { ru: "Конструирование под ЧПУ: доступ инструмента, стандартные радиусы, оснастка, реальные допуски", en: "Design for CNC machining: tool access, standard radii, fixturing, realistic tolerances" },
      { ru: "Листовой металл: припуски на гиб, K-фактор, развёртки, разгрузочные пазы, запрессовка крепежа", en: "Sheet metal: bend allowances, K-factor, flat patterns, relief cuts, hardware insertion" },
      { ru: "Литьё пластмасс под давлением: равные стенки, уклоны, рёбра, бобышки, литники и линия разъёма", en: "Injection molding: uniform walls, draft, ribs, bosses, gates and parting lines" },
      { ru: "Литьё в песчаные формы: усадка, стержни, литниковая система, прибыли, припуски на обработку", en: "Sand casting: shrinkage, cores, gating, risering and machining stock" },
      { ru: "Быстрое прототипирование: 3D-печать FDM и SLA, композитные выкладки", en: "Rapid prototyping with FDM and SLA 3D printing, plus composite layups" },
      { ru: "CAD, чертежи и GD&T, готовые к производству", en: "Manufacture-ready CAD, drawings and GD&T" },
      { ru: "Работа с ODM-партнёрами над качеством и масштабированием", en: "Working with ODM partners on quality and scale-up" },
      { ru: "Поиск неисправностей на стыке железа и софта", en: "Hardware and software integration troubleshooting" },
      { ru: "Управление продуктом", en: "Product management" },
    ],
    tools: ["SolidWorks","ANSYS Mechanical"],
  },
  {
    slug: "hardware",
    group: "engineering",
    color: "c-red",
    title: { ru: "Оборудование и технологии совместной работы", en: "Hardware and workplace collaboration tech" },
    intro: { ru: "Поддержка и сопровождение интерактивных панелей и технологий для совместной работы.", en: "Support and operations for interactive displays and workplace collaboration technology." },
    skills: [
      { ru: "Поддержка и эксплуатация интерактивных панелей", en: "Interactive flat-panel product support and operations" },
      { ru: "Проверка регистрации устройств через API производителя (OEM)", en: "Device registration checks against OEM APIs" },
      { ru: "Массовая активация лицензионных ключей в MDM-порталах", en: "Bulk licence key redemption on MDM portals" },
      { ru: "Поиск неисправностей на стыке железа и софта", en: "Hardware and software integration troubleshooting" },
      { ru: "Технологии совместной работы нового поколения", en: "Next-generation workplace collaboration technology" },
    ],
    tools: ["Python","PowerShell","Excel"],
  },
  {
    slug: "energy",
    group: "engineering",
    color: "c-ice",
    title: { ru: "Энергетика, нефть и газ", en: "Energy, oil and gas" },
    intro: { ru: "Опыт на всех этапах отрасли: добыча, транспортировка и переработка, плюс основы энергетики и энергоэффективности.", en: "Field experience across upstream, midstream and downstream, plus power-plant and efficiency fundamentals." },
    skills: [
      { ru: "Каротажные работы (wireline) на удалённых нефтяных скважинах, апстрим", en: "Wireline logging operations at remote oil wells (upstream)" },
      { ru: "Транспорт и распределение газа, мидстрим", en: "Gas transmission and distribution (midstream)" },
      { ru: "Нефтепереработка, даунстрим", en: "Refining operations (downstream)" },
      { ru: "Процедуры с высокими требованиями к безопасности и решение задач на объекте", en: "Safety-critical procedures and on-site problem solving" },
      { ru: "Нефтяная геология: нефтематеринские породы, коллекторы и покрышки, ловушки, сейсморазведка", en: "Petroleum geology: source, reservoir and cap rocks, traps, seismic surveys" },
      { ru: "Основы работы электростанций, энерго- и водоэффективность", en: "Power plant fundamentals, energy and water efficiency" },
    ],
    tools: [],
  },
];

// ---------------------------------------------------------------------------
// Delivered projects. Only work that has actually been done belongs here.
// "category" drives the filter on the projects page; "services" links the
// project to the service pages it appears on.
// ---------------------------------------------------------------------------
export const projectCategories = [
  { id: 'web', label: { ru: "Веб и облака", en: "Web & cloud" } },
  { id: 'auto', label: { ru: "Автоматизация", en: "Automation" } },
  { id: 'ai', label: { ru: "ИИ и ML", en: "AI & ML" } },
  { id: 'eng', label: { ru: "Инженерия", en: "Engineering" } },
];

export const projects = [
  {
    slug: "erp",
    category: "web",
    services: ["software"],
    title: { ru: "ERP и система коммерческих предложений", en: "Client ERP and quotation system" },
    desc: { ru: "Коммерческие предложения, закупки, склад, учёт и ВЭД в одной системе для клиента.", en: "Quotations, procurement, inventory, accounting and import-export in one system." },
    tags: { ru: "Full-stack · ERP", en: "Full-stack · ERP" },
  },
  {
    slug: "marketplace",
    category: "web",
    services: ["software"],
    title: { ru: "Маркетплейс соцсетевых каналов", en: "Social-channel marketplace" },
    desc: { ru: "Площадка для продажи каналов в соцсетях с чатом в реальном времени.", en: "A marketplace for trading social media channels, with real-time chat." },
    tags: { ru: "Маркетплейс · Realtime", en: "Marketplace · Realtime" },
  },
  {
    slug: "eks-microservices",
    category: "web",
    services: ["cloud","software"],
    title: { ru: "Микросервисы в AWS EKS", en: "Microservices on AWS EKS" },
    desc: { ru: "Одиннадцать микросервисов, развёрнутых через Terraform и ArgoCD, с мониторингом.", en: "Eleven microservices deployed with Terraform, ArgoCD and monitoring." },
    tags: { ru: "AWS · Terraform · ArgoCD", en: "AWS · Terraform · ArgoCD" },
  },
  {
    slug: "ai-devops",
    category: "web",
    services: ["cloud","ai"],
    title: { ru: "DevOps-платформа с ИИ", en: "AI DevOps platform" },
    desc: { ru: "ИИ-ревью кода, анализ логов и GitOps в Kubernetes.", en: "AI code review, log analysis and GitOps on Kubernetes." },
    tags: { ru: "Kubernetes · GitOps", en: "Kubernetes · GitOps" },
  },
  {
    slug: "pet-care-app",
    category: "web",
    services: ["software","ai"],
    title: { ru: "Приложение для ухода за питомцами", en: "Pet-care mobile app" },
    desc: { ru: "Flutter и Go, определение породы и чат-бот ветеринара.", en: "Flutter and Go app with breed detection and a vet chatbot." },
    tags: { ru: "Flutter · Go", en: "Flutter · Go" },
  },
  {
    slug: "dunning-emails",
    category: "auto",
    services: ["automation","sales"],
    title: { ru: "Рассылка по просроченным счетам", en: "Overdue-invoice emailer" },
    desc: { ru: "Письма должникам прямо из отчёта по дебиторской задолженности.", en: "Sends dunning emails straight from an AR aging report." },
    tags: { ru: "Apps Script · Sheets", en: "Apps Script · Sheets" },
  },
  {
    slug: "licence-keys",
    category: "auto",
    services: ["automation","sales","hardware"],
    title: { ru: "Выдача лицензионных ключей", en: "Licence-key fulfilment" },
    desc: { ru: "Назначает ключи на 1 и 5 лет, выгружает их в Excel и пишет логистам.", en: "Assigns 1-year and 5-year keys, exports to Excel and emails logistics." },
    tags: { ru: "Python · gspread", en: "Python · gspread" },
  },
  {
    slug: "cs-segmentation",
    category: "auto",
    services: ["automation","sales"],
    title: { ru: "Сегментация клиентов по пути", en: "Customer-success segmentation" },
    desc: { ru: "Автоматически распределяет аккаунты по этапам пути клиента.", en: "Sorts accounts into journey stages automatically." },
    tags: { ru: "n8n", en: "n8n" },
  },
  {
    slug: "training-log",
    category: "auto",
    services: ["automation","training"],
    title: { ru: "Учёт обучения из календаря", en: "Training-log pipeline" },
    desc: { ru: "Собирает тренинги команды из Google Календаря в одну таблицу.", en: "Pulls team training sessions from Google Calendar into one sheet." },
    tags: { ru: "Apps Script · Календарь", en: "Apps Script · Calendar" },
  },
  {
    slug: "ats-resume",
    category: "auto",
    services: ["automation","ai"],
    title: { ru: "Адаптация резюме под ATS", en: "ATS résumé tailoring" },
    desc: { ru: "Оптимизация резюме под системы отбора кандидатов с помощью ИИ.", en: "AI-backed résumé optimisation for applicant tracking systems." },
    tags: { ru: "n8n · Gemini", en: "n8n · Gemini" },
  },
  {
    slug: "face-synthesis",
    category: "ai",
    services: ["ai","research"],
    title: { ru: "Синтез и распознавание лиц на трансформерах", en: "Transformer face synthesis and detection" },
    desc: { ru: "Генератор Vision Transformer на 252 млн параметров в паре с детектором XceptionNet.", en: "A 252M-parameter Vision Transformer generator paired with an XceptionNet detector." },
    tags: { ru: "ViT · PyTorch", en: "ViT · PyTorch" },
  },
  {
    slug: "gan-try-on",
    category: "ai",
    services: ["ai"],
    title: { ru: "Виртуальная примерка на GAN", en: "GAN virtual try-on" },
    desc: { ru: "Перенос одежды на фото человека со слиянием признаков по 41 каналу.", en: "Garment transfer onto a person image using 41-channel feature fusion." },
    tags: { ru: "GAN · PyTorch", en: "GANs · PyTorch" },
  },
  {
    slug: "osint-agents",
    category: "ai",
    services: ["ai"],
    title: { ru: "Агентная OSINT-платформа", en: "Agentic OSINT platform" },
    desc: { ru: "Мультиагентная система читает более 1000 статей в час через Kafka в граф Neo4j и ищет противоречия.", en: "A multi-agent system reading 1,000+ articles an hour through Kafka into a Neo4j graph, with contradiction checks." },
    tags: { ru: "LangGraph · Kafka · Neo4j", en: "LangGraph · Kafka · Neo4j" },
  },
  {
    slug: "code-migration",
    category: "ai",
    services: ["ai","software"],
    title: { ru: "Движок миграции кода из пяти агентов", en: "Five-agent code migration engine" },
    desc: { ru: "Переносит целые кодовые базы с TensorFlow на PyTorch и проверяет, что поведение совпадает.", en: "Moves whole codebases from TensorFlow to PyTorch and verifies the behaviour matches." },
    tags: { ru: "Агенты · TensorFlow · PyTorch", en: "Agents · TensorFlow · PyTorch" },
  },
  {
    slug: "sign-language",
    category: "ai",
    services: ["ai"],
    title: { ru: "Переводчик жестового языка в реальном времени", en: "Real-time sign language translator" },
    desc: { ru: "Распознавание ASL с точностью 99,6% при 25–30 кадрах в секунду.", en: "ASL recognition at 99.6% accuracy and 25 to 30 FPS." },
    tags: { ru: "Компьютерное зрение", en: "Computer vision" },
  },
  {
    slug: "ai-text-classifier",
    category: "ai",
    services: ["ai","research"],
    title: { ru: "Классификатор: человек или ИИ", en: "Human vs AI text classifier" },
    desc: { ru: "Ансамбль из шести моделей с F1 99,59%.", en: "An ensemble of six models reaching 99.59% F1." },
    tags: { ru: "NLP · Ансамбли", en: "NLP · Ensembles" },
  },
  {
    slug: "music-deepfakes",
    category: "ai",
    services: ["ai","research"],
    title: { ru: "Детектор музыкальных дипфейков", en: "AI music deepfake detector" },
    desc: { ru: "Автоэнкодер и трансформер распознают музыку, созданную ИИ, с точностью 95%.", en: "An autoencoder and Transformer model that flags AI-generated music at 95% accuracy." },
    tags: { ru: "Аудио-ML", en: "Audio ML" },
  },
  {
    slug: "multimodal-rag",
    category: "ai",
    services: ["ai"],
    title: { ru: "Мультимодальный RAG по PDF", en: "Multimodal RAG over PDFs" },
    desc: { ru: "Диалог с документами на текстовых и визуальных эмбеддингах и локальной LLaMA 3.2.", en: "Chat with documents using text and image embeddings and a local LLaMA 3.2." },
    tags: { ru: "RAG · LLaMA", en: "RAG · LLaMA" },
  },
  {
    slug: "gimbal",
    category: "eng",
    services: ["mechanical","product"],
    title: { ru: "Самостабилизирующийся двухосевой подвес", en: "Self-stabilizing 2-DOF gimbal" },
    desc: { ru: "Платформа удерживает тяжёлую нагрузку с помощью ПИД-регулирования, фильтра Калмана, IMU и BLDC-двигателей.", en: "A platform that holds heavy payloads steady using PID control, Kalman filtering, an IMU and BLDC motors." },
    tags: { ru: "ПИД · Калман · BLDC", en: "PID · Kalman · BLDC" },
  },
  {
    slug: "flapping-flags",
    category: "eng",
    services: ["mechanical","research","energy"],
    title: { ru: "Тандем гибких флагов для сбора энергии", en: "Tandem flapping-flag energy harvesting" },
    desc: { ru: "Взаимодействие жидкости и конструкции на CFD-решателе на Fortran, 36 параметрических расчётов.", en: "Fluid-structure interaction on a Fortran CFD solver across a 36-case parametric campaign." },
    tags: { ru: "Fortran · FSI · Tecplot", en: "Fortran · FSI · Tecplot" },
  },
  {
    slug: "microfluidic-sorter",
    category: "eng",
    services: ["mechanical","research"],
    title: { ru: "Микрофлюидный сортер клеток крови", en: "Microfluidic blood-cell sorter" },
    desc: { ru: "Геометрии каналов для разделения эритроцитов и лейкоцитов: ламинарное течение и трассировка частиц.", en: "Channel geometries for separating red and white blood cells, modelled with laminar flow and particle tracing." },
    tags: { ru: "COMSOL · Микрофлюидика", en: "COMSOL · Microfluidics" },
  },
  {
    slug: "cooling-twins",
    category: "eng",
    services: ["mechanical","research","energy"],
    title: { ru: "Цифровые двойники для охлаждения дата-центров", en: "Digital twins for data-centre cooling" },
    desc: { ru: "Обзор физически информированных двойников для жидкостного, иммерсионного и двухфазного охлаждения.", en: "A review of physics-informed digital twins for liquid, immersion and two-phase cooling." },
    tags: { ru: "Теплообмен · Двойники", en: "Thermal · Digital twins" },
  },
  {
    slug: "bearing-texturing",
    category: "eng",
    services: ["mechanical","research"],
    title: { ru: "Лазерное текстурирование роликовых подшипников", en: "Laser-textured roller bearings" },
    desc: { ru: "Трибология: текстуры на рабочих поверхностях конических роликовых подшипников.", en: "Tribology work on laser surface texturing of tapered roller bearings." },
    tags: { ru: "Трибология", en: "Tribology" },
  },
];

// ---------------------------------------------------------------------------
// How we work. Illustrations for each stage are in art.mjs (stepArt).
// ---------------------------------------------------------------------------
export const steps = [
  {
    title: { ru: "Задача", en: "Scope" },
    desc: { ru: "Начинаем с проблемы, ограничений и критериев готовности и фиксируем их письменно до начала работ.", en: "We start with the problem, the constraints and what done looks like, and write it down before any work begins." },
    chips: [{ ru: "Проблема", en: "Problem" }, { ru: "Ограничения", en: "Constraints" }, { ru: "Критерии готовности", en: "Definition of done" }],
  },
  {
    title: { ru: "Модель", en: "Model" },
    desc: { ru: "CAD, расчёт, прототип, архитектура системы или план кампании. Всё, что проверит идею до того, как в неё вложат деньги.", en: "CAD, simulation, a prototype, a system design or a campaign plan. Whatever tests the idea before money goes into it." },
    chips: [{ ru: "CAD", en: "CAD" }, { ru: "Расчёт", en: "Simulation" }, { ru: "Прототип", en: "Prototype" }, { ru: "Архитектура", en: "Architecture" }, { ru: "План кампании", en: "Campaign plan" }],
  },
  {
    title: { ru: "Сборка", en: "Build" },
    desc: { ru: "Чертежи для производства, рабочий код, автоматические пайплайны или живые кампании. Делают те же люди, что и моделировали.", en: "Manufacture-ready drawings, production code, automated pipelines or live campaigns, built by the people who modelled them." },
    chips: [{ ru: "Чертежи", en: "Drawings" }, { ru: "Код", en: "Code" }, { ru: "Пайплайны", en: "Pipelines" }, { ru: "Кампании", en: "Campaigns" }],
  },
  {
    title: { ru: "Передача", en: "Hand over" },
    desc: { ru: "Документация, регламенты и обучение для вашей команды, чтобы всё продолжало работать и после нас.", en: "Documentation, SOPs and training for your team, so the work keeps running after we step back." },
    chips: [{ ru: "Документация", en: "Documentation" }, { ru: "Регламенты", en: "SOPs" }, { ru: "Обучение", en: "Training" }],
  },
];

// ---------------------------------------------------------------------------
// About page.
// ---------------------------------------------------------------------------
export const manifesto = { ru: "Больше всего времени проекты теряют на передаче дел. Чертёж уходит в цех, который не видел расчётов, софт пишут люди, ни разу не говорившие с клиентом, а маркетинг узнаёт о продукте в день запуска. Мы держим эти передачи внутри одной небольшой команды: те, кто моделирует деталь, сами пишут скрипты для испытательного стенда, разворачивают дашборд и готовят письмо к запуску.", en: "Most projects lose time at the hand-off. The drawing reaches a shop that never saw the simulation, the software is written by people who never meet the customer, and marketing hears about the product at launch. We keep those hand-offs inside one small team: the people who model the part also script the test rig, deploy the dashboard and write the launch email." };

export const tools = [
  ["SolidWorks","ANSYS Mechanical","ANSYS Fluent","COMSOL","Tecplot","Fortran","PyTorch","TensorFlow","Hugging Face","LangChain","LangGraph","FAISS","ChromaDB","scikit-learn","XGBoost","OpenCV","MediaPipe","OpenAI","Anthropic","Gemini","Groq","Cohere","Ollama","n8n","Apps Script","Playwright","Selenium","pywinauto","PowerShell","LaTeX"],
  ["Next.js","React","TypeScript","Node.js","Express","FastAPI","Flask","Go","GraphQL","Flutter","Android Studio","PostgreSQL","Supabase","MySQL","MongoDB","SQL Server","Neo4j","Redis","Kafka","pandas","Docker","Kubernetes","AWS EKS","Terraform","Ansible","ArgoCD","GitHub Actions","Prometheus","Grafana","Vercel","Google Workspace","Excel","PowerPoint"],
];

// ---------------------------------------------------------------------------
// "What we can build for you" on the projects page. Keep this to work the team
// has delivered before or has direct, hands-on experience in.
// ---------------------------------------------------------------------------
export const capabilities = [
  { service: 'software', title: { ru: 'ERP и бизнес-системы', en: 'ERP and business systems' } },
  { service: 'software', title: { ru: 'Веб-платформы и маркетплейсы', en: 'Web platforms and marketplaces' } },
  { service: 'software', title: { ru: 'Мобильные приложения', en: 'Mobile apps' } },
  { service: 'ai', title: { ru: 'RAG-чат-боты и ИИ-агенты', en: 'RAG chatbots and AI agents' } },
  { service: 'ai', title: { ru: 'Компьютерное зрение', en: 'Computer vision' } },
  { service: 'automation', title: { ru: 'Автоматизация процессов и RPA', en: 'Workflow automation and RPA' } },
  { service: 'cloud', title: { ru: 'Облачная инфраструктура и DevOps', en: 'Cloud infrastructure and DevOps' } },
  { service: 'mechanical', title: { ru: 'CAD, прочностные и CFD-расчёты', en: 'CAD, FEA and CFD' } },
  { service: 'product', title: { ru: 'Подготовка изделия к производству', en: 'Design for manufacturing' } },
  { service: 'research', title: { ru: 'Исследования и технические отчёты', en: 'Research and technical reports' } },
  { service: 'marketing', title: { ru: 'B2B-лидогенерация и аутрич', en: 'B2B lead generation and outreach' } },
  { service: 'training', title: { ru: 'Обучение команд и партнёров', en: 'Team and partner training' } },
];
