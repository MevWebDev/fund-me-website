# 💎 FundMe - Web3 Donation Platform on Base

A beautiful, modern Web3 donation platform built with Next.js, RainbowKit, Wagmi, and Viem. Accept cryptocurrency donations through your smart contract on Base blockchain with a stunning user interface.

![FundMe Platform](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![RainbowKit](https://img.shields.io/badge/RainbowKit-2.2-purple?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Base](https://img.shields.io/badge/Base-Mainnet-0052FF?style=for-the-badge)

## ✨ Features

- 🌈 **RainbowKit Integration** - Beautiful wallet connection UI with support for 100+ wallets
- 🔗 **Multi-Network Support** - Works on Base Mainnet and Base Sepolia testnet
- 💰 **Real-time Balance Tracking** - See total raised and individual contributions
- ⚡ **Instant Transactions** - Fast Base network integration with low fees
- 🎨 **Beautiful UI** - Modern glassmorphism design with smooth animations
- 📱 **Responsive Design** - Works perfectly on all devices
- 🔒 **Secure** - Built on Base blockchain with smart contracts
- 👑 **Owner Controls** - Special withdrawal functionality for contract owners
- 🔍 **Basescan Integration** - View transactions and contract on Basescan

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- MetaMask or another Web3 wallet
- A deployed FundMe smart contract on Ethereum (mainnet or testnet)

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd fund-me-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Copy the example environment file:

   ```bash
   cp env.example .env.local
   ```

   Edit `.env.local` and add your values:

   ```env
   NEXT_PUBLIC_WC_PROJECT_ID=your_walletconnect_project_id
   NEXT_PUBLIC_FUNDME_ADDRESS=0xYourContractAddress
   ```

   - Get a WalletConnect Project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/)
   - Add your deployed FundMe contract address

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Smart Contract Setup

Your FundMe smart contract should have the following functions:

```solidity
// Payable function to accept donations
function fund() public payable {}

// View function to get contract balance
function getBalance() public view returns (uint256) {}

// View function to get user's contribution
function addressToAmountFunded(address) public view returns (uint256) {}

// View function to get contract owner
function getOwner() public view returns (address) {}

// Function to withdraw funds (owner only)
function withdraw() public {}
```

### Example FundMe Contract

If you don't have a FundMe contract yet, here's a basic example:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FundMe {
    address public owner;
    mapping(address => uint256) public addressToAmountFunded;
    address[] public funders;

    event Funded(address indexed funder, uint256 amount);
    event Withdrawn(address indexed owner, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    function fund() public payable {
        require(msg.value > 0, "Must send some ETH");

        if (addressToAmountFunded[msg.sender] == 0) {
            funders.push(msg.sender);
        }

        addressToAmountFunded[msg.sender] += msg.value;
        emit Funded(msg.sender, msg.value);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw");
        uint256 balance = address(this).balance;

        payable(owner).transfer(balance);

        for (uint256 i = 0; i < funders.length; i++) {
            addressToAmountFunded[funders[i]] = 0;
        }
        funders = new address[](0);

        emit Withdrawn(owner, balance);
    }
}
```

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Web3 Libraries**:
  - Wagmi - React Hooks for Ethereum
  - Viem - TypeScript Interface for Ethereum
  - @tanstack/react-query - Data fetching and caching
- **Styling**: Tailwind CSS + Custom CSS
- **Language**: TypeScript
- **Blockchain**: Ethereum (Mainnet & Sepolia testnet)

## 📁 Project Structure

```
fund-me-website/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with Web3Provider
│   │   ├── page.tsx             # Main landing page
│   │   └── globals.css          # Global styles
│   ├── components/
│   │   ├── ConnectButton.tsx    # Wallet connection UI
│   │   └── FundMeCard.tsx       # Main donation interface
│   ├── config/
│   │   └── wagmi.ts             # Wagmi configuration
│   ├── contracts/
│   │   └── FundMe.ts            # Contract ABI and address
│   ├── hooks/
│   │   └── useFundMe.ts         # Custom hook for contract interaction
│   └── providers/
│       └── Web3Provider.tsx     # Web3 context provider
├── public/                      # Static assets
├── env.example                  # Environment variables template
└── package.json
```

## 🎨 Customization

### Update Contract ABI

If your FundMe contract has different functions, update the ABI in `src/contracts/FundMe.ts`:

```typescript
export const FUNDME_ABI = [
  // Add your contract's ABI here
] as const;
```

### Change Supported Networks

Edit `src/config/wagmi.ts` to add or remove blockchain networks:

```typescript
import { mainnet, sepolia, polygon } from "wagmi/chains";

export const config = createConfig({
  chains: [mainnet, sepolia, polygon], // Add your chains
  // ...
});
```

### Styling

The app uses a combination of Tailwind CSS and custom CSS variables. Modify colors and themes in `src/app/globals.css`:

```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --accent-purple: #667eea;
  /* ... customize your colors */
}
```

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Build for Production

```bash
npm run build
npm start
```

## 📖 Usage

1. **Connect Wallet**: Click "Connect Your Wallet" and select your preferred wallet
2. **View Stats**: See total funds raised and your personal contribution
3. **Make Donation**: Enter amount in ETH and click "Donate Now"
4. **Confirm Transaction**: Approve the transaction in your wallet
5. **Track Status**: Watch real-time transaction confirmation
6. **Owner Actions**: If you're the contract owner, you can withdraw funds

## 🔐 Security

- All transactions are secured by Ethereum blockchain
- Smart contract handles fund management
- No private keys are stored in the application
- Users maintain full control of their wallets

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Support

If you need help:

- Check the [Wagmi Documentation](https://wagmi.sh/)
- Visit [Viem Documentation](https://viem.sh/)
- Review [Next.js Documentation](https://nextjs.org/docs)

## 🎯 Roadmap

- [ ] Add support for ERC-20 token donations
- [ ] Implement donation history and leaderboard
- [ ] Add email notifications for donations
- [ ] Create admin dashboard
- [ ] Multi-language support
- [ ] Dark/Light theme toggle

---

Built with ❤️ using Next.js, Wagmi, and Viem
