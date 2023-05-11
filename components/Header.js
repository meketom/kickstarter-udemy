import React from "react";
import {Menu} from "semantic-ui-react";
import Link from 'next/link';

const Header = (props) => {
    return (
        <Menu style={{marginTop: '10px'}}>
            <Link href="/" className="item">
                TomekeCoin
            </Link>

            <Menu.Menu position="right">
                <Link href="/" className="item">
                    Campaign
                </Link>
                <Link href="/campaigns/new" className="item">
                    +
                </Link>
            </Menu.Menu>
        </Menu>
    );

};

export default Header;
