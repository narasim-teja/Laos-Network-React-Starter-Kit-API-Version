import { useState } from 'react';
import { useIsLoggedIn } from '@dynamic-labs/sdk-react-core';

interface BroadcastResponse {
  success: boolean;
  tokenId: string;
}

const BroadcastTransaction = () => {
  const isLoggedIn = useIsLoggedIn();
  const [chainId, setChainId] = useState('137');
  const [tokenId, setTokenId] = useState('');
  const [collectionAddress, setCollectionAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [broadcastResult, setBroadcastResult] = useState<BroadcastResponse | null>(null);

  const apiUrl = import.meta.env.VITE_DEFAULT_NETWORK === 'mainnet' 
    ? 'https://api.laosnetwork.io/graphql' 
    : 'https://testnet.api.laosnetwork.io/graphql';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_API_KEY,
        },
        body: JSON.stringify({
          query: `
            mutation BroadCast {
              broadcast(input: {
                tokenId: "${tokenId}",
                chainId: "${chainId}",
                ownershipContractAddress: "${collectionAddress.toLowerCase()}"
              }) {
                success
                tokenId
              }
            }
          `,
        }),
      });

      const data = await response.json();
      
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }

      setBroadcastResult(data.data.broadcast);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to broadcast transaction');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="text-center p-4 bg-[#1a0d29] rounded-lg">
        Please connect your wallet to broadcast transactions
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-[#1a0d29] rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6">Broadcast Transaction</h2>
      
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
          <label className="block text-sm font-medium mb-2">Collection Address</label>
          <input
            type="text"
            value={collectionAddress}
            onChange={(e) => setCollectionAddress(e.target.value)}
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

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-[#432673] hover:bg-[#523282] rounded transition-colors duration-200 disabled:opacity-50"
        >
          {isLoading ? 'Broadcasting...' : 'Broadcast Transaction'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-500/20 border border-red-500 rounded text-red-200">
          {error}
        </div>
      )}

      {broadcastResult && (
        <div className="mt-6 p-4 bg-[#432673]/20 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Transaction Broadcasted Successfully!</h3>
          <div className="space-y-2 text-sm">
            <p className="break-all">
              <span className="font-medium">Token ID:</span> {broadcastResult.tokenId}
            </p>
            <p>
              <span className="font-medium">Status:</span>{' '}
              {broadcastResult.success ? 'Success' : 'Failed'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BroadcastTransaction;