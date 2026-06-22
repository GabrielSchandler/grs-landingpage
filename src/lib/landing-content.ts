import {
  AlertTriangle,
  BadgeCheck,
  Banknote,
  Building2,
  Car,
  CheckCircle2,
  CircleDollarSign,
  ClipboardCheck,
  Clock,
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
  title: "Sua parcela está pesando e a dívida parece não diminuir?",
  subtitle:
    "A GRS analisa seu contrato bancário para identificar possíveis cobranças questionáveis e orientar o próximo passo com segurança.",
  support:
    "Se a parcela já compromete seu orçamento, entender juros, tarifas e condições do contrato pode evitar uma decisão no escuro.",
  diagnosticTitle: "Diagnóstico técnico completo",
  diagnosticText: "Juros • CET • Tarifas • Cláusulas contratuais",
};

export const heroBadges = [
  { label: "100% Gratuito", icon: HeartHandshake },
  { label: "Sem compromisso", icon: ShieldCheck },
  { label: "Até 1h em horário comercial", icon: Clock },
];

export const heroIndicators = [
  { title: "Análise técnica especializada", icon: BadgeCheck },
  { title: "Até 1h em horário comercial", icon: Clock },
  { title: "Atendimento em todo o Brasil", icon: MapPin },
];

export const credibilityNumbers = [
  { value: "100%", label: "Gratuito e sem compromisso" },
  { value: "1h", label: "em horário comercial" },
  { value: "5+", label: "Modalidades de contrato" },
  { value: "Brasil", label: "Atendimento nacional" },
];

export const analysisDeliverables = [
  {
    title: "Verificação de juros",
    text: "Avaliamos a taxa contratada, o custo total e se há pontos que merecem atenção técnica.",
    icon: CircleDollarSign,
  },
  {
    title: "Verificação de seguros inclusos",
    text: "Identificamos seguros, serviços agregados e cobranças que podem passar despercebidas no contrato.",
    icon: ShieldCheck,
  },
  {
    title: "Verificação de tarifas",
    text: "Mapeamos tarifas, encargos e valores adicionais para mostrar o que compõe a sua parcela.",
    icon: FileSearch,
  },
  {
    title: "Orientação inicial",
    text: "Você recebe uma leitura clara dos pontos encontrados e uma orientação responsável sobre o próximo passo.",
    icon: ClipboardCheck,
  },
  {
    title: "Explicação em linguagem simples",
    text: "Transformamos juros, CET, tarifas e cláusulas em uma conversa objetiva, sem juridiquês desnecessário.",
    icon: Sparkles,
  },
];

export const companyAuthorityStats = [
  { value: "200 mil+", label: "contratos analisados" },
  { value: "10+ anos", label: "de atuação" },
  { value: "Nacional", label: "atendimento em todo o Brasil" },
];

export const companyInfo = {
  cnpj: "63.562.890/0001-45",
  address: "R. Evangelina, 321 - Vila Carrão, São Paulo - SP, 03421-000",
  serviceArea: "Atendimento nacional",
};

export const pains = [
  {
    title: "Parcela pesando no orçamento",
    description:
      "Você paga todo mês, mas o saldo devedor mal se move. A sensação é de que a dívida foi feita para não acabar.",
    icon: CircleDollarSign,
  },
  {
    title: "Medo de atrasar e perder tudo",
    description:
      "Um atraso abre caminho para juros de mora, multa e negativação. Quando você precisa renegociar, o banco já tem toda a vantagem.",
    icon: AlertTriangle,
  },
  {
    title: "Saldo devedor que não cai",
    description:
      "Meses pagando e o valor financiado praticamente não reduz. Isso pode indicar que algo no contrato está fora do esperado.",
    icon: TrendingUp,
  },
  {
    title: "Ameaça de busca e apreensão",
    description:
      "Cobranças constantes, negativação no CPF e risco de perder o bem. Entender o contrato é o primeiro passo para tomar decisões com mais segurança.",
    icon: ShieldAlert,
  },
  {
    title: "Taxa de juros acima do mercado",
    description:
      "O contrato diz uma taxa. Entender se ela está coerente com o mercado e com o que foi assinado faz diferença ao longo de todo o financiamento.",
    icon: Search,
  },
  {
    title: "Contrato impossível de entender",
    description:
      "CET, IOF, seguro prestamista, tarifas avulsas: cada linha representa um custo. Poucos sabem o que realmente estão pagando.",
    icon: FileQuestion,
  },
];

