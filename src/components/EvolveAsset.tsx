import { useState, useRef } from 'react';
import { useIsLoggedIn } from '@dynamic-labs/sdk-react-core';
import { uploadToIPFS } from '../services/ipfsService';
import { FiUpload } from 'react-icons/fi';

interface EvolveResponse {
  success: boolean;
  tx: string;
}

const EvolveAsset = () => {
  const isLoggedIn = useIsLoggedIn();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [chainId, setChainId] = useState('137');
  const [contractAddress, setContractAddress] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [evolveResult, setEvolveResult] = useState<EvolveResponse | null>(null);
  const [uploadProgress, setUploadProgress] = useState<string>('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setUploadProgress('Uploading to IPFS...');

    try {
      if (!selectedFile) {
        throw new Error('Please select an image file');
      }

      // Upload image to IPFS
      const imageUrl = await uploadToIPFS(selectedFile);
      setUploadProgress('Image uploaded! Evolving NFT...');

      // Evolve NFT
      const response = await fetch('https://testnet.api.laosnetwork.io/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_API_KEY,
        },
        body: JSON.stringify({
          query: `
            mutation EvolveNFT {
              evolve(
                input: {
                  chainId: "${chainId}"
                  contractAddress: "${contractAddress.toLowerCase()}"
                  tokenId: "${tokenId}"
                  name: "${name}"
                  description: "${description}"
                  image: "${imageUrl}"
                }
              ) {
                success
                tx
              }
            }
          `,
        }),
      });

      const data = await response.json();
      
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }

      setEvolveResult(data.data.evolve);
      setUploadProgress('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to evolve NFT');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="text-center p-4 bg-[#1a0d29] rounded-lg">
        Please connect your wallet to evolve NFTs
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-[#1a0d29] rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6">Evolve NFT</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Chain</label>
          <select
            value={chainId}
            onChange={(e) => setChainId(e.target.value)}
            className="w-full p-2 rounded bg-[#25143B] border border-[#432673] focus:outline-none focus:border-[#523282]"
          >
            <option value="1">Ethereum Mainnet</option>
            <option value="137">Polygon Mainnet</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Contract Address</label>
          <input
            type="text"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            placeholder="0x..."
            className="w-full p-2 rounded bg-[#25143B] border border-[#432673] focus:outline-none focus:border-[#523282]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Token ID</label>
          <input
            type="text"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            placeholder="Enter token ID"
            className="w-full p-2 rounded bg-[#25143B] border border-[#432673] focus:outline-none focus:border-[#523282]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">New NFT Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded bg-[#25143B] border border-[#432673] focus:outline-none focus:border-[#523282]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">New Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded bg-[#25143B] border border-[#432673] focus:outline-none focus:border-[#523282]"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">New Image</label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            accept="image/*"
            required
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full p-4 border-2 border-dashed border-[#432673] rounded-lg hover:border-[#523282] transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <FiUpload className="w-5 h-5" />
            {selectedFile ? selectedFile.name : 'Click to upload new image'}
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-[#432673] hover:bg-[#523282] rounded transition-colors duration-200 disabled:opacity-50"
        >
          {isLoading ? 'Evolving...' : 'Evolve NFT'}
        </button>
      </form>

      {uploadProgress && (
        <div className="mt-4 p-3 bg-blue-500/20 border border-blue-500 rounded">
          {uploadProgress}
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-500/20 border border-red-500 rounded text-red-200">
          {error}
        </div>
      )}

      {evolveResult && (
        <div className="mt-6 p-4 bg-[#432673]/20 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">NFT Evolved Successfully!</h3>
          <div className="space-y-2 text-sm">
            <p className="break-all">
              <span className="font-medium">Transaction Hash:</span> {evolveResult.tx}
            </p>
            <p>
              <span className="font-medium">Status:</span>{' '}
              {evolveResult.success ? 'Success' : 'Failed'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvolveAsset;
