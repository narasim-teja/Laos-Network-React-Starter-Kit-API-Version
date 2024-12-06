import axios from 'axios';

const getApiUrl = () => {
  const network = process.env.NETWORK || 'testnet';
  const url = network === 'mainnet'
    ? 'https://api.laosnetwork.io/graphql'
    : 'https://testnet.api.laosnetwork.io/graphql';
  console.log(`Using API URL: ${url}`);
  return url;
};

const getHeaders = () => {
  const apiKey = process.env.LAOS_API_KEY;
  if (!apiKey) {
    throw new Error('LAOS_API_KEY is not set in environment variables');
  }
  return {
    'Content-Type': 'application/json',
    'x-api-key': apiKey,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleGraphQLErrors = (errors: any[], operation: string) => {
  if (!errors || errors.length === 0) return;

  const error = errors[0];
  console.error(`GraphQL Errors for ${operation}:`, errors);

  // Check for rate limiting errors
  if (error.message.includes('locked until')) {
    const match = error.message.match(/\[(.*?)\]/);
    const unlockTime = match ? match[1] : 'unknown time';
    throw new Error(`Rate limited: Operation ${operation} is locked until ${unlockTime}`);
  }

  // Check for permission errors
  if (error.message.includes('permission') || error.message.includes('unauthorized')) {
    throw new Error(`Permission denied: ${error.message}`);
  }

  // Handle other specific error cases
  if (error.extensions?.code === 'INTERNAL_SERVER_ERROR') {
    throw new Error(`API Error: ${error.message}`);
  }

  // Default error
  throw new Error(error.message);
};

export const createCollection = async (name: string, symbol: string, chainId: string) => {
  try {
    console.log('Creating collection with params:', { name, symbol, chainId });
    
    const response = await axios.post(getApiUrl(), {
      query: `
        mutation CreateCollection {
          createCollection(
            input: {
              name: "${name}"
              symbol: "${symbol}"
              chainId: "${chainId}"
            }
          ) {
            batchMinterAddress
            chainId
            contractAddress
            laosAddress
            name
            success
            symbol
          }
        }
      `,
    }, { headers: getHeaders() });

    console.log('API Response:', response.data);

    if (response.data.errors) {
      handleGraphQLErrors(response.data.errors, 'createCollection');
    }

    return response.data.data.createCollection;
  } catch (error) {
    console.error('Error creating collection:', error);
    throw error;
  }
};

export const mintNFT = async (
  chainId: string,
  contractAddress: string,
  mintTo: string[],
  name: string,
  description: string,
  image: string
) => {
  try {
    console.log('Minting NFT with params:', {
      chainId,
      contractAddress,
      mintTo,
      name,
      description,
      image,
    });

    // Validate contract address format
    if (!contractAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
      throw new Error('Invalid contract address format');
    }

    const response = await axios.post(getApiUrl(), {
      query: `
        mutation MintNFT {
          mint(
            input: {
              chainId: "${chainId}"
              contractAddress: "${contractAddress.toLowerCase()}"
              tokens: [
                {
                  mintTo: ${JSON.stringify(mintTo)}
                  name: "${name}"
                  description: "${description}"
                  image: "${image}"
                }
              ]
            }
          ) {
            tokenIds
            success
          }
        }
      `,
    }, { headers: getHeaders() });

    console.log('API Response:', response.data);

    if (response.data.errors) {
      handleGraphQLErrors(response.data.errors, 'mintNFT');
    }

    return response.data.data.mint;
  } catch (error) {
    console.error('Error minting NFT:', error);
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', {
        status: error.response?.status,
        data: error.response?.data,
      });
      throw new Error(`Failed to mint NFT: ${error.response?.data?.message || error.message}`);
    }
    throw error;
  }
};

export const broadcastTransaction = async (
  tokenId: string,
  chainId: string,
  ownershipContractAddress: string
) => {
  try {
    console.log('Broadcasting transaction with params:', {
      tokenId,
      chainId,
      ownershipContractAddress,
    });

    // Validate contract address format
    if (!ownershipContractAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
      throw new Error('Invalid contract address format');
    }

    const response = await axios.post(getApiUrl(), {
      query: `
        mutation BroadCast {
          broadcast(input: {
            tokenId: "${tokenId}",
            chainId: "${chainId}",
            ownershipContractAddress: "${ownershipContractAddress.toLowerCase()}"
          }) {
            success
            tokenId
          }
        }
      `,
    }, { headers: getHeaders() });

    console.log('API Response:', response.data);

    if (response.data.errors) {
      handleGraphQLErrors(response.data.errors, 'broadcastTransaction');
    }

    return response.data.data.broadcast;
  } catch (error) {
    console.error('Error broadcasting transaction:', error);
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', {
        status: error.response?.status,
        data: error.response?.data,
      });
      throw new Error(`Failed to broadcast transaction: ${error.response?.data?.message || error.message}`);
    }
    throw error;
  }
};

export const evolveNFT = async (
  chainId: string,
  contractAddress: string,
  tokenId: string,
  name: string,
  description: string,
  image: string
) => {
  try {
    console.log('Evolving NFT with params:', {
      chainId,
      contractAddress,
      tokenId,
      name,
      description,
      image,
    });

    // Validate contract address format
    if (!contractAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
      throw new Error('Invalid contract address format');
    }

    const response = await axios.post(getApiUrl(), {
      query: `
        mutation EvolveNFT {
          evolve(
            input: {
              chainId: "${chainId}"
              contractAddress: "${contractAddress.toLowerCase()}"
              tokenId: "${tokenId}"
              name: "${name}"
              description: "${description}"
              image: "${image}"
            }
          ) {
            success
            tx
          }
        }
      `,
    }, { headers: getHeaders() });

    console.log('API Response:', response.data);

    if (response.data.errors) {
      handleGraphQLErrors(response.data.errors, 'evolveNFT');
    }

    return response.data.data.evolve;
  } catch (error) {
    console.error('Error evolving NFT:', error);
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', {
        status: error.response?.status,
        data: error.response?.data,
      });
      throw new Error(`Failed to evolve NFT: ${error.response?.data?.message || error.message}`);
    }
    throw error;
  }
}; 