#!/bin/bash

# This script copies the compiled contract ABI to the frontend

echo "📋 Copying contract ABI to frontend..."

# Check if artifacts exist
if [ ! -d "artifacts/contracts" ]; then
    echo "❌ No artifacts found. Please run: npx hardhat compile"
    exit 1
fi

# Create frontend contracts directory
mkdir -p frontend/src/contracts

# Copy the ABI
cp artifacts/contracts/SupplyChainProvenance.sol/SupplyChainProvenance.json frontend/src/contracts/

echo "✅ ABI copied successfully!"
echo "📁 Location: frontend/src/contracts/SupplyChainProvenance.json"
