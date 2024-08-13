import React, { useState, useEffect } from 'react';
import DaumPostcode from 'react-daum-postcode';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import "./MemBership.css";
import axios from 'axios';
import { format } from 'date-fns';

function MemBership() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [zoneCode, setZoneCode] = useState("");
    const [address, setAddress] = useState("");
    const [detailedAddress, setDetailedAddress] = useState("");
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [userIdError, setUserIdError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [userNameError, setUserNameError] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const navigate = useNavigate();  // useNavigate hook 사용

    const SERVER_BASE_URL = 'http://localhost:8080';

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleAddressSelect = (data) => {
        setZoneCode(data.zonecode);
        setAddress(data.address);
        closeModal();
    };

    const validateUserId = (userId) => {
        const regex = /^[a-z0-9]{4,20}$/;
        return regex.test(userId);
    };

    const handleUserIdChange = (e) => {
        const newUserId = e.target.value;
        setUserId(newUserId);

        if (!validateUserId(newUserId)) {
            setUserIdError("아이디는 최소 4글자에서 최대 20글자여야 합니다.");
        } else {
            setUserIdError("");
        }
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@.#$%^&*]).{8,20}$/;
        return regex.test(password);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        if (!validatePassword(newPassword)) {
            setPasswordError("형식에 맞지 않습니다. 8~20자리 영문, 숫자, 특수문자 조합이어야 합니다.");
        } else {
            setPasswordError("");
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);

        if (newConfirmPassword !== password) {
            setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
        } else {
            setConfirmPasswordError("");
        }
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        if (!validateEmail(newEmail)) {
            setEmailError("이메일 형식이 맞지 않습니다.");
        } else {
            setEmailError("");
        }
    };

    const validateUserName = (userName) => {
        const regex = /^[가-힣]{2,10}$/;
        return regex.test(userName);
    };

    const handleUserNameChange = (e) => {
        const newUserName = e.target.value;
        setUserName(newUserName);

        if (!validateUserName(newUserName)) {
            setUserNameError("이름은 한글이어야 합니다.");
        } else {
            setUserNameError("");
        }
    };

    const handleUserPhoneChange = (e) => {
        const newUserPhone = e.target.value;
        setUserPhone(newUserPhone);

        // 전화번호 유효성 검사 추가 가능
    };

    useEffect(() => {
        const isFormValid = !userIdError && !passwordError && !confirmPasswordError && !emailError && !userNameError &&
            userId && password && confirmPassword && email && userName && address && zoneCode && detailedAddress;
        setIsFormValid(isFormValid);
    }, [userIdError, passwordError, confirmPasswordError, emailError, userNameError, userId, password, confirmPassword, email, userName, address, zoneCode, detailedAddress]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const now = new Date();
        const data = new FormData(event.target);
        const enrollDate = now.getFullYear() + '-' +
                           String(now.getMonth() + 1).padStart(2, '0') + '-' +
                           String(now.getDate()).padStart(2, '0') + 'T' +
                           String(now.getHours()).padStart(2, '0') + ':' +
                           String(now.getMinutes()).padStart(2, '0') + ':' +
                           String(now.getSeconds()).padStart(2, '0');
        
        const userDTO = {
            userId: data.get("userId"),
            userPw: data.get("userPw"),
            userName: data.get("userName"),
            userEmail: data.get("userEmail"),
            userPhone: data.get("userPhone"),
            address: data.get("address"),
            addressDetail: data.get("addressDetail"),
            zoneCode: parseInt(data.get("zoneCode")),
            socialLogin: null,
            enrollDate: enrollDate
        };
        
    
        try {
            const response = await axios.post(`${SERVER_BASE_URL}/member/register`, userDTO, {
                headers: { 'Content-Type': 'application/json' }
            });
    
            if (response.status === 200) {
                alert('회원가입이 완료되었습니다.');
                navigate('/login');
            } else {
                throw new Error('회원가입에 실패했습니다.');
            }
        } catch (error) {
            console.error('서버 응답 오류:', error.response?.data || error.message);
        }
    };

    return (
        <div>
            <div className="membership">
                <div className="member_title">
                    <h2>회원 정보 입력</h2>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="member_info">
                            <div className="member_input">
                                <label>
                                    <p className="membership_wrap duplication_btn">
                                        <input type="text" title="아이디" placeholder="아이디" maxLength={20} id="userId" name='userId' className="member_item" value={userId} onChange={handleUserIdChange} />
                                        <button className="duplication">중복확인</button>
                                    </p>
                                </label>
                                {userIdError && <div className="member_msg error">{userIdError}</div>}
                                <div className="member_msg">4~20자리 영문 소문자, 숫자 조합만 가능합니다</div>
                            </div>
                            <div className="member_input">
                                <p className="membership_wrap">
                                    <input type="password" title="비밀번호" placeholder="비밀번호" maxLength={20} id="userPw" name='userPw' className="member_item" value={password} onChange={handlePasswordChange} />
                                </p>
                                {passwordError && <div className="member_msg error">{passwordError}</div>}
                                <div className="member_msg">8~20자리 영문, 숫자, 특수문자 조합</div>
                            </div>
                            <div className="member_input">
                                <p className="membership_wrap">
                                    <input type="password" title="비밀번호 확인" placeholder="비밀번호 확인" maxLength={20} id="comparePassword" className="member_item" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                                </p>
                                {confirmPasswordError && <div className="member_msg error">{confirmPasswordError}</div>}
                            </div>
                            <div className="member_input">
                                <p className="membership_wrap">
                                    <input type="text" title="이름" placeholder="이름" maxLength={10} id="userName" className="member_item" name='userName' value={userName} onChange={handleUserNameChange} />
                                </p>
                                {userNameError && <div className="member_msg error">{userNameError}</div>}
                            </div>
                            <div className="member_input">
                                <p className="membership_wrap">
                                    <input type="tel" title="전화번호" placeholder="숫자만 입력해주세요(-제외)" maxLength={11} id="userPhone" name='userPhone' className="member_item" value={userPhone} onChange={handleUserPhoneChange} />
                                </p>
                            </div>
                            <div className="member_input">
                                <p className="membership_wrap">
                                    <input type="email" title="이메일" placeholder="이메일 (예: blue@blue fields.com)" maxLength={40} id="userEmail" name='userEmail' className="member_item" value={email} onChange={handleEmailChange} />
                                </p>
                                {emailError && <div className="member_msg error">{emailError}</div>}
                            </div>
                        </div>
                        <div className="member_address">
                            <p>주소</p>
                            <div className="member_input">
                                <p className="membership_wrap zone_btn">
                                    <input type="text" title="우편번호" placeholder="우편번호" id="zoneCode" className="member_item" name='zoneCode' value={zoneCode} readOnly />
                                    <button className="zonecode_btn" type="button" onClick={openModal}>주소찾기</button>
                                </p>
                            </div>
                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={closeModal}
                                contentLabel="주소 찾기"
                                ariaHideApp={false}
                                className="modal"
                                overlayClassName="overlay"
                                bodyOpenClassName="modal-open"
                            >
                                <DaumPostcode onComplete={handleAddressSelect} />
                                <button className="modal_btn" onClick={closeModal}>X</button>
                            </Modal>
                            <div className="member_input">
                                <p className="membership_wrap">
                                    <input type="text" title="주소" placeholder="도로명, 건물명" id="address" className="member_item" name='address' value={address} readOnly />
                                </p>
                            </div>
                            <div className="member_input">
                                <p className="membership_wrap">
                                    <input type="text" title="상세주소" placeholder="상세주소" id="addressDetail" className="member_item" name='addressDetail' value={detailedAddress} onChange={(e) => setDetailedAddress(e.target.value)} />
                                </p>
                            </div>
                        </div>
                        <div className="membership_area">
                            <button className="membership_btn" disabled={!isFormValid}>회원가입</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default MemBership;
