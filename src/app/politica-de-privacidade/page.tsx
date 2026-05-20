import type { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Política de Privacidade — GRS Solução",
  description: "Política de privacidade e proteção de dados da GRS Solução LTDA.",
  robots: { index: false, follow: false },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1 py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold text-zinc-950 sm:text-4xl">Política de Privacidade</h1>
            <p className="mt-2 text-sm text-zinc-500">Última atualização: maio de 2025</p>

            <div className="prose prose-zinc mt-10 max-w-none text-zinc-700 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-zinc-950 [&_p]:mt-4 [&_p]:leading-7 [&_ul]:mt-4 [&_ul]:space-y-2 [&_li]:leading-7">

              <h2>1. Controlador dos dados</h2>
              <p>
                A controladora dos dados pessoais tratados nesta política é a <strong>GRS Solução LTDA</strong>,
                inscrita no CNPJ sob o nº 63.562.890/0001-45, com sede na Av. São Miguel, 1440 — Vila Marieta,
                São Paulo/SP, CEP 03620-000.
              </p>
              <p>
                Para questões relacionadas à privacidade, entre em contato pelo e-mail:{" "}
                <a href="mailto:administrativo@grssolucao.com.br" className="text-red-600 hover:underline">
                  administrativo@grssolucao.com.br
                </a>
              </p>

              <h2>2. Dados coletados</h2>
              <p>Coletamos os seguintes dados quando você preenche o formulário de análise:</p>
              <ul>
                <li>Nome completo</li>
                <li>Número de WhatsApp (com DDD)</li>
                <li>Tipo de contrato bancário</li>
                <li>Valor aproximado da parcela (opcional)</li>
                <li>Informação sobre parcelas atrasadas (opcional)</li>
                <li>Nome do banco ou financeira (opcional)</li>
                <li>Descrição do caso (opcional)</li>
              </ul>
              <p>
                Adicionalmente, coletamos dados técnicos de forma automática: endereço IP, tipo de navegador,
                páginas visitadas, tempo de sessão e dados de cookies de rastreamento (Google Analytics,
                Google Tag Manager e Meta Pixel).
              </p>

              <h2>3. Finalidade do tratamento</h2>
              <p>Seus dados são utilizados para:</p>
              <ul>
                <li>Realizar a análise técnica gratuita do seu contrato bancário</li>
                <li>Entrar em contato via WhatsApp para apresentar os resultados da análise</li>
                <li>Enviar comunicações relacionadas ao atendimento solicitado</li>
                <li>Mensurar o desempenho das campanhas de marketing (via Google Analytics e Meta Pixel)</li>
                <li>Exibir anúncios segmentados em campanhas de remarketing</li>
              </ul>

              <h2>4. Base legal (LGPD)</h2>
              <p>
                O tratamento dos seus dados se baseia no <strong>consentimento</strong> (art. 7º, I da Lei
                13.709/2018), obtido no momento do preenchimento do formulário, e no{" "}
                <strong>legítimo interesse</strong> (art. 7º, IX) para fins de análise e melhoria dos serviços
                prestados.
              </p>

              <h2>5. Compartilhamento de dados</h2>
              <p>Seus dados poderão ser compartilhados com:</p>
              <ul>
                <li>
                  <strong>Supabase (operador):</strong> plataforma de banco de dados utilizada para armazenar
                  os leads com segurança. Os dados são processados nos servidores da Supabase conforme sua
                  política de privacidade.
                </li>
                <li>
                  <strong>Google (Analytics / Tag Manager):</strong> dados de navegação e comportamento são
                  processados para fins de análise de desempenho.
                </li>
                <li>
                  <strong>Meta (Facebook Pixel):</strong> dados de comportamento são utilizados para criação
                  de públicos e exibição de anúncios.
                </li>
              </ul>
              <p>Não vendemos nem cedemos seus dados a terceiros para fins comerciais.</p>

              <h2>6. Direitos do titular</h2>
              <p>Você tem os seguintes direitos em relação aos seus dados pessoais:</p>
              <ul>
                <li>Confirmar a existência de tratamento</li>
                <li>Acessar os dados que temos sobre você</li>
                <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
                <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários</li>
                <li>Revogar o consentimento a qualquer momento</li>
              </ul>
              <p>
                Para exercer qualquer desses direitos, envie um e-mail para{" "}
                <a href="mailto:administrativo@grssolucao.com.br" className="text-red-600 hover:underline">
                  administrativo@grssolucao.com.br
                </a>{" "}
                informando seu nome, WhatsApp e a solicitação.
              </p>

              <h2>7. Cookies</h2>
              <p>
                Utilizamos cookies de análise (Google Analytics / GA4), gerenciamento de tags (Google Tag
                Manager) e rastreamento de conversões (Meta Pixel). Ao acessar nosso site, você concorda com
                o uso desses cookies conforme descrito nesta política.
              </p>

              <h2>8. Retenção dos dados</h2>
              <p>
                Os dados de leads não convertidos em clientes são retidos por até <strong>24 meses</strong>{" "}
                a partir da data de coleta, após o que são anonimizados ou excluídos. Dados de clientes
                ativos podem ser retidos pelo período necessário à prestação do serviço e cumprimento de
                obrigações legais.
              </p>

              <h2>9. Encarregado de dados (DPO)</h2>
              <p>
                O encarregado pelo tratamento de dados pessoais da GRS Solução LTDA pode ser contatado pelo
                e-mail:{" "}
                <a href="mailto:administrativo@grssolucao.com.br" className="text-red-600 hover:underline">
                  administrativo@grssolucao.com.br
                </a>
              </p>

              <h2>10. Alterações nesta política</h2>
              <p>
                Esta política pode ser atualizada periodicamente. A versão mais recente estará sempre
                disponível nesta página com a data de última atualização.
              </p>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
