import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ResetPassword.css";

const ResetPassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@.#$%^&*]).{8,20}$/;
        return regex.test(password);
    };

    const handleNewPasswordChange = (e) => {
        const password = e.target.value;
        setNewPassword(password);

        if (!validatePassword(password)) {
            setPasswordError("비밀번호는 8~20자리이며, 영문, 숫자, 특수문자를 포함해야 합니다.");
        } else {
            setPasswordError("");
        }
    };

    const handleResetPassword = async (event) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            alert("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
            return;
        }

        if (passwordError) {
            alert("유효한 새 비밀번호를 입력하세요.");
            return;
        }

        const token = localStorage.getItem("ACCESS_TOKEN"); // 로컬 스토리지에서 토큰 가져오기

        if (!token) {
            alert("로그인이 필요합니다.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/member/resetpassword', {
                currentPassword: currentPassword,
                newPassword: newPassword
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // 토큰을 Authorization 헤더에 추가
                }
            });
            navigate("/login");
            alert('비밀번호가 성공적으로 변경되었습니다.');
        } catch (error) {
            console.error('서버 응답 오류:', error.response?.data || error.message);
            alert('비밀번호 변경에 실패했습니다.');
        }
    };

    return (
        <div>
            <div className="Reset_password">
                <h2>비밀번호 변경</h2>
                <div className="Reset_password_area">
                    <input
                        type="password"
                        placeholder="현재 비밀번호"
                        maxLength={8}
                        className="reset_password_current"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="새 비밀번호"
                        maxLength={20}
                        className="reset_password_new"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                    />
                    <input
                        type="password"
                        placeholder="새 비밀번호 확인"
                        maxLength={20}
                        className="reset_password_confirm"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                     {passwordError && <div className="error_message">{passwordError}</div>}
                    <div className="reset_password_msg">8~20자리 영문, 숫자, 특수문자 조합</div>
                </div>
                <div className="but_area">
                    <button type="submit" className="reset_password_but" onClick={handleResetPassword}>
                        비밀번호 변경
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;









