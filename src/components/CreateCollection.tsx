import { useState } from 'react';
import { useIsLoggedIn } from '@dynamic-labs/sdk-react-core';
import { createCollection as createCollectionApi } from '../services/api';

interface CollectionResponse {
  batchMinterAddress: string;
  chainId: string;
  contractAddress: string;
  laosAddress: string;
  name: string;
  success: boolean;
  symbol: string;
}

const CreateCollection = () => {
    const isLoggedIn = useIsLoggedIn();
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [chainId, setChainId] = useState('137');
  const [isLoading, setIsLoading] = useState(false);
  const [collection, setCollection] = useState<CollectionResponse | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await createCollectionApi(name, symbol, chainId);
      setCollection(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create collection');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="text-center p-4 bg-[#1a0d29] rounded-lg">
        Please connect your wallet to create a collection
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-[#1a0d29] rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6">Create NFT Collection</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Collection Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded bg-[#25143B] border border-[#432673] focus:outline-none focus:border-[#523282]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Symbol</label>
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="w-full p-2 rounded bg-[#25143B] border border-[#432673] focus:outline-none focus:border-[#523282]"
            required
          />
        </div>

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

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-[#432673] hover:bg-[#523282] rounded transition-colors duration-200 disabled:opacity-50"
        >
          {isLoading ? 'Creating...' : 'Create Collection'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-500/20 border border-red-500 rounded text-red-200">
          {error}
        </div>
      )}

      {collection && (
        <div className="mt-6 p-4 bg-[#432673]/20 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Collection Created!</h3>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Name:</span> {collection.name}</p>
            <p><span className="font-medium">Symbol:</span> {collection.symbol}</p>
            <p><span className="font-medium">Chain ID:</span> {collection.chainId}</p>
            <p className="break-all"><span className="font-medium">Contract Address:</span> {collection.contractAddress}</p>
            <p className="break-all"><span className="font-medium">Batch Minter:</span> {collection.batchMinterAddress}</p>
            <p className="break-all"><span className="font-medium">LAOS Address:</span> {collection.laosAddress}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCollection;