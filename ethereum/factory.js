import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    "0x1987EDE1Fa07913Eee82D71E72615593215E294F"
);

export default instance;
