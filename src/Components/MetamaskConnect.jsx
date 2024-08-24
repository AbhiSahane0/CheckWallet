import { useState, useEffect } from "react";
import Web3 from "web3";

function MetamaskConnect() {
  const [userAccount, setUserAccount] = useState("");
  const [balanceEth, setBalanceEth] = useState("");
  const [transactions, setTransactions] = useState([]);

  const connectMetaMask = async () => {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");

      try {
        const web3 = new Web3(window.ethereum);

        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const userAccount = accounts[0];
        setUserAccount(userAccount);

        const balanceWei = await web3.eth.getBalance(userAccount);
        const balanceEth = web3.utils.fromWei(balanceWei, "ether");
        setBalanceEth(balanceEth);

        await fetchRecentTransactions(web3, userAccount);

        console.log("Connected account:", userAccount);
        console.log("Balance:", balanceEth, "ETH");
      } catch (error) {
        console.error("User denied account access or error occurred:", error);
      }
    } else {
      console.error("MetaMask is not installed!");
    }
  };

  const fetchRecentTransactions = async (web3, address) => {
    try {
      const latestBlockNumber = await web3.eth.getBlockNumber();
      const blocksToCheck = 100;
      const twoDaysInSeconds = 2 * 24 * 60 * 60;
      const now = Math.floor(Date.now() / 1000);
      const targetTime = now - twoDaysInSeconds;

      const transactions = [];

      for (
        let i = latestBlockNumber;
        i >= Math.max(latestBlockNumber - blocksToCheck, 0);
        i--
      ) {
        const block = await web3.eth.getBlock(i, true);
        if (block && block.transactions) {
          block.transactions.forEach((tx) => {
            if (tx.from === address || tx.to === address) {
              const blockTimestamp = parseInt(block.timestamp, 10);
              if (blockTimestamp >= targetTime) {
                transactions.push({
                  ...tx,
                  timestamp: blockTimestamp,
                });
              }
            }
          });
        }
      }

      transactions.sort((a, b) => b.timestamp - a.timestamp);

      setTransactions(transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    connectMetaMask();
  }, []);

  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-slate-100 dark:border-gray-700 mt-20 mx-auto">
      <div className="mb-4">
        <span className="text-lg font-bold">Wallet Details</span>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-medium text-slate-800 dark:text-slate-800">
            Wallet Address
          </p>
          <span className="text-lg font-semibold text-slate-800 dark:text-slate-800 truncate max-w-xs">
            {userAccount || "No Account Connected"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-lg font-medium text-slate-800 dark:text-slate-800">
            Balance
          </p>
          <span className="text-lg font-semibold text-slate-800 dark:text-slate-800">
            {balanceEth ? `${balanceEth} ETH` : "0 ETH"}
          </span>
        </div>
        <div className="mt-6">
          <span className="text-lg font-bold">Recent Transactions</span>
          <ul className="list-disc pl-5 mt-2">
            {transactions.length > 0 ? (
              transactions.map((tx) => (
                <li
                  key={tx.hash}
                  className="text-sm text-slate-700 dark:text-slate-400"
                >
                  <a
                    href={`https://etherscan.io/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 underline"
                  >
                    {tx.hash.slice(0, 10)}...
                  </a>
                  {" - "}
                  {new Date(tx.timestamp * 1000).toLocaleString()}
                </li>
              ))
            ) : (
              <li className="text-sm text-slate-700 dark:text-slate-400">
                No recent transactions
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MetamaskConnect;
