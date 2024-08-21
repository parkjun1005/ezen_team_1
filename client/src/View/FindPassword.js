import React, { useState } from "react";
import axios from "axios";
import "./FindPassword.css";
import { useNavigate } from "react-router-dom";

const FindPassword = () => {
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState("");
    const navigate = useNavigate();

    const handleFindPassword = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/member/findpassword', {
                userEmail: email,
                userId: userId
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            // 임시 비밀번호를 알림창으로 보여줌
            alert(`임시 비밀번호: ${response.data}`);
            navigate("/resetpassword");
        } catch (error) {
            console.error('비밀번호 찾기 오류:', error.response?.data || error.message);
            alert('비밀번호 찾기에 실패했습니다.');
        }
    };

    return (
        <div>
            <div className="Find_password">
                <h2>비밀번호 찾기</h2>
                <div className="Find_password_area">
                    <input
                        type="text"
                        placeholder="이메일"
                        maxLength={30}
                        className="find_password_email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="아이디"
                        maxLength={20}
                        className="find_id"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                </div>
                <div className="but_area">
                    <button type="submit" className="password_but" onClick={handleFindPassword}>
                        비밀번호 찾기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FindPassword;
