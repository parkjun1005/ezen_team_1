import React from 'react';
import './Footer.css'; 
import logo from '../assets/images/로고.png';

function Footer() {
  return (
    <footer>
      <div className="footer">
      <img src={logo} alt="logo" />
        <div className="footer_info">
          <div className="tel">
            <p>
              TEL. 032-719-4074
              <br />
              BANK. 농협 123-4567-8910-11 (예금주: 김이젠)
            </p>
          </div>
          <div className="address">
            <p>
              주소: 인천 남동구 인주대로 593 엔타스 빌딩 12층 (구월동 1128-3)
              <br />
              업체명: 푸른들 글램핑 | 대표자: 김이젠 | 사업자번호: 123-45-67890
            </p>
          </div>
          <div className="manager">
            <p>
              관리자로그인 | 개인정보취급방지 | 예약문의
              <br />
              Designed by Ezen
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;