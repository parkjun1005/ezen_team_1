import React, { useState } from "react";
import axios from "axios";
import "./FindId.css";

const FindId = () => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [userId, setUserId] = useState("");
    const [error, setError] = useState("");

    const handleFindId = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/member/findid', {
                userEmail: email,
                userPhone: phone
            });

            if (response.data.userId) {
                setUserId(response.data.userId);
                setError("");
            } else {
                setError("아이디를 찾을 수 없습니다.");
                setUserId("");
            }
        } catch (error) {
            setError("아이디 찾기 중 오류가 발생했습니다.");
            setUserId("");
            console.error('서버 응답 오류:', error.response?.data || error.message);
        }
    };

    return (
        <div>
            <div className="Find_id">
                <h2>아이디 찾기</h2>
                <form onSubmit={handleFindId}>
                    <div className="Find_id_area">
                        <input 
                            type="text" 
                            placeholder="이메일" 
                            maxLength={30} 
                            className="find_email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder="휴대폰 번호 (-제외)" 
                            maxLength={11} 
                            className="find_phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="but_area">
                        <button type="submit" className="Find_but">아이디 찾기</button>
                    </div>
                </form>
                {userId && <p className="result">당신의 아이디는: {userId}</p>}
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
};

export default FindId;
