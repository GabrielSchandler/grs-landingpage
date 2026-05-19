import {
  AlertTriangle,
  BadgeCheck,
  Banknote,
  Building2,
  Car,
  CheckCircle2,
  CircleDollarSign,
  ClipboardCheck,
  FileQuestion,
  FileSearch,
  FileText,
  HandCoins,
  HeartHandshake,
  Home,
  LockKeyhole,
  MapPin,
  MessageCircle,
  PhoneCall,
  Scale,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";

export const navItems = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#contratos", label: "Contratos analisados" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#faq", label: "Dúvidas frequentes" },
];

export const heroCopy = {
  title: "Você sente que paga muito, mas a dívida nunca diminui?",
  subtitle:
    "A GRS analisa contratos de financiamento para identificar possíveis juros abusivos, tarifas indevidas e cobranças acima dos parâmetros de mercado.",
  support:
    "Muitos clientes só procuram ajuda quando a parcela já compromete o orçamento. Entender o contrato antes pode evitar um problema ainda maior.",
  diagnosticTitle: "Diagnóstico técnico do contrato",
  diagnosticText: "Taxa • CET • Parcelas • Histórico",
};

export const heroBadges = [
  { label: "Atendimento consultivo", icon: HeartHandshake },
  { label: "Análise individual", icon: FileSearch },
  { label: "Sem promessa irresponsável", icon: ShieldCheck },
];

export const heroIndicators = [
  { title: "Atendimento humanizado", icon: HeartHandshake },
  { title: "Análise técnica especializada", icon: BadgeCheck },
  { title: "Atendimento em todo Brasil", icon: MapPin },
];

export const pains = [
  {
    title: "Parcela cada vez mais pesada",
    description: "Você paga mês após mês, mas sente que a dívida quase não diminui.",
    icon: CircleDollarSign,
  },
  {
    title: "Medo de atrasar",
    description: "Qualquer imprevisto já começa a colocar o financiamento em risco.",
    icon: AlertTriangle,
  },
  {
    title: "Financiamento virou uma bola de neve",
    description: "O valor total pago ao final parece muito maior do que o esperado.",
    icon: TrendingUp,
  },
  {
    title: "Pressão e cobranças",
    description: "Atrasos aumentam ansiedade, cobranças e preocupação com o veículo.",
    icon: ShieldAlert,
  },
  {
    title: "Dúvida sobre juros",
    description: "Muitos clientes não sabem se a taxa contratada está dentro do padrão esperado.",
    icon: Search,
  },
  {
    title: "Contrato difícil de entender",
    description: "CET, tarifas, seguros e encargos deixam a leitura confusa.",
    icon: FileQuestion,
  },
];

export const processSteps = [
  {
    title: "Você envia os dados principais",
    description:
      "Coletamos informações básicas do financiamento, como parcela, banco, prazo, valores pagos e possíveis atrasos.",
    icon: FileText,
  },
  {
    title: "Analisamos o contrato com critério",
    description:
      "Avaliamos juros, CET, tarifas, seguros, saldo devedor e comparação com parâmetros técnicos de mercado.",
    icon: FileSearch,
  },
  {
    title: "Identificamos possíveis pontos questionáveis",
    description: "Verificamos se há indícios de cobranças excessivas, tarifas indevidas ou desequilíbrio contratual.",
    icon: ClipboardCheck,
  },
  {
    title: "Orientamos o melhor caminho",
    description:
      "Com base na análise, indicamos se faz sentido seguir com negociação, revisão ou acompanhamento especializado.",
    icon: MessageCircle,
  },
];

export const whyClients = [
  { title: "Parcelas acima do orçamento", icon: Banknote },
  { title: "Medo de busca e apreensão", icon: ShieldAlert },
  { title: "Dívida crescendo rápido", icon: TrendingUp },
  { title: "Financiamentos difíceis de manter", icon: AlertTriangle },
  { title: "Falta de clareza no contrato", icon: FileQuestion },
  { title: "Necessidade de orientação segura", icon: HeartHandshake },
];

export const contracts = [
  { title: "Financiamento de veículos", icon: Car },
  { title: "Financiamento imobiliário", icon: Home },
  { title: "Empréstimos pessoais", icon: HandCoins },
  { title: "Consignados", icon: FileText },
  { title: "Renegociações bancárias", icon: Building2 },
];

