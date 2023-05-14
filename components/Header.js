import React, {Component} from "react";
import {Menu} from "semantic-ui-react";
import Link from 'next/link';
import web3 from "../ethereum/web3";

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            myBalance: 0
        }
    }

    async componentDidMount() {
        let accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
            const userBalance = await web3.eth.getBalance(accounts[0])
            const balanceFormatted = Number(web3.utils.fromWei(userBalance, 'ether')).toFixed(5)

            this.setState({
                myBalance: balanceFormatted
            })
        }

    }

    render() {
        let balanceItem = this.state.myBalance === 0
            ? <Menu.Item>-</Menu.Item>
            : <Menu.Item>Balance: {this.state.myBalance} eth</Menu.Item>;

        return (
            <Menu style={{marginTop: '10px'}}>
                <Link href="/" className="item">
                    TomekeCoin
                </Link>

                <Menu.Menu position="right">
                    {balanceItem}
                </Menu.Menu>
            </Menu>
        )
    }
}

export default Header;
