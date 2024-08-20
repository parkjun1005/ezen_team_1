import React from 'react';
import './Map.css'; 
import way from '../assets/images/오시는길img.JPG';
import map from '../assets/images/지도맵.png';


function Map() {
      
    return ( <>
      <MapSection/>
      <MainContent/>
            </>
    );
  }

  function MapSection() {
    return (
      <section>
        <div className="map_top">
        <img src={way} alt="img" />
        </div>
      </section>
    );
  }
  
  function MainContent() {
    return (
      <main>
        <div className="waytocome">
          <h1>푸른들 글램핑 & 카라반</h1>
          <p>WAY TO COME</p>
        </div>
        <div className="map">
          <img src={map} alt="img" />
        </div>
        <div className="map_text">
          <h1>오시는 길</h1>
          <p>
            ▶ 도로명: 인천광역시 남동구 인주대로 593 엔타스빌딩 12층
            <br />
            <br />
            ▶ 지번: 인천광역시 남동구 구월동 1128-3 엔타스빌딩 12층
          </p>
        </div>
      </main>
    );
  }


  export default Map;