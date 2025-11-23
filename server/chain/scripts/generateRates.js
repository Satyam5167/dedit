const fs = require("fs");

const A = 1_000_000;
const Ea = 50000;
const R = 8.314;

let arr = [];

for (let i = 0; i <= 1000; i++) {
    const temp_c = i / 10 - 50.0;
    const temp_k = temp_c + 273.15;

    const k = A * Math.exp(-Ea / (R * temp_k));
    const scaled = Math.floor(k * 1e15);

    arr.push(scaled);
}

fs.writeFileSync("./scripts/rates.json", JSON.stringify(arr, null, 2));
console.log("Generated degradation rate table.");
