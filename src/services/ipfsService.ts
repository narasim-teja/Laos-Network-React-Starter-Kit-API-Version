import axios from 'axios';

const PINATA_API_URL = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

interface IpfsResponse {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
}

export const uploadToIPFS = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post<IpfsResponse>(PINATA_API_URL, formData, {
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return `ipfs://${response.data.IpfsHash}`;
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw new Error('Failed to upload to IPFS');
  }
}; 