# 🧪 DeDiT – Decentralized Digital Twin for Vaccine Vials

A blockchain-powered real-time vaccine monitoring system that ensures safety, transparency, and tamper-proof tracking using digital twins.

---

## 🚀 Overview

Vaccines are extremely temperature-sensitive. If stored incorrectly, they spoil — risking health and causing large wastage.

**DeDiT (Decentralized Digital Twin)** creates an **on-chain digital twin NFT** for every vaccine vial and continuously updates its real-time temperature.  
It ensures:

- Automated live monitoring  
- Tamper-proof on-chain logs  
- Real-time spoilage detection  
- Live analytics and dashboard  

This removes reliance on manual logs and guarantees transparency across the entire cold chain.

[🔗 Working Demo Video](https://www.youtube.com/watch?v=A8E4V_GSjFA&t=12s)


---

## 🛠 Tech Stack

### **Frontend**
- React + TypeScript  
- TailwindCSS  
- Recharts  
- Lucide Icons  

### **Backend**
- Node.js + Express  
- Ethers.js  
- REST API  

### **Blockchain**
- Solidity Smart Contract  
- NFT Digital Twin  
- Deployed on Sepolia / Arbitrum Stylus  

---

## 🔥 Features

### 🧊 Real-Time Monitoring
- Auto temperature updates every **5 seconds**
- Graph auto-refresh every **4 seconds**
- IST timestamp formatting  
- Smooth UI animations  

### 🧬 Digital Twin NFT
Each vial NFT stores:
- Temperature  
- Potency  
- Spoilage State  
- Last updated timestamp  

### ⚠️ Spoilage Detection
If a vial overheats:
- Smart contract marks it **SPOILED**
- Frontend disables auto-updates  
- Red alert UI with glowing animation  

---

## 🖥 How to Run

### 1️⃣ Clone Repo
```bash
git clone <your-repo>
```

### 2️⃣ Install Frontend
```bash
cd frontend
npm install
npm run dev
```

### 3️⃣ Install Backend
```bash
cd backend
npm install
npm start
```

### 4️⃣ Add `.env`
```
SEPOLIA_RPC_URL=
PRIVATE_KEY=
CONTRACT_ADDRESS=
```

---

## 📡 API Endpoints

### `GET /vial/:id`
Returns vial state.

### `POST /update`
Updates temperature.

### `POST /mint`
Mints a new vial NFT.

---

## 🔮 Future Enhancements
- IoT hardware integration  
- Push alerts  
- GPS tracking  
- Multi-vial admin dashboard  

---

## 📄 License
MIT License © 2025 DeDiT
