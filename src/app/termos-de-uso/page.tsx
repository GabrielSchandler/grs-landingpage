import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Termos de Uso | GRS Soluções",
  description: "Termos e condições de uso dos serviços de análise técnica de contratos bancários da GRS Soluções.",
};

export default function TermosDeUsoPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold text-zinc-950 sm:text-4xl">Termos de Uso</h1>
            <p className="mt-2 text-sm text-zinc-500">Última atualização: maio de 2026</p>

            <div className="mt-10">

              <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">1. Sobre a GRS Soluções</h2>
              <p className="text-zinc-700 leading-7">
                A <strong>GRS Soluções</strong> é uma empresa de consultoria especializada em análise técnica e educacional
                de contratos bancários. <strong>A GRS Soluções NÃO é escritório de advocacia</strong> e não realiza atos
                privativos da advocacia conforme definido pela Lei nº 8.906/1994. Nossa atuação é exclusivamente
                consultiva e educacional: auxiliamos o cliente a compreender os termos, taxas, encargos e condições do
                seu contrato.
              </p>

              <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">2. Objeto do serviço</h2>
              <p className="text-zinc-700 leading-7">
                O serviço oferecido pela GRS Soluções consiste na análise técnica e educacional de contratos bancários
                (financiamentos, empréstimos, consignados e similares). A análise tem por objetivo auxiliar o cliente a
                entender as cláusulas, taxas e encargos previstos no contrato, em linguagem clara e acessível.
              </p>
              <p className="mt-3 text-zinc-700 leading-7">
                <strong>O serviço de análise inicial é oferecido gratuitamente e sem compromisso.</strong> Não há promessa
                de resultado, redução de parcela, recuperação de valores ou qualquer outro benefício financeiro. O
                diagnóstico se limita a apresentar ao cliente as informações técnicas do contrato de forma compreensível.
              </p>

              <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">3. Limitações do serviço</h2>
              <p className="text-zinc-700 leading-7">
                A análise técnica fornecida pela GRS Soluções <strong>não constitui parecer jurídico</strong>, consultoria
                jurídica, assistência em processos judiciais ou extrajudiciais, nem representação perante qualquer
                instituição pública ou privada.
              </p>
              <p className="mt-3 text-zinc-700 leading-7">
                Qualquer medida judicial, negociação bancária formal, contestação de cobranças ou outra ação que exija
                capacidade postulatória <strong>depende exclusivamente de advogado habilitado pela OAB, contratado
                diretamente pelo cliente</strong>. A GRS Soluções não indica, indica, representa nem assume qualquer
                responsabilidade por advogados eventualmente contratados pelo usuário.
              </p>

              <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">4. Responsabilidades do usuário</h2>
              <p className="text-zinc-700 leading-7">
                Ao utilizar o site e solicitar a análise, o usuário declara que:
              </p>
              <ul className="mt-3 space-y-2 text-zinc-700 list-disc list-inside leading-7">
                <li>As informações fornecidas são verdadeiras, completas e atualizadas.</li>
                <li>É titular ou possui autorização para compartilhar os dados do contrato informado.</li>
                <li>Compreende que a análise tem caráter técnico e educacional, sem promessa de resultado.</li>
                <li>Não utilizará o site para fins ilícitos ou em desacordo com estes Termos.</li>
              </ul>

              <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">5. Propriedade intelectual</h2>
              <p className="text-zinc-700 leading-7">
                Todo o conteúdo deste site — textos, imagens, logotipos, marca, layout e código-fonte — é de
                propriedade exclusiva da GRS Soluções ou de seus licenciantes e está protegido pela legislação de
                propriedade intelectual brasileira. É vedada a reprodução, distribuição ou uso não autorizado de
                qualquer elemento deste site.
              </p>

              <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">6. Isenção de responsabilidade</h2>
              <p className="text-zinc-700 leading-7">
                As informações disponibilizadas neste site têm caráter exclusivamente informativo e educacional. A GRS
                Soluções não se responsabiliza por decisões tomadas pelo usuário com base nas informações fornecidas, nem
                por resultados decorrentes de contratos com instituições financeiras ou ações judiciais.
              </p>

              <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">7. Foro</h2>
              <p className="text-zinc-700 leading-7">
                Estes Termos são regidos pelas leis da República Federativa do Brasil. Eventuais conflitos serão
                submetidos ao foro da comarca onde a GRS Soluções está registrada, com renúncia a qualquer outro, por
                mais privilegiado que seja.
              </p>

              <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">8. Alterações nestes termos</h2>
              <p className="text-zinc-700 leading-7">
                A GRS Soluções reserva-se o direito de alterar estes Termos a qualquer momento. A data de última
                atualização estará sempre indicada no topo desta página. O uso continuado do site após alterações
                implica aceitação dos novos termos.
              </p>

            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
