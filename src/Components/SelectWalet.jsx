function SelectWalet({ handleWaletSelect }) {
  return (
    <>
      <div className="">
        <form class="max-w-sm mt-10 ml-10">
          <label
            for="countries"
            class="block mb-2 text-base font-medium text-gray-900 dark:text-violet-700"
          >
            Select Walet
          </label>
          <select
            id="countries"
            class=" border border-gray-300 text-violet-700 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-b-indigo-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-violet-700 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => handleWaletSelect(e)}
          >
            <option defaultValue={"Choose"}>Choose a Walet</option>
            <option value="ETH">MetaMask(Ethereum)</option>
            <option value="SO">Phantom(Solana)</option>
            <option value="BIT">Bitcoin(Require wallet Address)</option>
            <option value="OT">Other</option>
          </select>
        </form>
      </div>
    </>
  );
}

export default SelectWalet;
