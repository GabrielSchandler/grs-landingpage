import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { navItems } from "@/lib/landing-content";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/88 backdrop-blur-xl">
      <Container className="flex min-h-20 items-center justify-between gap-4">
        <a href="#" className="flex items-center gap-3" aria-label="GRS Soluções">
          <Image
            src="/logo-grs.jpeg"
            alt="GRS Soluções"
            width={1080}
            height={760}
            className="h-14 w-auto rounded-sm object-contain"
            priority
          />
        </a>

        <nav className="hidden items-center gap-7 text-sm font-medium text-zinc-700 md:flex" aria-label="Navegação">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-red-700">
              {item.label}
            </a>
          ))}
        </nav>

        <ButtonLink href="#lead-form" className="sm:inline-flex" icon={<ArrowRight size={16} aria-hidden />}>
          Solicitar análise
        </ButtonLink>
      </Container>
    </header>
  );
}
