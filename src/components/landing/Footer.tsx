import Image from "next/image";
import Link from "next/link";
import { Building2, MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { WhatsAppLeadButton } from "@/components/landing/WhatsAppLeadButton";
import { companyInfo } from "@/lib/landing-content";

export function Footer() {
  return (
    <footer className="bg-zinc-950 py-10 text-zinc-300">
      <Container>
        <div className="grid gap-8 border-b border-zinc-800 pb-8 md:grid-cols-[1fr_auto] md:items-start">
          <div>
            <div className="inline-flex rounded-lg bg-white px-4 py-2.5">
              <Image
                src="/logo-grs.jpeg"
                alt="GRS Soluções"
                width={1080}
                height={760}
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
              A GRS Soluções atua com análise técnica e educacional de contratos bancários, ajudando clientes a
              entender parcelas, juros, tarifas e condições contratuais.
            </p>
            <p className="mt-4 max-w-2xl text-xs leading-5 text-zinc-500">
              A GRS Soluções <strong className="text-zinc-400">NÃO é escritório de advocacia</strong> e não realiza
              atos privativos da advocacia. Nossa atuação é exclusivamente consultiva e educacional. Qualquer ação
              judicial ou medida jurídica depende de avaliação de advogado habilitado, contratado diretamente pelo
              cliente.
            </p>
            <p className="mt-2 max-w-2xl text-xs leading-5 text-zinc-600">
              As informações desta página têm caráter informativo e não representam promessa de resultado.
            </p>

            <div className="mt-6 grid max-w-3xl gap-3 text-xs leading-5 text-zinc-400 sm:grid-cols-3">
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/70 p-3">
                <div className="flex items-center gap-2 font-semibold text-zinc-200">
                  <Building2 className="size-4 text-red-400" aria-hidden />
                  CNPJ
                </div>
                <p className="mt-1">{companyInfo.cnpj}</p>
              </div>
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/70 p-3 sm:col-span-2">
                <div className="flex items-center gap-2 font-semibold text-zinc-200">
                  <MapPin className="size-4 text-red-400" aria-hidden />
                  Endereço
                </div>
                <p className="mt-1">{companyInfo.address}</p>
              </div>
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/70 p-3 sm:col-span-3">
                <div className="flex items-center gap-2 font-semibold text-zinc-200">
                  <ShieldCheck className="size-4 text-red-400" aria-hidden />
                  {companyInfo.serviceArea}
                </div>
                <p className="mt-1">Atendimento consultivo para clientes em todo o Brasil.</p>
              </div>
            </div>
          </div>

          <nav className="flex flex-wrap gap-4 text-sm text-zinc-500" aria-label="Links do rodapé">
            <Link href="/politica-de-privacidade" className="transition hover:text-red-400">
              Política de Privacidade
            </Link>
            <Link href="/termos-de-uso" className="transition hover:text-red-400">
              Termos de Uso
            </Link>
            <WhatsAppLeadButton
              variant="inline"
              placement="footer_link"
              className="inline-flex items-center gap-2 text-sm"
              showIcon={false}
            >
              <MessageCircle size={16} aria-hidden />
              WhatsApp
            </WhatsAppLeadButton>
          </nav>
        </div>

        <p className="pt-6 text-xs text-zinc-600">© {new Date().getFullYear()} GRS Soluções. Todos os direitos reservados.</p>
      </Container>
    </footer>
  );
}
