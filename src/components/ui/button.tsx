import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "ghost" | "solid" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({ className, variant = "solid", ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants: Record<Variant, string> = {
    solid: "bg-yellow-400 text-black hover:bg-yellow-300",
    ghost: "bg-transparent text-yellow-400 hover:bg-yellow-500",
    outline: "border border-yellow-400 text-yellow-400 hover:bg-yellow-500 hover:text-black",
  };

  return (
    <button
      className={cn(base, variants[variant], className)}
      {...props}
    />
  );
}