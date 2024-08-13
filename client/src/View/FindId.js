import "./FindId.css";

const FindId =() => {
    return(
        <div>
        <div className="Find_id">
        <h2>아이디 찾기</h2>
        <div className="Find_id_area">
            <input type="text" placeholder="이메일" maxLength={30} className="find_email"/>
            <input type="text" placeholder="휴대폰 번호 (-제외)" maxLength={11} className="find_phone" />
        </div>
        <div className="but_area">
            <button type="submit" className="Find_but">아이디 찾기</button>
        </div>
        </div>
        </div>
    )
}

export default FindId;