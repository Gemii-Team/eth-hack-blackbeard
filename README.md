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
- **AWS** (Cloud Provider)

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
.vscode  
apps  
    ai  
        src  
            new_search.py  
            price_fetching.py  
        .gitignore  
        main.py  
        requirements.txt  
        wallet1_seed.json  
    api  
        prisma  
        src  
        .gitignore  
        .prettierrc  
        eslint.config.mjs  
        nest-cli.json  
        package.json  
        tsconfig.build.json  
        tsconfig.json  
        node_modules  
    docs  
        app  
            fonts  
            favicon.ico  
            global.css  
            layout.tsx  
            page.module.css  
            page.tsx  
        public  
        .gitignore  
        eslint.config.js  
        next.config.js  
        package.json  
        tsconfig.json  
    web  
        app  
            [lang]  
            fonts  
            store/chat  
            favicon.ico  
            globals.css  
            page.module.css  
        dictionaries  
            en.json  
            th.json  
        public  
            assets  
            coin  
            partners  
            team  
        .gitignore  
        eslint.config.js  
        get-dictionary.ts  
        i18n-config.ts  
        middleware.ts  
        next.config.js  
        package.json  
        postcss.config.mjs  
        tailwind.config.ts  
        tsconfig.json  
LICENSE  
README.md  
package.json  
pnpm-lock.yaml  
pnpm-workspace.yaml  
turbo.json  
```

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/blackbeard.git
   cd blackbeard
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

