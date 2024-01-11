import { Magic } from "magic-sdk";

// Initialize the Magic instance
const createMagic = (): Magic | null => {
  return (
    typeof window !== "undefined" &&
    new Magic(process?.env?.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY!, {
      network: {
        rpcUrl: "https://rpc2.sepolia.org",
        chainId: 11155111,
      },
    })
  ) || null;
};

export const magic: Magic | null = createMagic();