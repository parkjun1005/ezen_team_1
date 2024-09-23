import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


function Navbar() {
    return (
        <div className="navbar">
            <h3>메뉴</h3>
            <ul>
                <li><Link to="/information">회원정보 수정</Link></li>
                <li><Link to="/Roomcheck">객실 조회</Link></li>
            </ul>
        </div>
    );
}


export default Navbar;
