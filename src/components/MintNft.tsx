import { useState, useRef } from 'react';
import { useIsLoggedIn } from '@dynamic-labs/sdk-react-core';
import { mintNFT as mintNFTApi, uploadToIPFS as uploadToIPFSApi } from '../services/api';
import { FiUpload } from 'react-icons/fi';

interface MintResponse {
  tokenIds: string[];
  success: boolean;
}

const MintNft = () => {
  const isLoggedIn = useIsLoggedIn();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [chainId, setChainId] = useState('137');
  const [contractAddress, setContractAddress] = useState('');
  const [mintTo, setMintTo] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [mintResult, setMintResult] = useState<MintResponse | null>(null);
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
      const imageUrl = await uploadToIPFSApi(selectedFile);
      setUploadProgress('Image uploaded! Minting NFT...');

      // Mint NFT
      const result = await mintNFTApi(
        chainId,
        contractAddress,
        [mintTo],
        name,
        description,
        imageUrl
      );

      setMintResult(result);
      setUploadProgress('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mint NFT');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="text-center p-4 bg-[#1a0d29] rounded-lg">
        Please connect your wallet to mint NFTs
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-[#1a0d29] rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6">Mint NFT</h2>
      
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
          <label className="block text-sm font-medium mb-2">Mint To Address</label>
          <input
            type="text"
            value={mintTo}
            onChange={(e) => setMintTo(e.target.value)}
            placeholder="0x..."
            className="w-full p-2 rounded bg-[#25143B] border border-[#432673] focus:outline-none focus:border-[#523282]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">NFT Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded bg-[#25143B] border border-[#432673] focus:outline-none focus:border-[#523282]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded bg-[#25143B] border border-[#432673] focus:outline-none focus:border-[#523282]"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Image</label>
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
            {selectedFile ? selectedFile.name : 'Click to upload image'}
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-[#432673] hover:bg-[#523282] rounded transition-colors duration-200 disabled:opacity-50"
        >
          {isLoading ? 'Minting...' : 'Mint NFT'}
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

      {mintResult && (
        <div className="mt-6 p-4 bg-[#432673]/20 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">NFT Minted Successfully!</h3>
          <div className="space-y-2 text-sm">
            <p className="break-all">
              <span className="font-medium">Token IDs:</span> {mintResult.tokenIds.join(', ')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MintNft;