import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  children?: ReactNode;
  align?: "left" | "center";
  className?: string;
  dark?: boolean;
};

export function SectionHeading({ title, children, align = "left", className, dark = false }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <h2 className={cn("text-3xl font-semibold leading-tight sm:text-4xl", dark ? "text-white" : "text-zinc-950")}>
        {title}
      </h2>
      {children ? (
        <p className={cn("mt-4 text-base leading-7 sm:text-lg", dark ? "text-zinc-400" : "text-zinc-600")}>
          {children}
        </p>
      ) : null}
    </div>
  );
}
