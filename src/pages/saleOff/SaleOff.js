import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import PaginatedItems from "../../components/Pagination/Pagination";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import Rating from "@mui/material/Rating";
import noProduct from "../../assets/noProduct.png";
import {
  handleCreateFavourite,
  handleDeleteFavourite,
  handleGetAllFavourite,
} from "../../services/userService";
import { updateFavourites } from "../../redux-toolkit/userSlice";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import "./SaleOff.scss";

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

function SaleOff() {
  const [paginationData, setPaginationData] = useState([]);
  const userId = useSelector((state) => state.user.userInfo?.id);
  const favourites = useSelector((state) => state.user.favourites);
  const productPagination = useSelector(
    (state) => state.product.allProductSaleOff.data
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (favourites && favourites?.length > 0) {
      let newPaginationData = productPagination?.map((product) => {
        let newProduct = { ...product };
        newProduct.favourite = favourites?.includes(product.productId);
        return newProduct;
      });
      setPaginationData(newPaginationData);
    } else {
      setPaginationData(productPagination);
    }
  }, [favourites, productPagination]);

  const handleClickLike = async (productId, status) => {
    if (userId) {
      try {
        if (status === "like") {
          let res = await handleDeleteFavourite(userId, productId);
          if (res && res.errCode === 0) {
            let ress = await handleGetAllFavourite(userId);
            dispatch(updateFavourites(ress?.data));
          } else {
            toast.error(res.message);
          }
        }
        if (status === "noLike") {
          let res = await handleCreateFavourite({
            productId: productId,
            userId: userId,
          });
          if (res && res.errCode === 0) {
            let ress = await handleGetAllFavourite(userId);
            dispatch(updateFavourites(ress?.data));
          } else {
            toast.error(res.message);
          }
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
      }
    } else {
      toast.error("Vui lòng đăng nhập");
    }
  };

  return (
    <div className="sale-off-container">
      <Grid container spacing={5}>
        {paginationData && paginationData?.length > 0 ? (
          paginationData?.map((item, index) => {
            return (
              <Grid item xs={3} key={index}>
                <Link
                  to={`/product/${item.productTypeData.productTypeId}/${item.productId}`}
                  className="productWrapper"
                >
                  <img
                    src={item.image}
                    style={{
                      objectFit:
                        item.productTypeData?.productTypeName === "Áo cầu lông"
                          ? "cover"
                          : "contain",
                    }}
                    className="productImg"
                    alt="product"
                  ></img>
                  <button
                    className="favorite"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    {item.favourite ? (
                      <FavoriteTwoToneIcon
                        onClick={() => {
                          handleClickLike(item.productId, "like");
                        }}
                        className="icon"
                        style={{ color: "red" }}
                      />
                    ) : (
                      <FavoriteBorderTwoToneIcon
                        className="icon"
                        onClick={() => {
                          handleClickLike(item.productId, "noLike");
                        }}
                      />
                    )}
                  </button>
                  <div className="productInfo">
                    <p className="productName">{item.name}</p>
                    <div className="productRating">
                      <Rating
                        defaultValue={0}
                        value={item.rating}
                        precision={0.5}
                        readOnly
                        style={{ fontSize: "2.5rem" }}
                      />
                      <p style={{ lineHeight: 1.5 }}>
                        {item.rating}/<span>5</span>
                      </p>
                    </div>
                    <div className="productPrice">
                      <p
                        style={{
                          color:
                            item.discount !== 0
                              ? "rgba(0,0,0,.54)"
                              : "var(--primary-color)",
                          textDecoration:
                            item.discount !== 0 ? "line-through" : "",
                          marginRight: 10,
                        }}
                      >
                        {currencyFormatter.format(item.price)}
                        <span
                          style={{
                            textDecoration: "underline",
                            marginLeft: 2,
                          }}
                        >
                          đ
                        </span>
                      </p>
                      {item.discount !== 0 ? (
                        <p>
                          {currencyFormatter.format(
                            item.price - (item.price * item.discount) / 100
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
                  </div>
                </Link>
              </Grid>
            );
          })
        ) : (
          <div className="no-product">
            <h1>Không có sản phẩm nào</h1>
            <img src={noProduct} alt=":((" />
          </div>
        )}
      </Grid>
      <div style={{ marginTop: 50 }}>
        <PaginatedItems type={"sale-off-product"} />
      </div>
    </div>
  );
}

export default SaleOff;
