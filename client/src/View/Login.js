import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";
import { PiLockKeyFill } from "react-icons/pi";
import { FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Component/AuthContext"; 
import logo from "../assets/images/로고2.png"

function Login() {
    const navigate = useNavigate();
    const { login, logout } = useAuth();  
    const [sessionTimeout, setSessionTimeout] = useState(null);

    const handleLogin = async (event) => {
        event.preventDefault();
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
            if (response.data.loginToken) {
                login({ userId }, response.data.loginToken);
                navigate("/");
                const timer = setTimeout(() => {
                    alert("세션이 만료되었습니다. 다시 로그인해주세요.");
                    logout();
                    navigate("/login");
                }, 30 * 60 * 1000);
                setSessionTimeout(timer); 
            }
        } catch (error) {
            console.error('서버 응답 오류:', error.response?.data || error.message);
            alert('아이디나 비밀번호가 맞지 않습니다.');
        }
    };

    useEffect(() => {
        return () => {
            if (sessionTimeout) {
                clearTimeout(sessionTimeout);
            }
        };
    }, [sessionTimeout]);


    return (
        <div className="Login">
            <div className="login_logo"><p><img src={logo} alt="logo" /></p></div>
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
