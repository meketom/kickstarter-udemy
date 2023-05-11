import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    "0x51EAD120F42a5416f2d0E6E066B6c687E8010643"
);

export default instance;
