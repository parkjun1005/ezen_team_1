import React, { useState, useEffect } from 'react';
import img1 from "../assets/images/메인4.jpg";
import img2 from "../assets/images/메인이미지5.jpg";
import img3 from "../assets/images/메인2.jpg";
import img4 from "../assets/images/메인3.jpg";
import img5 from "../assets/images/메인1.jpg";
import img6 from "../assets/images/메인5.jpg";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
                        <img src={img1} className="slide" alt="image1"/>,
                        <img src={img2} className="slide" alt="image2"/>,
                        <img src={img3} className="slide" alt="image3"/>,
                        <img src={img4} className="slide" alt="image4"/>,
                        <img src={img5} className="slide" alt="image5"/>,
                        <img src={img6} className="slide" alt="image6"/>
  ];
  const totalSlides = slides.length;

  const showSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % totalSlides);
  };

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 3000);
    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 타이머 정리
  }, [currentIndex]);

  return (
    <section className="header_mainbanner">
    <div className="slide_container">
      <div className="slider">
        {slides[currentIndex]}
      </div>
    </div>
  </section>

  );
};

export default Slider;