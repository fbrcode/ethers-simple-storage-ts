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
