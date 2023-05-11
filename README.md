# Project

This project was created for me on a Udemy Course.

## Installation

Use the package manager npm.

```node
npm install
```

## Pre-requisites

To use this project you'll need:
* Metamask plugin on browser.
* Infura account and created sepolia project inside of it.
* `.env` file on source project with `MNEMONIC_PHRASE` of metamask and `INFURA_API`.

## How to use it

1. Clone the repository.
1. Install dependencies with: `make front-deps`
1. Compile solidity contract: `make eth-compile`.
1. Deploy it on Infura with: `make eth-deploy`.
1. Run project with: `make front-dev` and enjoy!!

## Contributing

Pull requests are welcome, but this is a learning project. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
