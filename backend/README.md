# LAOS Network API Backend

This is the backend service for the LAOS Network React Starter Kit. It provides a secure way to interact with the LAOS Network API and Pinata IPFS service.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Update the `.env` file with your API keys:
```env
PORT=5050
NETWORK=testnet
LAOS_API_KEY=your-laos-api-key
PINATA_JWT=your-pinata-jwt
```

## Development

Run the development server:
```bash
npm run dev
```

## Build

Build for production:
```bash
npm run build
```

## API Endpoints

### NFT Operations

- `POST /api/nft/collection` - Create NFT collection
- `POST /api/nft/mint` - Mint NFT
- `POST /api/nft/broadcast` - Broadcast transaction
- `POST /api/nft/evolve` - Evolve NFT
- `POST /api/nft/upload` - Upload file to IPFS

## Security

This backend service securely handles API keys and sensitive operations. All API keys are stored server-side and never exposed to the client. 