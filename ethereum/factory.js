import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    "0x9C65acC017375eeFA63C9fDf15E3FC5BdBcC6584"
);

export default instance;
