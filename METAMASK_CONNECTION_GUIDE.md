# 🦊 MetaMask Connection Guide

## ✅ Your UI is Working Great!

The welcome screen shows perfectly. Now let's get MetaMask connected.

---

## 🔧 Step-by-Step Connection

### **Step 1: Make Sure MetaMask is Installed**

You should see the MetaMask fox icon in your browser extensions.

If not installed:
1. Go to https://metamask.io/download/
2. Install the Chrome extension
3. Create a wallet or import one

---

### **Step 2: Configure MetaMask for Local Network**

**Click the MetaMask extension icon**, then:

1. **Click the network dropdown** (top left, probably says "Ethereum Mainnet")

2. **Click "Add Network"** or "Add a network manually"

3. **Enter these details:**
   ```
   Network Name: Hardhat Local
   New RPC URL: http://127.0.0.1:8545
   Chain ID: 1337
   Currency Symbol: ETH
   ```

4. **Click "Save"**

5. **Select "Hardhat Local"** as your active network

---

### **Step 3: Import Test Account**

You need an account with ETH to interact with the contract.

**Option A: Use Hardhat Account #0 (Recommended)**

1. Open MetaMask
2. Click your account icon (top right)
3. Click "Import Account"
4. Select "Private Key"
5. Paste this private key:
   ```
   0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```
6. Click "Import"

This is Hardhat's first test account with 10,000 ETH!

**⚠️ WARNING:** This is a PUBLIC test key. NEVER use it on mainnet!

---

### **Step 4: Connect Wallet**

Now go back to your browser at `http://localhost:3000`

1. **Click "Connect MetaMask Wallet"**
2. **MetaMask popup will appear**
3. **Click "Next"**
4. **Click "Connect"**

✅ **Success!** You should see:
- Your account address in the header
- Your role (initially "None" until registered)
- The dashboard

---

## 🐛 Troubleshooting

### **Issue 1: "Connect Wallet" Button Not Responding**

**Solution:**
```bash
# Stop the frontend (Ctrl+C)
cd frontend
rm -rf node_modules .cache
npm install
npm start
```

### **Issue 2: MetaMask Doesn't Popup**

**Check:**
1. MetaMask is unlocked (enter password)
2. You're on the correct network (Hardhat Local)
3. No popup blockers are active
4. Try clicking the MetaMask extension directly

**Then:** Refresh the page and try again

### **Issue 3: "Please install MetaMask" Message**

**Solution:**
1. Install MetaMask extension
2. Refresh the page
3. The button should work now

### **Issue 4: Network Error**

**Make sure your blockchain is running:**
```bash
# Terminal 1 should be running:
npx hardhat node
```

You should see output like:
```
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/
```

### **Issue 5: Wrong Network**

**In MetaMask:**
1. Click network dropdown
2. Select "Hardhat Local" (Chain ID 1337)
3. Try connecting again

---

## 📊 After Connection

Once connected, you'll see:

```
🛩️ Aviation Supply Chain
Blockchain Provenance System

Account: 0xf39F...92266
Role: None
Name: (empty until registered)
```

**Next Steps:**
1. Use Account #0 to register stakeholders (Admin function)
2. Switch to other accounts for different roles
3. Start using the system!

---

## 🎯 Test Accounts for Different Roles

After importing these into MetaMask, switch between them:

| Account | Address | Role | Private Key |
|---------|---------|------|-------------|
| #0 | 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 | Admin | 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 |
| #1 | 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 | Manufacturer | 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d |
| #2 | 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC | Airline | 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a |
| #3 | 0x90F79bf6EB2c4f870365E785982E1f101E93b906 | MRO | 0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6 |

---

## 🔐 Important Security Notes

✅ **For Development:**
- These test keys are fine
- They have test ETH only
- Network is local only

❌ **NEVER:**
- Use these keys on mainnet
- Send real ETH to these addresses
- Commit private keys to Git

---

## ✅ Success Checklist

- [ ] MetaMask installed
- [ ] Local network added (Chain ID 1337)
- [ ] Network selected in MetaMask
- [ ] Account imported
- [ ] Hardhat node running (`npx hardhat node`)
- [ ] Frontend running (`npm start`)
- [ ] Contract deployed
- [ ] Clicked "Connect Wallet"
- [ ] MetaMask popup appeared
- [ ] Clicked "Connect"
- [ ] Wallet connected! 🎉

---

## 🎬 Quick Video Guide

**If still stuck, here's the quick process:**

1. Install MetaMask → Chrome Web Store
2. Add Network → MetaMask Settings
3. Import Account → Use private key above
4. Select Network → "Hardhat Local"
5. Click Connect → On your website
6. Approve → In MetaMask popup

**That's it!** 🚀

---

Need more help? Check:
- MetaMask official docs: https://metamask.io/faqs/
- Hardhat network guide: https://hardhat.org/hardhat-network/
