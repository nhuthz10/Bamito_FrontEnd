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
import "./Product.scss";
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
import { handleChangePage } from "../../redux-toolkit/paginationSlice";

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
    <div className="product-page">
      <div className="product-sidebar">
        <div className="sidebar-item">
          <h1 className="sidebar-item-title">Thương hiệu</h1>
          <div className="sidebar-line"></div>
          {brands &&
            brands.length > 0 &&
            brands.map((item, index) => {
              return (
                <div className="sidebar-content" key={index}>
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
        <div className="sidebar-item">
          <h1 className="sidebar-item-title">Mức giá</h1>
          <div className="sidebar-line"></div>
          <Slider
            getAriaLabel={() => "Default"}
            valueLabelDisplay="off"
            step={500000}
            value={priceValue}
            onChange={handleChangePrice}
            min={0}
            max={10000000}
            className="price-slider"
            style={{ color: "var(--second-color)" }}
          />
          <div className="price-slider-value">
            <span>{currencyFormatter.format(priceValue[0])}</span>
            <span>{currencyFormatter.format(priceValue[1])}</span>
          </div>
        </div>
      </div>
      <div className="product-content">
        <div className="sort-container">
          <div className="sort-content">
            <div className="sort-title">
              <FontAwesomeIcon icon={faArrowDownWideShort} />
              <span>Sắp xếp: </span>
            </div>
            <Tippy
              interactive
              placement="bottom"
              delay={[0, 300]}
              offset={[0, 4]}
              render={(attrs) => (
                <div className="dropdown-sort" tabIndex="-1" {...attrs}>
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
              <div className="sort-value">
                <p>{sortValue.value}</p>
                <div className="sort-underline"></div>
              </div>
            </Tippy>
          </div>
        </div>
        <div className="list-product">
          {paginationData?.length === 0 && !isLoading ? (
            <div className="no-product">
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
                      className="product-item"
                    >
                      <img
                        src={item.image}
                        className="product-img"
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
                        className="favourite-btn"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        {item.favourite ? (
                          <FavoriteTwoToneIcon
                            onClick={() => {
                              handleClickLike(item.productId, "like");
                            }}
                            className="favourite-icon"
                            style={{ color: "red" }}
                          />
                        ) : (
                          <FavoriteBorderTwoToneIcon
                            className="favourite-icon"
                            onClick={() => {
                              handleClickLike(item.productId, "noLike");
                            }}
                          />
                        )}
                      </button>
                      <div className="product-infor">
                        <p className="product-name">{item.name}</p>
                        <div className="product-rating">
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
                        <div className="product-price">
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
        <div className="line-wrapper">
          <span className="line"></span>
        </div>
        <div style={{ marginTop: 50 }}>
          <PaginatedItems type={"user-product"} productTypeId={productTypeId} />
        </div>
      </div>
    </div>
  );
};

export default Product;
