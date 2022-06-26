const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  // JSON RPC endpoint = http://0.0.0.0:7545
  const provider = new ethers.providers.JsonRpcProvider("http://0.0.0.0:7545");
  const wallet = new ethers.Wallet(
    "4cd81ad807121a315b6bcd0347602a37e1028e3dc4de467403df3c3b411d902e",
    provider
  );
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf-8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);

  // wait for the contract to be deployed
  const contract = await contractFactory.deploy();
  fs.writeFileSync("./contract-deploy.json", JSON.stringify(contract, null, 2));
  // deployment transaction (transaction response) is when you create a transaction
  console.log(
    `Deployment transaction (transaction response): ${JSON.stringify(
      contract.deployTransaction,
      null,
      2
    )}`
  );

  // wait for "x" block confirmations to get a receipt
  const transactionReceipt = await contract.deployTransaction.wait(1); // wait for 1 block confirmation
  fs.writeFileSync(
    "./transaction-receipt.json",
    JSON.stringify(transactionReceipt, null, 2)
  );
  // transaction receipt is when you wait for block confirmation
  console.log(
    `Transaction receipt: ${JSON.stringify(transactionReceipt, null, 2)}`
  );
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
