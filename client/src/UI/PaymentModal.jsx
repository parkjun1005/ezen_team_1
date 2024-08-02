import React, { useState } from 'react';
import Modal from 'react-modal';
import * as PortOne from '@portone/browser-sdk/v2';
import { v4 as uuidv4 } from 'uuid';
import MultiPayment from '../Component/MultiPayment';
Modal.setAppElement('#root');

const PaymentModal = ({ isOpen, onRequestClose, productDetails, productName, startDate, endDate, selectedOptions, peopleCount, totalPrice }) => {
  const { REACT_APP_PortOne_StoreId } = process.env;
  const { REACT_APP_PortOne_ChannelKey, REACT_APP_PortOne_Kakao_ChannelKey } = process.env;

  console.log('PaymentModal rendered');

  const paymentMethods = [
    { paymentType: '카드 결제', channelKey: REACT_APP_PortOne_ChannelKey, payMethod: 'CARD', paymentName: '카드 결제' },
    { paymentType: '실시간 계좌이체', channelKey: REACT_APP_PortOne_ChannelKey, payMethod: 'TRANSFER', paymentName: '실시간 계좌이체' },
    { paymentType: '모바일 결제', channelKey: REACT_APP_PortOne_ChannelKey, payMethod: 'MOBILE', paymentName: '모바일 결제' },
    { paymentType: '카카오 페이', channelKey: REACT_APP_PortOne_Kakao_ChannelKey, payMethod: 'EASY_PAY', paymentName: '카카오 페이' },
  ];

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethods[0]);
  const [radioSelected, setRadioSelected] = useState(false);
  const [paymentPerson, setPaymentPerson] = useState({ name: '', phone: '', email: '' });
  const [checkboxes, setCheckboxes] = useState({ checkbox1: false, checkbox2: false, allChecked: false });

  const handleRadioChange = (paymentData) => {
    console.log('Payment method selected:', paymentData);
    setSelectedPaymentMethod(paymentData);
    setRadioSelected(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log('Input changed:', { name, value });
    if (!name || value === undefined || value === null) {
      console.error('Invalid input name or value');
      return;
    }
    setPaymentPerson((prev) => ({ ...prev, [name]: value.trim() }));
  };

  const handleCheckboxChange = (name, isChecked) => {
    console.log('Checkbox changed:', { name, isChecked });
    setCheckboxes((prev) => {
      const updatedCheckboxes = { ...prev, [name]: isChecked };
      if (name === 'allChecked') {
        updatedCheckboxes.checkbox1 = isChecked;
        updatedCheckboxes.checkbox2 = isChecked;
      } else {
        updatedCheckboxes.allChecked = updatedCheckboxes.checkbox1 && updatedCheckboxes.checkbox2;
      }
      return updatedCheckboxes;
    });
  };

  const SERVER_BASE_URL = 'http://localhost:8080'; // 서버의 URL을 여기에 명시

  async function requestPayment() {
    const paymentId = `payment-${uuidv4()}`;
    const { paymentType, channelKey, payMethod, paymentName } = selectedPaymentMethod;
    const date = new Date();
    const createOrderNumber =
      String(productDetails.productId) +
      String(date.getFullYear()) +
      String(date.getMonth() + 1).padStart(2, "0") +
      String(date.getDate()).padStart(2, "0") +
      String(date.getHours()).padStart(2, "0") +
      String(date.getMinutes()).padStart(2, "0") +
      String(date.getSeconds()).padStart(2, "0") +
      "-" +
      String(productDetails.productId);
    const reservationDate = `${startDate.toLocaleString()}-${endDate.toLocaleString()}`;
    let payResponse;
    try {
      if (paymentType === '카카오 페이') {
        payResponse = await PortOne.requestPayment({
          storeId: REACT_APP_PortOne_StoreId,
          channelKey: channelKey,
          paymentId: paymentId,
          orderName: productName,
          currency: 'CURRENCY_KRW',
          payMethod: payMethod,
          productType: 'PRODUCT_TYPE_REAL',
          totalAmount: 4,
          easyPay: { easyPayProvider: 'KAKAOPAY' },
        });
      } else {
        payResponse = await PortOne.requestPayment({
          storeId: REACT_APP_PortOne_StoreId,
          channelKey: channelKey,
          paymentId: paymentId,
          orderName: productName,
          currency: 'CURRENCY_KRW',
          payMethod: payMethod,
          productType: 'PRODUCT_TYPE_REAL',
          totalAmount: 1000,
        });
      }

      console.log('Payment response:', payResponse);

      if (payResponse.code != null) {
        alert(payResponse.message);
        return;
      }


      const notified = await fetch(`${SERVER_BASE_URL}/payment/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',  // 추가된 부분
        body: JSON.stringify({
          paymentId,
          productId: productDetails.productId,
          userId: 'testuser001',
          reservationNumber: createOrderNumber,
          reservationDate: reservationDate,
          productName,
          orderName: paymentPerson.name,
          orderPhone: paymentPerson.phone,
          userEmail: paymentPerson.email,
          paymentPrice: totalPrice,
          productPrice: totalPrice,
          optionName: 'd',
          optionCount: 4,
          optionPrice: 4222,
          orderDate: new Date().toISOString(),
        }),
      });

      console.log('Fetch response:', notified);

      if (notified.ok) {
        alert('결제가 완료되었습니다.');
      } else {
        alert('결제 완료 요청에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error during payment request:', error);
      alert('결제 요청 중 오류가 발생했습니다.');
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', paymentPerson, checkboxes, selectedPaymentMethod);

    if (!paymentPerson.name || !paymentPerson.phone || !paymentPerson.email) {
      alert('배송정보를 입력해주세요.');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(paymentPerson.email)) {
      alert('올바른 이메일 주소를 입력해주세요.');
      return;
    }

    const allChecked = checkboxes.checkbox1 && checkboxes.checkbox2;
    if (!allChecked) {
      alert('약관에 동의해주세요');
      return false;
    }

    if (!radioSelected) {
      alert('결제 방법을 선택해주세요.');
      return;
    }

    requestPayment(); // 결제 처리 함수 호출
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Payment Modal"
      className="pm-modal"
      overlayClassName="pm-overlay"
    >
      <div className="pm-body">
        <form className="pm-payment-choice-part" onSubmit={handleSubmit}>
          <h2>푸른들 Camping</h2>
          <div className="pm-agreebox-1">
            <p>이용약관</p>
            <label>
              <input
                type="checkbox"
                checked={checkboxes.allChecked}
                onChange={(e) => handleCheckboxChange('allChecked', e.target.checked)}
              />
              전체동의
            </label>
          </div>
          <h4>전자금융거래 이용약관</h4>
          <div className="pm-agreebox-2">
            <p>개인정보 수집 및 이용안내</p>
            <label>
              <input type="checkbox" id="checkbox1" name="checkbox1" onChange={(e) => handleCheckboxChange('checkbox1', e.target.checked)} checked={checkboxes.checkbox1} required />
              <span>동의</span>
            </label>
            <p>개인정보 제공 및 위탁안내</p>
            <label>
              <input type="checkbox" id="checkbox2" name="checkbox2" onChange={(e) => handleCheckboxChange('checkbox2', e.target.checked)} checked={checkboxes.checkbox2} required />
              <span>동의</span>
            </label>
          </div>
          <div className="pm-reservation-person-info">
            <ul>
              <li>
                <span>예약자명:</span>
                <input
                  type="text"
                  name="name"
                  placeholder="성함을 입력해주세요"
                  value={paymentPerson.name || ''}
                  onChange={handleInputChange}
                  required
                />
              </li>
              <li>
                <span>예약자 번호:</span>
                <input
                  type="tel"
                  name="phone"
                  placeholder="숫자만 입력해주세요"
                  value={paymentPerson.phone || ''}
                  onChange={handleInputChange}
                  required
                />
              </li>
              <li>
                <span>예약자 이메일:</span>
                <input
                  type="email"
                  name="email"
                  placeholder="이메일을 입력해주세요"
                  value={paymentPerson.email || ''}
                  onChange={handleInputChange}
                  required
                />
              </li>
            </ul>
          </div>
          <div className="pm-payment-choice">
            {paymentMethods.map((paymentData, index) => (
              <MultiPayment
                key={`payment-${index}`}
                paymentData={paymentData}
                setSelectedPaymentMethod={setSelectedPaymentMethod}
                index={index}
                onChange={handleRadioChange}
              />
            ))}
          </div>
        </form>
        <div className="pm-price-description-part">
          <h3>푸른들 Camping</h3>
          <p>
            상품명 :<span>{productName}</span>
          </p>
          <p>
            예약일자 :<span className="pm-span-text">{startDate ? startDate.toLocaleDateString() : '날짜를 선택해주세요'} ~ {endDate ? endDate.toLocaleDateString() : '날짜를 선택해주세요'}</span>
          </p>
          <div className="pm-option-box">
            {Object.keys(selectedOptions).map((optionName) => (
              <div key={optionName} className="pm-option-choice">
                <p>
                  {optionName} <span className="pm-span-text">{selectedOptions[optionName].count}개 x {selectedOptions[optionName].price.toLocaleString()}원</span>
                </p>
              </div>
            ))}
          </div>
          <p className="pm-total-price">
            총 결제금액 :<span>{totalPrice.toLocaleString()}원</span>
          </p>
          <button className="pm-next" onClick={handleSubmit}>
            다음
          </button>
          <button className="pm-delete" onClick={onRequestClose}>
            x
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PaymentModal;
