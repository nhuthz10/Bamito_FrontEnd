import React from "react";
import PaginatedItems from "../../components/Pagination/Pagination";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import Rating from "@mui/material/Rating";
import noProduct from "../../assets/noProduct.png";
import {
  handleDeleteFavourite,
  handleGetAllFavourite,
} from "../../services/userService";
import { fetchAllProductFavouriteRedux } from "../../redux-toolkit/productSlice";
import { updateFavourites } from "../../redux-toolkit/userSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { LIMIT_SEARCH } from "../../utils";
import "./Favourite.scss";
import { handleChangePage } from "../../redux-toolkit/paginationSlice";

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

function Favourite() {
  const userId = useSelector((state) => state.user.userInfo?.id);
  const productPagination = useSelector(
    (state) => state.product.allProductFavourite.data
  );
  const pageCount = useSelector((state) => state.pagination.page);
  const totalPage = useSelector(
    (state) => state.product.allProductFavourite.totalPage
  );
  const dispatch = useDispatch();

  const handleClickLike = async (productId, isLastProduct) => {
    if (userId) {
      try {
        let res = await handleDeleteFavourite(userId, productId);
        if (res && res.errCode === 0) {
          let ress = await handleGetAllFavourite(userId);
          dispatch(updateFavourites(ress?.data));
          await dispatch(
            fetchAllProductFavouriteRedux({
              userId: userId,
              limit: LIMIT_SEARCH,
              page: isLastProduct ? pageCount - 1 : pageCount,
            })
          );
          if (isLastProduct) dispatch(handleChangePage(pageCount - 1));
        } else {
          toast.error(res?.message);
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
    <div className="favourite-container">
      <Grid container spacing={5}>
        {productPagination && productPagination?.length > 0 ? (
          productPagination?.map((item, index) => {
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
                    <FavoriteTwoToneIcon
                      onClick={() => {
                        handleClickLike(
                          item.productId,
                          productPagination?.length === 1 &&
                            totalPage === pageCount
                            ? true
                            : false
                        );
                      }}
                      className="icon"
                      style={{ color: "red" }}
                    />
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
        <PaginatedItems type={"favourite-product"} />
      </div>
    </div>
  );
}

export default Favourite;
