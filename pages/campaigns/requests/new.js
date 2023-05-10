import React, {Component} from "react";
import Layout from "../../../components/Layout";
import {Form, Button, Message, Input} from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import {Link, Router} from '../../../routes';

class RequestNew extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: '',
            description: '',
            recipient: '',
            loading: false,
            errorMessage: ''
        }
    }

    static async getInitialProps(props) {
        const address = props.query.address;

        return {address};
    }

    onSubmit = async (event) => {
        event.preventDefault();
        const {description, value, recipient} = this.state;

        this.setState({loading: true, errorMessage: ''});
        try {
            const accounts = await web3.eth.getAccounts();
            await Campaign(this.props.address)
                .methods
                .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
                .send({
                    from: accounts[0]
                });
            Router.pushRoute('requestsCampaign', {address: this.props.address});
        } catch (err) {
            this.setState({errorMessage: err.message})
        }
        this.setState({loading: false})
    }

    render() {
        return (
            <Layout>
                <Link route="requestsCampaign" params={{address: this.props.address}}>
                    <a>Back</a>
                </Link>

                <h3>Create a Request</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Description</label>
                        <Input value={this.state.description} onChange={event => this.setState({description: event.target.value})}/>
                    </Form.Field>

                    <Form.Field>
                        <label>Value (ether)</label>
                        <Input value={this.state.value} onChange={event => this.setState({value: event.target.value})}/>
                    </Form.Field>

                    <Form.Field>
                        <label>Recipient address</label>
                        <Input value={this.state.recipient} onChange={event => this.setState({recipient: event.target.value})}/>
                    </Form.Field>

                    <Message error header="Oops!" content={this.state.errorMessage}/>
                    <Button loading={this.state.loading} type="submit" primary>Create!</Button>
                </Form>
            </Layout>
        )
    }
}

export default RequestNew;
