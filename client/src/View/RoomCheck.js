import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RoomCheck.css'; 
import { useAuth } from '../Component/AuthContext';
import Navbarbar from '../Component/Navbar';

function RoomCheck () {
    const [payments, setPayments] = useState([]);
    const { user } = useAuth(); 

    useEffect(() => {
        const fetchPayments = async () => {
            if (!user || !user.userId) {
                console.error('사용자가 로그인되어 있지 않습니다');
                return;
            }

            try {
                // 사용자별 결제 정보를 가져오는 API 요청
                const response = await axios.get(`http://localhost:8080/payment/user/${user.userId}`);
                setPayments(response.data);
            } catch (error) {
                console.error('결제 정보 가져오는 중 오류 발생:', error);
            }
        };

        fetchPayments();
    }, [user]); // user가 변경될 때마다 호출



    return (
        <div className="mypage_container">
            <Navbarbar />
            <div className="mypage_content">
        <div className="room_check">
            <h2>내 예약 목록</h2>
            {payments.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>객실</th>
                            <th>결제 금액</th>
                            <th>예약 날짜</th>
                            <th>옵션</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(payment => (
                            <tr key={payment.id}>
                                <td data-label="ID">{payment.reservationNumber}</td>
                                <td data-label="상품명">{payment.productName}</td>
                                <td data-label="결제 금액">{payment.paymentPrice.toLocaleString()}원</td>
                                <td data-label="예약 날짜">{payment.reservationDate}</td>
                                <td data-label="옵션">{payment.optionName || '없음'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>예약된 내역이 없습니다.</p>
            )}
        </div>
        </div>
        </div>
    );
}

export default RoomCheck;
