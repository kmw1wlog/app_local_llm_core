declare module "next/navigation" {
  export function redirect(url: string): never;
  export function usePathname(): string;
  export function useRouter(): {
    replace: (url: string) => void;
    push: (url: string) => void;
  };
}

declare module "next/link" {
  import * as React from "react";

  export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
  }

  const Link: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>;
  export default Link;
}
