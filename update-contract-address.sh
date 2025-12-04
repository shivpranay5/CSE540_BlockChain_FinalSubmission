#!/bin/bash

# Update Contract Address Script
# Usage: bash update-contract-address.sh <NEW_CONTRACT_ADDRESS>

if [ -z "$1" ]; then
    echo "❌ Error: Please provide contract address"
    echo ""
    echo "Usage: bash update-contract-address.sh 0xYourContractAddress"
    echo ""
    echo "Example:"
    echo "  bash update-contract-address.sh 0x5FbDB2315678afecb367f032d93F642f64180aa3"
    exit 1
fi

NEW_ADDRESS=$1

echo "🔧 Updating contract address..."
echo "New address: $NEW_ADDRESS"

# Update App.js directly
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s/const CONTRACT_ADDRESS = \"0x[a-fA-F0-9]*\";/const CONTRACT_ADDRESS = \"$NEW_ADDRESS\";/" frontend/src/App.js
else
    # Linux
    sed -i "s/const CONTRACT_ADDRESS = \"0x[a-fA-F0-9]*\";/const CONTRACT_ADDRESS = \"$NEW_ADDRESS\";/" frontend/src/App.js
fi

echo "✅ Updated frontend/src/App.js"
echo ""
echo "Next steps:"
echo "1. Restart frontend:"
echo "   cd frontend"
echo "   npm start"
echo ""
echo "2. Hard refresh browser (Cmd+Shift+R)"
