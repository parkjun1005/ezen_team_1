import React, { useState, useEffect } from "react";
import axios from "axios";
import DaumPostcode from 'react-daum-postcode';
import Modal from 'react-modal';
import "./Information.css";

const Information = () => {
    const [userInfo, setUserInfo] = useState({
        phone: "",
        address: "",
        addressDetail: "",
    });
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState(""); // 비밀번호 오류 메시지 상태 추가
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // 비밀번호 유효성 검사 함수
    const validatePassword = (password) => {
        const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@.#$%^&*]).{8,20}$/;
        return regex.test(password);
    };

    // 새 비밀번호 변경 핸들러
    const handleNewPasswordChange = (e) => {
        const password = e.target.value;
        setNewPassword(password);

        if (!validatePassword(password)) {
            setPasswordError("비밀번호는 8~20자리이며, 영문, 숫자, 특수문자를 포함해야 합니다.");
        } else {
            setPasswordError("");
        }
    };

    // 서버에서 사용자 정보를 가져오는 함수
    const fetchUserInfo = async () => {
        try {
            const response = await axios.get("http://localhost:8080/member/info", {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
                }
            });
            setUserInfo(response.data);
        } catch (error) {
            console.error("사용자 정보 로드 오류:", error);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    // 주소 찾기 모달 열기/닫기
    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    // 주소 선택 시 처리
    const handleAddressSelect = (data) => {
        setUserInfo({ ...userInfo, address: data.address });
        closeModal();
    };

    // 사용자 정보 저장 요청 함수
    const handleUserInfoChange = async () => {
        try {
            const response = await axios.post('http://localhost:8080/member/update-info', {
                userId: userInfo.userId,
                userName: userInfo.userName,
                userEmail: userInfo.userEmail,
                userPhone: userInfo.userPhone,
                address: userInfo.address,
                addressDetail: userInfo.addressDetail
            }, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` }
            });

            alert("사용자 정보가 성공적으로 업데이트되었습니다.");
        } catch (error) {
            console.error('사용자 정보 업데이트 오류:', error.response?.data || error.message);
            alert('사용자 정보 업데이트에 실패했습니다.');
        }
    };

    // 비밀번호 변경 요청 함수
    const handlePasswordChange = async () => {
        if (!validatePassword(newPassword)) {
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("새 비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/member/resetpassword", {
                currentPassword,
                newPassword
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
                }
            });

           
        } catch (error) {
            console.error("비밀번호 변경 오류:", error.response?.data || error.message);
            alert("비밀번호 변경에 실패했습니다.");
        }
    };

    return (
        <div className="form-container">
            <div className="information">
                <h2>내 정보</h2>
            </div>
            <div className="form-group">
                <label htmlFor="name">이름</label>
                <input type="text" id="name" className="infor" value={userInfo.userName} placeholder="이름" readOnly />
            </div>
            <div className="form-group">
                <label htmlFor="username">아이디</label>
                <input type="text" id="useId" className="infor" value={userInfo.userId} placeholder="아이디" readOnly />
            </div>
            <div className="form-group">
                <label htmlFor="email">이메일</label>
                <input type="email" id="email" className="infor" value={userInfo.userEmail} placeholder="이메일" readOnly />
            </div>
            <div className="form-group">
                <label htmlFor="phone">휴대전화</label>
                <input
                    type="text"
                    id="phone"
                    className="infor"
                    value={userInfo.userPhone}
                    onChange={(e) => setUserInfo({ ...userInfo, userPhone: e.target.value })}
                    placeholder="휴대전화"
                    maxLength={11}
                />
            </div>
            <div className="form-group">
                <label htmlFor="address">주소</label>
                <input
                    type="text"
                    id="address"
                    className="infor"
                    value={userInfo.address}
                    placeholder="주소"
                    readOnly
                />
                <button className="address_btn" onClick={openModal}>주소찾기</button>
            </div>
            <div className="form-group">
                <label htmlFor="address_detail">상세주소</label>
                <input
                    type="text"
                    id="address_detail"
                    className="infor"
                    value={userInfo.addressDetail}
                    onChange={(e) => setUserInfo({ ...userInfo, addressDetail: e.target.value })}
                    placeholder="상세주소"
                />
            </div>
            <div className="password_area">
                <div className="form-group">
                    <label htmlFor="current_password" className="infor_password">현재 비밀번호</label>
                    <input
                        type="password"
                        id="current_password"
                        className="infor"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="현재 비밀번호"
                        maxLength={20}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="new_password">새 비밀번호</label>
                    <input
                        type="password"
                        id="new_password"
                        className="infor"
                        value={newPassword}
                        onChange={handleNewPasswordChange} // 수정된 핸들러로 변경
                        placeholder="새 비밀번호"
                        maxLength={20}
                    />
                    
                </div>
                <div className="form-group">
                    <label htmlFor="confirm_password" className="infor_password">비밀번호 확인</label>
                    <input
                        type="password"
                        id="confirm_password"
                        className="infor"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="비밀번호 확인"
                        maxLength={20}
                    />
                </div>
                {passwordError && <div className="password-error">{passwordError}</div>}
                <div className="btn_area">
                    <button className="infor_btn" onClick={() => { handleUserInfoChange(); handlePasswordChange(); }}>
                        확인
                    </button>
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="주소 찾기"
                ariaHideApp={false}
                className="modal"
                overlayClassName="overlay"
            >
                <DaumPostcode onComplete={handleAddressSelect} />
                <button className="modal_btn" onClick={closeModal}>X</button>
            </Modal>
        </div>
    );
};

export default Information;
