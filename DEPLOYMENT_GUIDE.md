# 🚀 Complete Deployment Guide

## Quick Deployment Checklist

### ✅ Prerequisites Check
- [ ] Node.js ≥16 installed
- [ ] MetaMask installed and configured
- [ ] Test ETH in wallet (for testnet)
- [ ] Git repository cloned
- [ ] Dependencies installed

---

## Option 1: Local Development (Fastest)

### Step 1: Terminal Setup
Open 3 terminals in your project directory.

### Step 2: Start Local Blockchain (Terminal 1)
```bash
npx hardhat node
```
**Keep this running!** This creates a local Ethereum network.

### Step 3: Deploy Contract (Terminal 2)
```bash
npx hardhat run scripts/deploy.js --network localhost
```

**Copy the contract address from output!**

Example output:
```
Contract deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

### Step 4: Configure Frontend
```bash
cd frontend
# Create .env file
echo "REACT_APP_CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3" > .env
echo "REACT_APP_NETWORK_ID=1337" >> .env
```

### Step 5: Copy Contract ABI
```bash
# Still in frontend directory
mkdir -p src/contracts
cp ../artifacts/contracts/SupplyChainProvenance.sol/SupplyChainProvenance.json src/contracts/
```

### Step 6: Start Frontend (Still Terminal 2 or new Terminal 3)
```bash
npm start
```

**Access:** http://localhost:3000

### Step 7: Configure MetaMask
1. Open MetaMask
2. Click network dropdown → "Add Network" → "Add a network manually"
3. Fill in:
   - **Network Name:** Hardhat Local
   - **RPC URL:** http://127.0.0.1:8545
   - **Chain ID:** 1337
   - **Currency Symbol:** ETH
4. Click "Save"

### Step 8: Import Test Account
1. In Terminal 1, copy one of the private keys
2. MetaMask → Click account icon → "Import Account"
3. Paste private key
4. You now have 10,000 test ETH!

### Step 9: Use the Application
1. Open http://localhost:3000
2. Click "Connect Wallet"
3. Approve connection in MetaMask
4. You're ready to use the system!

---

## Option 2: Sepolia Testnet Deployment

### Prerequisites
- Sepolia test ETH (from faucet)
- Alchemy or Infura account

### Step 1: Get Sepolia ETH
Visit: https://sepoliafaucet.com/
Enter your wallet address, get test ETH.

### Step 2: Configure Environment
```bash
# Create .env file in project root
cat > .env << EOF
PRIVATE_KEY=your_wallet_private_key_here
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
ETHERSCAN_API_KEY=your_etherscan_api_key (optional)
EOF
```

**⚠️ NEVER commit .env file!**

### Step 3: Deploy to Sepolia
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

Wait for deployment (30-60 seconds).

### Step 4: Verify Contract (Optional)
```bash
npx hardhat verify --network sepolia YOUR_CONTRACT_ADDRESS
```

### Step 5: Configure Frontend
```bash
cd frontend
cat > .env << EOF
REACT_APP_CONTRACT_ADDRESS=your_deployed_contract_address
REACT_APP_NETWORK_ID=11155111
EOF
```

### Step 6: Copy ABI
```bash
mkdir -p src/contracts
cp ../artifacts/contracts/SupplyChainProvenance.sol/SupplyChainProvenance.json src/contracts/
```

### Step 7: Build and Deploy Frontend
```bash
npm run build
# Deploy to hosting service (Vercel, Netlify, etc.)
```

---

## Option 3: Polygon Mumbai Testnet

### Step 1: Get Mumbai MATIC
Visit: https://mumbaifaucet.com/
Get test MATIC tokens.

### Step 2: Configure Environment
```bash
cat > .env << EOF
PRIVATE_KEY=your_wallet_private_key_here
POLYGON_MUMBAI_RPC_URL=https://rpc-mumbai.maticvigil.com
POLYGONSCAN_API_KEY=your_polygonscan_api_key (optional)
EOF
```

### Step 3: Deploy
```bash
npx hardhat run scripts/deploy.js --network polygon_mumbai
```

### Step 4: Follow same frontend setup as Sepolia
Use Chain ID: 80001

---

## Post-Deployment Tasks

### 1. Register Stakeholders
As the contract deployer (admin), register stakeholders:

```javascript
// In browser console or script
const contract = new ethers.Contract(ADDRESS, ABI, signer);

// Register manufacturer
await contract.registerStakeholder(
  "0xManufacturerAddress",
  "Boeing Manufacturing",
  1  // Manufacturer role
);

// Register airline
await contract.registerStakeholder(
  "0xAirlineAddress",
  "Delta Airlines",
  2  // Airline role
);

// Register MRO
await contract.registerStakeholder(
  "0xMROAddress",
  "AAR Corp",
  3  // MRO role
);

// Register regulator
await contract.registerStakeholder(
  "0xRegulatorAddress",
  "FAA",
  4  // Regulator role
);
```

### 2. Test the System
Use the demo script to verify everything works:
```bash
npx hardhat run scripts/demo.js --network localhost
```

---

## Troubleshooting

### Issue: "Contract not deployed"
**Solution:** Ensure you copied the correct contract address to frontend/.env

### Issue: "Network mismatch"
**Solution:** 
1. Check MetaMask is on correct network
2. Verify REACT_APP_NETWORK_ID matches

### Issue: "Transaction fails"
**Solution:**
1. Ensure you have test ETH/MATIC
2. Check you have the correct role for the action
3. Verify part exists (for transfers/maintenance)

### Issue: "Cannot connect wallet"
**Solution:**
1. Refresh page
2. Disconnect and reconnect MetaMask
3. Clear MetaMask activity data

### Issue: Frontend won't start
**Solution:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

---

## Production Deployment Checklist

Before deploying to mainnet:

### Security
- [ ] Contract audited by professional firm
- [ ] All tests passing
- [ ] Private keys stored securely
- [ ] Multi-sig wallet for admin functions
- [ ] Rate limiting implemented
- [ ] Monitoring and alerts configured

### Testing
- [ ] All functions tested on testnet
- [ ] Integration tests completed
- [ ] Load testing performed
- [ ] Security testing completed
- [ ] User acceptance testing done

### Documentation
- [ ] User guide completed
- [ ] API documentation published
- [ ] Contract addresses documented
- [ ] Support channels established
- [ ] Incident response plan ready

### Infrastructure
- [ ] Backup RPC endpoints configured
- [ ] IPFS pinning service set up
- [ ] Frontend hosted on CDN
- [ ] Database backups automated
- [ ] Monitoring dashboards created

---

## Maintenance

### Regular Tasks
- Monitor contract events
- Verify IPFS data availability
- Update frontend dependencies
- Review and respond to user feedback
- Monitor gas costs and optimize

### Monthly Tasks
- Review security logs
- Update documentation
- Backup critical data
- Performance optimization
- Stakeholder meetings

---

## Support

For deployment issues:
1. Check documentation
2. Review error messages
3. Search GitHub issues
4. Create new issue if needed

---

## Quick Reference

### Networks
| Network | Chain ID | RPC URL |
|---------|----------|---------|
| Hardhat Local | 1337 | http://127.0.0.1:8545 |
| Sepolia | 11155111 | https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY |
| Mumbai | 80001 | https://rpc-mumbai.maticvigil.com |

### Faucets
- Sepolia: https://sepoliafaucet.com/
- Mumbai: https://mumbaifaucet.com/

### Explorers
- Sepolia: https://sepolia.etherscan.io/
- Mumbai: https://mumbai.polygonscan.com/

---

**Ready to deploy? Start with Option 1 (Local) to test everything first!** 🚀
