import React, { useState, useEffect } from 'react';
import './Popup.css'; 
import img1 from '../assets/images/팝업.png';


function Popup() {
    const [isVisible, setIsVisible] = useState(false);
  
    // 쿠키 설정 함수
    const setCookie = (name, value, days) => {
      const expires = new Date();
      expires.setDate(expires.getDate() + days);
      document.cookie = `${name}=${value}; path=/; expires=${expires.toUTCString()}`;
    };
  
    // 쿠키를 가져오는 함수
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };
  
    // 팝업을 닫고 쿠키를 설정하는 함수
    const closePop = () => {
      if (document.getElementById('chkbox').checked) {
        setCookie('maindiv', 'done', 1);
      }
      setIsVisible(false);
    };
  
    // 페이지 로드 시 쿠키를 검사하여 팝업 표시 여부 결정
    useEffect(() => {
      if (!getCookie('maindiv')) {
        setIsVisible(true);
      }
    }, []);
  
    if (!isVisible) return null;
  
    return (
      <div className="layerpopup" style={{ visibility: 'visible' }}>
        <div className="layerBox">
          <div className="cont">
            <p>
              <img src={img1} alt="popup" />
            </p>
          </div>
          <form name="pop_form">
            <div id="check">
              <input type="checkbox" name="chkbox" value="checkbox" id="chkbox" />
              <label htmlFor="chkbox">오늘 하루동안 보지 않기</label>
            </div>
            <div id="close">
              <button type="button" onClick={closePop}>
                닫기
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  export default Popup;