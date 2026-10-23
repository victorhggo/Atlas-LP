import Image from "next/image";

import { cn } from "@/lib/utils";

const Atlas = ({ className }: { className?: string }) => (
  <Image
    src="/logo-atlas.png"
    alt=""
    aria-hidden="true"
    width={28}
    height={28}
    className={cn("size-7 drop-shadow-[0_0_12px_rgba(72,153,226,0.45)]", className)}
  />
);

export default Atlas;