export const processSteps = [
  {
    title: "Você envia os dados do seu contrato",
    description:
      "Pedimos apenas as informações essenciais: parcela atual, banco, tipo de contrato e situação de pagamento. Leva menos de 2 minutos.",
    icon: FileText,
  },
  {
    title: "Analisamos tecnicamente cada cláusula",
    description:
      "Examinamos juros, CET, tarifas e condições para identificar se há cobranças que fogem do padrão contratado ou do mercado.",
    icon: FileSearch,
  },
  {
    title: "Identificamos os pontos críticos",
    description:
      "Apontamos com clareza onde seu contrato pode estar custando mais do que deveria — sem juridiquês e sem rodeios.",
    icon: ClipboardCheck,
  },
  {
    title: "Orientamos o próximo passo com segurança",
    description:
      "Você recebe uma orientação honesta: se vale questionar, como fazer e quais são os riscos. Sem pressão para contratar nada.",
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
  { title: "Financiamento de veículos", description: "Carros, motos e caminhões", icon: Car },
  { title: "Financiamento imobiliário", description: "Casa própria e terrenos", icon: Home },
  { title: "Empréstimos pessoais", description: "Crédito pessoal e CDC", icon: HandCoins },
  { title: "Consignados", description: "Desconto direto em folha", icon: FileText },
  { title: "Renegociações bancárias", description: "Acordos e parcelamentos", icon: Building2 },
];

export const authorityCards = [
  {
    title: "Análise técnica completa",
    text: "Leitura detalhada de taxas, encargos, tarifas e condições que podem desequilibrar o contrato em relação ao que foi acordado.",
    icon: FileSearch,
  },
  {
    title: "Proteção de dados (LGPD)",
    text: "Suas informações são utilizadas exclusivamente para diagnóstico e atendimento, com total conformidade à legislação de privacidade.",
    icon: LockKeyhole,
  },
  {
    title: "Especialistas dedicados",
    text: "Cada caso é analisado por um especialista que explica o que foi encontrado de forma clara e sem termos técnicos desnecessários.",
    icon: Users,
  },
  {
    title: "Orientação sem pressão",
    text: "Você recebe os próximos passos e decide com segurança — sem urgência artificial e sem oferta forçada.",
    icon: Scale,
  },
];

export const authorityBullets = [
  "Análise técnica do contrato completo",
  "Linguagem simples, sem juridiquês",
  "Orientação responsável a cada caso",
  "Atendimento dedicado ao seu perfil",
  "Dados protegidos conforme LGPD",
  "Diagnóstico honesto, sem expectativas infladas",
  "CNPJ ativo e atendimento nacional",
  "Mais de 10 anos de atuação",
];

export const leadCards = [
  {
    title: "100% Gratuito e sem compromisso",
    text: "Sem taxa de análise, sem cadastro em sistema de crédito, sem obrigação de contratar qualquer serviço.",
    icon: CheckCircle2,
  },
  {
    title: "Retorno em até 1h em horário comercial",
    text: "Nossa equipe analisa seu caso e entra em contato pelo WhatsApp para explicar o que foi encontrado.",
    icon: FileSearch,
  },
  {
    title: "Atendimento humano e personalizado",
    text: "Cada contrato é diferente. Você recebe uma orientação específica para a sua situação, não uma resposta genérica.",
    icon: PhoneCall,
  },
];

export const testimonials = [
  {
    title: "Eu estava bem perdido no contrato",
    quote:
      "Mandei os dados achando que ia receber uma resposta pronta, mas foram me perguntando parte por parte. Deu para entender melhor o que eu tinha assinado.",
    author: "Marcelo",
    location: "São Paulo, SP",
    rating: 5,
  },
  {
    title: "Não me senti pressionada em nenhum momento",
    quote:
      "Eu tinha receio de chamar e já tentarem vender alguma coisa. Foi diferente: primeiro ouviram meu caso, olharam as informações e explicaram com calma o que tinha no meu contrato.",
    author: "Luciana",
    location: "Guarulhos, SP",
    rating: 5,
  },
  {
    title: "Pela primeira vez entendi o que eu pagava",
    quote:
      "Eu só via a parcela cair todo mês e ficava achando que não saía do lugar. A análise separou parcela, taxa, prazo e me mostrou exatamente o que estava sendo cobrado. Foi a primeira vez que entendi de verdade.",
    author: "Renato",
    location: "Osasco, SP",
    rating: 5,
  },
  {
    title: "Explicaram no português do dia a dia",
    quote:
      "Eu não entendo esses termos de banco. O que gostei é que não ficaram usando palavra difícil para parecer importante. Explicaram tudo de forma simples, como se fosse uma conversa normal.",
    author: "Patrícia",
    location: "Contagem, MG",
    rating: 5,
  },
  {
    title: "Eu estava com parcela atrasada",
    quote:
      "Achei que iam me julgar por estar em atraso, mas o atendimento foi muito respeitoso. Saí com mais clareza do que precisava organizar e como proceder a partir daí.",
    author: "Diego",
    location: "São José dos Pinhais, PR",
    rating: 5,
  },
  {
    title: "Direto ao ponto, sem promessa",
    quote:
      "Gostei justamente porque não prometeram nada de cara. Pediram as informações, analisaram com cuidado e foram honestos sobre o que dependia do meu contrato. Isso me deu mais confiança.",
    author: "Aline",
    location: "Lauro de Freitas, BA",
    rating: 5,
  },
];

export const socialProofStats = [
  { title: "Linguagem simples e direta", text: "sem juridiquês ou termos técnicos desnecessários", icon: Sparkles },
  { title: "Análise individualizada", text: "cada contrato lido no contexto específico do cliente", icon: FileSearch },
  { title: "Atendimento sem pressão", text: "orientação honesta, sem oferta forçada e sem promessa vazia", icon: Star },
];

export const faqs = [
  {
    question: "A análise é realmente gratuita?",
    answer:
      "Sim. O diagnóstico inicial é 100% gratuito e sem compromisso. Não há taxa de avaliação, consulta paga ou contratação obrigatória. Nossa equipe analisa as informações e orienta o próximo passo sem nenhum custo.",
  },
  {
    question: "Em quanto tempo recebo o retorno?",
    answer:
      "Nossa equipe busca retornar em até 1h em horário comercial após o envio dos dados. Em casos que exigem análise mais detalhada ou documentação adicional, o prazo pode ser um pouco maior — e você será avisado.",
  },
  {
    question: "A análise garante redução da parcela?",
    answer:
      "Não. A análise serve para identificar se existem indícios técnicos de cobrança questionável. Qualquer possibilidade de redução depende do contrato, do histórico de pagamento e da estratégia adequada para cada caso.",
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
    question: "Precisam ser contratos de um banco específico?",
    answer:
      "Não. Analisamos contratos de qualquer banco, financeira ou instituição de crédito que opera no Brasil — Itaú, Caixa, Bradesco, Santander, financeiras de veículos e outras.",
  },
  {
    question: "Quais documentos preciso enviar?",
    answer:
      "No primeiro contato, solicitamos apenas dados básicos. Depois, se fizer sentido avançar, a equipe poderá pedir contrato, carnê, extrato, comprovantes ou documentos complementares.",
  },
];
