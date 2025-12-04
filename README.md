# 🛩️ Blockchain-Based Supply Chain Provenance System for Aviation Parts

**CSE 540: Engineering Blockchain Applications | Arizona State University**

**Group 3 Members:**
- Pranay Reddy Palle (Planning, Integration, Coordination)
- Satvik Reddy (Blockchain Logic Development)
- Geethan Sannidhi (Web Interface & Smart Contract Integration)
- Preethi Kotturu (IPFS Storage & Off-chain Data)
- Rahul Varma Cherukuri (Research, Reports & Presentations)

---

## 📋 Table of Contents
1. [Project Description](#project-description)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Architecture](#architecture)
5. [Prerequisites](#prerequisites)
6. [Installation](#installation)
7. [Deployment](#deployment)
8. [Usage](#usage)
9. [Testing](#testing)
10. [Project Structure](#project-structure)
11. [Smart Contract Functions](#smart-contract-functions)
12. [Future Enhancements](#future-enhancements)
13. [License](#license)

---

## 📖 Project Description

### Problem Statement
In the aviation industry, every component—from engines to bolts—must be traceable, certified, and maintained to the highest standards. However, most tracking relies on centralized databases, paper records, or disconnected digital systems, creating risks of:
- Counterfeit or uncertified parts entering the supply chain
- Incomplete or tampered maintenance records
- Lack of real-time verification across stakeholders
- Safety concerns due to insufficient audit trails

### Our Solution
This project implements a **blockchain-based provenance system** that creates an **immutable, transparent record** of every aviation part's lifecycle:
- From manufacturing and certification
- Through installation and operational use  
- During maintenance and inspections
- To eventual retirement

By leveraging blockchain's decentralized and tamper-proof nature, we ensure **trust, accountability, and real-time verification** between manufacturers, airlines, maintenance organizations (MROs), and regulators.

### Key Benefits
✅ **Immutable Records** - Tamper-proof audit trail for regulatory compliance  
✅ **Transparency** - All stakeholders see the same verified data  
✅ **Traceability** - Complete lifecycle tracking from birth to retirement  
✅ **Authenticity** - Verify genuine parts and prevent counterfeits  
✅ **Efficiency** - Streamlined verification and reduced paperwork  
✅ **Safety** - Enhanced aviation safety through reliable data  

---

## ✨ Features

### Core Functionality
- **🏭 Part Registration** - Manufacturers register new parts with certificates
- **📦 Custody Tracking** - Complete ownership transfer history
- **🔧 Maintenance Logging** - MROs record inspections and repairs
- **📊 Lifecycle Management** - Track parts through 5 states (Manufactured, InTransit, Installed, InMaintenance, Retired)
- **🔍 Query System** - Search and view complete part history
- **✅ Regulatory Verification** - Authorities can verify authenticity
- **👥 Role-Based Access** - 4 stakeholder types with specific permissions
- **📝 IPFS Integration** - Off-chain storage for certificates and reports

### User Interface Features
- **📊 Dashboard** - Overview of your parts and role
- **✈️ Part Registration Form** - Easy part creation for manufacturers
- **🔍 Part Query** - Search and view detailed information
- **🔧 Maintenance Recording** - Log maintenance activities
- **📦 Custody Transfer** - Transfer ownership with reasons
- **🔄 Status Updates** - Update part lifecycle status
- **📱 Responsive Design** - Works on desktop and mobile
- **🔗 MetaMask Integration** - Secure wallet connection

---

## 🛠 Technology Stack

### Blockchain
- **Smart Contracts**: Solidity 0.8.19/0.8.20
- **Blockchain Platform**: Ethereum / Polygon (Testnet compatible)
- **Development Framework**: Hardhat 2.19.0

### Frontend
- **Framework**: React 18.2.0
- **Blockchain Interaction**: Ethers.js 6.9.0
- **Wallet Connection**: MetaMask
- **Styling**: Custom CSS with responsive design

### Backend & Storage
- **Off-chain Storage**: IPFS (InterPlanetary File System)
- **Testing**: Hardhat Chai Matchers
- **Deployment**: Hardhat Deploy Scripts

### Development Tools
- **Node.js**: v16+ (v20.16.0 recommended)
- **npm**: 8+
- **Git**: Version control

---

## 🏗 Architecture

### System Overview
```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│ Manufacturer │────▶│  Blockchain  │◀────│   Airline   │
└─────────────┘     │   (Ethereum/ │     └─────────────┘
                    │    Polygon)  │
┌─────────────┐     │              │     ┌─────────────┐
│     MRO     │────▶│   Smart      │◀────│  Regulator  │
└─────────────┘     │   Contract   │     └─────────────┘
                    └──────────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │     IPFS     │
                    │  (Off-chain  │
                    │   Storage)   │
                    └──────────────┘
```

### Data Flow
1. **Manufacturer** registers part with certificate → Blockchain + IPFS
2. **Airline** receives part → Custody transfer recorded
3. **Part Installation** → Status updated on blockchain
4. **MRO Maintenance** → Records logged with IPFS reports
5. **Return to Service** → Status updated
6. **Regulator** → Verifies authenticity at any time

### Smart Contract Architecture
```
SupplyChainProvenance Contract
├── Stakeholder Management
│   ├── registerStakeholder()
│   └── getStakeholderDetails()
├── Part Management
│   ├── registerPart()
│   ├── getPartDetails()
│   └── updatePartStatus()
├── Custody Management
│   ├── transferCustody()
│   └── getCustodyHistory()
├── Maintenance Management
│   ├── recordMaintenance()
│   └── getMaintenanceHistory()
└── Verification
    └── verifyPartAuthenticity()
```

---

## 📋 Prerequisites

Before you begin, ensure you have:

### Required Software
- **Node.js** v16 or higher ([Download](https://nodejs.org/))
- **npm** v8 or higher (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- **MetaMask** browser extension ([Install](https://metamask.io/))

### Verify Installation
```bash
node --version  # Should show v16.0.0 or higher
npm --version   # Should show 8.0.0 or higher
git --version   # Any recent version
```

### Optional (for deployment)
- Ethereum testnet account with test ETH (Sepolia)
- IPFS account ([Infura](https://infura.io/) or [Pinata](https://pinata.cloud/))
- Alchemy/Infura RPC endpoint

---

## 🚀 Installation

### Step 1: Clone the Repository
```bash
git clone https://github.com/shivpranay5/Supply_Chain_Provenance_System.git
cd Supply_Chain_Provenance_System
```

### Step 2: Install Dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### Step 3: Configure Environment
```bash
# Copy environment template
cp .env.example .env

# Edit .env file with your settings
# - Add your private key for testnet deployment
# - Add RPC URLs (Alchemy/Infura)
# - Add API keys (optional)
```

### Step 4: Compile Smart Contracts
```bash
npx hardhat compile
```

**Expected Output:**
```
Compiled 1 Solidity file successfully
```

### Step 5: Run Tests
```bash
npx hardhat test
```

**Expected Output:**
```
  SupplyChainProvenance
    ✓ Should register a manufacturer stakeholder
    ✓ Should allow manufacturer to register a part
    ... (33 passing tests)
```

---

## 🌐 Deployment

### Local Development Network

**Step 1: Start Local Blockchain**
```bash
npx hardhat node
```
Keep this terminal running.

**Step 2: Deploy Contract (New Terminal)**
```bash
npx hardhat run scripts/deploy.js --network localhost
```

**Step 3: Copy Contract Address**
The deployment script will output:
```
SupplyChainProvenance deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

**Step 4: Copy ABI to Frontend**
```bash
bash copy-abi.sh
```

**Step 5: Update Frontend Configuration**
```bash
# Edit frontend/.env
echo "REACT_APP_CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3" > frontend/.env
```

**Step 6: Start Frontend**
```bash
cd frontend
npm start
```

The frontend will open at `http://localhost:3000`

### Testnet Deployment (Sepolia)

**Step 1: Configure .env**
```bash
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
PRIVATE_KEY=your_private_key_here
ETHERSCAN_API_KEY=your_etherscan_api_key
```

**Step 2: Deploy to Sepolia**
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

**Step 3: Verify on Etherscan (Optional)**
```bash
npx hardhat verify --network sepolia DEPLOYED_CONTRACT_ADDRESS
```

**Step 4: Update Frontend**
Update `frontend/.env` with the deployed contract address.

---

## 📖 Usage

### For Administrators

**1. Register Stakeholders**
```javascript
await contract.registerStakeholder(
    "0xManufacturerAddress",
    "Boeing Manufacturing",
    1  // Role: Manufacturer
);
```

### For Manufacturers

**1. Connect MetaMask**
- Open the application
- Click "Connect Wallet"
- Approve connection in MetaMask

**2. Register New Part**
- Navigate to "Register Part" tab
- Fill in:
  - Part Number (e.g., ENG-001)
  - Serial Number (e.g., SN123456)
  - Part Name (e.g., Turbine Blade)
  - IPFS Certificate Hash (optional)
- Click "Register Part"
- Confirm transaction in MetaMask

**3. Transfer Custody**
- Go to "Transfer" tab
- Enter Part ID
- Enter recipient address (Airline/MRO)
- Add reason for transfer
- Click "Transfer Custody"

### For Airlines

**1. Receive Parts**
- Parts appear in Dashboard after transfer
- View part details in "Query Part" tab

**2. Update Part Status**
- Go to "Status" tab
- Enter Part ID
- Select new status (Installed, In Service, etc.)
- Click "Update Status"

**3. Send for Maintenance**
- Go to "Transfer" tab
- Transfer to MRO address
- Specify "Scheduled Maintenance" as reason

### For MROs

**1. Record Maintenance**
- Navigate to "Maintenance" tab
- Enter Part ID
- Select maintenance type (Inspection, Repair, Overhaul)
- Add IPFS report hash
- Enter detailed notes
- Click "Record Maintenance"

**2. Return Part**
- After maintenance complete
- Use "Transfer" tab to return to Airline

### For Regulators

**1. Verify Part Authenticity**
```javascript
const isAuthentic = await contract.verifyPartAuthenticity(partId);
```

**2. Audit Complete History**
- Use "Query Part" tab
- View full custody and maintenance history
- Verify all records on blockchain

### For All Users

**Query Part Information**
- Go to "Query Part" tab
- Enter Part ID
- View:
  - Part details
  - Current status
  - Ownership history
  - Maintenance records
  - All timestamps

---

## 🧪 Testing

### Run All Tests
```bash
npx hardhat test
```

### Run Specific Test File
```bash
npx hardhat test test/SupplyChainProvenance.test.js
```

### Run Tests with Gas Report
```bash
REPORT_GAS=true npx hardhat test
```

### Test Coverage
```bash
npx hardhat coverage
```

### Demo Script (Automated Testing)
```bash
# Terminal 1: Start local blockchain
npx hardhat node

# Terminal 2: Run demo
npx hardhat run scripts/demo.js --network localhost
```

**Demo Shows:**
- Contract deployment
- Stakeholder registration
- Part creation
- Custody transfers
- Maintenance recording
- Complete audit trail

---

## 📁 Project Structure

```
Supply_Chain_Provenance_System/
├── contracts/
│   └── SupplyChainProvenance.sol       # Main smart contract
├── scripts/
│   ├── deploy.js                        # Deployment script
│   └── demo.js                          # Automated demo script
├── test/
│   └── SupplyChainProvenance.test.js    # Comprehensive tests (33 cases)
├── frontend/
│   ├── public/
│   │   └── index.html                   # HTML template
│   ├── src/
│   │   ├── App.js                       # Main React component
│   │   ├── App.css                      # Styling
│   │   ├── index.js                     # Entry point
│   │   ├── index.css                    # Global styles
│   │   └── contracts/
│   │       └── SupplyChainProvenance.json  # Contract ABI
│   └── package.json                     # Frontend dependencies
├── hardhat.config.js                    # Hardhat configuration
├── package.json                         # Backend dependencies
├── .env.example                         # Environment template
├── .gitignore                           # Git ignore rules
├── copy-abi.sh                          # Script to copy ABI
└── README.md                            # This file
```

---

## 🔧 Smart Contract Functions

### Admin Functions
| Function | Parameters | Description |
|----------|-----------|-------------|
| `registerStakeholder` | address, name, role | Register new stakeholder |

### Manufacturer Functions
| Function | Parameters | Description |
|----------|-----------|-------------|
| `registerPart` | partNumber, serialNumber, partName, ipfsHash | Create new part |
| `transferCustody` | partId, toAddress, reason | Transfer ownership |

### MRO Functions
| Function | Parameters | Description |
|----------|-----------|-------------|
| `recordMaintenance` | partId, type, ipfsHash, notes | Log maintenance |
| `transferCustody` | partId, toAddress, reason | Return part |

### Airline Functions
| Function | Parameters | Description |
|----------|-----------|-------------|
| `updatePartStatus` | partId, newStatus | Update part status |
| `transferCustody` | partId, toAddress, reason | Send for maintenance |

### Regulator Functions
| Function | Parameters | Description |
|----------|-----------|-------------|
| `verifyPartAuthenticity` | partId | Verify part is genuine |

### Query Functions (All Roles)
| Function | Returns | Description |
|----------|---------|-------------|
| `getPartDetails` | Part info | Get complete part data |
| `getMaintenanceHistory` | Array | All maintenance records |
| `getCustodyHistory` | Array | All ownership transfers |
| `getStakeholderParts` | Array | Parts owned by address |
| `getStakeholderDetails` | Stakeholder info | Get stakeholder data |

---

## 🚀 Future Enhancements

### Planned Features
1. **Enhanced IPFS Integration**
   - Direct file upload from UI
   - Preview certificates in browser
   - Automated IPFS pinning

2. **QR Code System**
   - Generate QR codes for parts
   - Mobile scanning capability
   - Quick part verification

3. **Advanced Analytics**
   - Part lifecycle statistics
   - Maintenance frequency analysis
   - Predictive maintenance alerts

4. **IoT Integration**
   - Real-time sensor data
   - Automatic condition monitoring
   - Smart alerts for maintenance needs

5. **Mobile Application**
   - Native iOS/Android apps
   - Offline capability
   - Push notifications

6. **Multi-chain Support**
   - Cross-chain part tracking
   - Interoperability protocols
   - Layer 2 scaling solutions

7. **AI/ML Features**
   - Fraud detection
   - Maintenance prediction
   - Pattern recognition

8. **Enterprise Features**
   - Batch operations
   - Advanced reporting
   - API for integration
   - Multi-language support

---

## 📊 Performance Metrics

### Smart Contract
- **Gas Optimized**: Efficient storage patterns
- **Test Coverage**: 33 comprehensive test cases
- **Security**: Role-based access control
- **Events**: Complete audit trail via events

### Frontend
- **Responsive**: Works on desktop and mobile
- **Real-time**: Live blockchain updates
- **User-friendly**: Intuitive interface
- **Fast**: Optimized React components

---

## 🔒 Security Considerations

### Implemented
✅ Role-based access control  
✅ Owner verification for transfers  
✅ Input validation  
✅ Reentrancy protection  
✅ Event emission for auditing  

### Best Practices
- Never commit `.env` file
- Use hardware wallets for production
- Regular security audits recommended
- Keep dependencies updated
- Test thoroughly before deployment

---

## 🐛 Troubleshooting

### Common Issues

**1. Compilation Errors**
```bash
# Clean and recompile
rm -rf cache artifacts
npx hardhat clean
npx hardhat compile
```

**2. MetaMask Connection Issues**
- Ensure MetaMask is installed
- Check you're on correct network
- Try refreshing the page
- Clear MetaMask activity data

**3. Transaction Failures**
- Check you have enough ETH for gas
- Verify you have correct role
- Confirm part ownership
- Check error messages in console

**4. Frontend Not Loading**
```bash
# Clear and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

**5. Contract ABI Not Found**
```bash
# Recompile and copy ABI
npx hardhat compile
bash copy-abi.sh
```

---

## 👥 Contributing

This is an academic project for CSE 540 at Arizona State University. For questions or suggestions, please contact the team members.

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🙏 Acknowledgments

- **Arizona State University** - CSE 540 Course
- **Professor and TAs** - Guidance and support
- **OpenZeppelin** - Smart contract libraries
- **Ethereum Foundation** - Blockchain platform
- **IPFS** - Decentralized storage
- **Hardhat** - Development framework

---

## 📞 Contact

**Group 3 - CSE 540**
- Arizona State University
- Engineering Blockchain Applications
- Fall 2024

**GitHub Repository:** [https://github.com/shivpranay5/Supply_Chain_Provenance_System](https://github.com/shivpranay5/Supply_Chain_Provenance_System)

---

## 📈 Project Statistics

- **Lines of Code**: 2,000+
- **Smart Contract Functions**: 15
- **Test Cases**: 33 (all passing)
- **Stakeholder Roles**: 4
- **Part Lifecycle States**: 5
- **Frontend Components**: Complete React app
- **Documentation Pages**: Comprehensive

---

**Built with ❤️ by Group 3 for CSE 540**
