import Image from "next/image";

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
        src="/logo/logo.svg"
        alt=""
        width={502}
        height={561}
      />
      <Image
        className="brand-wordmark"
        src="/logo/gitcastText.png"
        alt={title}
        width={453}
        height={105}
      />
    </span>
  );
}
