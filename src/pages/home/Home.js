import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner/Banner";
import payment from "../../assets/thanh_toan 1.png";
import delivery from "../../assets/policy_image_2 1.png";
import like from "../../assets/policy_image_1 1.png";
import Introduce from "../../components/Introduce/Introduce";
import Grid from "@mui/material/Grid";
import { toast } from "react-toastify";
import "./Home.scss";
import { handleGetAllProductTypeService } from "../../services/productService";
import { useDispatch, useSelector } from "react-redux";
import { loadingProduct } from "../../redux-toolkit/productSlice";

function Home() {
  const [allProductType, setAllProductType] = useState([]);
  const dispatch = useDispatch();

  let getAllProductTypes = async () => {
    try {
      dispatch(loadingProduct(true));
      let res = await handleGetAllProductTypeService();
      if (res && res.errCode === 0) {
        setAllProductType(res?.data);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(loadingProduct(false));
    }
  };

  useEffect(() => {
    getAllProductTypes();
  }, []);

  return (
    <div className="home-container">
      <Banner></Banner>
      <div className="home-content">
        <Introduce productTypesData={allProductType}></Introduce>
        <div className="home-benefit">
          <Grid container spacing={12}>
            <Grid item xs={4}>
              <div className="home-benefit-wrap-item">
                <div className="home-benefit-item">
                  <img
                    src={delivery}
                    alt=""
                    className="home-benefit-item-img"
                  ></img>
                  <div className="home-benefit-item-text">
                    Vận chuyển toàn quốc, thanh toán khi nhận hàng
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="home-benefit-wrap-item">
                <div className="home-benefit-item">
                  <img
                    src={payment}
                    alt=""
                    className="home-benefit-item-img"
                  ></img>
                  <div className="home-benefit-item-text">
                    Tiến hành thanh toán với nhiều phương thức
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="home-benefit-wrap-item">
                <div className="home-benefit-item">
                  <img
                    src={like}
                    alt=""
                    className="home-benefit-item-img"
                  ></img>
                  <div className="home-benefit-item-text">
                    Sản phẩm đảm bảo chất lượng
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default Home;
