import React, { useEffect } from 'react';
import Slider from './Slider';
import Popup from './Popup';
import './Contents.css';
// import img1 from '../assets/images/메인4.jpg';
// import img2 from '../assets/images/메인이미지5.jpg';
// import img3 from '../assets/images/메인2.jpg';
// import img4 from '../assets/images/메인3.jpg';
// import img5 from '../assets/images/메인1.jpg';
// import img6 from '../assets/images/메인5.jpg';
// import img7 from '../assets/images/카라반.png';
// import img8 from '../assets/images/객실1.jpg';
// import img9 from '../assets/images/바베큐장.jpg';
import img10 from '../assets/images/바베큐.jpg';
// import img11 from '../assets/images/화장실.jpg';
import img12 from '../assets/images/매점.jpg';
// import img13 from '../assets/images/불멍.jpg';
import img14 from '../assets/images/공용수영장.jpg';
import Subslide from './Subslide';


function Contents() {
      
      return ( <>
      <Popup/>
            <Slider/>
        <Caravan/>
        <Subslide />
        <OnlyForYou/>
        <Facility/>
              </>
      );
    }

       function Caravan() {
  return (
    <section>
      <div className="caravan">
        <img src="./images/카라반.png" className="caravan" alt="caravan" />
        <p>아름다운 자연 속에 위치한 푸른들 글램핑 앤 카라반<br />여유를 즐기며 소중한 시간 보내세요!</p>
      </div>
    </section>
  );
}

function Slick() {
    return (
     <Subslide/>
    );
  }

  function OnlyForYou() {
    return (
      <div className="only">
        <h1>ONLY FOR YOU</h1>
        <p>즐길거리가 다양한 푸른들 글램핑 & 카라반 부대시설</p>
      </div>
    );
  }
  
  function Facility() {
    return (
        <section>
                <div className="facility1">
                    <img src={img14} alt="image1"/>
                        <p>푸른들을 이용하시는 모든 분들이 시원한 여름을<br/>
                        즐기실 수 있도록 야외수영장이 준비되어 있습니다.<br/>
                    싱그러운 자연 속 가족과 함께 즐거운 물놀이를 즐겨보세요!</p>
            </div>
            <div className="facility2">
                <p>여행에서 빠질 수 없는 바베큐파티!
                    <br />
                    아름다운 추억여행으로 기억에 남을 수 있도록 최상의 서비스를 제공합니다.</p>
                <img src={img10} alt="image3"/>
                </div>
                <div className="facility3">
                <img src={img12} alt="image3"/>
                    <div className="text-container">
                        <p>외부로 나가지 않아도 푸른들 카라반 내에는 필요한 물품을 구입할 수 있는 매점이 마련되어 있습니다.</p>
                        <div className="location">
                            <p>위치 <br /> - A동 앞 <br /><br /><br />이용시간 <br/>- 17:00 ~ 21:00</p>
                        </div>
                    </div>
                </div>
    </section>

    );
     }
     export default Contents;


