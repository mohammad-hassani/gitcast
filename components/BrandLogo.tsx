import Image from "next/image";
import { sitePath } from "@/lib/site-path";

export function BrandName() {
  return (
    <span className="brand-name">
      <span>Git</span>Cast
    </span>
  );
}

export function BrandLogo({ title }: { title: string }) {
  return (
    <span className="brand-lockup">
      <Image
        aria-hidden="true"
        className="brand-symbol"
        src={sitePath("/logo/logo.svg")}
        alt=""
        width={502}
        height={561}
      />
      <Image
        className="brand-wordmark"
        src={sitePath("/logo/gitcastText.png")}
        alt={title}
        width={453}
        height={105}
      />
    </span>
  );
}
