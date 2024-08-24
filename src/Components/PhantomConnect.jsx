import React, { useState, useEffect } from "react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

function PhantomConnect() {
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const connectSolana = async () => {
      if (window.solana && window.solana.isPhantom) {
        try {
          const response = await window.solana.connect();
          const userPublicKey = new PublicKey(response.publicKey.toString());
          setWalletAddress(userPublicKey.toString());

          const connection = new Connection(
            clusterApiUrl("mainnet-beta"),
            "confirmed"
          );

          const userBalance = await connection.getBalance(userPublicKey);
          const balanceInSol = userBalance / 1e9; // Convert from lamports to SOL
          setBalance(balanceInSol.toFixed(2));

          await fetchRecentTransactions(connection, userPublicKey);
        } catch (error) {
          console.error("Error connecting to Solana wallet:", error);
        }
      } else {
        setError("Solana wallet is not installed!");
      }
    };

    const fetchRecentTransactions = async (connection, address) => {
      try {
        const transactions = await connection.getSignaturesForAddress(address, {
          limit: 10,
        });

        const transactionDetails = await Promise.all(
          transactions.map(async (tx) => {
            const { signature } = tx;
            const txDetails = await connection.getTransaction(signature, {
              commitment: "confirmed",
            });

            return {
              ...txDetails,
              timestamp: new Date(txDetails.blockTime * 1000).toLocaleString(),
            };
          })
        );

        setTransactions(transactionDetails);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    connectSolana();
  }, []);

  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-slate-100 dark:border-gray-700 mt-20 mx-auto">
      {error ? (
        <div className="text-center text-red-600 dark:text-red-400">
          <p>{error}</p>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <span className="text-lg font-bold">Solana Wallet Details</span>
          </div>
          <div className="space-y-4">
            {walletAddress && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-medium text-slate-800 dark:text-slate-800">
                    Wallet Address
                  </p>
                  <span className="text-lg font-semibold text-slate-800 dark:text-slate-800 truncate max-w-xs">
                    {walletAddress}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-medium text-slate-800 dark:text-slate-800">
                    Balance
                  </p>
                  <span className="text-lg font-semibold text-slate-800 dark:text-slate-800">
                    {balance ? `${balance} SOL` : "0 SOL"}
                  </span>
                </div>
              </div>
            )}
            <div className="mt-6">
              <span className="text-lg font-bold">Recent Transactions</span>
              {transactions.length > 0 ? (
                <ul className="list-disc pl-5 mt-2">
                  {transactions.map((tx) => (
                    <li
                      key={tx.transaction.signatures[0]}
                      className="text-sm text-slate-700 dark:text-slate-400"
                    >
                      <a
                        href={`https://solscan.io/tx/${tx.transaction.signatures[0]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 underline"
                      >
                        {tx.transaction.signatures[0].slice(0, 10)}...
                      </a>
                      {" - "}
                      {tx.timestamp}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-700 dark:text-slate-400">
                  No recent transactions found.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PhantomConnect;
