import React, {Component} from "react";
import {Button, Form, Input, Message} from 'semantic-ui-react';
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import {Router} from "../routes";

class ContributeForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            contribution: '',
            loading: false,
            errorMessage: ''
        }
    }

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({loading: true, errorMessage: ''});
        try {
            const accounts = await web3.eth.getAccounts();
            await Campaign(this.props.campaignAddress)
                .methods
                .contribute()
                .send({
                    from: accounts[0],
                    value: web3.utils.toWei(this.state.contribution, 'ether')
                });
            Router.replaceRoute('detailsCampaign', {address: this.props.campaignAddress})
        } catch (err) {
            this.setState({errorMessage: err.message});
        }
        this.setState({loading: false});
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input
                        label="ether"
                        labelPosition="right"
                        onChange={event => this.setState({contribution: event.target.value})}
                        value={this.state.contribution}
                    />
                </Form.Field>
                <Message error header="Oops!" content={this.state.errorMessage}/>
                <Button type="submit" primary loading={!!this.state.loading}>
                    Contribute!
                </Button>
            </Form>
        );
    }
}

export default ContributeForm;
