import React, {Component} from "react";
import {Table, Button} from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";

class RequestRow extends Component {
    static async getInitialProps(props) {
        const {id, request, address, approversCount} = props.query;


        return {id, request, address, approversCount}
    }

    onApprove = async () => {
        const accounts = await web3.eth.getAccounts();
        await Campaign(this.props.address)
            .methods
            .approveRequest(this.props.id)
            .send({
                from: accounts[0]
            });
    }

    onFinalize = async () => {
        const accounts = await web3.eth.getAccounts();
        await Campaign(this.props.address)
            .methods
            .finalizeRequest(this.props.id)
            .send({
                from: accounts[0]
            });
    }

    render() {
        const {Row, Cell} = Table;
        const {id, request, approversCount} = this.props;
        const value = web3.utils.fromWei(this.props.request.value, 'ether')
        const readyToFinalize = request.approvalCount > (approversCount / 2);

        return (
            <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
                <Cell>{id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{value}</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>{request.approvalCount} / {approversCount}</Cell>
                <Cell>
                    {request.complete ? null : (
                        <Button color="green" basic onClick={this.onApprove}>
                            Approve
                        </Button>
                    )}
                </Cell>
                <Cell>
                    {request.complete ? null : (
                        <Button color="teal" basic onClick={this.onFinalize}>
                            Finalize
                        </Button>
                    )}
                </Cell>
            </Row>
        );
    }
}

export default RequestRow;
