import React, {Component} from "react";
import factory from "../ethereum/factory";
import {Card, Button} from 'semantic-ui-react';
import Layout from "../components/Layout";
import Link from 'next/link';
import Campaign from "../ethereum/campaign";

class CampaignIndex extends Component {

    constructor(props) {
        super(props);

        this.state = {
            campaigns: []
        }
    }

    async componentDidMount() {
        const campaignsAddresses = await factory.methods.getDeployedCampaigns().call();
        const campaignsWithDescription = campaignsAddresses.map(async address => {
            const campaignDescription = await Campaign(address).methods.description().call();

            return {
                address: address,
                description: campaignDescription
            };
        })
        const campaigns = await Promise.all(campaignsWithDescription);

        this.setState({campaigns: campaigns});
    }

    renderCampaigns() {
        const items = this.state.campaigns.map(campaign => {
            const address = campaign.address;
            return {
                header: campaign.description,
                description: <Link href={{pathname: '/campaigns/[address]', query: {address}}}>View Campaign</Link>,
                meta: address,
                fluid: true
            }
        });

        return <Card.Group items={items}/>;
    }

    render() {
        return (
            <Layout>
                <div>
                    <h3>Open Campaigns</h3>
                    <Link href="/campaigns/new">
                        <Button floated="right" content="Create Campaign" icon="add circle" primary/>
                    </Link>

                    {this.renderCampaigns()}
                </div>
            </Layout>
        );
    }
}

export default CampaignIndex;
