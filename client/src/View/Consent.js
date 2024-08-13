import "./Consent.css";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Consent =() => {
    const [checkBox, setCheckBox] = useState([]);
    const [activate, setActivate] = useState(["button"]);

    const navigate = useNavigate();

    const checkAll = (e) => {
        if (checkBox.length === 4) {
            setActivate("button");
        } else {
            setActivate("activate");
        }
        e.target.checked ? setCheckBox(["check1","check2","check3","check4"]) : setCheckBox([]);
    };

    const handleClick = (e) => {
        e.target.checked 
        ? setCheckBox ([...checkBox,e.target.name])
        : setCheckBox(checkBox.filter((el) => el !== e.target.name));
    };

    useEffect(() => {
        if (checkBox.includes("check1") && checkBox.includes("check2") && checkBox.includes("check3")) {
            setActivate(true);
        } else {
            setActivate(false)
        }
    },[checkBox]);

    const handleNext = (e) => {
        e.preventDefault();
        if (activate) {
          navigate('/register');
        }
      };

    return(
        <div>
        <div className="consent">
            <div className="consent_title">
                <h1>실례지만,<br />약관 동의가 필요합니다.</h1>
            </div>
            <div className="all_consent">
                <label>
                <input type="checkbox" className="full_consent"
                 checked={checkBox.length === 4 ? true : false} onChange={checkAll}/>
                <p>약관 전체동의 <span>선택항목 포함</span></p>
                </label>
            </div>
            <div className="consent_item">
            <label><input type="checkbox"
            name="check1"
            checked={checkBox.includes('check1') ? true : false}
            onChange={handleClick}/>
            <p>(필수) 이용약관</p></label>
            <button className="next">></button>
            </div>
            <div className="consent_item">
            <label><input type="checkbox"
            name="check2"
            checked={checkBox.includes('check2') ? true : false}
            onChange={handleClick}/>
            <p>(필수) 만 14세 이상 확인</p></label>
            <button className="next">></button>
            </div>
            <div className="consent_item">
            <label><input type="checkbox"
            name="check3"
            checked={checkBox.includes('check3') ? true : false}
            onChange={handleClick}/>
            <p>(필수) 개인정보 수집 및 이용 동의</p></label>
            <button className="next">></button>
            </div>
            <div className="consent_item">
            <label><input type="checkbox"
            name="check4"
            checked={checkBox.includes('check4') ? true : false}
            onChange={handleClick}/>
            <p>(선택) 개인정보 수집 및 이용 동의</p></label>
            
            <button className="next">></button>
            </div>
            <div className="consent_but">
                <button type="submit" className="next_but"
                disabled={!activate}
                onClick={handleNext}>다음</button>
            </div>
        </div>
        </div>
    )
}

export default Consent;