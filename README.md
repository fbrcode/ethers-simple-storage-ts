# Hardhat (ethers) Simple Storage Implementation

## Install VS code extension

Use **Solidity + Hardhat** extension to have better syntax highlighting for solidity code.

Id: **NomicFoundation.hardhat-solidity**
Description: **Solidity and Hardhat support for Visual Studio Code**
Publisher: **Nomic Foundation**
VS Marketplace Link: <https://marketplace.visualstudio.com/items?itemName=NomicFoundation.hardhat-solidity>

### Auto-formatting on save for solidity

Open VS code workspace settings (JSON) and add the following line:

```json
    "[solidity]": {
        "editor.defaultFormatter": "NomicFoundation.hardhat-solidity"
    },
```

Open VS code user settings:

- Under "Text Editor" > "Formatting", select the checkbox **"Format On Save"**

## General formatting (Prettier)

Use extension **Prettier - Code formatter** for better general formatting.

Id: **esbenp.prettier-vscode**
Description: **Code formatter using prettier**
Publisher: **Prettier**
VS Marketplace Link: <https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode>

### Auto-formatting on save for JS

Open VS code workspace settings (JSON) and add the following line:

```json
    "[solidity]": {
        "editor.defaultFormatter": "NomicFoundation.hardhat-solidity"
    },
```

## Install SOLC

Having yarn package manager installed initialize the repository and install the proper solidity compiler.

- `yarn init -y`
- `yarn add --dev solc@0.8.7-fixed`

Try it out by checking the version: `yarn solcjs --version`

You should get `0.8.7+commit.e28d00a7.Emscripten.clang` as output.

For manual compilation of `SimpleStorage.sol` single file, type:

`yarn solcjs --bin --abi --include-path node_modules/ --base-path . -o . SimpleStorage.sol`

Add this command in **scripts** section of `package.json` for less typing on compilation command.

```json
  "scripts": {
    "compile": "solcjs --bin --abi --include-path node_modules/ --base-path . -o . SimpleStorage.sol"
  }
```

And call it with `yarn compile` to generate:

1. Interface specification: `SimpleStorage_sol_SimpleStorage.abi`
2. Contract byte-code: `SimpleStorage_sol_SimpleStorage.bin`

## Ganache (Truffle Suite)

To use an interface and understand better how local blockchain deployment works, lets use [Ganache](https://trufflesuite.com/ganache/).

Download and quick connect to spin up a local ethereum blockchain.

[Playground for Ethereum JSON-RPC](https://playground.open-rpc.org/?schemaUrl=https://raw.githubusercontent.com/ethereum/eth1.0-apis/assembled-spec/openrpc.json&uiSchema%5BappBar%5D%5Bui:splitView%5D=true&uiSchema%5BappBar%5D%5Bui:input%5D=false&uiSchema%5BappBar%5D%5Bui:examplesDropdown%5D=false) ([Remote-Procedure-Call encoded in JSON](https://en.wikipedia.org/wiki/JSON-RPC))

## Ethers.js

[Ethers.js](https://docs.ethers.io/v5/) is a JS library that helps to interact with ethereum JSON-RPC.

Installation: `yarn add ethers`

## Deploying

With Ganache local node running, change the settings on `deploy.js` to match a private key given by the node and sign the deployment transaction.

Contract deployment output is saved on `contract-deploy.json` and the transaction receipt is saved on `transaction-receipt.json`.

### Sample deployment with transaction only mode

To deploy a contract we just need (in fact) to have a transaction going through with required transaction data.

To test is out, just run `node ./deploy-transaction.js`

> Notice that the transaction will be signed from the `(ethers) wallet.sendTransaction` function internally.

## Environment variables

Copy `.env.example` to `.env` and change settings accordingly to match what you have locally.
