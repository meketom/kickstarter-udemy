import React, {Component} from "react";
import {Menu} from "semantic-ui-react";
import Link from 'next/link';
import web3 from "../ethereum/web3";

// const Header = (props) => {
//     return (
//         <Menu style={{marginTop: '10px'}}>
//             <Link href="/" className="item">
//                 TomekeCoin
//             </Link>
//
//             <Menu.Menu position="right">
//                 <Link href="/" className="item">
//                     Campaign
//                 </Link>
//                 <p>
//                     {{web3.eth}}
//                 </p>
//             </Menu.Menu>
//         </Menu>
//     );
//
// };

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            myBalance: 0
        }
    }

    async componentDidMount() {
        const accounts = await web3.eth.getAccounts()
        const userBalance = await web3.eth.getBalance(accounts[0])
        const balanceFormatted = Number(web3.utils.fromWei(userBalance, 'ether')).toFixed(5)

        this.setState({
            myBalance: balanceFormatted
        })
    }

    render() {
        return (
            <Menu style={{marginTop: '10px'}}>
                <Link href="/" className="item">
                    TomekeCoin
                </Link>

                <Menu.Menu position="right">
                    <Menu.Item>
                        Balance: {this.state.myBalance} eth
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}

export default Header;
