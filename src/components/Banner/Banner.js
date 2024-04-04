import "./Banner.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slider1 from "../../assets/sl4.jpg";
import slider2 from "../../assets/sl6.jpg";
import slider3 from "../../assets/sl8.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--white-color)",
        position: "absolute",
        transform: "translateY(-50%)",
        top: "50%",
        right: "20px",
        height: "3.8rem",
        width: "3.8rem",
        borderRadius: "50%",
        zIndex: 10,
        boxShadow: "0px 4px 4px 0px #00000040",
      }}
      onClick={onClick}
    >
      <FontAwesomeIcon
        style={{ fontSize: "var(--text-fontSize)", color: "black" }}
        icon={faAngleRight}
      ></FontAwesomeIcon>
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--white-color)",
        position: "absolute",
        transform: "translateY(-50%)",
        top: "50%",
        left: "20px",
        height: "3.8rem",
        width: "3.8rem",
        borderRadius: "50%",
        zIndex: 10,
        boxShadow: "0px 4px 4px 0px #00000040",
      }}
      onClick={onClick}
    >
      <FontAwesomeIcon
        style={{ fontSize: "var(--text-fontSize)", color: "black" }}
        icon={faAngleLeft}
      ></FontAwesomeIcon>
    </div>
  );
};

const Banner = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <div className="banner-container">
      <Slider {...settings}>
        <div className="banner-item">
          <img src={slider1} alt="" className="banner-item-img"></img>
        </div>
        <div className="banner-item">
          <img src={slider2} alt="" className="banner-item-img"></img>
        </div>
        <div className="banner-item">
          <img src={slider3} alt="" className="banner-item-img"></img>
        </div>
      </Slider>
    </div>
  );
};

export default Banner;
