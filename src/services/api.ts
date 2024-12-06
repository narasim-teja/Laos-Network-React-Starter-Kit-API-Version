import axios from 'axios';

const API_URL = 'http://localhost:5050/api';

export const createCollection = async (name: string, symbol: string, chainId: string) => {
  const response = await axios.post(`${API_URL}/nft/collection`, {
    name,
    symbol,
    chainId,
  });
  return response.data;
};

export const mintNFT = async (
  chainId: string,
  contractAddress: string,
  mintTo: string[],
  name: string,
  description: string,
  image: string
) => {
  const response = await axios.post(`${API_URL}/nft/mint`, {
    chainId,
    contractAddress,
    mintTo,
    name,
    description,
    image,
  });
  return response.data;
};

export const broadcastTransaction = async (
  tokenId: string,
  chainId: string,
  ownershipContractAddress: string
) => {
  const response = await axios.post(`${API_URL}/nft/broadcast`, {
    tokenId,
    chainId,
    ownershipContractAddress,
  });
  return response.data;
};

export const evolveNFT = async (
  chainId: string,
  contractAddress: string,
  tokenId: string,
  name: string,
  description: string,
  image: string
) => {
  const response = await axios.post(`${API_URL}/nft/evolve`, {
    chainId,
    contractAddress,
    tokenId,
    name,
    description,
    image,
  });
  return response.data;
};

export const uploadToIPFS = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post(`${API_URL}/nft/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.ipfsHash;
}; 