import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import CommentAndRating from "./CommentAndRating";
import { useSelector } from "react-redux";
import { handleGetAllProductFeedback } from "../../services/productService";
import { toast } from "react-toastify";
import noProduct from "../../assets/noProduct.png";
import "./FeedBack.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  background: "white",
  borderRadius: 8,
  padding: 20,
};

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const FeedBack = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [allData, setAllData] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);

  const userId = useSelector((state) => state.user.userInfo.id);

  const getAllProductFeedBack = async () => {
    try {
      let res = await handleGetAllProductFeedback(userId);
      if (res && res.errCode === 0) {
        setAllData(res?.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllProductFeedBack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const hadnleClickFeedBack = (productId) => {
    setIsOpen(true);
    setCurrentProduct(productId);
  };

  return (
    <div className="feedback-container">
      {allData && allData?.length > 0 ? (
        allData.map((product, index) => {
          return (
            <div className="feedback-product" key={index}>
              <img
                src={product.image}
                alt=""
                className="feedback-product-img"
              ></img>
              <div className="feedback-product-content">
                <div className="product-name">{product.name}</div>
                <div className="product-price">
                  <p
                    style={{
                      color:
                        product.discount !== 0
                          ? "rgba(0,0,0,.54)"
                          : "var(--primary-color)",
                      textDecoration:
                        product.discount !== 0 ? "line-through" : "",
                      marginRight: 16,
                    }}
                  >
                    {currencyFormatter.format(product.price)}
                    <span
                      style={{
                        textDecoration: "underline",
                        marginLeft: 2,
                      }}
                    >
                      đ
                    </span>
                  </p>
                  {product.discount !== 0 ? (
                    <p>
                      {currencyFormatter.format(
                        product.price - (product.price * product.discount) / 100
                      )}
                      <span
                        style={{
                          textDecoration: "underline",
                          marginLeft: 2,
                        }}
                      >
                        đ
                      </span>
                    </p>
                  ) : null}
                </div>
                <div className="product-size">Kích cỡ: {product.sizeName}</div>
                <div className="product-quantity">
                  Số lượng: {product.quantity}
                </div>
                <div className="product-total-price">
                  {currencyFormatter.format(product.totalPrice)}
                  <span
                    style={{
                      textDecoration: "underline",
                      marginLeft: 2,
                    }}
                  >
                    đ
                  </span>
                </div>
              </div>
              <div
                className="feedback-btn"
                onClick={() => hadnleClickFeedBack(product)}
              >
                Đánh giá
              </div>
            </div>
          );
        })
      ) : (
        <div className="no-product">
          <h1>Không có sản phẩm nào để đánh giá</h1>
          <img src={noProduct} alt=":((" />
        </div>
      )}

      <Modal open={isOpen} onClose={handleClose}>
        <div style={{ ...style }}>
          <div
            style={{ fontSize: "2.4rem", fontWeight: 600, marginBottom: 16 }}
          >
            ĐÁNH GIÁ SẢN PHẨM
          </div>
          <CommentAndRating
            productData={currentProduct}
            setIsOpen={setIsOpen}
            getAllProductFeedBack={getAllProductFeedBack}
          ></CommentAndRating>
        </div>
      </Modal>
    </div>
  );
};

export default FeedBack;
