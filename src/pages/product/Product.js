import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react/headless";
import Rating from "@mui/material/Rating";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import { useDebounce } from "../../utils/commonUtils";
import styles from "../product/product.module.scss";
import PaginatedItems from "../../components/Pagination/Pagination";
import {
  handleFilterProduct,
  handleSortProduct,
} from "../../redux-toolkit/productSlice";
import {
  handleCreateFavourite,
  handleDeleteFavourite,
  handleGetAllFavourite,
} from "../../services/userService";
import { sortBy } from "../../utils/index";
import noProduct from "../../assets/noProduct.png";
import { toast } from "react-toastify";
import { updateFavourites } from "../../redux-toolkit/userSlice";
import {
  handleChangePage,
  handleResetPagination,
} from "../../redux-toolkit/paginationSlice";

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const Product = () => {
  const [checkBrands, setCheckBrands] = useState([]);
  const [sortValue, setSortValue] = useState(sortBy[0]);
  const [priceValue, setPriceValue] = useState([0, 10000000]);
  const { productTypeId } = useParams();
  const dispatch = useDispatch();
  const productPagination = useSelector(
    (state) => state.product.allProductOfTheProductType.data
  );
  const [paginationData, setPaginationData] = useState([]);
  const brands = useSelector((state) => state.admin.allBrand.data);
  const isLoading = useSelector((state) => state.product.isLoading);
  const userId = useSelector((state) => state.user.userInfo?.id);
  const favourites = useSelector((state) => state.user.favourites);

  const debounceBrands = useDebounce(checkBrands, 500);
  const debouncePrice = useDebounce(priceValue, 500);

  useEffect(() => {
    dispatch(handleSortProduct(sortValue.id));
    dispatch(handleChangePage(1));
    dispatch(handleResetPagination(true));
    dispatch(
      handleFilterProduct({
        brandId: debounceBrands,
        price: debouncePrice,
      })
    );
  }, [debounceBrands, debouncePrice, dispatch, sortValue]);

  const handleChangePrice = (event, newValue) => {
    setPriceValue(newValue);
  };

  const handleSortValue = (item) => {
    setSortValue(item);
  };

  const handleCheckBrands = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCheckBrands((prev) => [...prev, value]);
    } else {
      setCheckBrands((prev) => prev.filter((item) => item !== value));
    }
  };

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
    <div className={styles.page}>
      <div className={styles.sideBar}>
        <div className={styles.sideBar_element}>
          <h1 className={styles.sideBar_element_title}>Thương hiệu</h1>
          <div className={styles.sideBar_line}></div>
          {brands &&
            brands.length > 0 &&
            brands.map((item, index) => {
              return (
                <div className={styles.sideBar_element_content} key={index}>
                  <p>{item.brandName}</p>
                  <input
                    type="checkbox"
                    value={item.brandId}
                    onChange={handleCheckBrands}
                  ></input>
                </div>
              );
            })}
        </div>
        <div className={styles.sideBar_element}>
          <h1 className={styles.sideBar_element_title}>Mức giá</h1>
          <div className={styles.sideBar_line}></div>
          <Slider
            getAriaLabel={() => "Default"}
            valueLabelDisplay="off"
            step={500000}
            value={priceValue}
            onChange={handleChangePrice}
            min={0}
            max={10000000}
            className={styles.priceSlider}
            style={{ color: "var(--second-color)" }}
          />
          <div className={styles.priceSliderValue}>
            <span>{currencyFormatter.format(priceValue[0])}</span>
            <span>{currencyFormatter.format(priceValue[1])}</span>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.sortWrapper}>
          <div className={styles.sortElement}>
            <div className={styles.SortTitle}>
              <FontAwesomeIcon icon={faArrowDownWideShort} />
              <span>Sắp xếp: </span>
            </div>
            <Tippy
              interactive
              placement="bottom"
              delay={[0, 300]}
              offset={[0, 4]}
              render={(attrs) => (
                <div className={styles.dropdownSort} tabIndex="-1" {...attrs}>
                  {sortBy.map((item, index) => {
                    if (item.value !== sortValue.value) {
                      return (
                        <button
                          key={index}
                          onClick={() => handleSortValue(item)}
                        >
                          {item.value}
                        </button>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
              )}
            >
              <div className={styles.sortValue}>
                <p>{sortValue.value}</p>
                <div className={styles.sortUnderline}></div>
              </div>
            </Tippy>
          </div>
        </div>
        <div className={styles.mainContent}>
          {paginationData?.length === 0 && !isLoading ? (
            <div className={styles.noProduct}>
              <h1>Không có sản phẩm nào</h1>
              <img src={noProduct} alt=":((" />
            </div>
          ) : (
            <Grid container spacing={5}>
              {paginationData?.map((item, index) => {
                return (
                  <Grid item xs={4} key={index}>
                    <Link
                      to={`/product/${item.productTypeData.productTypeId}/${item.productId}`}
                      className={styles.productWrapper}
                    >
                      <img
                        src={item.image}
                        className={styles.productImg}
                        style={{
                          objectFit:
                            item.productTypeData?.productTypeName ===
                            "Áo cầu lông"
                              ? "cover"
                              : "contain",
                        }}
                        alt="product"
                      ></img>
                      <button
                        className={styles.favorite}
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        {item.favourite ? (
                          <FavoriteTwoToneIcon
                            onClick={() => {
                              handleClickLike(item.productId, "like");
                            }}
                            className={styles.icon}
                            style={{ color: "red" }}
                          />
                        ) : (
                          <FavoriteBorderTwoToneIcon
                            className={styles.icon}
                            onClick={() => {
                              handleClickLike(item.productId, "noLike");
                            }}
                          />
                        )}
                      </button>
                      <div className={styles.productInfo}>
                        <p className={styles.productName}>{item.name}</p>
                        <div className={styles.productRating}>
                          <Rating
                            defaultValue={0}
                            value={item.rating}
                            precision={0.5}
                            readOnly
                            style={{ fontSize: "2.5rem", marginLeft: "0.5rem" }}
                          />
                          <p style={{ lineHeight: 1.5 }}>
                            {item.rating}/<span>5</span>
                          </p>
                        </div>
                        <div className={styles.productPrice}>
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
              })}
            </Grid>
          )}
        </div>
        <div className={styles.lineWrapper}>
          <div className={styles.line}></div>
        </div>
        <div style={{ marginTop: 50 }}>
          <PaginatedItems type={"user-product"} productTypeId={productTypeId} />
        </div>
      </div>
    </div>
  );
};

export default Product;
