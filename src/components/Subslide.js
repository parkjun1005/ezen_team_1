import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Contents.css';

const Subslide = () => {
  const settings = {
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <section>
      <div className="slick">
        <Slider {...settings}>
          <div><img src="./images/객실1.jpg" alt="image1" /></div>
          <div><img src="./images/바베큐장.jpg" alt="image2" /></div>
          <div><img src="./images/바베큐.jpg" alt="image3" /></div>
          <div><img src="./images/화장실.jpg" alt="image4" /></div>
          <div><img src="./images/매점.jpg" alt="image5" /></div>
          <div><img src="./images/불멍.jpg" alt="image6" /></div>
        </Slider>
      </div>
    </section>
  );
};

export default Subslide;