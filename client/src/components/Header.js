import React from 'react';
import {Link} from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header = () => {
    return (
        <div style={{display: "flex", justifyContent: 'space-between'}}>
            <Link to="/">
                Streamy
            </Link>
            <Link to="/">
                All Streams
            </Link>
            <GoogleAuth />
        </div>
    )
}

export default Header;