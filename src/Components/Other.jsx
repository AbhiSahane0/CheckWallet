function Other() {
  return (
    <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">
        Working with Other Wallets....
      </h2>
      <p className="text-base text-slate-700 dark:text-slate-400 mt-2">
        We support multiple wallets to ensure you can easily manage your assets
        across different platforms. Currently, we are also working with:
      </p>
      <ul className="list-disc pl-5 mt-2 text-slate-700 dark:text-slate-400">
        <li>Polygon Wallets</li>
        <li>Tether (USDT)</li>
        <li>Shown Recent Transactions </li>
        <li>And more...</li>
      </ul>
    </div>
  );
}

export default Other;
