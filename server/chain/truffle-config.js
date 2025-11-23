require('dotenv').config();
console.log("Loaded RPC URL:", process.env.SEPOLIA_RPC_URL);
console.log("Loaded Private Key:", process.env.PRIVATE_KEY);
const HDWalletProvider = require('@truffle/hdwallet-provider');
console.log(process.env.PRIVATE_KEY)
module.exports = {
  networks: {
    sepolia: {
      provider: () => new HDWalletProvider({
        privateKeys: [process.env.PRIVATE_KEY],   // Your account private key
        providerOrUrl: process.env.SEPOLIA_RPC_URL,   // Infura Sepolia endpoint
        pollingInterval: 60000                    // 10 seconds polling to reduce rate-limiting errors
      }),
      network_id: 11155111, 
      gas: 5000000,       // 5 million
      gasPrice: 3000000000, 
    // Sepolia testnet network ID
      confirmations: 1,           // Wait for 2 block confirmations
      timeoutBlocks: 500,         // Timeout if not mined within 200 blocks
      skipDryRun: true            // Skip test migration before actual deployment
    }
  },

  compilers: {
    solc: {
      version: "0.8.20",          // Solidity compiler version
      settings: {
        optimizer: {
          enabled: true,
          runs: 200               // Optimize for 200 runs
        }
      }
    }
  }
};
