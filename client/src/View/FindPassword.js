import "./FindPassword.css";

const FindPassword = () => {
    return (
        <div>
        <div className="Find_password">
            <h2>비밀번호 찾기</h2>
            <div className="Find_password_area">
            <input type="text" placeholder="이메일" maxLength={30} className="find_password_email"/>
            <input type="text" placeholder="아이디" maxLength={20} className="find_id" />
        </div>
        <div className="but_area">
            <button type="submit" className="password_but">비밀번호 찾기</button>
        </div>
        </div>
        </div>
    )
}

export default FindPassword;