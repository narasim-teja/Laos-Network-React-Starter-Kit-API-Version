import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import App from './App.tsx'
import './index.css'

// Network configurations
const networks = {
  testnet: {
    blockExplorerUrls: ['https://sigma.explorer.laosnetwork.io/'],
    chainId: 62850,
    chainName: 'Laos Testnet',
    iconUrls: ["../Laos_Logo.png"],
    name: 'Laos Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'LAOS SIGMA',
      symbol: 'SIGMA',
    },
    networkId: 62850,
    rpcUrls: ['https://rpc.laossigma.laosfoundation.io'],
    vanityName: 'Laos Sigma',
  },
  mainnet: {
    blockExplorerUrls: ['https://blockscout.laos.laosfoundation.io/'],
    chainId: 6283,
    chainName: 'Laos Mainnet',
    iconUrls: ["../Laos_Logo.png"],
    name: 'Laos Mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'LAOS',
      symbol: 'LAOS',
    },
    networkId: 6283,
    rpcUrls: ['https://rpc.laos.laosfoundation.io'],
    vanityName: 'Laos Mainnet',
  }
};

// Get network from environment variable, default to testnet if not specified
const defaultNetwork = import.meta.env.VITE_DEFAULT_NETWORK || 'testnet';
const evmNetworks = [networks[defaultNetwork as keyof typeof networks]];

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DynamicContextProvider
      settings={{
        environmentId: import.meta.env.VITE_DYNAMIC_ENVIRONMENT_ID,
        walletConnectors: [ EthereumWalletConnectors ],
        overrides: { evmNetworks },
      }}
    >
      <App />
    </DynamicContextProvider>
  </StrictMode>,
)
