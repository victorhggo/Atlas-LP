import { HeadsetIcon, WebhookIcon } from "lucide-react";
import { type ComponentType, type SVGProps } from "react";

import {
  Facebook,
  GoogleMaps,
  Instagram,
  LinkedIn,
  Meta,
  TikTok,
  WhatsApp,
  YouTube,
} from "../../logos/brands";
import { Badge } from "../../ui/badge";
import { Section } from "../../ui/section";

interface ChannelProps {
  name: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

interface LogosProps {
  title?: string;
  description?: string;
  channels?: ChannelProps[];
  className?: string;
}

const DEFAULT_CHANNELS: ChannelProps[] = [
  { name: "WhatsApp", icon: WhatsApp },
  { name: "Google Maps", icon: GoogleMaps },
  { name: "Instagram", icon: Instagram },
  { name: "LinkedIn", icon: LinkedIn },
  { name: "Facebook", icon: Facebook },
  { name: "YouTube", icon: YouTube },
  { name: "TikTok", icon: TikTok },
  { name: "Meta Ads", icon: Meta },
  { name: "VoIP", icon: HeadsetIcon },
  { name: "Webhooks", icon: WebhookIcon },
];

export default function Logos({
  title = "Conectado aos canais onde o seu cliente está",
  description = "O Atlas encontra a empresa nesses canais na qualificação e conversa com ela por eles depois.",
  channels = DEFAULT_CHANNELS,
  className,
}: LogosProps) {
  return (
    <Section className={className}>
      <div className="max-w-container mx-auto flex flex-col items-center gap-8 text-center sm:gap-10">
        <div className="flex flex-col items-center gap-4 sm:gap-6">
          <Badge variant="outline" className="border-brand/30 text-brand">
            Integrações e canais
          </Badge>
          <h2 className="text-xl font-semibold text-balance sm:text-3xl">
            {title}
          </h2>
          <p className="text-muted-foreground max-w-[560px] text-sm text-balance sm:text-base">
            {description}
          </p>
        </div>
        <ul className="flex max-w-[880px] flex-wrap items-center justify-center gap-3 sm:gap-4">
          {channels.map(({ name, icon: Icon }) => (
            <li
              key={name}
              className="glass-1 dark:glass-2 flex items-center gap-2.5 rounded-full px-4 py-2.5 text-sm font-medium shadow-md motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-0.5 sm:text-base"
            >
              <Icon aria-hidden="true" className="text-foreground size-5 shrink-0" />
              {name}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
