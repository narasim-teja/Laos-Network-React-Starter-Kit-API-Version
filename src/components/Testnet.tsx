import { ExternalLinkIcon } from '@heroicons/react/outline';

const Testnet: React.FC  = () => {
  return (
      <div className="mt-2 mb-4 text-center">
          <a
            href="https://testnet.apps.laosnetwork.io/faucet"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 text-sm flex items-center justify-center"
          >
            Get Laos Sigma Testnet Tokens Here
            <ExternalLinkIcon className="h-4 w-4 ml-1" />
          </a>
        </div>
  )
}

export default Testnet
