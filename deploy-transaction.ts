import { ethers } from "ethers";
import * as fs from "fs-extra";
import "dotenv/config";

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf-8"
  );

  console.log(`Deploy only with transaction data`);
  const nonce = await wallet.getTransactionCount();
  const tx = {
    to: null, // contract creation
    value: 0, // not sending any ETH
    data: `0x${binary}`, // Smart contract binary (0x prefix is required for hex)
    gasPrice: 20000000000, // 20 gwei
    gasLimit: 1000000,
    nonce, // nonce is the number of transactions sent from the same account
    chainId: 1337, // chain ID is the chain ID of the Ethereum network
  };
  const sentTxResponse = await wallet.sendTransaction(tx);
  await sentTxResponse.wait(1); //
  console.log(
    `Signed transaction (transaction response): ${JSON.stringify(
      sentTxResponse,
      null,
      2
    )}`
  );
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
