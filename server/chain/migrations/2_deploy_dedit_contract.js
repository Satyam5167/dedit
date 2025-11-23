const DeDiTContract = artifacts.require("DeDiTContract");
const fs = require("fs");

module.exports = async function (deployer, network, accounts) {
  // Load the rates.json file from scripts folder
  console.log("Loading rates.json...");

  const rates = JSON.parse(fs.readFileSync("./scripts/rates.json"));

  // The contract expects exactly 1001 values
  if (rates.length !== 1001) {
    throw new Error(`rates.json must contain exactly 1001 values, found: ${rates.length}`);
  }

  // ---------------------------------------------------------
  // STEP 1: DEPLOY THE CONTRACT
  // Deploying an empty contract (constructor does not take data)
  // ---------------------------------------------------------
  console.log("Deploying DeDiTContract...");
  await deployer.deploy(DeDiTContract);
  const instance = await DeDiTContract.deployed();
  console.log("Contract deployed at:", instance.address);

  // ---------------------------------------------------------
  // STEP 2: UPLOAD RATES IN SMALL CHUNKS
  // This is safer because uploading 1001 items in one go
  // can cause the transaction to run out of gas.
  // ---------------------------------------------------------

  const CHUNK_SIZE = 50; // Number of items to upload per transaction
  // 50 values × 32 bytes each = 1600 bytes → fits safely in a block

  console.log("Uploading rates in chunks of", CHUNK_SIZE);

  // Loop through entire rate list in chunks
  for (let i = 0; i < rates.length; i += CHUNK_SIZE) {
    const slice = rates.slice(i, i + CHUNK_SIZE);

    // Convert each value to 32-byte hex and join into one long hex string
    const packedChunk =
      "0x" +
      slice
        .map((x) => BigInt(x).toString(16).padStart(64, "0"))
        .join("");

    console.log(
      `Uploading chunk at index ${i} (${slice.length} items, ${packedChunk.length / 2} bytes)`
    );

    // Call smart contract function with safe gas
    await instance.uploadRates(packedChunk, i, {
      gas: 6_000_000, // Safe amount of gas for each chunk upload
    });
  }

  console.log("All rates successfully uploaded!");
};
