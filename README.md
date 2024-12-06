# Laos Network React Starter Kit (API Version) 🚀

A complete React-based starter kit for building NFT applications on Laos Network using API keys. This kit comes pre-configured with Dynamic Wallet integration, Pinata IPFS storage, and Laos Network API integration.

> **Note**: This is the API-based React starter kit. For other versions (Next.js, permissionless minting, etc.), check out our other starter kits in the Laos Network organization.

## Features ✨

- ⚛️ Built with React + TypeScript
- 🔑 API-based NFT operations
- 🔐 Wallet Connection with Dynamic
- 📝 NFT Collection Creation via API
- 🎨 NFT Minting with IPFS Storage
- 🌉 Cross-chain Broadcasting
- 🔄 NFT Evolution
- 🎯 Testnet & Mainnet Support
- 🔒 Secure Backend API Proxy

## Prerequisites 📋

Before you begin, you'll need to obtain the following API keys:

1. **Dynamic Wallet Environment ID**
   - Visit [Dynamic](https://www.dynamic.xyz)
   - Sign up for an account
   - Create a new project
   - Copy your Environment ID

2. **Pinata JWT**
   - Go to [Pinata](https://pinata.cloud)
   - Create an account
   - Navigate to API Keys section
   - Generate a new JWT key

3. **Laos Network API Key**
   - Join the [Laos Network Community](https://laosnetwork.io/community)
   - Request API access
   - Follow the instructions to receive your API key

## Getting Started 🏁

1. **Clone the repository**
   ```bash
   git clone https://github.com/narasim-teja/Laos-Network-React-Starter-Kit-API-Version.git
   cd Laos-Network-React-Starter-Kit-API-Version
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   ```
   Update the `backend/.env` file with your API keys:
   ```env
   PORT=5050
   NETWORK=testnet
   LAOS_API_KEY=your-laos-api-key
   PINATA_JWT=your-pinata-jwt
   ```

3. **Start the backend server**
   ```bash
   npm run dev
   ```

4. **Set up the frontend**
   ```bash
   cd ..  # Return to root directory
   npm install
   cp .env.example .env
   ```
   Update the `.env` file with your Dynamic environment ID:
   ```env
   VITE_DYNAMIC_ENVIRONMENT_ID=your-dynamic-environment-id
   VITE_DEFAULT_NETWORK=testnet
   ```

5. **Start the frontend development server**
   ```bash
   npm run dev
   ```

## Network Configuration 🌐

The starter kit supports both Testnet and Mainnet:

### Testnet
- Chain ID: 62850
- RPC URL: https://rpc.laossigma.laosfoundation.io
- Explorer: https://sigma.explorer.laosnetwork.io/
- Currency: SIGMA

### Mainnet
- Chain ID: 6283
- RPC URL: https://rpc.laos.laosfoundation.io
- Explorer: https://blockscout.laos.laosfoundation.io/
- Currency: LAOS

## API Features 🛠️

### 1. Create NFT Collection
- Create new NFT collections on either Ethereum or Polygon using Laos Network API
- Automatically deploys contracts
- Provides collection details and addresses

### 2. Mint NFT
- Mint new NFTs via API endpoints
- Upload images to IPFS
- Set NFT metadata (name, description)
- Support for both chains

### 3. Broadcast Transaction
- Broadcast NFT transactions across chains using API
- Track transaction status
- Verify ownership transfers

### 4. Evolve Asset
- Update existing NFT metadata through API
- Change NFT images and properties
- Track evolution history

## Security 🔒

This starter kit includes a secure backend proxy that handles all API interactions. API keys are stored securely on the backend and are never exposed to the client.

## Tech Stack 👨‍💻

The project is built with:
- React + TypeScript
- Vite
- Tailwind CSS
- Dynamic Wallet SDK
- Express.js Backend
- Pinata IPFS
- Laos Network API

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## Support 💬

For support and questions:
- Join the [Laos Network Discord](https://discord.com/invite/HgnVEYfX2V)
- Visit the [Documentation](https://docs.laosnetwork.io)
- Follow on [Twitter](https://twitter.com/LaosNetwork)

---

Built with ❤️ for the Laos Network Community
