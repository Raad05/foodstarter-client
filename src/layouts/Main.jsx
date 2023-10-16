import "@rainbow-me/rainbowkit/styles.css";

import {
  ConnectButton,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { celo, celoAlfajores, celoCannoli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { Outlet } from "react-router-dom";

const Main = () => {
  // connect to wallet using wagmi
  const { chains, publicClient } = configureChains(
    [celoAlfajores, celo, celoCannoli],
    [publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: "Kickstarter",
    projectId: "304bb25132c30b8673622bd3433ef4ee",
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });

  return (
    <div className="home container m-auto mt-5">
      <div className="flex justify-center">
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            <ConnectButton></ConnectButton>
            <Outlet></Outlet>
          </RainbowKitProvider>
        </WagmiConfig>
      </div>
    </div>
  );
};

export default Main;
