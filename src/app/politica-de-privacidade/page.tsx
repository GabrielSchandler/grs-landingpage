import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Política de Privacidade | GRS Soluções",
  description: "Saiba como a GRS Soluções coleta, utiliza e protege seus dados pessoais conforme a LGPD.",
};

export default function PoliticaPrivacidadePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold text-zinc-950 sm:text-4xl">Política de Privacidade</h1>
            <p className="mt-2 text-sm text-zinc-500">Última atualização: maio de 2026</p>

            <div className="prose prose-zinc mt-10 max-w-none">

              <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">1. Quem somos e como nos contatar</h2>
              <p className="text-zinc-700 leading-7">
                A <strong>GRS Soluções</strong> é uma empresa de consultoria especializada em análise técnica e educacional
                de contratos bancários. Não somos escritório de advocacia. Para dúvidas sobre esta Política ou para
                exercer seus direitos, entre em contato pelo e-mail{" "}
                <a href="mailto:contato@grssolucoes.com.br" className="text-red-700 hover:underline">
                  contato@grssolucoes.com.br
                </a>
                .
              </p>

              <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">2. Quais dados coletamos</h2>
              <p className="text-zinc-700 leading-7">Coletamos apenas os dados necessários para prestar nosso serviço:</p>
              <ul className="mt-3 space-y-2 text-zinc-700 list-disc list-inside leading-7">
                <li><strong>Dados de identificação e contato:</strong> nome completo e número de WhatsApp fornecidos no formulário.</li>
                <li><strong>Dados do contrato (fornecidos voluntariamente):</strong> tipo de contrato, banco/financeira, valor da parcela, situação de pagamento e outras informações que o usuário optar por compartilhar.</li>
                <li><strong>Dados de navegação:</strong> informações coletadas automaticamente por ferramentas como Google Tag Manager, Google Analytics 4 e Meta Pixel (Facebook), incluindo páginas visitadas, origem do acesso e eventos de interação com o site.</li>
              </ul>

              <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">3. Para que usamos seus dados</h2>
              <ul className="mt-3 space-y-2 text-zinc-700 list-disc list-inside leading-7">
                <li>Realizar o atendimento e a análise técnica solicitada.</li>
                <li>Entrar em contato via WhatsApp para orientar sobre o resultado da análise.</li>
                <li>Melhorar nossos serviços e entender o perfil dos usuários que nos acessam.</li>
                <li>Cumprir obrigações legais e regulatórias.</li>
              </ul>

              <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">4. Compartilhamento de dados</h2>
              <p className="text-zinc-700 leading-7">
                Seus dados <strong>não são vendidos</strong> a terceiros. Podemos compartilhá-los exclusivamente com:
              </p>
              <ul className="mt-3 space-y-2 text-zinc-700 list-disc list-inside leading-7">
                <li>Ferramentas de análise e marketing (Google Analytics, Meta Pixel) para fins estatísticos e de otimização de campanhas.</li>
                <li>Advogados parceiros, <strong>somente mediante autorização expressa do cliente</strong>, quando o caso exigir acompanhamento jurídico.</li>
                <li>Autoridades públicas, quando exigido por lei.</li>
              </ul>

              <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">5. Tempo de armazenamento</h2>
              <p className="text-zinc-700 leading-7">
                Mantemos seus dados pelo tempo necessário para a prestação do serviço solicitado e para cumprimento de
                obrigações legais. Após esse período, os dados são anonimizados ou excluídos de forma segura.
              </p>

              <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">6. Direitos do titular (LGPD)</h2>
              <p className="text-zinc-700 leading-7">
                Conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem direito a:
              </p>
              <ul className="mt-3 space-y-2 text-zinc-700 list-disc list-inside leading-7">
                <li>Confirmar a existência de tratamento dos seus dados.</li>
                <li>Acessar os dados que mantemos sobre você.</li>
                <li>Corrigir dados incompletos, inexatos ou desatualizados.</li>
                <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários.</li>
                <li>Solicitar a portabilidade dos dados para outro fornecedor.</li>
                <li>Revogar o consentimento a qualquer momento.</li>
              </ul>
              <p className="mt-3 text-zinc-700 leading-7">
                Para exercer qualquer um desses direitos, envie um e-mail para{" "}
                <a href="mailto:contato@grssolucoes.com.br" className="text-red-700 hover:underline">
                  contato@grssolucoes.com.br
                </a>
                .
              </p>

              <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">7. Cookies e tecnologias de rastreamento</h2>
              <p className="text-zinc-700 leading-7">
                Nosso site utiliza cookies e tecnologias similares para análise de tráfego, mensuração de campanhas e
                melhoria da experiência do usuário. As ferramentas utilizadas incluem Google Tag Manager, Google Analytics 4
                e Meta Pixel. Ao continuar navegando, você concorda com o uso dessas tecnologias. Você pode configurar seu
                navegador para recusar cookies, mas isso pode afetar o funcionamento de algumas funcionalidades do site.
              </p>

              <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">8. Segurança</h2>
              <p className="text-zinc-700 leading-7">
                Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acesso não autorizado,
                perda ou divulgação indevida, em conformidade com as boas práticas de segurança da informação.
              </p>

              <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">9. Alterações nesta política</h2>
              <p className="text-zinc-700 leading-7">
                Podemos atualizar esta Política periodicamente. A data de última atualização estará sempre indicada no topo
                desta página. Recomendamos que você a revise regularmente.
              </p>

            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
