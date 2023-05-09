import React from "react";
import {Menu} from "semantic-ui-react";
import {Link} from "../routes";

const Header = (props) => {
    return (
        <Menu style={{marginTop: '10px'}}>
            <Link route="home">
                <a className="item">TomekeCoin</a>
            </Link>

            <Menu.Menu position="right">
                <Link route="home">
                    <a className="item">Campaign</a>
                </Link>
                <Link route="newCampaign">
                    <a className="item">+</a>
                </Link>
            </Menu.Menu>
        </Menu>
    );

};

export default Header;
