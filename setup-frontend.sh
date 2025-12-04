#!/bin/bash

# Frontend Setup Script
# Run this after deploying the smart contract

echo "🚀 Setting up frontend..."
echo ""

# Check if contract is compiled
if [ ! -f "artifacts/contracts/SupplyChainProvenance.sol/SupplyChainProvenance.json" ]; then
    echo "❌ Contract not compiled. Running compilation..."
    npx hardhat compile
fi

# Create frontend contracts directory
echo "📁 Creating contracts directory..."
mkdir -p frontend/src/contracts

# Copy ABI
echo "📋 Copying contract ABI..."
cp artifacts/contracts/SupplyChainProvenance.sol/SupplyChainProvenance.json frontend/src/contracts/

# Check if .env exists
if [ ! -f "frontend/.env" ]; then
    echo "⚙️  Creating frontend .env file..."
    cat > frontend/.env << EOF
# Replace with your deployed contract address
REACT_APP_CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
REACT_APP_NETWORK_ID=1337
EOF
    echo "⚠️  Please update frontend/.env with your contract address!"
else
    echo "✅ frontend/.env already exists"
fi

# Install frontend dependencies if needed
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
fi

echo ""
echo "✅ Frontend setup complete!"
echo ""
echo "Next steps:"
echo "1. Update frontend/.env with your contract address"
echo "2. Run: cd frontend && npm start"
echo ""
