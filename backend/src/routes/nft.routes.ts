import { Router } from 'express';
import { UploadedFile } from 'express-fileupload';
import { uploadToIPFS } from '../services/ipfs.service';
import { createCollection, mintNFT, broadcastTransaction, evolveNFT } from '../services/nft.service';

const router = Router();

// Create Collection
router.post('/collection', async (req, res) => {
  try {
    const { name, symbol, chainId } = req.body;
    
    // Validate required fields
    if (!name || !symbol || !chainId) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['name', 'symbol', 'chainId'],
        received: req.body
      });
    }

    const result = await createCollection(name, symbol, chainId);
    res.json(result);
  } catch (error) {
    console.error('Route Error - Create Collection:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Internal server error',
      timestamp: new Date().toISOString()
    });
  }
});

// Mint NFT
router.post('/mint', async (req, res) => {
  try {
    const { chainId, contractAddress, mintTo, name, description, image } = req.body;
    
    // Validate required fields
    if (!chainId || !contractAddress || !mintTo || !name || !description || !image) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['chainId', 'contractAddress', 'mintTo', 'name', 'description', 'image'],
        received: req.body
      });
    }

    const result = await mintNFT(chainId, contractAddress, mintTo, name, description, image);
    res.json(result);
  } catch (error) {
    console.error('Route Error - Mint NFT:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Internal server error',
      timestamp: new Date().toISOString()
    });
  }
});

// Broadcast Transaction
router.post('/broadcast', async (req, res) => {
  try {
    const { tokenId, chainId, ownershipContractAddress } = req.body;
    
    // Validate required fields
    if (!tokenId || !chainId || !ownershipContractAddress) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['tokenId', 'chainId', 'ownershipContractAddress'],
        received: req.body
      });
    }

    const result = await broadcastTransaction(tokenId, chainId, ownershipContractAddress);
    res.json(result);
  } catch (error) {
    console.error('Route Error - Broadcast Transaction:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Internal server error',
      timestamp: new Date().toISOString()
    });
  }
});

// Evolve NFT
router.post('/evolve', async (req, res) => {
  try {
    const { chainId, contractAddress, tokenId, name, description, image } = req.body;
    
    // Validate required fields
    if (!chainId || !contractAddress || !tokenId || !name || !description || !image) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['chainId', 'contractAddress', 'tokenId', 'name', 'description', 'image'],
        received: req.body
      });
    }

    const result = await evolveNFT(chainId, contractAddress, tokenId, name, description, image);
    res.json(result);
  } catch (error) {
    console.error('Route Error - Evolve NFT:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Internal server error',
      timestamp: new Date().toISOString()
    });
  }
});

// Upload to IPFS
router.post('/upload', async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({
        error: 'No file uploaded',
        required: ['file'],
        received: 'no file in request'
      });
    }

    const file = req.files.file as UploadedFile;
    
    // Validate file type
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return res.status(400).json({
        error: 'Invalid file type',
        allowed: allowedMimeTypes,
        received: file.mimetype
      });
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      return res.status(400).json({
        error: 'File too large',
        maxSize: '10MB',
        received: `${(file.size / (1024 * 1024)).toFixed(2)}MB`
      });
    }

    console.log('Processing file upload:', {
      name: file.name,
      type: file.mimetype,
      size: `${(file.size / (1024 * 1024)).toFixed(2)}MB`
    });

    const ipfsHash = await uploadToIPFS(file);
    res.json({ ipfsHash });
  } catch (error) {
    console.error('Route Error - Upload to IPFS:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Internal server error',
      timestamp: new Date().toISOString()
    });
  }
});

export default router; 