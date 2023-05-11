import React from "react";
import {Button, Card, Grid} from "semantic-ui-react";
import Layout from "../../../components/Layout";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import ContributeForm from "../../../components/ContributeForm";
import Link from 'next/link';

function renderCards(campaign) {
    const items = [
        {
            header: campaign.description,
            meta: 'Description',
            description: 'The Campaign\'s goals.',
            style: {overflowWrap: 'break-word'}
        },
        {
            header: campaign.managerAddress,
            meta: 'Address of Manager',
            description: 'The manager created this campaign and can create requests to withdraw money.',
            style: {overflowWrap: 'break-word'}
        },
        {
            header: campaign.minimumContribution,
            meta: 'Minimum Contribution (wei)',
            description: 'You must contribute at least this much wei to become an approver.',
            style: {overflowWrap: 'break-word'}
        },
        {
            header: campaign.requestsCount,
            meta: 'Number of Requests',
            description: 'A request tries to withdraw money from the contract. Requests must be approved by approvers.',
            style: {overflowWrap: 'break-word'}
        },
        {
            header: campaign.approversCount,
            meta: 'Number of Approvers',
            description: 'Number of people who have already donated to this campaign.',
            style: {overflowWrap: 'break-word'}
        },
        {
            header: web3.utils.fromWei(campaign.balance, 'ether') + ' eth',
            meta: 'Campaign Balance (ether)',
            description: 'The balance is how much money this campaign has left to spend.',
            style: {overflowWrap: 'break-word'}
        },
    ];

    return <Card.Group items={items}/>;
}

export async function getServerSideProps(context) {

    const campaignResult = await Campaign(context.query.address).methods.getSummary().call();
    const campaign = {
        minimumContribution: campaignResult[0],
        balance: campaignResult[1],
        requestsCount: campaignResult[2],
        approversCount: campaignResult[3],
        managerAddress: campaignResult[4],
        description: campaignResult[5],
        campaignAddress: context.query.address
    }

    return {
        props: {campaign},
    };
}

export default function AddressIndex({campaign}) {

    return (
        <Layout>
            <h3>Campaign :</h3>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>
                        {renderCards(campaign)}
                    </Grid.Column>

                    <Grid.Column width={6}>
                        <ContributeForm campaignAddress={campaign.campaignAddress}/>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <Link href={{pathname: '/campaigns/[address]/requests', query: {address: campaign.campaignAddress}}}>
                            <Button primary>View Requests</Button>
                        </Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Layout>
    );
};
