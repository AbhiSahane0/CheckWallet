
function Button({ handleGetData }) {
  return (
    <div className="flex ml-32  mt-40">
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-base px-8 py-4 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => handleGetData()}
      >
        Get Wallet Data
      </button>
    </div>
  );
}

export default Button;
