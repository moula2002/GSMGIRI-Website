const API_BASE = 'https://gsmgiri-website-backend.onrender.com/api/transactions';

export const getTransactions = async (email) => {
  const response = await fetch(`${API_BASE}?email=${email}`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to fetch transactions');
  return data.orders;
};

export const placeOrder = async (orderData) => {
  const response = await fetch(`${API_BASE}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ order: orderData })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to place order');
  return data;
};
export default { getTransactions, placeOrder };
