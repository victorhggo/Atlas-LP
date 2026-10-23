import Image, { type ImageProps } from "next/image";

import { cn } from "@/lib/utils";

interface ScreenshotProps {
  srcLight: string;
  srcDark?: string;
  alt: string;
  width: number;
  height: number;
  loading?: ImageProps["loading"];
  preload?: boolean;
  sizes?: string;
  className?: string;
}

export default function Screenshot({
  srcLight,
  srcDark,
  alt,
  width,
  height,
  loading,
  preload,
  sizes = "(max-width: 1280px) 100vw, 1248px",
  className,
}: ScreenshotProps) {
  if (!srcDark) {
    return (
      <Image
        src={srcLight}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        preload={preload}
        sizes={sizes}
        className={className}
        unoptimized={srcLight.endsWith(".svg")}
      />
    );
  }

  return (
    <>
      <Image
        src={srcLight}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        preload={preload}
        sizes={sizes}
        className={cn(className, "block dark:hidden")}
        unoptimized={srcLight.endsWith(".svg")}
      />
      <Image
        src={srcDark}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        preload={preload}
        sizes={sizes}
        className={cn(className, "hidden dark:block")}
        unoptimized={srcDark.endsWith(".svg")}
      />
    </>
  );
}
