import React from "react";
import axios from "axios";
import "./Login.css";
import { PiLockKeyFill } from "react-icons/pi";
import { FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault(); // 기본 폼 제출 동작을 막습니다.

        const data = new FormData(event.target);
        const userId = data.get("userId");
        const userPw = data.get("userPw");

        try {
            const response = await axios.post('http://localhost:8080/member/login', {
                userId: userId,
                userPw: userPw
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.data.loginToken) { // loginToken이 존재하면
                localStorage.setItem("ACCESS_TOKEN", response.data.loginToken); // 토큰을 로컬 스토리지에 저장
                navigate("/"); // 로그인 성공 시 홈 화면으로 이동
            }
        } catch (error) {
            if (error.response && error.response.status === 500) {
                alert('아이디 또는 비밀번호가 맞지 않습니다.');
            } else {
                console.error('서버 응답 오류:', error.response?.data || error.message);
            }
        }
    };

    return (
        <div className="Login">
            <h2>로그인</h2>
            <div className="input_box">
                <div>
                    <form noValidate onSubmit={handleLogin}>
                        <label>
                            <FiUser className="Lock_user" />
                            <input type="text" placeholder="아이디" maxLength={20} className="input_wrap" id="userId" name="userId" />
                        </label>
                        <label>
                            <PiLockKeyFill className="Lock_key" />
                            <input type="password" placeholder="비밀번호" maxLength={20} className="input_wrap" id="userPw" name="userPw" />
                        </label>

                        <div className="but_area">
                            <button type="submit" className="Login_but">로그인</button>
                            <button type="button" className="sns_kakao" id="sns">카카오 로그인
                                <img src="./img/kakao-svgrepo-com.svg" className="social" alt="카카오 로그인" />
                            </button>
                        </div>

                        <div className="look_for">
                            <Link to={"/findId"} className="link_wrap"><p>아이디 찾기</p></Link>
                            <p className="stick">|</p>
                            <Link to={"/findpassword"} className="link_wrap"><p>비밀번호 찾기</p></Link>
                            <p className="stick">|</p>
                            <Link to={"/Consent"} className="link_wrap"><p className="new_user">회원가입</p></Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
