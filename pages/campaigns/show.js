import React, {Component} from "react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
class CampaignShow extends Component {
    constructor(props) {
        super(props);
    }

    static async getInitialProps(props) {
        const address = props.query.address;

        const campaignDetails = await Campaign(address).methods.getSummary().call();

        return {
            minimumContribution: campaignDetails[0],
            balance: campaignDetails[1],
            requestsCount: campaignDetails[2],
            approversCount: campaignDetails[3],
            managerAddress: campaignDetails[4]
        };
    }

    render() {
        return (
            <Layout>
                <h3>Campaign Show</h3>
            </Layout>
        );
    }
}

export default CampaignShow;
