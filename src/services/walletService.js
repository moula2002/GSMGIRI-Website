const API_BASE = 'https://gsmgiri-website-backend.onrender.com/api/wallet';

export const getBalance = async (email) => {
  const response = await fetch(`${API_BASE}/balance?email=${email}`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to fetch balance');
  return data.balance;
};

export const addFunds = async (email, amount, method) => {
  const response = await fetch(`${API_BASE}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, amount, method })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to add funds');
  return data;
};
export default { getBalance, addFunds };
