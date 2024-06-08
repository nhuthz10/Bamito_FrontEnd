import "./Introduce.scss";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import { useDispatch, useSelector } from "react-redux";
import { loadingProduct } from "../../redux-toolkit/productSlice";
import { Link } from "react-router-dom";
import { handleGetAllProductOfTheProductType } from "../../services/productService";
import { toast } from "react-toastify";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import {
  handleChangePage,
  handleResetPagination,
} from "../../redux-toolkit/paginationSlice";
import { updateFavourites } from "../../redux-toolkit/userSlice";
import {
  handleCreateFavourite,
  handleDeleteFavourite,
  handleGetAllFavourite,
} from "../../services/userService";
import _ from "lodash";

const Introduce = ({ productTypesData }) => {
  const [allData, setAllData] = useState([]);
  const [dataProducts, setDataProducs] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const favourites = useSelector((state) => state.user.favourites);
  const userId = useSelector((state) => state.user.userInfo?.id);

  let getProductClassify = async (racket, shoe, shirt) => {
    try {
      dispatch(loadingProduct(true));
      let resR = await handleGetAllProductOfTheProductType(
        racket.productTypeId,
        4,
        1
      );
      let resShirt = await handleGetAllProductOfTheProductType(
        shirt.productTypeId,
        4,
        1
      );
      let resShoe = await handleGetAllProductOfTheProductType(
        shoe.productTypeId,
        4,
        1
      );
      if (
        resR &&
        resShirt &&
        resShoe &&
        resR.errCode === 0 &&
        resShirt.errCode === 0 &&
        resShoe.errCode === 0
      ) {
        setAllData([
          {
            title: racket.productTypeName,
            id: racket.productTypeId,
            data: resR.data,
          },
          {
            title: shoe.productTypeName,
            id: shoe.productTypeId,
            data: resShoe.data,
          },
          {
            title: shirt.productTypeName,
            id: shirt.productTypeId,
            data: resShirt.data,
          },
        ]);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      dispatch(loadingProduct(false));
    }
  };

  useEffect(() => {
    if (productTypesData && productTypesData.length > 0) {
      let racket = productTypesData.find(
        (productType) => productType.productTypeName === "Vợt cầu lông"
      );
      let shoe = productTypesData.find(
        (productType) => productType.productTypeName === "Giày cầu lông"
      );
      let shirt = productTypesData.find(
        (productType) => productType.productTypeName === "Áo cầu lông"
      );
      getProductClassify(racket, shoe, shirt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productTypesData]);

  useEffect(() => {
    if (favourites && favourites.length > 0) {
      let newAllData = _.cloneDeep(allData);
      newAllData = newAllData.map((productType) => {
        let newProductType = { ...productType };
        newProductType.data = newProductType.data.map((product) => ({
          ...product,
          favourite: favourites.includes(product.productId),
        }));
        return newProductType;
      });
      setDataProducs(newAllData);
    } else {
      setDataProducs(allData);
    }
  }, [favourites, allData]);

  const currencyFormatter = new Intl.NumberFormat("vi-VN", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const handleClickMore = (productTypeId) => {
    dispatch(handleChangePage(1));
    dispatch(handleResetPagination(true));
    navigate(`product/${productTypeId}`);
  };

  const handleClickLike = async (productId, status) => {
    if (userId) {
      try {
        if (status === "like") {
          let res = await handleDeleteFavourite(userId, productId);
          if (res && res.errCode === 0) {
            let ress = await handleGetAllFavourite(userId);
            dispatch(updateFavourites(ress?.data));
          } else {
            toast.error(res?.message);
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
            toast.error(res?.message);
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
    <>
      {dataProducts &&
        dataProducts.length > 0 &&
        dataProducts.map((item, index) => {
          return (
            <div className="introduce-badminton" key={index}>
              <div className="introduce-badminton-header">
                <h1 className="introduce-badminton-header-title">
                  {item.title}
                </h1>
                <div
                  onClick={() => handleClickMore(item.id)}
                  className="introduce-badminton-header-more"
                >
                  Xem tất cả
                </div>
              </div>
              <Grid container spacing={5}>
                {item.data &&
                  item.data.length > 0 &&
                  item.data.map((product, index) => {
                    return (
                      <Grid item xs={3} className="col-3" key={index}>
                        <Link
                          to={`/product/${product.productTypeData?.productTypeId}/${product.productId}`}
                        >
                          <div className="introduce-badminton-item">
                            <div style={{ height: "450px" }}>
                              <img
                                src={product.image}
                                alt=""
                                className="introduce-badminton-item-img"
                                style={{
                                  objectFit:
                                    item.title === "Áo cầu lông"
                                      ? "cover"
                                      : "contain",
                                }}
                              ></img>
                              <button
                                className="favourite-btn"
                                onClick={(e) => e.preventDefault()}
                              >
                                {product.favourite ? (
                                  <FavoriteTwoToneIcon
                                    onClick={() => {
                                      handleClickLike(
                                        product.productId,
                                        "like"
                                      );
                                    }}
                                    className="favourite-icon"
                                    style={{ color: "red" }}
                                  />
                                ) : (
                                  <FavoriteBorderTwoToneIcon
                                    className="favourite-icon"
                                    onClick={() => {
                                      handleClickLike(
                                        product.productId,
                                        "noLike"
                                      );
                                    }}
                                  />
                                )}
                              </button>
                            </div>
                            <div className="introduce-badminton-item-name">
                              {product.name}
                            </div>
                            <div className="introduce-badminton-item-rating">
                              <Rating
                                defaultValue={0}
                                value={product.rating}
                                precision={0.5}
                                readOnly
                                style={{
                                  fontSize: "2.5rem",
                                  marginRight: "0.5rem",
                                }}
                              />
                              <p style={{ lineHeight: 1.5 }}>
                                {product.rating}/<span>5</span>
                              </p>
                            </div>
                            <div className="introduce-badminton-item-price">
                              <p
                                style={{
                                  color:
                                    product.discount !== 0
                                      ? "rgba(0,0,0,.54)"
                                      : "var(--primary-color)",
                                  textDecoration:
                                    product.discount !== 0
                                      ? "line-through"
                                      : "",
                                  marginRight: 10,
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
                                    product.price -
                                      (product.price * product.discount) / 100
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
                  })}
              </Grid>
            </div>
          );
        })}
    </>
  );
};

export default Introduce;
