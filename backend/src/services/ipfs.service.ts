import axios from 'axios';
import FormData from 'form-data';
import { UploadedFile } from 'express-fileupload';

const PINATA_API_URL = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

export const uploadToIPFS = async (file: UploadedFile): Promise<string> => {
  try {
    console.log('Uploading file to IPFS:', {
      name: file.name,
      size: file.size,
      mimetype: file.mimetype
    });

    const formData = new FormData();
    formData.append('file', file.data, {
      filename: file.name,
      contentType: file.mimetype
    });

    const response = await axios.post(PINATA_API_URL, formData, {
      headers: {
        'Authorization': `Bearer ${process.env.PINATA_JWT}`,
        ...formData.getHeaders()
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    });

    console.log('Pinata Response:', response.data);

    if (!response.data.IpfsHash) {
      throw new Error('Failed to get IPFS hash from Pinata');
    }

    return `ipfs://${response.data.IpfsHash}`;
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    if (axios.isAxiosError(error)) {
      console.error('Pinata API Error:', {
        status: error.response?.status,
        data: error.response?.data
      });
      throw new Error(`Pinata API Error: ${error.response?.data?.message || error.message}`);
    }
    throw new Error('Failed to upload to IPFS');
  }
}; 