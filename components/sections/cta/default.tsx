import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import Glow from "../../ui/glow";
import { Good } from "../../ui/highlight";
import { LinkButton, type LinkButtonProps } from "../../ui/link-button";
import { Section } from "../../ui/section";

interface CTAButtonProps extends Omit<LinkButtonProps, "children"> {
  text: string;
}

interface CTAProps {
  title?: string;
  buttons?: CTAButtonProps[] | false;
  className?: string;
}

const DEFAULT_CTA_BUTTONS: CTAButtonProps[] = [
  {
    href: siteConfig.getStartedUrl,
    text: "Testar grátis com 25 decisores",
    variant: "default",
  },
];

export default function CTA({
  title = "Sua próxima reunião está numa lista que você ainda não montou.",
  buttons = DEFAULT_CTA_BUTTONS,
  className,
}: CTAProps) {
  return (
    <Section className={cn("group relative overflow-hidden", className)}>
      <div className="max-w-container relative z-10 mx-auto flex flex-col items-center gap-6 text-center sm:gap-8">
        <h2 className="max-w-[720px] text-3xl text-balance leading-tight font-semibold sm:text-5xl sm:leading-tight">
          {title}
        </h2>
        {buttons !== false && buttons.length > 0 && (
          <div className="flex justify-center gap-4">
            {buttons.map((button) => (
              <LinkButton
                key={`${button.href}-${button.text}`}
                variant={button.variant || "default"}
                size="lg"
                href={button.href}
                icon={button.icon}
                iconRight={button.iconRight}
              >
                {button.text}
              </LinkButton>
            ))}
          </div>
        )}
        <p className="text-muted-foreground text-sm">
          <Good>Sem cartão.</Good> Monte a primeira lista agora.
        </p>
      </div>
      <div className="absolute top-0 left-0 h-full w-full translate-y-[1rem] opacity-80 transition-[transform,opacity] duration-500 ease-in-out motion-safe:group-hover:translate-y-[-2rem] group-hover:opacity-100">
        <Glow variant="bottom" />
      </div>
    </Section>
  );
}
