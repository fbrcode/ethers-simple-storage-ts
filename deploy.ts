const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
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

  // get contract data, update and get again
  const favoriteNumber = await contract.retrieve(); // retrieve the contract data default value
  console.log(`Favorite number: ${favoriteNumber}`);
  const transactionResponse = await contract.store("7"); // store 7 as favorite number
  await transactionResponse.wait(1); // wait for 1 block confirmation
  const updatedFavoriteNumber = await contract.retrieve(); // retrieve the contract data updated value
  console.log(`Updated favorite number: ${updatedFavoriteNumber}`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

// Rinkeby deployed contract: https://rinkeby.etherscan.io/address/0xba050022798f372e5ffdf7e1414a40cd314136c2
// Favorite number: 0
// Updated favorite number: 7
