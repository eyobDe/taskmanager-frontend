import { useState, useEffect } from 'react';
import { checkHealth } from '../services/api';

export default function HomePage() {
  const [healthStatus, setHealthStatus] = useState('Checking...');
  const [apiConnected, setApiConnected] = useState(false);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const health = await checkHealth();
        setHealthStatus(health.message);
        setApiConnected(true);
      } catch (error) {
        setHealthStatus(`Connection failed: ${error.message}`);
        setApiConnected(false);
      }
    };

    testConnection();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Task Manager</h1>
      <div style={{ 
        padding: '10px', 
        backgroundColor: apiConnected ? '#d4edda' : '#f8d7da',
        borderRadius: '5px',
        margin: '10px 0'
      }}>
        <h3>Backend API Status:</h3>
        <p>{healthStatus}</p>
        <p><strong>Connected:</strong> {apiConnected ? '✅ Yes' : '❌ No'}</p>
      </div>
      <div>
        <h3>Next Steps:</h3>
        <p>1. Verify backend is running on port 3000</p>
        <p>2. Check CORS configuration</p>
        <p>3. Test API endpoints</p>
      </div>
    </div>
  );
}
