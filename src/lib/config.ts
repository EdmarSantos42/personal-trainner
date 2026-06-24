/**
 * FONTE ÚNICA DE VERDADE de todo conteúdo editável da landing.
 *
 * Nenhum texto deve ser hardcoded em componentes — tudo vem daqui. Isto permite
 * editar a landing inteira sem tocar em código de UI e prepara o terreno para um
 * futuro CMS / painel de edição.
 *
 * Campos marcados como placeholder devem ser substituídos pelos dados reais
 * do João Paulo (CREF, contatos, foto).
 */

export const CONFIG = {
  brand: {
    name: "João Paulo",
    shortName: "JP",
    tagline: "Personal Trainer",
    fullTitle: "João Paulo · Personal Trainer",
  },

  personal: {
    name: "João Paulo",
    firstName: "João",
    lastName: "Paulo",
    initials: "JP",
    title: "Personal Trainer",
    cref: "CREF 000000-G/BA", // placeholder — substituir
    bio: "Transformo a vida dos meus alunos através de treino inteligente, acompanhamento de perto e métodos que realmente funcionam. Seja em casa, na academia ou online — meu compromisso é com o seu resultado.",
    quote:
      "Resultado de verdade vem de método, constância e acompanhamento certo. O resto é desculpa.",
    credentials: [
      "CREF 000000-G/BA",
      "Especialista em Treinamento Funcional",
      "Nutrição Esportiva Aplicada",
      "Atendimento presencial, domiciliar e online",
    ],
    whatsapp: "5577999999999", // placeholder — substituir
    instagram: "@joaopaulo.personal", // placeholder
    email: "contato@joaopaulopersonal.com.br", // placeholder
    photoUrl: null as string | null, // URL da foto real quando disponível
  },

  hero: {
    eyebrow: "Personal Trainer · Presencial · Domiciliar · Online",
    lines: ["SEU CORPO.", "SEU RITMO.", "SEU RESULTADO."],
    sub: "Treino personalizado, acompanhamento nutricional e um personal que vai até você. Comece sua transformação hoje.",
  },

  /**
   * Animação do hero frame-a-frame controlada pelo scroll.
   *
   * Os frames vivem em `public/hero/` nomeados frame-0000.webp ... frame-0081.webp
   * (numeração começa em `start`, com zeros à esquerda conforme `pad`).
   *
   * - `frameCount`: total de frames no conjunto.
   * - `frameCountMobile`: quantos carregar no mobile (amostrados do conjunto),
   *   mantendo o mesmo movimento sem pesar.
   * - `start`: número do primeiro frame (0 = frame-0000).
   * - `enabled`: false faz o hero exibir um placeholder no lugar da animação.
   */
  heroMedia: {
    enabled: true,
    frameCount: 82,
    frameCountMobile: 41,
    start: 0,
    path: "/hero/frame-{i}.webp",
    pad: 4,
    alt: "João Paulo treinando com halteres",
  },

  stats: [
    { value: 150, suffix: "+", label: "Alunos transformados" },
    { value: 5, suffix: " anos", label: "De experiência" },
    { value: 98, suffix: "%", label: "Taxa de satisfação" },
    { value: 3, suffix: "", label: "Modalidades de treino" },
  ],

  services: [
    {
      icon: "home",
      title: "Treino Domiciliar",
      desc: "Eu vou até você. Treino 100% adaptado ao seu espaço e aos equipamentos que você tem em casa.",
      benefits: ["Sem deslocamento", "Horário flexível", "No seu ambiente"],
    },
    {
      icon: "dumbbell",
      title: "Treino Presencial",
      desc: "Acompanhamento completo na academia da sua escolha, com correção de técnica e evolução medida.",
      benefits: ["Supervisão total", "Técnica correta", "Evolução medida"],
    },
    {
      icon: "monitor",
      title: "Treino Online",
      desc: "Planilha personalizada, suporte por vídeo e revisões semanais. Treine onde e quando quiser.",
      benefits: ["Flexibilidade total", "Suporte contínuo", "Revisão semanal"],
    },
    {
      icon: "utensils",
      title: "Consultoria Nutricional",
      desc: "Plano alimentar alinhado ao seu treino e objetivo. Incluso nos planos Performance e Elite.",
      benefits: ["Cardápio sob medida", "Alinhado ao treino", "Revisão mensal"],
    },
  ],

  quiz: [
    {
      q: "Qual é o seu principal objetivo?",
      opts: [
        { e: "🔥", t: "Emagrecer" },
        { e: "💪", t: "Ganhar massa" },
        { e: "⚡", t: "Performance" },
        { e: "🧘", t: "Saúde e bem-estar" },
      ],
    },
    {
      q: "Como você prefere treinar?",
      opts: [
        { e: "🏠", t: "Em casa" },
        { e: "🏋️", t: "Na academia" },
        { e: "📱", t: "Online" },
        { e: "🔀", t: "Tanto faz" },
      ],
    },
    {
      q: "Qual sua disponibilidade?",
      opts: [
        { e: "⏱️", t: "3x por semana" },
        { e: "📅", t: "5x por semana" },
        { e: "🗓️", t: "Todos os dias" },
        { e: "❓", t: "Ainda não sei" },
      ],
    },
  ],

  // Mapeia a resposta da pergunta 1 (índice) → plano recomendado
  quizMap: ["Performance", "Elite", "Elite", "Essencial"],

  steps: [
    {
      n: "01",
      title: "Responda o quiz",
      desc: "Descubro seu perfil em menos de 1 minuto.",
    },
    {
      n: "02",
      title: "Conversa gratuita",
      desc: "Eu entro em contato pra entender sua rotina e objetivos.",
    },
    {
      n: "03",
      title: "Plano sob medida",
      desc: "Monto treino + nutrição específicos pra você.",
    },
    {
      n: "04",
      title: "Evolução real",
      desc: "Acompanhamento contínuo com ajustes toda semana.",
    },
  ],

  plans: [
    {
      name: "Essencial",
      sub: "Pra quem está começando",
      prices: { monthly: 149, quarterly: 129, annual: 99 },
      highlight: false,
      features: [
        "Planilha de treino online",
        "Suporte por chat",
        "Revisão quinzenal",
        "Biblioteca de exercícios",
        "Consultoria nutricional",
      ],
      disabledFeatures: [4],
      cta: "Começar",
    },
    {
      name: "Performance",
      sub: "O mais escolhido",
      prices: { monthly: 349, quarterly: 299, annual: 249 },
      highlight: true,
      badge: "Mais escolhido",
      features: [
        "Treino presencial ou em casa (3x)",
        "Consultoria nutricional inclusa",
        "Suporte por chat e vídeo",
        "Revisão semanal",
        "Ajuste de planilha",
      ],
      disabledFeatures: [],
      cta: "Quero esse",
    },
    {
      name: "Elite",
      sub: "Resultado acelerado",
      prices: { monthly: 599, quarterly: 549, annual: 479 },
      highlight: false,
      features: [
        "Presencial + online (5x/semana)",
        "Nutrição com revisão mensal",
        "Suporte prioritário",
        "Check-in semanal por vídeo",
        "Ajustes em tempo real",
      ],
      disabledFeatures: [],
      cta: "Falar com João Paulo",
    },
  ],

  testimonials: [
    {
      name: "Ana Silva",
      goal: "Emagrecimento",
      result: "−12kg em 3 meses",
      text: "Nunca consegui resultado tão rápido. O João é presente, motivador e cobra na medida certa.",
      rating: 5,
    },
    {
      name: "Carlos Oliveira",
      goal: "Hipertrofia",
      result: "+8kg de massa em 6 meses",
      text: "Ganhei mais massa em 6 meses do que em 2 anos treinando sozinho. Método impecável.",
      rating: 5,
    },
    {
      name: "Mariana Costa",
      goal: "Saúde",
      result: "Qualidade de vida nova",
      text: "O treino em casa encaixou perfeito na minha rotina. Profissional de outro nível.",
      rating: 5,
    },
    {
      name: "Bruno Santos",
      goal: "Performance",
      result: "+40% na corrida em 5 meses",
      text: "Superou todas as expectativas. Recomendo de olhos fechados.",
      rating: 5,
    },
  ],

  faq: [
    {
      q: "Preciso ter equipamento em casa?",
      a: "Não. Eu avalio seu espaço e adapto 100% do treino. Muita coisa dá pra fazer só com peso do corpo e resultado excelente.",
    },
    {
      q: "Como funciona a parte nutricional?",
      a: "Depois de avaliar seus hábitos e objetivo, monto um cardápio sob medida com revisão mensal, alinhado ao seu treino.",
    },
    {
      q: "Dá pra combinar online com presencial?",
      a: "Dá sim. O plano Elite junta acompanhamento presencial com suporte online completo.",
    },
    {
      q: "Em quanto tempo vejo resultado?",
      a: "A maioria sente diferença nas primeiras 3 a 4 semanas. Resultado mais visível costuma vir entre 2 e 3 meses, com constância.",
    },
    {
      q: "Posso cancelar?",
      a: "Pode. Planos mensais cancelam com 15 dias de aviso. Fala comigo que a gente resolve do jeito que for melhor pra você.",
    },
    {
      q: "A primeira conversa é paga?",
      a: "Não, é gratuita e sem compromisso. É só um papo pra entender seu objetivo e ver se faz sentido a gente treinar junto.",
    },
  ],

  chat: {
    greeting:
      "Opa! 👋 Aqui é o João Paulo. Me conta: qual é o seu principal objetivo hoje?",
    // Saudação contextual quando o usuário vem do quiz. {plan} é substituído pelo plano recomendado.
    quizGreeting:
      "Boa! 🎯 Pelo seu quiz, o plano ideal pra você é o {plan}. Posso te explicar como ele funciona e já garantir sua primeira conversa gratuita. Como você se chama?",
    // Saudação contextual quando o usuário escolhe um plano direto na tabela de preços.
    planGreeting:
      "Ótima escolha! 💪 O plano {plan} é excelente. Vou te ajudar a começar agora mesmo, sem precisar responder nada de novo. Como você se chama?",
    placeholder: "Escreva sua mensagem...",
    proactiveDelay: 30000,
    proactiveMessage: "Posso te ajudar a achar o plano ideal pra você 💪",
    mode: "simulated", // "simulated" | "ai" | "human" — vira "ai"/"human" depois
    simulatedReplies: [
      {
        keywords: ["emagrecer", "emagrecimento", "perder peso", "secar", "gordura"],
        reply:
          "Show, emagrecimento é comigo mesmo! Monto um treino que acelera o gasto calórico junto com a nutrição certa pra você secar com saúde. Como você se chama?",
      },
      {
        keywords: ["massa", "hipertrofia", "ganhar músculo", "musculo", "crescer"],
        reply:
          "Boa! Pra ganhar massa o segredo é treino bem estruturado + nutrição alinhada. Eu monto tudo sob medida e acompanho sua evolução de perto. Bora começar?",
      },
      {
        keywords: ["casa", "domiciliar", "em casa"],
        reply:
          "Perfeito! No treino domiciliar eu vou até você e adapto tudo ao seu espaço, com ou sem equipamento. Sem desculpa de deslocamento. 💪",
      },
      {
        keywords: ["online", "distância", "distancia", "planilha"],
        reply:
          "No online você recebe planilha personalizada, suporte por vídeo e revisão toda semana. Treina onde e quando quiser, com acompanhamento de verdade.",
      },
      {
        keywords: ["preço", "preco", "valor", "quanto custa", "plano", "planos", "custa"],
        reply:
          "Tenho 3 planos: Essencial (a partir de R$99), Performance (o mais escolhido) e Elite (resultado acelerado). E a primeira conversa é gratuita! Quer que eu te ajude a escolher?",
      },
      {
        keywords: ["meu nome é", "me chamo", "sou o", "sou a", "pode me chamar"],
        reply:
          "Prazer! Me passa seu WhatsApp que eu te chamo pessoalmente pra montar seu plano e tirar todas as dúvidas. 📲",
      },
      {
        keywords: ["whatsapp", "número", "numero", "telefone", "zap", "celular"],
        reply:
          "Fechou! Anotei aqui e já já eu te chamo no WhatsApp pra darmos o próximo passo. Pode aguardar que o retorno é rápido. 🤝",
      },
    ],
    defaultReply:
      "Entendi! Me conta um pouco mais sobre o seu objetivo que eu te mostro o melhor caminho. Tô aqui pra te ajudar a começar. 💪",
  },

  nav: [
    { label: "Serviços", id: "servicos" },
    { label: "Resultados", id: "resultados" },
    { label: "Planos", id: "planos" },
    { label: "Dúvidas", id: "faq" },
  ],

  footer: {
    links: [
      { label: "Serviços", id: "servicos" },
      { label: "Planos", id: "planos" },
      { label: "Dúvidas", id: "faq" },
    ],
    copyright: "© 2026 João Paulo · Personal Trainer",
  },
} as const;

export type Config = typeof CONFIG;

export default CONFIG;
