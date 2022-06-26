const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  // JSON RPC endpoint = http://0.0.0.0:7545
  const provider = new ethers.providers.JsonRpcProvider("http://0.0.0.0:7545");
  const wallet = new ethers.Wallet(
    "b228573a39720a630c8e6da7f384f3903a699fa386b28345b5d899bbf2ec4ded",
    provider
  );
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf-8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  const contract = await contractFactory.deploy(); // wait for the contract to be deployed
  // save the contract JSON to file
  fs.writeFileSync(
    "./contract-deploy-output.json",
    JSON.stringify(contract, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
