import { type VariantProps } from "class-variance-authority";
import { type ComponentProps, type ReactNode } from "react";

import { Button, buttonVariants } from "./button";

export interface LinkButtonProps {
  href: string;
  children: ReactNode;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  icon?: ReactNode;
  iconRight?: ReactNode;
  size?: ComponentProps<typeof Button>["size"];
  target?: string;
  rel?: string;
  className?: string;
}

export function LinkButton({
  href,
  children,
  variant = "default",
  icon,
  iconRight,
  size = "lg",
  target,
  rel,
  className,
}: LinkButtonProps) {
  const isExternal = href.startsWith("http://") || href.startsWith("https://");
  const linkTarget = target ?? (isExternal ? "_blank" : undefined);
  const linkRel = rel ?? (isExternal ? "noopener noreferrer" : undefined);

  return (
    <Button variant={variant} size={size} className={className} asChild>
      <a href={href} target={linkTarget} rel={linkRel}>
        {icon}
        {children}
        {iconRight}
      </a>
    </Button>
  );
}
