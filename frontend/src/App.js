import React, { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import './App.css';
import ContractABI from './contracts/SupplyChainProvenance.json';

// Contract address - update after deployment
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
  // State management
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [role, setRole] = useState('None');
  const [stakeholderName, setStakeholderName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  // Forms state
  const [partForm, setPartForm] = useState({ partNumber: '', serialNumber: '', partName: '', ipfsHash: '' });
  const [queryPartId, setQueryPartId] = useState('');
  const [partDetails, setPartDetails] = useState(null);
  const [maintenanceHistory, setMaintenanceHistory] = useState([]);
  const [custodyHistory, setCustodyHistory] = useState([]);
  const [maintenanceForm, setMaintenanceForm] = useState({ partId: '', type: '', ipfsHash: '', notes: '' });
  const [transferForm, setTransferForm] = useState({ partId: '', toAddress: '', reason: '' });
  const [statusForm, setStatusForm] = useState({ partId: '', status: '0' });
  const [myParts, setMyParts] = useState([]);

  const initializeApp = useCallback(async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request account access
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        
        if (accounts.length === 0) {
          setMessage('❌ No accounts found. Please unlock MetaMask.');
          return;
        }
        
        setAccount(accounts[0]);
        
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        
        const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, ContractABI.abi, signer);
        setContract(contractInstance);
        
        await getUserRole(contractInstance, accounts[0]);
        
        // Setup event listeners
        if (!window.ethereum._events?.accountsChanged) {
          window.ethereum.on('accountsChanged', handleAccountChange);
        }
        
        setMessage('✅ Wallet connected successfully!');
      } catch (error) {
        console.error('Connection error:', error);
        if (error.code === 4001) {
          setMessage('❌ Connection rejected. Please approve in MetaMask.');
        } else {
          setMessage('❌ Error connecting wallet: ' + error.message);
        }
      }
    } else {
      setMessage('❌ Please install MetaMask browser extension!');
      window.open('https://metamask.io/download/', '_blank');
    }
  }, []);

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  // Verify contract connection
  useEffect(() => {
    const verifyContract = async () => {
      if (contract && account) {
        try {
          // Test if contract is accessible
          const code = await contract.runner.provider.getCode(CONTRACT_ADDRESS);
          if (code === '0x') {
            setMessage('❌ Contract not found at this address. Please redeploy or update .env');
            console.error('Contract address:', CONTRACT_ADDRESS);
          }
        } catch (err) {
          console.error('Contract verification error:', err);
        }
      }
    };
    verifyContract();
  }, [contract, account]);

  const handleAccountChange = async (accounts) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
      if (contract) await getUserRole(contract, accounts[0]);
      setPartDetails(null);
      setMyParts([]);
    }
  };

  const getUserRole = async (contractInstance, address) => {
    try {
      const stakeholder = await contractInstance.getStakeholderDetails(address);
      setStakeholderName(stakeholder[0]);
      const roleNames = ['None', 'Manufacturer', 'Airline', 'MRO', 'Regulator'];
      setRole(roleNames[Number(stakeholder[1])]);
    } catch (err) {
      setRole('None');
      setStakeholderName('');
    }
  };

  const registerPart = async () => {
    if (!contract) return showError('Contract not loaded');
    if (!partForm.partNumber || !partForm.serialNumber || !partForm.partName) {
      return showError('Please fill all required fields');
    }

    try {
      setLoading(true);
      setMessage('📝 Registering part...');
      const tx = await contract.registerPart(partForm.partNumber, partForm.serialNumber, partForm.partName, partForm.ipfsHash || 'QmDefault');
      await tx.wait();
      setMessage('✅ Part registered successfully!');
      setPartForm({ partNumber: '', serialNumber: '', partName: '', ipfsHash: '' });
      await loadMyParts();
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  const queryPart = async () => {
    if (!contract) return showError('Contract not loaded');
    if (!queryPartId) return showError('Please enter a Part ID');

    try {
      setLoading(true);
      setMessage('🔍 Querying part...');
      
      const details = await contract.getPartDetails(queryPartId);
      const maintenance = await contract.getMaintenanceHistory(queryPartId);
      const custody = await contract.getCustodyHistory(queryPartId);
      
      const statusNames = ['Manufactured', 'InTransit', 'Installed', 'InMaintenance', 'Retired'];
      setPartDetails({
        partId: queryPartId,
        partNumber: details[0],
        serialNumber: details[1],
        partName: details[2],
        manufacturer: details[3],
        status: statusNames[Number(details[4])],
        manufacturedDate: new Date(Number(details[5]) * 1000).toLocaleString(),
        ipfsHash: details[6],
        currentOwner: details[7]
      });
      
      setMaintenanceHistory(maintenance);
      setCustodyHistory(custody);
      setMessage('✅ Part details retrieved!');
    } catch (error) {
      showError(error);
      setPartDetails(null);
    } finally {
      setLoading(false);
    }
  };

  const recordMaintenance = async () => {
    if (!contract) return showError('Contract not loaded');
    if (!maintenanceForm.partId || !maintenanceForm.type) return showError('Please fill required fields');

    try {
      setLoading(true);
      setMessage('🔧 Recording maintenance...');
      const tx = await contract.recordMaintenance(maintenanceForm.partId, maintenanceForm.type, maintenanceForm.ipfsHash || 'QmDefault', maintenanceForm.notes);
      await tx.wait();
      setMessage('✅ Maintenance recorded successfully!');
      setMaintenanceForm({ partId: '', type: '', ipfsHash: '', notes: '' });
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  const transferCustody = async () => {
    if (!contract) return showError('Contract not loaded');
    if (!transferForm.partId || !transferForm.toAddress) return showError('Please fill required fields');

    try {
      setLoading(true);
      setMessage('📦 Transferring custody...');
      const tx = await contract.transferCustody(transferForm.partId, transferForm.toAddress, transferForm.reason || 'Transfer');
      await tx.wait();
      setMessage('✅ Custody transferred successfully!');
      setTransferForm({ partId: '', toAddress: '', reason: '' });
      await loadMyParts();
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async () => {
    if (!contract) return showError('Contract not loaded');
    if (!statusForm.partId) return showError('Please enter Part ID');

    try {
      setLoading(true);
      setMessage('🔄 Updating status...');
      const tx = await contract.updatePartStatus(statusForm.partId, statusForm.status);
      await tx.wait();
      setMessage('✅ Status updated successfully!');
      setStatusForm({ partId: '', status: '0' });
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  const loadMyParts = useCallback(async () => {
    if (!contract || !account) return;
    try {
      const partIds = await contract.getStakeholderParts(account);
      
      // Check if result is valid
      if (!partIds || partIds.length === 0) {
        setMyParts([]);
        return;
      }
      
      const partsData = [];
      for (let id of partIds) {
        try {
          const details = await contract.getPartDetails(id);
          const statusNames = ['Manufactured', 'InTransit', 'Installed', 'InMaintenance', 'Retired'];
          partsData.push({
            id: id.toString(),
            partNumber: details[0],
            partName: details[2],
            status: statusNames[Number(details[4])]
          });
        } catch (err) {
          console.error('Error loading part:', id);
        }
      }
      setMyParts(partsData);
    } catch (error) {
      console.error('Error loading parts:', error);
      // Account not registered or has no parts
      setMyParts([]);
    }
  }, [contract, account]);

  const showError = (error) => {
    const errorMsg = error?.reason || error?.message || 'Transaction failed';
    setMessage(`❌ ${errorMsg}`);
  };

  useEffect(() => {
    if (contract && account && activeTab === 'dashboard') loadMyParts();
  }, [contract, account, activeTab, loadMyParts]);

  const renderDashboard = () => (
    <div className="section">
      <h2>📊 Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👤</div>
          <div className="stat-content">
            <div className="stat-label">Your Role</div>
            <div className="stat-value">{role}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <div className="stat-label">Your Parts</div>
            <div className="stat-value">{myParts.length}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔗</div>
          <div className="stat-content">
            <div className="stat-label">Network</div>
            <div className="stat-value">Local</div>
          </div>
        </div>
      </div>
      <div className="parts-list">
        <h3>My Parts</h3>
        {myParts.length === 0 ? (
          <p className="empty-state">No parts found</p>
        ) : (
          <div className="parts-grid">
            {myParts.map(part => (
              <div key={part.id} className="part-card">
                <div className="part-header">
                  <span className="part-id">#{part.id}</span>
                  <span className={`status-badge status-${part.status.toLowerCase()}`}>{part.status}</span>
                </div>
                <h4>{part.partName}</h4>
                <p className="part-number">{part.partNumber}</p>
                <button className="btn-secondary btn-small" onClick={() => { setQueryPartId(part.id); setActiveTab('query'); setTimeout(() => queryPart(), 100); }}>
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderRegisterPart = () => (
    <div className="section">
      <h2>✈️ Register New Part</h2>
      <div className="form-group">
        <label>Part Number *</label>
        <input type="text" placeholder="e.g., ENG-001" value={partForm.partNumber} onChange={(e) => setPartForm({...partForm, partNumber: e.target.value})} />
        <label>Serial Number *</label>
        <input type="text" placeholder="e.g., SN123456" value={partForm.serialNumber} onChange={(e) => setPartForm({...partForm, serialNumber: e.target.value})} />
        <label>Part Name *</label>
        <input type="text" placeholder="e.g., Turbine Blade" value={partForm.partName} onChange={(e) => setPartForm({...partForm, partName: e.target.value})} />
        <label>IPFS Certificate Hash</label>
        <input type="text" placeholder="QmXxx... (optional)" value={partForm.ipfsHash} onChange={(e) => setPartForm({...partForm, ipfsHash: e.target.value})} />
        <button onClick={registerPart} disabled={loading} className="btn-primary">{loading ? '⏳ Registering...' : '📝 Register Part'}</button>
      </div>
    </div>
  );

  const renderQueryPart = () => (
    <div className="section">
      <h2>🔍 Query Part Details</h2>
      <div className="form-group">
        <label>Part ID</label>
        <div className="input-with-button">
          <input type="number" placeholder="Enter Part ID" value={queryPartId} onChange={(e) => setQueryPartId(e.target.value)} />
          <button onClick={queryPart} disabled={loading} className="btn-primary">{loading ? '⏳ Loading...' : '🔍 Search'}</button>
        </div>
      </div>
      {partDetails && (
        <div className="part-details-container">
          <div className="detail-card">
            <h3>📋 Part Information</h3>
            <table className="detail-table">
              <tbody>
                <tr><td><strong>Part ID:</strong></td><td>#{partDetails.partId}</td></tr>
                <tr><td><strong>Part Number:</strong></td><td>{partDetails.partNumber}</td></tr>
                <tr><td><strong>Serial Number:</strong></td><td>{partDetails.serialNumber}</td></tr>
                <tr><td><strong>Part Name:</strong></td><td>{partDetails.partName}</td></tr>
                <tr><td><strong>Status:</strong></td><td><span className={`status-badge status-${partDetails.status.toLowerCase()}`}>{partDetails.status}</span></td></tr>
                <tr><td><strong>Manufactured:</strong></td><td>{partDetails.manufacturedDate}</td></tr>
                <tr><td><strong>Manufacturer:</strong></td><td className="address">{partDetails.manufacturer}</td></tr>
                <tr><td><strong>Current Owner:</strong></td><td className="address">{partDetails.currentOwner}</td></tr>
                <tr><td><strong>Certificate:</strong></td><td className="ipfs-hash">{partDetails.ipfsHash}</td></tr>
              </tbody>
            </table>
          </div>
          {custodyHistory.length > 0 && (
            <div className="detail-card">
              <h3>📦 Custody History ({custodyHistory.length} transfers)</h3>
              <div className="timeline">
                {custodyHistory.map((transfer, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-marker">{index + 1}</div>
                    <div className="timeline-content">
                      <div className="timeline-title">Transfer #{index + 1}</div>
                      <p><strong>From:</strong> <span className="address">{transfer.from}</span></p>
                      <p><strong>To:</strong> <span className="address">{transfer.to}</span></p>
                      <p><strong>Date:</strong> {new Date(Number(transfer.timestamp) * 1000).toLocaleString()}</p>
                      <p><strong>Reason:</strong> {transfer.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {maintenanceHistory.length > 0 && (
            <div className="detail-card">
              <h3>🔧 Maintenance History ({maintenanceHistory.length} records)</h3>
              <div className="timeline">
                {maintenanceHistory.map((record, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-marker">🔧</div>
                    <div className="timeline-content">
                      <div className="timeline-title">{record.maintenanceType}</div>
                      <p><strong>MRO:</strong> <span className="address">{record.mro}</span></p>
                      <p><strong>Date:</strong> {new Date(Number(record.timestamp) * 1000).toLocaleString()}</p>
                      <p><strong>Notes:</strong> {record.notes}</p>
                      <p><strong>Report:</strong> <span className="ipfs-hash">{record.ipfsHash}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderMaintenance = () => (
    <div className="section">
      <h2>🔧 Record Maintenance</h2>
      <div className="form-group">
        <label>Part ID *</label>
        <input type="number" placeholder="Enter Part ID" value={maintenanceForm.partId} onChange={(e) => setMaintenanceForm({...maintenanceForm, partId: e.target.value})} />
        <label>Maintenance Type *</label>
        <select value={maintenanceForm.type} onChange={(e) => setMaintenanceForm({...maintenanceForm, type: e.target.value})}>
          <option value="">Select type...</option>
          <option value="Inspection">Inspection</option>
          <option value="Repair">Repair</option>
          <option value="Overhaul">Overhaul</option>
          <option value="Replacement">Replacement</option>
          <option value="Certification">Certification</option>
        </select>
        <label>Report IPFS Hash</label>
        <input type="text" placeholder="QmXxx... (optional)" value={maintenanceForm.ipfsHash} onChange={(e) => setMaintenanceForm({...maintenanceForm, ipfsHash: e.target.value})} />
        <label>Notes</label>
        <textarea placeholder="Maintenance details..." rows="4" value={maintenanceForm.notes} onChange={(e) => setMaintenanceForm({...maintenanceForm, notes: e.target.value})} />
        <button onClick={recordMaintenance} disabled={loading} className="btn-primary">{loading ? '⏳ Recording...' : '🔧 Record Maintenance'}</button>
      </div>
    </div>
  );

  const renderTransfer = () => (
    <div className="section">
      <h2>📦 Transfer Custody</h2>
      <div className="form-group">
        <label>Part ID *</label>
        <input type="number" placeholder="Enter Part ID" value={transferForm.partId} onChange={(e) => setTransferForm({...transferForm, partId: e.target.value})} />
        <label>Recipient Address *</label>
        <input type="text" placeholder="0x..." value={transferForm.toAddress} onChange={(e) => setTransferForm({...transferForm, toAddress: e.target.value})} />
        <label>Transfer Reason</label>
        <input type="text" placeholder="e.g., Sale, Maintenance..." value={transferForm.reason} onChange={(e) => setTransferForm({...transferForm, reason: e.target.value})} />
        <button onClick={transferCustody} disabled={loading} className="btn-primary">{loading ? '⏳ Transferring...' : '📦 Transfer Custody'}</button>
      </div>
    </div>
  );

  const renderStatus = () => (
    <div className="section">
      <h2>🔄 Update Part Status</h2>
      <div className="form-group">
        <label>Part ID *</label>
        <input type="number" placeholder="Enter Part ID" value={statusForm.partId} onChange={(e) => setStatusForm({...statusForm, partId: e.target.value})} />
        <label>New Status *</label>
        <select value={statusForm.status} onChange={(e) => setStatusForm({...statusForm, status: e.target.value})}>
          <option value="0">Manufactured</option>
          <option value="1">In Transit</option>
          <option value="2">Installed</option>
          <option value="3">In Maintenance</option>
          <option value="4">Retired</option>
        </select>
        <button onClick={updateStatus} disabled={loading} className="btn-primary">{loading ? '⏳ Updating...' : '🔄 Update Status'}</button>
      </div>
    </div>
  );

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <div className="header-left">
            <h1>🛩️ Aviation Supply Chain</h1>
            <p className="subtitle">Blockchain Provenance System</p>
          </div>
          <div className="header-right">
            <div className="wallet-info">
              {account ? (
                <>
                  <div className="wallet-detail">
                    <span className="label">Account:</span>
                    <span className="value address">{account.slice(0, 6)}...{account.slice(-4)}</span>
                  </div>
                  <div className="wallet-detail">
                    <span className="label">Role:</span>
                    <span className={`value role-badge role-${role.toLowerCase()}`}>{role}</span>
                  </div>
                  {stakeholderName && (
                    <div className="wallet-detail">
                      <span className="label">Name:</span>
                      <span className="value">{stakeholderName}</span>
                    </div>
                  )}
                </>
              ) : (
                <button onClick={initializeApp} className="connect-button">Connect Wallet</button>
              )}
            </div>
          </div>
        </div>
      </header>

      {account && (
        <nav className="nav-tabs">
          <button className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>📊 Dashboard</button>
          {role === 'Manufacturer' && <button className={`nav-tab ${activeTab === 'register' ? 'active' : ''}`} onClick={() => setActiveTab('register')}>✈️ Register Part</button>}
          <button className={`nav-tab ${activeTab === 'query' ? 'active' : ''}`} onClick={() => setActiveTab('query')}>🔍 Query Part</button>
          {role === 'MRO' && <button className={`nav-tab ${activeTab === 'maintenance' ? 'active' : ''}`} onClick={() => setActiveTab('maintenance')}>🔧 Maintenance</button>}
          {(role === 'Manufacturer' || role === 'Airline' || role === 'MRO') && <button className={`nav-tab ${activeTab === 'transfer' ? 'active' : ''}`} onClick={() => setActiveTab('transfer')}>📦 Transfer</button>}
          {(role === 'Airline' || role === 'MRO') && <button className={`nav-tab ${activeTab === 'status' ? 'active' : ''}`} onClick={() => setActiveTab('status')}>🔄 Status</button>}
        </nav>
      )}

      <div className="container">
        {message && <div className={`message ${message.includes('❌') ? 'error' : 'success'}`}>{message}</div>}
        {!account ? (
          <div className="welcome-section">
            <div className="welcome-content">
              <h2>Welcome to Aviation Supply Chain</h2>
              <p>Track aviation parts throughout their entire lifecycle with blockchain technology</p>
              <button onClick={initializeApp} className="connect-button-large">🔗 Connect MetaMask Wallet</button>
            </div>
          </div>
        ) : (
          <>
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'register' && renderRegisterPart()}
            {activeTab === 'query' && renderQueryPart()}
            {activeTab === 'maintenance' && renderMaintenance()}
            {activeTab === 'transfer' && renderTransfer()}
            {activeTab === 'status' && renderStatus()}
          </>
        )}
      </div>

      <footer className="app-footer">
        <p>CSE 540 - Group 3 | Blockchain-Based Supply Chain Provenance System</p>
        <p className="footer-links">
          <a href="https://github.com/shivpranay5/Supply_Chain_Provenance_System" target="_blank" rel="noopener noreferrer">GitHub Repository</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
