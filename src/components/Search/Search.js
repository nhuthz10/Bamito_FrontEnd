import React, { useEffect, useState, useRef } from "react";
import Tippy from "@tippyjs/react/headless";
import {
  faSpinner,
  faCircleXmark,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { handleGetAllProductService } from "../../services/productService";
import { searchPopular } from "../../utils";
import "./Search.scss";
import { useDebounce } from "../../utils/commonUtils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleChangSearchText } from "../../redux-toolkit/searchSlice";
import { handleChangePage } from "../../redux-toolkit/paginationSlice";

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [isShowNoResult, setIsShowNoResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef();
  const searchTextDebounce = useDebounce(searchText, 500);

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
    setIsShowNoResult(false);
  };

  let getAllProduct = async (name) => {
    try {
      setIsLoading(true);
      let res = await handleGetAllProductService(5, 1, name);
      if (res && res.errCode === 0) {
        setSearchResult(res?.data);
        res?.data?.length > 0
          ? setIsShowNoResult(false)
          : setIsShowNoResult(true);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!searchTextDebounce.trim()) {
      setSearchResult([]);
      return;
    }
    getAllProduct(searchTextDebounce.trim());
    dispatch(handleChangSearchText(searchTextDebounce.trim()));
  }, [dispatch, searchTextDebounce]);

  const handleSearchClear = () => {
    setSearchText("");
    setSearchResult("");
    inputRef.current.focus();
  };

  const handleClickPopular = (popularValue) => {
    setIsShowSearch(false);
    dispatch(handleChangePage(1));

    dispatch(handleChangSearchText(popularValue));
    navigate("/product/search");
  };

  const handleClickSearch = () => {
    if (!searchTextDebounce.trim()) {
      setSearchResult([]);
      return;
    }
    if (searchResult.length === 0) return;

    setIsShowSearch(false);
    navigate("/product/search");
  };

  const handleClickMore = () => {
    setIsShowSearch(false);
    navigate("/product/search");
  };

  return (
    <Tippy
      interactive
      visible={isShowSearch}
      onClickOutside={() => {
        setIsShowSearch(false);
      }}
      placement="bottom"
      delay={[0, 500]}
      offset={[0, 12.5]}
      render={(attrs) => (
        <div className="dropdownSearch" tabIndex="-1" {...attrs}>
          <div className="searchResult">
            <div className="search-popular">
              <div className="search-popular-title">TÌM KIẾM NHIỀU NHẤT</div>
              <span
                style={{
                  display: "block",
                  width: "100%",
                  borderTop: "1px solid rgb(221, 217, 217)",
                  margin: "6px 0",
                }}
              ></span>
              <div className="search-popular-list">
                {searchPopular?.length > 0 &&
                  searchPopular.map((item) => {
                    return (
                      <div
                        className="search-popular-item"
                        key={item.id}
                        onClick={() => handleClickPopular(item.value)}
                      >
                        {item.value}
                      </div>
                    );
                  })}
              </div>
            </div>
            {searchResult?.length > 0 ? (
              <>
                {searchResult.map((item, index) => {
                  if (index > 5) return null;
                  return (
                    <Link
                      to={`/product/${item.productTypeData?.productTypeId}/${item.productId}`}
                      key={index}
                      className="searchProduct"
                      onClick={() => {
                        setSearchText("");
                        setIsShowSearch(false);
                      }}
                    >
                      <img
                        src={item.image}
                        alt="img"
                        style={{ width: "6rem", height: "6rem" }}
                      ></img>
                      <div>
                        <h2>{`${item.name.slice(0, 38)}...`}</h2>
                        <h2 className="searchProductPrice">
                          <p>
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
                        </h2>
                      </div>
                    </Link>
                  );
                })}
                {searchResult.length >= 5 ? (
                  <div className="search-more" onClick={handleClickMore}>
                    <span
                      style={{
                        display: "block",
                        width: "100%",
                        borderTop: "1px solid rgb(221, 217, 217)",
                        margin: "1.6rem 0",
                      }}
                    ></span>
                    Xem tất cả
                  </div>
                ) : null}
              </>
            ) : !searchText.trim() ? null : isShowNoResult ? (
              <h2 style={{ margin: "10px 0 20px 0" }}>
                Không có kết quả cho '{searchText}'
              </h2>
            ) : null}
          </div>
        </div>
      )}
    >
      <div className="search">
        <input
          ref={inputRef}
          className="searchInput"
          onClick={() => setIsShowSearch(true)}
          type="text"
          onChange={handleSearchText}
          value={searchText}
          placeholder="Tìm kiếm..."
        ></input>

        {isLoading && (
          <button className="searchLoading">
            <FontAwesomeIcon icon={faSpinner} />
          </button>
        )}

        {searchText.length > 0 && !isLoading && (
          <button className="searchClear" onClick={handleSearchClear}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        )}

        <span style={{ border: "1px solid #ddd9d9", height: "65%" }}></span>
        <div className="searchBtn" onClick={handleClickSearch}>
          <FontAwesomeIcon className="searchIcon" icon={faMagnifyingGlass} />
        </div>
      </div>
    </Tippy>
  );
};

export default Search;
