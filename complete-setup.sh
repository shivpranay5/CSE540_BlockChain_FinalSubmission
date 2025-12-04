#!/bin/bash

echo "🔧 Complete System Setup"
echo "======================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Check if hardhat node is running
echo -e "${YELLOW}Step 1: Checking Hardhat node...${NC}"
if curl -s http://127.0.0.1:8545 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Hardhat node is running${NC}"
else
    echo -e "${RED}❌ Hardhat node is NOT running!${NC}"
    echo ""
    echo "Please start it in another terminal:"
    echo "  npx hardhat node"
    echo ""
    exit 1
fi

# Step 2: Deploy contract
echo ""
echo -e "${YELLOW}Step 2: Deploying contract...${NC}"
npx hardhat run scripts/demo.js --network localhost > /tmp/deploy.log 2>&1

if [ $? -eq 0 ]; then
    CONTRACT_ADDRESS=$(grep "Contract deployed to:" /tmp/deploy.log | awk '{print $4}')
    echo -e "${GREEN}✅ Contract deployed: $CONTRACT_ADDRESS${NC}"
else
    echo -e "${RED}❌ Deployment failed${NC}"
    cat /tmp/deploy.log
    exit 1
fi

# Step 3: Update .env file
echo ""
echo -e "${YELLOW}Step 3: Updating frontend .env...${NC}"
echo "REACT_APP_CONTRACT_ADDRESS=$CONTRACT_ADDRESS" > frontend/.env
echo -e "${GREEN}✅ Updated frontend/.env${NC}"

# Step 4: Copy ABI
echo ""
echo -e "${YELLOW}Step 4: Copying contract ABI...${NC}"
bash copy-abi.sh
echo -e "${GREEN}✅ ABI copied${NC}"

# Step 5: Install frontend dependencies if needed
echo ""
echo -e "${YELLOW}Step 5: Checking frontend dependencies...${NC}"
if [ ! -d "frontend/node_modules" ]; then
    echo "Installing frontend dependencies..."
    cd frontend && npm install && cd ..
    echo -e "${GREEN}✅ Dependencies installed${NC}"
else
    echo -e "${GREEN}✅ Dependencies already installed${NC}"
fi

echo ""
echo "======================================"
echo -e "${GREEN}🎉 Setup Complete!${NC}"
echo "======================================"
echo ""
echo "Contract Address: $CONTRACT_ADDRESS"
echo ""
echo "Next steps:"
echo ""
echo "1. Start the frontend:"
echo "   cd frontend"
echo "   npm start"
echo ""
echo "2. Import Account #1 in MetaMask:"
echo "   Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"
echo "   Address: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
echo ""
echo "3. Open http://localhost:3000"
echo ""
echo "4. You should see 3 parts! 🎉"
echo ""
