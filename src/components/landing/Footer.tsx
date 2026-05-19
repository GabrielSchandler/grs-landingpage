import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getWhatsAppHref } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="bg-zinc-100 py-10 text-zinc-950">
      <Container>
        <div className="grid gap-8 border-b border-zinc-200 pb-8 md:grid-cols-[1fr_auto] md:items-start">
          <div>
            <Image
              src="/logo-grs.jpeg"
              alt="GRS Soluções"
              width={1080}
              height={760}
              className="h-20 w-auto rounded-sm object-contain"
            />
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
              A GRS Soluções atua com análise revisional de contratos bancários, ajudando clientes a entenderem
              parcelas, juros, tarifas e possíveis cobranças questionáveis.
            </p>
            <p className="mt-4 max-w-2xl text-xs leading-5 text-zinc-500">
              As informações desta página têm caráter informativo e não representam promessa de resultado.
            </p>
          </div>

          <nav className="flex flex-wrap gap-4 text-sm text-zinc-700" aria-label="Links do rodapé">
            <a href="#" className="transition hover:text-red-700">
              Política de Privacidade
            </a>
            <a href="#" className="transition hover:text-red-700">
              Termos de Uso
            </a>
            <a href={getWhatsAppHref()} className="inline-flex items-center gap-2 transition hover:text-red-700">
              <MessageCircle size={16} aria-hidden />
              WhatsApp
            </a>
          </nav>
        </div>

        <p className="pt-6 text-xs text-zinc-600">© {new Date().getFullYear()} GRS Soluções. Todos os direitos reservados.</p>
      </Container>
    </footer>
  );
}
