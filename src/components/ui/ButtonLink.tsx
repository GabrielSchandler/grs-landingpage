import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  icon?: ReactNode;
  variant?: ButtonVariant;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-[#e30613] bg-[#e30613] text-white shadow-[0_16px_34px_rgba(227,6,19,0.24)] hover:border-[#bd1018] hover:bg-[#bd1018]",
  secondary:
    "border-zinc-200 bg-white text-zinc-950 shadow-sm hover:border-red-200 hover:bg-red-50 hover:text-red-700",
  ghost: "border-transparent bg-transparent text-zinc-700 hover:border-zinc-200 hover:bg-white",
};

export function ButtonLink({ children, className, icon, variant = "primary", ...props }: ButtonLinkProps) {
  return (
    <a
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
      {icon}
    </a>
  );
}
