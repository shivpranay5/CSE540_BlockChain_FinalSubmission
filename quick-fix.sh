#!/bin/bash

echo "🔧 Supply Chain Provenance System - Quick Fix"
echo "=============================================="
echo ""

# Get the contract address from demo-results.json if it exists
if [ -f "demo-results.json" ]; then
    CONTRACT_ADDRESS=$(grep -o '"contractAddress":"[^"]*' demo-results.json | cut -d'"' -f4)
    echo "📋 Found contract address from demo: $CONTRACT_ADDRESS"
else
    echo "⚠️  No demo-results.json found. Using default address."
    CONTRACT_ADDRESS="0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e"
fi

echo ""
echo "Step 1: Updating frontend .env file..."
cd frontend
echo "REACT_APP_CONTRACT_ADDRESS=$CONTRACT_ADDRESS" > .env
echo "✅ Updated .env with contract address: $CONTRACT_ADDRESS"

echo ""
echo "Step 2: Copying contract ABI..."
cd ..
bash copy-abi.sh

echo ""
echo "Step 3: Checking if ABI exists..."
if [ -f "frontend/src/contracts/SupplyChainProvenance.json" ]; then
    echo "✅ ABI file found"
else
    echo "❌ ABI file missing. Copying from artifacts..."
    mkdir -p frontend/src/contracts
    cp artifacts/contracts/SupplyChainProvenance.sol/SupplyChainProvenance.json frontend/src/contracts/
fi

echo ""
echo "=============================================="
echo "🎉 Setup Complete!"
echo "=============================================="
echo ""
echo "Next steps:"
echo "1. Make sure hardhat node is running in Terminal 1"
echo "2. Restart your frontend:"
echo "   cd frontend"
echo "   npm start"
echo ""
echo "3. In MetaMask, import Account #1 (Manufacturer):"
echo "   Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"
echo ""
echo "4. Refresh browser (Ctrl+Shift+R)"
echo ""
echo "You should see 3 parts in the dashboard! 🎉"
