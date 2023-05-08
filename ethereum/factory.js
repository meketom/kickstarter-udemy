import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    "0x91FF4BcdD7dCE6E7c5B041Df8c32bFDb70eB43AD"
);

export default instance;
