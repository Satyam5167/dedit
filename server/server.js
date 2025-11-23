import express from "express";
import cors from "cors";
import { ethers } from "ethers";
import dotenv from "dotenv";
import { createRequire } from "module";

dotenv.config(); // Load environment variables

const require = createRequire(import.meta.url);
// Load the compiled smart contract JSON file
const contractJson = require("./chain/build/contracts/DeDiTContract.json");

const app = express();

app.use(
  cors({
    origin: "https://dedit.netlify.app", // allow only your frontend
    methods: ["GET", "POST"],            // allowed request types
    credentials: true,                   // allow cookies/headers if needed
  })
);

app.use(express.json()); // Allow JSON request body

const ABI = contractJson.abi;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

// Check if contract address exists
if (!CONTRACT_ADDRESS) {
  console.error("Missing CONTRACT_ADDRESS in .env");
  process.exit(1);
}

// Connect to the blockchain
const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);

// Wallet used to sign transactions
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Create contract instance
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

// Default gas settings for sending transactions
const gas = { gasLimit: 300000 };

// ------------------------------------------------------------------
// GET VIAL STATUS
// Purpose: Fetch vial info by token ID (temperature, potency, spoiled)
// ------------------------------------------------------------------
app.get("/vial/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    // Call contract function
    const result = await contract.getVialStatus(id);

    // Extract values returned from contract
    const temperature = Number(result[0]);
    const potency = result[1].toString(); // BigInt → string for safety
    const spoiled = Boolean(result[2]);

    res.json({
      tokenId: id,
      temperature,
      potency,
      spoiled,
    });

  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

// ------------------------------------------------------------------
// UPDATE TEMPERATURE
// Purpose: Update the temperature of a specific vial
// ------------------------------------------------------------------
app.post("/update", async (req, res) => {
  try {
    const tokenId = Number(req.body.tokenId);
    const temperature = Number(req.body.temperature);

    // Send transaction to blockchain
    const tx = await contract.updateTemperature(tokenId, temperature, gas);
    await tx.wait(); // Wait for confirmation

    res.json({ success: true, txHash: tx.hash });

  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

// ------------------------------------------------------------------
// MINT NEW VIAL
// Purpose: Create a new vial NFT on blockchain
// ------------------------------------------------------------------
app.post("/mint", async (req, res) => {
  try {
    const to = req.body.to;
    const tokenId = Number(req.body.tokenId);

    // Mint a new vial NFT
    const tx = await contract.mint(to, tokenId, gas);
    await tx.wait();

    res.json({ success: true, txHash: tx.hash });

  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

// ------------------------------------------------------------------
// UPLOAD CHUNKED RATES
// Purpose: Upload big dataset piece-by-piece to blockchain
// ------------------------------------------------------------------
app.post("/uploadRates", async (req, res) => {
  try {
    const { chunk, startIndex } = req.body;

    // Upload rates in chunks
    const tx = await contract.uploadRates(chunk, Number(startIndex), gas);
    await tx.wait();

    res.json({ success: true, txHash: tx.hash });

  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

// ------------------------------------------------------------------
// START SERVER
// ------------------------------------------------------------------
app.listen(process.env.PORT, () =>
  console.log("Server running on http://localhost:5000")
);
