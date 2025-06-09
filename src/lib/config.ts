
import { http, createStorage, cookieStorage } from 'wagmi';
import { sepolia, arbitrumSepolia, optimismSepolia } from 'wagmi/chains';
import { Chain, getDefaultConfig } from '@rainbow-me/rainbowkit';

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID!; 

const supportedChains: Chain[] = [ sepolia, arbitrumSepolia, optimismSepolia ];

export const config = getDefaultConfig({
   appName: "WalletConnection",
   projectId,
   chains: supportedChains as any,
   ssr: true,
   storage: createStorage({
    storage: cookieStorage,
   }),
  transports: supportedChains.reduce((obj, chain) => ({ ...obj, [chain.id]: http() }), {})
 });