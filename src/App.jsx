import { useState } from "react";
import Navbar from "./Components/Navbar";
import Button from "./Components/Button";
import SelectWalet from "./Components/SelectWalet";
import MetamaskConnect from "./Components/MetamaskConnect";
import BitcoinConnect from "./Components/BitcoinConnect";
import PhantomConnect from "./Components/PhantomConnect";
import Other from "./Components/Other";

function App() {
  const [getData, setGetData] = useState(false);
  const [wallet, setWallet] = useState("");

  function handleGetData() {
    setGetData((prev) => !prev);
  }

  function handleWaletSelect(e) {
    setWallet(e.target.value);
  }

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 flex flex-col gap-4">
          <SelectWalet handleWaletSelect={handleWaletSelect} />
          <Button handleGetData={handleGetData} />
        </div>
        {wallet === "ETH" && getData ? <MetamaskConnect /> : null}
        {wallet === "BIT" && getData ? <BitcoinConnect /> : null}
        {wallet === "SO" && getData ? <PhantomConnect /> : null}
        {wallet === "OT" && getData ? <Other /> : null}
      </div>
      <p className="text-center mt-20">
        Contact @ cloudabhi123@gmail.com ,Waitng for feedback....
      </p>
    </>
  );
}

export default App;
