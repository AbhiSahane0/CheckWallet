import { useState } from "react";

function BitcoinConnect() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const [dataFetched, setDataFetched] = useState(false); // New state to track data fetch

  const getBitcoinBalanceAndTransactions = async () => {
    try {
      const response = await fetch(
        `https://api.blockcypher.com/v1/btc/main/addrs/${address}/balance`
      );

      const txResponse = await fetch(
        `https://api.blockcypher.com/v1/btc/main/addrs/${address}`
      );

      if (!response.ok || !txResponse.ok) {
        throw new Error(
          "Failed to fetch balance or transactions, Something went wrong!"
        );
      }

      const data = await response.json();
      const txData = await txResponse.json();
      const balanceInBTC = data.balance / 100000000;

      setBalance(balanceInBTC);
      setTransactions(txData.txrefs || []);
      setError(null);
      setDataFetched(true); 
    } catch (err) {
      setError(err.message);
      setBalance(null);
      setTransactions([]);
      setDataFetched(true); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDataFetched(false); 
    getBitcoinBalanceAndTransactions();
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
        Check Bitcoin Wallet Balance
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          placeholder="Enter Bitcoin address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Check Balance
        </button>
      </form>

      {balance !== null && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
          <h3 className="text-lg font-semibold">Balance: {balance} BTC</h3>
        </div>
      )}

      {dataFetched && transactions.length > 0 && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Recent Transactions:
          </h3>
          <ul className="space-y-2">
            {transactions.slice(0, 5).map((tx, index) => (
              <li key={index} className="p-3 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-gray-700">Tx Hash: {tx.tx_hash}</p>
                <p className="text-sm text-gray-700">
                  Amount: {(tx.value / 100000000).toFixed(8)} BTC
                </p>
                <p className="text-sm text-gray-700">
                  Confirmations: {tx.confirmations}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {dataFetched && transactions.length === 0 && (
        <div className="mt-4 p-4 bg-yellow-100 text-yellow-800 rounded-lg">
          <h3 className="text-lg font-semibold">No transactions found.</h3>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-lg">
          <h3 className="text-lg font-semibold">Error: {error}</h3>
        </div>
      )}
    </div>
  );
}

export default BitcoinConnect;
