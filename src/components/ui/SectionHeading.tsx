import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  children?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ title, children, align = "left", className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <h2 className="text-3xl font-semibold leading-tight text-zinc-950 sm:text-4xl">{title}</h2>
      {children ? <p className="mt-4 text-base leading-7 text-zinc-600 sm:text-lg">{children}</p> : null}
    </div>
  );
}
