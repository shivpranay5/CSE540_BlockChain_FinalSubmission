# 📖 User Guide - Aviation Supply Chain Provenance System

## Table of Contents
1. [Getting Started](#getting-started)
2. [Connecting Your Wallet](#connecting-your-wallet)
3. [For Administrators](#for-administrators)
4. [For Manufacturers](#for-manufacturers)
5. [For Airlines](#for-airlines)
6. [For MROs](#for-mros)
7. [For Regulators](#for-regulators)
8. [Querying Part Information](#querying-part-information)
9. [Troubleshooting](#troubleshooting)

---

## Getting Started

### What You Need
1. **MetaMask Wallet** - Browser extension for interacting with blockchain
2. **Test Cryptocurrency** - ETH (for Ethereum) or MATIC (for Polygon)
3. **Web Browser** - Chrome, Firefox, or Brave recommended
4. **Internet Connection** - Stable connection required

### First Time Setup
1. Visit the application URL
2. You'll see a "Connect Wallet" button
3. Click it and approve the MetaMask connection
4. Your role will be displayed once connected

---

## Connecting Your Wallet

### Step 1: Install MetaMask
If you haven't installed MetaMask:
1. Visit https://metamask.io/
2. Click "Download"
3. Install the browser extension
4. Create a new wallet or import existing one
5. **Save your seed phrase securely!**

### Step 2: Connect to the Application
1. Visit the application URL
2. Click "Connect Wallet" button
3. MetaMask popup will appear
4. Click "Next" then "Connect"
5. Application will display your account info

### Step 3: Verify Your Role
After connecting, you'll see:
- Your wallet address (shortened)
- Your stakeholder name (if registered)
- Your role badge (Manufacturer, Airline, MRO, Regulator, or None)
- Admin badge (if applicable)

---

## For Administrators

### Role: System Administrator
**Responsibilities:** Register and manage stakeholders

### 1. Access Admin Panel
- Click "👤 Admin" tab in navigation

### 2. Register a New Stakeholder

**Step by Step:**
1. Enter the stakeholder's **wallet address**
   - Example: `0x70997970C51812dc3A010C7d01b50e0d17dc79C8`
   - Must be a valid Ethereum address
   
2. Enter the **stakeholder name**
   - Example: "Boeing Manufacturing"
   - Clear, identifiable name
   
3. Select the **role** from dropdown:
   - **Manufacturer** - Can register new parts
   - **Airline** - Can receive and install parts
   - **MRO** - Can perform and record maintenance
   - **Regulator** - Can verify part authenticity

4. Click "Register Stakeholder"

5. Approve transaction in MetaMask

6. Wait for confirmation

**Success Message:** "✅ Stakeholder registered successfully!"

### Best Practices
- Verify wallet addresses before registration
- Use descriptive names for stakeholders
- Keep a record of registered stakeholders
- Coordinate with stakeholders for their addresses

---

## For Manufacturers

### Role: Part Manufacturer
**Responsibilities:** Register new parts, transfer to airlines

### 1. Register a New Part

**Navigate to:** "➕ Register Part" tab

**Required Information:**
1. **Part Number** *
   - Example: `ENG-001`
   - Your internal part number
   - Must be unique

2. **Serial Number** *
   - Example: `SN123456789`
   - Specific to this individual part
   - Used for tracking

3. **Part Name** *
   - Example: "CFM56-7B Turbine Blade"
   - Clear description of the part

4. **IPFS Certificate Hash** *
   - Example: `QmXXX...`
   - Hash of the certification document uploaded to IPFS
   - See IPFS section for how to upload

**Steps:**
1. Fill in all required fields
2. Click "Register Part"
3. Approve transaction in MetaMask
4. Wait for confirmation
5. Note the Part ID from success message

**Success Message:** "✅ Part registered successfully!"

### 2. Transfer Part to Airline

**Navigate to:** "📦 Transfer" tab

**Required Information:**
1. **Part ID** - The ID from registration
2. **Recipient Address** - Airline's wallet address
3. **Reason** - "Initial sale" or similar

**Steps:**
1. Enter part ID
2. Enter airline's address
3. Enter transfer reason
4. Click "Transfer Custody"
5. Approve transaction

**Success Message:** "✅ Custody transferred successfully!"

### 3. View Your Parts

**Navigate to:** "📋 My Parts" tab

- See all parts you currently own
- View basic information
- Click "View Details" for complete history

---

## For Airlines

### Role: Airline/Operator
**Responsibilities:** Receive parts, install, send for maintenance

### 1. Receive a Part
When a manufacturer transfers a part to you:
- You'll see it in "📋 My Parts" tab
- Status will show as "InTransit"

### 2. Install a Part

**When to use:** Part has been installed on an aircraft

**Navigate to:** "📋 My Parts" → Click part → Note Part ID

**Then go to:** "🔍 Query Part" tab

**Steps:**
1. Enter the Part ID
2. Click "Query Part"
3. Note the current status
4. (Currently requires direct contract interaction for status updates)

**Alternative:** Use transfer function to change custody

### 3. Send Part for Maintenance

**Navigate to:** "📦 Transfer" tab

**Required Information:**
1. **Part ID** - The part needing maintenance
2. **Recipient Address** - MRO's wallet address  
3. **Reason** - "Scheduled maintenance" or specific issue

**Steps:**
1. Enter part ID
2. Enter MRO address
3. Enter reason
4. Click "Transfer Custody"
5. Approve transaction

**Success Message:** "✅ Custody transferred successfully!"

### 4. Receive Part Back from MRO
- MRO will transfer part back to you
- Check "📋 My Parts" for returned parts
- View maintenance history to see what was done

---

## For MROs

### Role: Maintenance, Repair, and Overhaul Organization
**Responsibilities:** Perform and record maintenance

### 1. Receive Part from Airline
- Part will appear in "📋 My Parts" when transferred to you
- Status will be "InTransit"

### 2. Record Maintenance

**Navigate to:** "🔧 Maintenance" tab

**Required Information:**
1. **Part ID** * - The part being serviced
2. **Maintenance Type** * - Select from dropdown:
   - Inspection
   - Repair
   - Overhaul
   - Replacement
   - Certification
3. **Report IPFS Hash** * - Hash of detailed report on IPFS
4. **Notes** * - Detailed description of work performed

**Example Notes:**
```
500-hour inspection completed successfully.
Replaced bearing assembly. 
All measurements within specifications.
Certified airworthy.
```

**Steps:**
1. Fill in all fields
2. Upload detailed report to IPFS (see IPFS section)
3. Enter IPFS hash
4. Click "Record Maintenance"
5. Approve transaction

**Success Message:** "✅ Maintenance recorded successfully!"

### 3. Return Part to Airline

**Navigate to:** "📦 Transfer" tab

**Required Information:**
1. **Part ID** - The serviced part
2. **Recipient Address** - Original airline's address
3. **Reason** - "Maintenance completed"

**Steps:**
1. Enter information
2. Click "Transfer Custody"
3. Approve transaction

### 4. Best Practices
- Be detailed in maintenance notes
- Always upload comprehensive reports to IPFS
- Document all work performed
- Include measurements and test results
- Photograph critical components

---

## For Regulators

### Role: Regulatory Authority (FAA, EASA, etc.)
**Responsibilities:** Verify authenticity and compliance

### 1. Verify Part Authenticity

**Navigate to:** "🔍 Query Part" tab

**Steps:**
1. Enter Part ID to investigate
2. Click "Query Part"
3. Review part information:
   - Is manufacturer legitimate?
   - Check serial number format
   - Verify IPFS certificate
4. Review custody history:
   - Track all owners
   - Verify legitimate transfers
5. Review maintenance history:
   - Check MRO credentials
   - Review maintenance records
   - Verify certifications

### 2. Check Complete History

**What to Review:**

**Part Details:**
- ✅ Manufacturer is registered
- ✅ Certificate hash is valid
- ✅ Part numbers follow standards
- ✅ Manufacturing date is reasonable

**Custody Chain:**
- ✅ All transfers are to registered stakeholders
- ✅ No suspicious transfer patterns
- ✅ Reasons make sense
- ✅ Timestamps are logical

**Maintenance Records:**
- ✅ MROs are certified
- ✅ Maintenance intervals appropriate
- ✅ Work descriptions detailed
- ✅ Reports available on IPFS

### 3. Generate Audit Reports
- Take screenshots of part history
- Export custody chain
- Review maintenance records
- Compile findings
- Share with relevant authorities

---

## Querying Part Information

### Available to All Roles

**Navigate to:** "🔍 Query Part" tab

### What You Can See:

**Basic Information:**
- Part Number
- Serial Number
- Part Name
- Current Status
- Manufacturer
- Current Owner
- Manufacturing Date
- Certificate (IPFS Hash)

**Custody History:**
- All ownership transfers
- From/To addresses
- Transfer dates
- Reasons for transfer

**Maintenance History:**
- All maintenance performed
- Maintenance types
- MRO who performed work
- Dates
- Detailed notes
- Report links (IPFS)

### How to Use:

1. **Enter Part ID** in the search box
2. **Click "Query Part"**
3. **Review all sections:**
   - Start with basic info
   - Check custody history for transfers
   - Review maintenance for service records
4. **Click IPFS hashes** to view documents (if available)

### Tips:
- Part IDs are sequential numbers (1, 2, 3, ...)
- Use "My Parts" to find IDs of parts you own
- Share Part IDs with others for verification
- Save important Part IDs for quick reference

---

## Troubleshooting

### Issue: "Please install MetaMask"
**Solution:** Install MetaMask browser extension from metamask.io

### Issue: "Wrong network"
**Solution:**
1. Open MetaMask
2. Click network dropdown
3. Select correct network (shown in app)

### Issue: "Transaction failed"
**Possible Causes:**
1. Insufficient gas fees
   - Solution: Ensure you have enough ETH/MATIC
2. Wrong role for action
   - Solution: Verify you have correct permissions
3. Part doesn't exist
   - Solution: Check Part ID is correct
4. Not the owner
   - Solution: Only owners can transfer parts

### Issue: "Cannot connect wallet"
**Solutions:**
1. Refresh the page
2. Disconnect and reconnect in MetaMask
3. Clear browser cache
4. Try different browser

### Issue: "Slow transactions"
**Normal Behavior:**
- Local network: Near instant
- Testnets: 15-60 seconds
- Mainnet: 1-5 minutes
**Solution:** Wait patiently, don't click multiple times

### Issue: "Contract not found"
**Solutions:**
1. Verify correct network in MetaMask
2. Check contract address in app configuration
3. Ensure contract is deployed

### Need More Help?
- Check documentation
- Review error messages carefully
- Contact system administrator
- Create GitHub issue

---

## Tips for All Users

### Best Practices:
✅ Always verify recipient addresses before transfers  
✅ Write clear, detailed maintenance notes  
✅ Keep records of Part IDs you interact with  
✅ Upload comprehensive documents to IPFS  
✅ Double-check information before submitting  

### Security:
🔒 Never share your private key  
🔒 Always verify you're on the correct website  
🔒 Confirm transaction details in MetaMask  
🔒 Keep MetaMask updated  
🔒 Use hardware wallet for valuable accounts  

### Efficiency:
⚡ Batch similar operations together  
⚡ Monitor gas prices (testnets are usually fine)  
⚡ Keep IPFS documents organized  
⚡ Bookmark the application  
⚡ Use "My Parts" to track your inventory  

---

**Questions? Check the README.md or create a GitHub issue!**
