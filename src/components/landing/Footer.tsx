import Image from "next/image";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getWhatsAppHref } from "@/lib/whatsapp";
import { navItems, footerLegalLinks } from "@/lib/landing-content";

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Coluna 1 — Empresa */}
          <div>
            <div className="inline-flex rounded-lg bg-white px-4 py-2.5">
              <Image
                src="/logo-grs.jpeg"
                alt="GRS Solução LTDA"
                width={1080}
                height={760}
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="mt-4 text-sm font-semibold text-white">GRS Solução LTDA</p>
            <p className="text-xs text-zinc-500">CNPJ: 63.562.890/0001-45</p>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Análise técnica de contratos bancários.
            </p>
          </div>

          {/* Coluna 2 — Contato */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-zinc-500" aria-hidden />
                <span className="leading-5">
                  Av. São Miguel, 1440<br />
                  Vila Marieta — São Paulo/SP, CEP 03620-000
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-zinc-500" aria-hidden />
                <a
                  href="mailto:administrativo@grssolucao.com.br"
                  className="transition hover:text-red-400"
                >
                  administrativo@grssolucao.com.br
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="size-4 shrink-0 text-zinc-500" aria-hidden />
                <a
                  href={getWhatsAppHref("footer")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-red-400"
                >
                  WhatsApp
                </a>
              </li>
              <li className="text-xs text-zinc-500">Segunda a sexta, das 9h às 18h</li>
            </ul>
          </div>

          {/* Coluna 3 — Navegação */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">Navegação</h3>
            <nav className="flex flex-col gap-2 text-sm" aria-label="Links do rodapé">
              {navItems.map(({ href, label }) => (
                <a key={href} href={href} className="transition hover:text-red-400">
                  {label}
                </a>
              ))}
              <div className="mt-2 flex flex-col gap-2 border-t border-zinc-800 pt-2">
                {footerLegalLinks.map(({ href, label }) => (
                  <a key={href} href={href} className="transition hover:text-red-400">
                    {label}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </Container>

      <div className="border-t border-zinc-800">
        <Container className="py-6">
          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} GRS Solução LTDA. Todos os direitos reservados.
          </p>
          <p className="mt-3 max-w-4xl text-xs leading-5 text-zinc-500">
            A GRS Solução LTDA realiza análise técnica de contratos bancários com finalidade orientativa.
            Os resultados dependem da análise individual de cada caso e da legislação aplicável.
            Esta empresa não promete, garante ou assegura redução de parcelas, eliminação de dívidas ou resultados específicos.
            Eventual revisão judicial depende de avaliação por advogado habilitado e dos méritos do caso concreto.
          </p>
        </Container>
      </div>
    </footer>
  );
}
