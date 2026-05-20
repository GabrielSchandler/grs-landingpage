import type { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Termos de Uso — GRS Solução",
  description: "Termos de uso dos serviços da GRS Solução LTDA.",
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1 py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold text-zinc-950 sm:text-4xl">Termos de Uso</h1>
            <p className="mt-2 text-sm text-zinc-500">Última atualização: maio de 2025</p>

            <div className="prose prose-zinc mt-10 max-w-none text-zinc-700 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-zinc-950 [&_p]:mt-4 [&_p]:leading-7 [&_ul]:mt-4 [&_ul]:space-y-2 [&_li]:leading-7">

              <h2>1. Objeto do serviço</h2>
              <p>
                A <strong>GRS Solução LTDA</strong> (CNPJ 63.562.890/0001-45) oferece um serviço de{" "}
                <strong>análise técnica gratuita e orientativa</strong> de contratos bancários — incluindo
                financiamentos de veículos, imóveis, empréstimos pessoais, consignados e renegociações.
              </p>
              <p>
                O serviço consiste na leitura e interpretação das cláusulas do contrato para identificar
                possíveis inconsistências em taxas, encargos, tarifas e condições de crédito, com base na
                legislação e nas práticas de mercado vigentes.
              </p>

              <h2>2. Limitações expressas</h2>
              <p>Ao utilizar nosso serviço, você reconhece e concorda que:</p>
              <ul>
                <li>
                  A GRS Solução LTDA <strong>não garante, promete ou assegura</strong> qualquer redução de
                  parcelas, cancelamento de dívida, devolução de valores ou resultado financeiro específico.
                </li>
                <li>
                  A análise fornecida tem caráter exclusivamente <strong>técnico e orientativo</strong>,
                  não configurando parecer jurídico, consultoria legal ou representação advocatícia.
                </li>
                <li>
                  A análise <strong>não substitui</strong> a avaliação de um advogado habilitado. Decisões
                  judiciais ou extrajudiciais dependem de avaliação profissional independente.
                </li>
                <li>
                  Os resultados da análise dependem do conteúdo específico do contrato, do histórico de
                  pagamentos, da legislação aplicável ao caso e de outros fatores individuais.
                </li>
              </ul>

              <h2>3. Gratuidade e ausência de obrigação</h2>
              <p>
                A análise técnica inicial é integralmente <strong>gratuita</strong> e não cria qualquer
                obrigação de contratação de serviços adicionais por parte do usuário.
              </p>
              <p>
                Eventuais serviços complementares — como acompanhamento de processo, mediação ou outros —
                são objeto de acordo separado, com condições, prazo e remuneração pactuados expressamente
                entre as partes, e dependem da concordância do usuário.
              </p>

              <h2>4. Responsabilidade do usuário</h2>
              <p>
                O usuário é responsável pela veracidade das informações fornecidas no formulário de análise.
                Dados incorretos ou incompletos podem comprometer a qualidade da orientação prestada.
              </p>
              <p>
                O usuário não deve utilizar os resultados da análise como fundamento exclusivo para decisões
                financeiras ou jurídicas sem consultar um profissional habilitado.
              </p>

              <h2>5. Propriedade intelectual</h2>
              <p>
                Todo o conteúdo deste site — textos, imagens, marca e metodologia — é de propriedade
                exclusiva da GRS Solução LTDA e não pode ser reproduzido, distribuído ou utilizado sem
                autorização prévia por escrito.
              </p>

              <h2>6. Modificações</h2>
              <p>
                A GRS Solução LTDA reserva-se o direito de alterar estes Termos de Uso a qualquer momento.
                A versão atualizada estará sempre disponível nesta página. O uso continuado do site após
                alterações implica aceitação dos novos termos.
              </p>

              <h2>7. Foro</h2>
              <p>
                Fica eleito o foro da <strong>Comarca de São Paulo/SP</strong> para dirimir quaisquer
                controvérsias decorrentes destes Termos de Uso, com renúncia expressa a qualquer outro,
                por mais privilegiado que seja.
              </p>

              <h2>8. Contato</h2>
              <p>
                Dúvidas sobre estes termos podem ser enviadas para:{" "}
                <a href="mailto:administrativo@grssolucao.com.br" className="text-red-600 hover:underline">
                  administrativo@grssolucao.com.br
                </a>
              </p>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
