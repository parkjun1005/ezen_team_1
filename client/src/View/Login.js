import "./Login.css";
import { PiLockKeyFill } from "react-icons/pi";
import { FiUser } from "react-icons/fi";
import { Form, Link } from "react-router-dom"


const  Login = () => {

const SERVER_BASE_URL = 'http://localhost:8080'

    const handleLogin = async (username, password) => {
        try {
            const loginResponse = await fetch(`${SERVER_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (loginResponse.ok) {
                const responseBody = await loginResponse.json();
                localStorage.setItem('jwtToken', responseBody.token); // JWT 토큰을 로컬 스토리지에 저장
                alert('로그인 성공!');
              
            } else {
                throw new Error('로그인에 실패했습니다.');
            }
        } catch (error) {
            console.error('로그인 중 오류 발생:', error);
            alert('로그인 중 오류가 발생했습니다.');
        }
    };


    return (
        <div className="Login">
        <h2>로그인</h2>
        <div className="input_box">
        <div>
        <form noValidate onSubmit={handleLogin}>
        <label>
        <FiUser className="Lock_user"/>
        <input type="text" placeholder="아이디" maxLength={20} className="input_wrap" id="userId" name="userId"/></label>
        <label><PiLockKeyFill  className="Lock_key"/>
        <input type="password"placeholder="비밀번호" maxLength={20} className="input_wrap" id="userPw" name="userPw"/></label>
       
        <div className="but_area">
                    <button type="submit" className="Login_but">로그인</button>
                    <button type="submit" className="sns_kakao" id="sns">카카오 로그인
                        <img src="./img/kakao-svgrepo-com.svg" className="social"/>
                    </button>
                </div>
                
                <div className="look_for">
                <Link to={"/findId"} className="link_wrap"><p>아이디 찾기</p></Link>
                    <p className="stick">|</p>
                   <Link to={"/findPassword"} className="link_wrap"><p>비밀번호 찾기</p></Link>
                    <p className="stick">|</p>
                    <Link to={"/Consent"} className="link_wrap"><p className="new_user">회원가입</p></Link>
                </div>
                </form>
                </div>
        </div>
        </div>
    )
}

export default Login;