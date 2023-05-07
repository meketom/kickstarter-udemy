require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/:CampaignFactory.json');

const provider = new HDWalletProvider(process.env.MNEMONIC_PHRASE, process.env.INFURA_API)
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({data: compiledFactory.bytecode})
        .send({gas: '1000000', from: accounts[0]});

    console.log('Contract deployed to', result.options.address);
    //0x2058C4aD2Ba1f1D9b597bE0b2e0B8435C312c7D2
    provider.engine.stop();
};
deploy();
