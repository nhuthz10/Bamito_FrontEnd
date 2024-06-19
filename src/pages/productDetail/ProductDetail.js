import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import RemoveIcon from "@mui/icons-material/Remove";
import "./productDetail.scss";
import { loadingProduct } from "../../redux-toolkit/productSlice";
import { hadnleAddProductToCart } from "../../services/cartService";
import { handleGetProductService } from "../../services/productService";
import CommentAndRatingForm from "./CommentAndRatingForm";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchAllProductCart } from "../../redux-toolkit/cartSlice";

const Line = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 3,
      margin: "2rem 0",
    }}
  />
);

function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const [checkComponent, setCheckComponent] = useState(true);
  const [sizeData, setSizeData] = useState([]);
  const [sizeSelected, setSizeSelected] = useState(null);
  const [stockQuantity, setStockQuantity] = useState(null);
  const isLogin = useSelector((state) => state.user.login);
  const userId = useSelector((state) => state.user.userInfo.id);
  const cartId = useSelector((state) => state.user.cartId);
  const dispatch = useDispatch();

  const { productId } = useParams();

  const [product, setProduct] = useState({});

  let getInfoProdut = async () => {
    try {
      dispatch(loadingProduct(true));
      let res = await handleGetProductService(productId);
      if (res && res.errCode === 0) {
        setProduct(res?.data);
        setSizeData(res?.data?.SizeData);
      } else {
        toast.error(res?.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      dispatch(loadingProduct(false));
    }
  };

  useEffect(() => {
    getInfoProdut();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const currencyFormatter = new Intl.NumberFormat("vi-VN", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const handleClickSize = (sizeId) => {
    let data = sizeData.map((size) => {
      size.sizeId === sizeId ? (size.selected = true) : (size.selected = false);
      return size;
    });
    let currentSize = data.find((size) => size.sizeId === sizeId);
    setSizeData(data);
    setStockQuantity(currentSize.quantity);
    setSizeSelected(sizeId);
    setQuantity(1);
  };

  const handleCheckComponent = () => {
    setCheckComponent(!checkComponent);
  };

  const handleDecrement = () => {
    if (!sizeSelected) {
      toast.error("Vui lòng chọn kích cỡ sản phẩm");
    } else {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    }
  };
  const handleIncrement = () => {
    if (!sizeSelected) {
      toast.error("Vui lòng chọn kích cỡ sản phẩm");
    } else {
      if (quantity < stockQuantity) {
        setQuantity(quantity + 1);
      }
    }
  };

  const handleClickAddCart = async () => {
    if (isLogin) {
      if (!sizeSelected) {
        toast.error("Vui lòng chọn kích cỡ sản phẩm");
      } else {
        try {
          let res = await hadnleAddProductToCart({
            userId: userId,
            productId: productId,
            sizeId: sizeSelected,
            quantity: quantity,
            totalPrice:
              quantity *
              (product.price - (product.price * product.discount) / 100),
          });
          if (res && res.errCode === 0) {
            dispatch(fetchAllProductCart({ userId: userId }));
            toast.success("Thêm sản phẩm vào giỏ hàng thành công");
          }
        } catch (error) {
          if (error.response.data.errCode === 2) {
            toast.error("Sản phẩm đã có trong giỏ hàng");
          } else {
            console.log(error);
            toast.error(error?.response?.data?.message);
          }
        }
      }
    } else {
      toast.error("Vui lòng đăng nhập để tiếp tục mua hàng");
    }
  };

  return (
    <div className="product_detail_container">
      <div className="img_inf_product">
        <div className="img_product">
          <img src={product.image} alt="product" />
        </div>

        <div className="info_product">
          <h1 className="product-name">{product.name}</h1>

          <div className="star_sold">
            <Rating
              style={{ fontSize: "3.875rem" }}
              name="read-only"
              value={product.rating ? product.rating : 0}
              readOnly
              precision={0.5}
              size="large"
            />
            <span style={{ fontSize: "3rem", fontWeight: 600, marginLeft: 6 }}>
              {product.rating}/5
            </span>
          </div>

          <div className="price_product">
            <p
              style={{
                color:
                  product.discount !== 0
                    ? "rgba(0,0,0,.54)"
                    : "var(--primary-color)",
                textDecoration: product.discount !== 0 ? "line-through" : "",
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

          <Line color="var(--gray-color)" />

          <div className="size_product">
            <p>Size</p>
            <div>
              {sizeData?.length > 0 &&
                sizeData.map((size) => (
                  <button
                    key={size.sizeId}
                    onClick={() => handleClickSize(size.sizeId)}
                    className={size.selected ? "selected" : null}
                  >
                    {size.sizeName}
                  </button>
                ))}
            </div>
          </div>

          <Line color="var(--gray-color)" />

          <div className="product_number">
            <div className="number">Số lượng</div>

            <div className="quantity-stock">
              <div className="quantity-btn-wrapper">
                <button className="subtract-btn" onClick={handleDecrement}>
                  <RemoveIcon className="icon" />
                </button>
                <p>{quantity}</p>
                <button className="add-btn" onClick={handleIncrement}>
                  <AddTwoToneIcon className="icon" />
                </button>
              </div>

              {stockQuantity > 0 ? (
                <p className="stock_product">{stockQuantity} sản phẩm có sẵn</p>
              ) : stockQuantity === 0 ? (
                <p className="stock_product">Sản phẩm đã hết hàng</p>
              ) : null}
            </div>
          </div>

          <Line color="var(--gray-color)" />

          <button className="cart-btn" onClick={handleClickAddCart}>
            <i className="fas fa-shopping-cart"></i>
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>

      <div className="description_review_wrapper">
        <div className="des-review-btn-wrapper">
          <div className="des-review-btn">
            <button
              className={!checkComponent ? "no-focus" : null}
              onClick={handleCheckComponent}
            >
              Mô tả sản phẩm
            </button>
            <Line color={!checkComponent ? "rgba(0, 0, 0, 0.1)" : "black"} />
          </div>
          <div className="des-review-btn">
            <button
              className={checkComponent ? "no-focus" : null}
              onClick={handleCheckComponent}
            >
              Phản hồi và Đánh giá
            </button>
            <Line color={checkComponent ? "rgba(0, 0, 0, 0.1)" : "black"} />
          </div>
        </div>
        {checkComponent ? (
          <div
            className="description"
            dangerouslySetInnerHTML={{
              __html: product.descriptionHTML,
            }}
          ></div>
        ) : (
          <CommentAndRatingForm />
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
