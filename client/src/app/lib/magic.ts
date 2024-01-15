import { OAuthExtension } from "@magic-ext/oauth";
import { Magic } from "magic-sdk";

const createMagic = (): Magic | null => {
  if (typeof window !== "undefined") {
    return new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY!, {
      extensions: { oauth: new OAuthExtension() }, // Use an object with extension name as key
    }) as any | null;
  }

  return null;
};

export const magic: Magic | null = createMagic();