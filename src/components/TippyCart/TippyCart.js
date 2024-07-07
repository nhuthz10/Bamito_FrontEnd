import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllProductCart } from "../../redux-toolkit/cartSlice";
import noProduct from "../../assets/noProduct.png";
import "./TippyCart.scss";

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const TippyCart = () => {
  const userId = useSelector((state) => state.user.userInfo?.id);
  const products = useSelector((state) => state?.cart?.allProduct);
  const productCountInCart = useSelector((state) => state.cart?.totalProduct);

  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      await dispatch(fetchAllProductCart({ userId: userId }));
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="tippy-cart-container">
      <h2 className="tippy-cart-title">Sản Phẩm Mới Thêm</h2>
      {products && products.length > 0 ? (
        products.map((product, index) => {
          if (index >= 5) return null;
          return (
            <Link
              className="product-item"
              key={index}
              to={`/product/${product.productTypeId}/${product.productId}`}
            >
              <div className="product-wrap-img-name">
                <img src={product.image} alt="" className="product-img"></img>
                <div className="product-name">{`${product.name.slice(
                  0,
                  37
                )}...`}</div>
              </div>
              <div className="product-price">
                {currencyFormatter.format(product.price)}
                <span
                  style={{
                    textDecoration: "underline",
                    marginLeft: 2,
                  }}
                >
                  đ
                </span>
              </div>
            </Link>
          );
        })
      ) : (
        <div className="no-product">
          <h2 style={{ textAlign: "center" }}>Không có sản phẩm nào</h2>
          <img
            src={noProduct}
            alt=":(("
            style={{ width: "100%", height: "400px" }}
          />
        </div>
      )}
      {products && products?.length > 0 ? (
        <div className="tippy-cart-footer">
          {productCountInCart > 5 ? (
            <span className="count-product-in-cart">
              {productCountInCart - 5} Thêm Hàng Vào Giỏ
            </span>
          ) : null}

          <Link
            to={"/user/cart"}
            className="btn-show-cart"
            style={{ marginLeft: "auto" }}
          >
            Xem giỏ hàng
          </Link>
        </div>
      ) : null}
    </div>
  );
};
export default TippyCart;