export const authorityCards = [
  {
    title: "Análise técnica",
    text: "Leitura criteriosa de juros, CET, tarifas, parcelas e histórico do contrato.",
    icon: FileSearch,
  },
  {
    title: "Respeito à LGPD",
    text: "Dados tratados com cuidado e usados para diagnóstico e contato consultivo.",
    icon: LockKeyhole,
  },
  {
    title: "Atendimento especializado",
    text: "Orientação simples, direta e responsável para cada situação.",
    icon: Users,
  },
  {
    title: "Acompanhamento consultivo",
    text: "Você entende o cenário antes de tomar qualquer decisão sobre o contrato.",
    icon: Scale,
  },
];

export const authorityBullets = [
  "Análise individual do contrato",
  "Linguagem simples e objetiva",
  "Orientação segura e responsável",
  "Atendimento consultivo",
  "Tratamento adequado dos dados",
  "Sem promessa de resultado garantido",
];

export const leadCards = [
  {
    title: "Sem compromisso",
    text: "Você entende se há sinais de alerta antes de tomar qualquer decisão.",
    icon: CheckCircle2,
  },
  {
    title: "Diagnóstico inicial",
    text: "Avaliamos os principais dados do contrato e da parcela.",
    icon: FileSearch,
  },
  {
    title: "Atendimento humano",
    text: "Um especialista conversa com você para entender o cenário.",
    icon: PhoneCall,
  },
];

export const testimonials = [
  {
    title: "Atendimento claro e profissional",
    quote:
      "A equipe explicou meu contrato de forma simples, com calma e sem prometer milagre. Me senti muito mais seguro para entender os próximos passos.",
    author: "Carlos",
    location: "São Paulo, SP",
    rating: 5,
  },
  {
    title: "Sem pressão e com orientação",
    quote:
      "Gostei porque primeiro entenderam minha situação, depois explicaram as possibilidades de forma responsável. O atendimento foi humano e direto.",
    author: "Juliana",
    location: "Belo Horizonte, MG",
    rating: 5,
  },
  {
    title: "Finalmente entendi o que estava pagando",
    quote:
      "Eu via CET, juros e tarifas no contrato, mas não sabia interpretar. A análise trouxe clareza e mostrou pontos que eu precisava observar melhor.",
    author: "Rafael",
    location: "Curitiba, PR",
    rating: 5,
  },
  {
    title: "Equipe muito atenciosa",
    quote:
      "Tive um atendimento cuidadoso desde o primeiro contato. Explicaram o que seria analisado e deixaram claro que tudo dependia do caso concreto.",
    author: "Fernanda",
    location: "Goiânia, GO",
    rating: 5,
  },
  {
    title: "Me ajudou a organizar a situação",
    quote:
      "Eu estava preocupado com as parcelas atrasadas e não sabia por onde começar. A conversa foi objetiva e me deu mais clareza sobre o contrato.",
    author: "André",
    location: "Rio de Janeiro, RJ",
    rating: 5,
  },
  {
    title: "Análise séria",
    quote:
      "O que mais gostei foi a postura técnica. Não senti exagero nem promessa vazia, só uma orientação bem feita sobre meu financiamento.",
    author: "Patrícia",
    location: "Florianópolis, SC",
    rating: 5,
  },
];

export const socialProofStats = [
  { title: "Orientação clara", text: "sem juridiquês desnecessário", icon: Sparkles },
  { title: "Avaliação individual", text: "cada contrato é lido no seu contexto", icon: FileSearch },
  { title: "Atendimento consultivo", text: "sem pressão e sem promessa vazia", icon: Star },
];

export const faqs = [
  {
    question: "A análise garante redução da parcela?",
    answer:
      "Não. A análise serve para identificar se existem indícios técnicos de cobrança questionável. Qualquer possibilidade de redução depende do contrato, do histórico de pagamento e da estratégia adequada para o caso.",
  },
  {
    question: "Revisão de juros é calote?",
    answer:
      "Não. Revisão de juros é uma análise técnica e jurídica para verificar se as cobranças do contrato estão corretas. O objetivo não é eliminar uma obrigação legítima, mas avaliar possíveis abusos ou irregularidades.",
  },
  {
    question: "Posso analisar contrato com parcelas atrasadas?",
    answer:
      "Sim. Contratos com atraso podem exigir uma avaliação ainda mais cuidadosa, principalmente quando há cobrança, negativação ou risco de busca e apreensão.",
  },
  {
    question: "Quais documentos preciso enviar?",
    answer:
      "No primeiro contato, solicitamos apenas dados básicos. Depois, se fizer sentido avançar, a equipe poderá pedir contrato, carnê, extrato, comprovantes ou documentos complementares.",
  },
];
