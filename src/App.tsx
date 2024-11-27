import { useState } from 'react';
import WalletConnect from './components/WalletConnect';
import CreateCollection from './components/CreateCollection';
import MintNft from './components/MintNft';
import BroadcastTransaction from './components/BroadcastTransaction';
import EvolveAsset from './components/EvolveAsset';
import { FiChevronDown, FiChevronUp, FiExternalLink } from 'react-icons/fi';
import laosLogo from '/Laos_Logo.png' 

function App() {
  const networkType = import.meta.env.VITE_DEFAULT_NETWORK || 'testnet';
  const [openSection, setOpenSection] = useState<string | null>('create');

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const SectionHeader = ({ title, section }: { title: string; section: string }) => (
    <button
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between p-4 bg-[#1a0d29] rounded-lg hover:bg-[#2a1747] transition-colors duration-200"
    >
      <h2 className="text-2xl font-bold">{title}</h2>
      {openSection === section ? (
        <FiChevronUp className="w-6 h-6" />
      ) : (
        <FiChevronDown className="w-6 h-6" />
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#25143B] text-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-[#1a0d29] border-b border-[#432673]/30 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="px-3 py-1 rounded-full text-sm bg-[#432673]/20 border border-[#432673]">
                {networkType === 'mainnet' ? 'Mainnet' : 'Testnet'}
              </span>
            </div>
            <WalletConnect />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center mb-12">
          <a 
            href="https://laosnetwork.io/" 
            target="_blank" 
            className="hover:opacity-80 transition-opacity"
          >
            <img 
              src={laosLogo} 
              className="h-32 w-auto mb-8" 
              alt="Laos Network logo" 
            />
          </a>
          <h1 className="text-4xl font-bold mb-4">Laos Network Starter Kit</h1>
          <div className="text-xl text-gray-300 text-center max-w-2xl space-y-4">
            <p>
              A complete starter kit for building NFT applications on Laos Network. 
              Pre-configured with <a href="https://www.dynamic.xyz/" target="_blank" className="text-blue-400 hover:text-blue-300">Dynamic Wallet</a>, <a href="https://pinata.cloud/" target="_blank" className="text-blue-400 hover:text-blue-300">Pinata IPFS</a>, and Laos Network API integration.
            </p>
            <p className="text-sm text-gray-400">
              Features: Wallet Connection • NFT Collection Creation • NFT Minting • 
              Cross-chain Broadcasting • NFT Evolution
            </p>
          </div>

          {/* API Key Access Card */}
          <div className="mt-8 p-6 bg-[#1a0d29] rounded-lg border border-[#432673] max-w-xl w-full">
            <h3 className="text-lg font-semibold mb-3">🔑 Get Started with API Keys</h3>
            <p className="text-gray-300 mb-4">
              To use this starter kit, you'll need API keys from Laos Network. 
              Join our community to get access to API keys and start building.
            </p>
            <a 
              href="https://laosnetwork.io/community" 
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#432673] hover:bg-[#523282] rounded-lg transition-colors duration-200"
            >
              Request API Access <FiExternalLink />
            </a>
          </div>
        </div>

        {/* Components */}
        <div className="space-y-4">
          {/* Create Collection Section */}
          <div>
            <SectionHeader title="Create NFT Collection" section="create" />
            <div className={`mt-4 transition-all duration-300 ${
              openSection === 'create' ? 'block' : 'hidden'
            }`}>
              <CreateCollection />
            </div>
          </div>

          {/* Mint NFT Section */}
          <div>
            <SectionHeader title="Mint NFT" section="mint" />
            <div className={`mt-4 transition-all duration-300 ${
              openSection === 'mint' ? 'block' : 'hidden'
            }`}>
              <MintNft />
            </div>
          </div>

          {/* Broadcast Transaction Section */}
          <div>
            <SectionHeader title="Broadcast Transaction" section="broadcast" />
            <div className={`mt-4 transition-all duration-300 ${
              openSection === 'broadcast' ? 'block' : 'hidden'
            }`}>
              <BroadcastTransaction />
            </div>
          </div>

          {/* Evolve Asset Section */}
          <div>
            <SectionHeader title="Evolve Asset" section="evolve" />
            <div className={`mt-4 transition-all duration-300 ${
              openSection === 'evolve' ? 'block' : 'hidden'
            }`}>
              <EvolveAsset />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
