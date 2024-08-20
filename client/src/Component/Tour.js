import React from 'react';
import './Tour.css';
import img1 from '../assets/images/관광지메인.JPG';
import img2 from '../assets/images/쁘띠프랑스.jpg';
import img3 from '../assets/images/레일바이크.jpg';
import img4 from '../assets/images/남이섬.jpg';
import img5 from '../assets/images/아침고요수목원.jpg';


function Tour() {
    return (<>
        <section>
          <div className="tour_top">
             <img src={img1} alt="image1"/>
          </div>
        </section>
        <section>
            <div className="tour">
                <h1>TOUR</h1>
            </div>
            <div className="tour_location">
                <div className="tour1">
                <img src={img2} alt="image2"/>
                    <div className="tour_text">
                        <h1>쁘띠프랑스</h1>
                    <p>청평댐에서 남이섬 방향으로 호숫가 길을 따라 10km쯤 가다 보면<br/>
                        왼쪽언덕에 이국적 건물들이 옹기종기 모여 있는 걸 볼 수 있다.<br/> 
                        지중해 연안의 마을 같기도 하고 호명산의 수려한 주위 배경과 함께 보면<br/>
                        마치 알프스 산록의 전원마을 같은 이곳은, 프랑스 문화마을 쁘띠프랑스이다</p>
                        <div className="tour_address"><p>위치: 경기도 가평군 청평면 호반로 1063</p></div>
                    </div>
                    </div>
                    <div className="tour2">
                    <div className="tour_text2">
                        <h1>레일바이크</h1>
                        <p>멈춰버린 경춘선에 새로운 생명을 불어넣어 레일바이크로 다시 달리고 있습니다.<br/>
                        가을이면 북한강의 가을 단풍의 모습은 그야말로 장관입니다.<br/>
                    사랑하는 사람과 잊지 못 할 추억을 만들기에는 충분한 장소입니다.</p>
                    <div className="tour_address"><p>위치: 경기도 가평군 가평읍 장터길 14</p></div>
                    </div>
                    <img src={img3} alt="image3"/>
                </div>
                <div className="tour3">
                <img src={img4} alt="image4"/>
                    <div className="tour_text3">
                        <h1>남이섬</h1>
                        <p>북한강에 있는 강섬으로서 총면적은 14여 만 평에 이른다. 원래는 홍수 때에만<br/>
                            섬으로 고립되었으나, 청평(淸平)댐의 건설로 완전한 섬을 이루게 되었다.<br/>
                            남이 장군의 묘소가 있는 것에 연유하여 남이섬이라 부르게 되었다.<br/>
                            넓은 잔디밭이 전개되어 있고 둘레에 밤나무숲이 무성하고, 별장•방갈로•수영장 등<br/>
                            오락시설이 잘 정비되어 있으며, 서울과 가까워 많은 관광객이 찾아든다.<br/>
                            백자작나무길, 잣나무길, 메타 세콰이어길 등 운치있는 숲길이 명소이다.<br/>
                            드라마 겨울 연가의 촬영장소로 알려져 있다.
                        </p>
                        <div className="tour_address"><p>위치: 경기도 가평군 달전리 144-11</p></div>
                    </div>
                    </div>
                    <div className="tour4">
                        <div className="tour_text4">
                            <h1>아침고요수목원</h1>
                            <p>아침고요수목원은 축령산의 빼어난 자연경관을 배경으로 하여 한국의<br/>
                                미를 듬뿍 담은 정원들을 원예학적으로 조화시켜 설계한 원예수목원<br/>
                                이다. 여러 가지 특색 있는 정원을 갖추고 있고, 울창한 잣나무숲<br/>
                                아래에서 삼림욕을 즐길 수도 있어 도시민들에게 쉼터를 제공한다.<br/>
                                설계자(한상경, 삼육대학교 원예학 교수)가 명명하였으며, 1996년 <br/>
                                5월에 개원하였다. 20개의 주제를 가진 정원은 아름답게 가꾸어진<br/>
                                잔디밭과 화단, 자연스러운 산책로로 연결되어 있다.</p>
                                <div className="tour_address"><p>위치: 경기도 가평군 상면 수목원로 432</p></div>
                        </div>
                        <img src={img5} alt="image5"/>
                    </div>
                </div>
        </section>
        </>
    );
  }
  
  
  export default Tour;