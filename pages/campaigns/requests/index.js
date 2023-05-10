import React, {Component} from "react";
import Layout from "../../../components/Layout";
import {Button, Table} from "semantic-ui-react";
import {Link} from '../../../routes';
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";

class RequestIndex extends Component {

    static async getInitialProps(props) {
        const {address} = props.query;
        const campaign = Campaign(address);
        // we cannot fetch all requests from array of structs. This is a little tricky...
        const requestsCount = await campaign.methods.getRequestsCount().call();
        const requests = await Promise.all(
            Array(parseInt(requestsCount))
                .fill()
                .map((element, index) => {
                    return campaign.methods.requests(index).call();
                })
        );

        const approversCount = await campaign.methods.approversCount().call();

        return {address, requests, requestsCount, approversCount}
    }

    renderRows() {
        return this.props.requests.map((request, index) => {
            return <RequestRow
                key={index}
                id={index}
                request={request}
                address={this.props.address}
                approversCount={this.props.approversCount}
            />
        });
    }

    render() {
        const {Header, Row, HeaderCell, Body} = Table;

        return (
            <Layout>
                <Link route='addRequestsCampaign' params={{address: this.props.address}}>
                    <a>
                        <Button primary floated="right" style={{marginBottom: 10}}>Add Request</Button>
                    </a>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>Id</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount (eth)</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRows()}
                    </Body>
                </Table>
                <div>Found {this.props.requestsCount} requests.</div>
            </Layout>
        );
    }
}

export default RequestIndex;
