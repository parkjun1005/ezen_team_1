import React from 'react';
import { useAuth } from './AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/로고.png';
import './Header.css';

function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header_top">
      <div className="top_logo">
        <Link to="/"><img src={logo} alt="logo" /></Link>
      </div>
      <nav className="header_category">
        <div className="gnbBox">
          <ul className="gnb_wrap">
            <li>
            <Link to="/Tour">소개</Link>
              <ul className="subnav">
                <li><Link to="/Tour">관광시설</Link></li>
                <li><Link to="/Map">오시는길</Link></li>
              </ul>
            </li>
            <li><Link to="/Community">공용시설</Link></li>
            <li>
              <a href="#">객실</a>
              <ul className="subnav">
                <li><Link to="/CampingRoom">캠핑장</Link></li>
              </ul>
            </li>
            <li>
              <a href="#">게시판</a>
              <ul className="subnav">
              <li><Link to="/Eventlist">공지사항</Link></li>
                <li><Link to="/Eventlist">이벤트</Link></li>
                <li><Link to="/Reviewlist">소중한 후기</Link></li>
              </ul>
            </li>
            <li><Link to="/Reservation">예약하기</Link></li>
            <div className="info_wrap">
              {isAuthenticated ? (
                <>
                  <li><Link to="/information">마이페이지</Link></li>
                  <div className="line">
                    <li>|</li>
                  </div>
                  <li><a onClick={handleLogout} className="logout_btn">로그아웃</a></li>
                </>
              ) : (
                <>
                  <li><Link to="/Consent">회원가입</Link></li>
                  <div className="line">
                    <li>|</li>
                  </div>
                  <li><Link to="/login">로그인</Link></li>
                </>
              )}
            </div>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;