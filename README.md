# Blackbeard

## Overview
Blackbeard is a decentralized application (dApp) developed for the ETHGlobal "Agentic Ethereum" hackathon. The project provides essential Ethereum testnet functionalities on the Sepolia network, including wallet creation, balance retrieval, ETH faucet integration, and real-time crypto news updates.

## Features
- **Create Ethereum Testnet (Sepolia) Wallet**
- **Get Wallet Balance**
- **Add ETH to Testnet Wallet**
- **Fetch the Latest News on BTC, ETH, and Other Cryptocurrencies**

## Tech Stack
### Backend
- **NestJS** (with Prisma ORM)
- **PostgreSQL** (Database)

### Frontend
- **Next.js** (with i18n support)
- **Tailwind CSS**
- **TypeScript**

### AI Module
- **Python** (for AI-powered search and price fetching)

### Tools
- **TurboRepo** (Monorepo management)
- **PNPM** (Package manager)
- **Ethers.js** (Ethereum interaction)

## Project Structure
```
.vscode/             # VSCode settings and configurations
apps/               # Main application code
    ai/             # AI module for news search and price fetching
    api/            # Backend service using NestJS and Prisma ORM
    docs/           # Documentation website (Next.js)
    web/            # Frontend application (Next.js with i18n)
public/             # Static assets such as images and icons
config/             # Configuration files for ESLint, Prettier, Tailwind, etc.
LICENSE             # Project license information
README.md           # Project documentation
package.json        # Project dependencies and scripts
pnpm-lock.yaml      # Dependency lock file
pnpm-workspace.yaml # TurboRepo workspace configuration
turbo.json          # TurboRepo settings
```

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/eth-hack-blackbeard.git
   cd eth-hack-blackbeard
   ```

2. Install dependencies:
   ```sh
   pnpm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add necessary configurations for API keys, database connection, and Ethereum network settings

4. Start the development server:
   ```sh
   pnpm run dev
   ```

## Using Turborepo
### Build
To build all apps and packages, run the following command:
```sh
pnpm build
```

### Develop
To develop all apps and packages, run the following command:
```sh
pnpm dev
```

### Remote Caching
Turborepo supports [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines. By default, caching is local. To enable Remote Caching via Vercel:
1. Log in to Vercel:
   ```sh
   npx turbo login
   ```
2. Link the Turborepo to the Remote Cache:
   ```sh
   npx turbo link
   ```

## Contribution
Contributions are welcome! Please follow the guidelines below:
1. Fork the repository
2. Create a new feature branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m "Add new feature"`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

## License
This project is licensed under the MIT License.

---
