import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  fetchAllUserRedux,
  fetchAllRoleRedux,
  fetchAllBrandRedux,
  fetchAllProductTypeRedux,
  fetchAllSizeRedux,
  fetchAllProductRedux,
  fetchAllProductSizeRedux,
  fetchAllProductSizeOfTheProductTypeRedux,
  fetchAllVoucherRedux,
  fetchAllOrderAdminRedux,
  fetchAllProductOrderRedux,
} from "../../redux-toolkit/adminSlice";
import {
  fetchAllProductOfTheProductTypeRedux,
  loadingProduct,
  fetchAllProductSaleOffRedux,
  fetchAllProductFavouriteRedux,
} from "../../redux-toolkit/productSlice";
import { fetchAllOrderRedux } from "../../redux-toolkit/orderSlice";
import { fetchAllProductSearchRedux } from "../../redux-toolkit/searchSlice";
import { loadingAdmin } from "../../redux-toolkit/adminSlice";
import { LIMIT, LIMIT_PRODUCT, LIMIT_SEARCH, LIMIT_ORDER } from "../../utils";
import {
  handleChangePage,
  handleResetPagination,
} from "../../redux-toolkit/paginationSlice";
import styles from "./Pagination.module.scss";

function PaginatedItems({ type, productTypeId, orderStatus }) {
  const dispatch = useDispatch();
  const [totalPage, setTotalPage] = useState(1);
  const totalPageUser = useSelector((state) => state.admin.allUser.totalPage);
  const totalPageBrand = useSelector((state) => state.admin.allBrand.totalPage);
  const totalPageProductType = useSelector(
    (state) => state.admin.allProductType.totalPage
  );
  const pageCount = useSelector((state) => state.pagination.page);
  const totalPageSize = useSelector((state) => state.admin.allSize.totalPage);
  const totalProduct = useSelector((state) => state.admin.allProduct.totalPage);
  const totalProductSize = useSelector(
    (state) => state.admin.allProductSize.totalPage
  );
  const totalProductOfTheProductType = useSelector(
    (state) => state.product.allProductOfTheProductType.totalPage
  );
  const totalProductSearch = useSelector(
    (state) => state.search.allResultSearch.totalPage
  );
  const totalVoucher = useSelector((state) => state.admin.allVoucher.totalPage);
  const totalOrder = useSelector((state) => state.order.allOrder.totalPage);
  const totalOrderAdmin = useSelector(
    (state) => state.admin.allOrder.totalPage
  );
  const totalProductSaleOff = useSelector(
    (state) => state.product.allProductSaleOff.totalPage
  );
  const totalProductOrder = useSelector(
    (state) => state.admin.allProductOrder.totalPage
  );
  const totalProductFavourite = useSelector(
    (state) => state.product.allProductFavourite.totalPage
  );
  const productData = useSelector((state) => state.admin.productData);
  const filter = useSelector((state) => state.product.filter);
  const sort = useSelector((state) => state.product.sort);
  const isLoading = useSelector((state) => state.product.isLoading);
  const userId = useSelector((state) => state.user.userInfo.id);

  const listProduct = useSelector(
    (state) => state.product.allProductOfTheProductType.data
  );
  const listProductSaleOff = useSelector(
    (state) => state.product.allProductSaleOff.data
  );
  const listProductOrder = useSelector(
    (state) => state.admin.allProductOrder.data
  );
  const listProductFavourite = useSelector(
    (state) => state.product.allProductFavourite.data
  );

  const searchText = useSelector((state) => state.search.searchText);
  const timeReport = useSelector((state) => state.admin.timeReport);
  const searchProductAdmin = useSelector(
    (state) => state.admin.searchTextProductAdmin
  );
  const isResetPagination = useSelector(
    (state) => state.pagination.isResetPagination
  );

  useEffect(() => {
    if (type === "user") {
      let getAllDataUser = async () => {
        dispatch(loadingAdmin(true));
        await dispatch(fetchAllUserRedux({ limit: LIMIT, page: pageCount }));
        await dispatch(fetchAllRoleRedux());
        dispatch(handleResetPagination(false));
        dispatch(loadingAdmin(false));
      };
      getAllDataUser();
    } else if (type === "product-brand") {
      let getAllDataBrand = async () => {
        dispatch(loadingAdmin(true));
        await dispatch(
          fetchAllBrandRedux({
            limit: LIMIT,
            page: pageCount,
            pagination: true,
          })
        );
        dispatch(handleResetPagination(false));
        dispatch(loadingAdmin(false));
      };
      getAllDataBrand();
    } else if (type === "product-type") {
      let getAllDataProductType = async () => {
        dispatch(loadingAdmin(true));
        await dispatch(
          fetchAllProductTypeRedux({
            limit: LIMIT,
            page: pageCount,
            pagination: true,
          })
        );
        dispatch(handleResetPagination(false));
        dispatch(loadingAdmin(false));
      };
      getAllDataProductType();
    } else if (type === "product-size") {
      let getAllDataSize = async () => {
        dispatch(loadingAdmin(true));
        await dispatch(fetchAllSizeRedux({ limit: LIMIT, page: pageCount }));
        await dispatch(
          fetchAllProductTypeRedux({
            pagination: false,
          })
        );
        dispatch(handleResetPagination(false));
        dispatch(loadingAdmin(false));
      };
      getAllDataSize();
    } else if (type === "product") {
      let getAllDataProduct = async () => {
        dispatch(loadingAdmin(true));
        await dispatch(
          fetchAllProductRedux({
            limit: LIMIT,
            page: pageCount,
            name: searchProductAdmin,
          })
        );
        await dispatch(
          fetchAllBrandRedux({
            pagination: false,
          })
        );
        await dispatch(
          fetchAllProductTypeRedux({
            pagination: false,
          })
        );
        dispatch(handleResetPagination(false));
        dispatch(loadingAdmin(false));
      };
      getAllDataProduct();
    } else if (type === "productSize") {
      let getAllDataProductSize = async () => {
        dispatch(loadingAdmin(true));
        await dispatch(
          fetchAllProductSizeRedux({
            productId: productData?.productId,
            limit: LIMIT,
            page: pageCount,
          })
        );
        await dispatch(
          fetchAllProductSizeOfTheProductTypeRedux(
            productData?.productTypeData?.productTypeId
          )
        );
        dispatch(handleResetPagination(false));
        dispatch(loadingAdmin(false));
      };
      getAllDataProductSize();
    } else if (type === "user-product") {
      let getAllDataProduct = async () => {
        dispatch(loadingProduct(true));
        await dispatch(fetchAllBrandRedux({ pagination: false }));
        await dispatch(fetchAllProductTypeRedux({ pagination: false }));
        await dispatch(
          fetchAllProductOfTheProductTypeRedux({
            productTypeId: productTypeId,
            limit: LIMIT_PRODUCT,
            page: pageCount,
            sort: sort,
            filter: filter,
          })
        );
        dispatch(loadingProduct(false));
        dispatch(handleResetPagination(false));
      };
      getAllDataProduct();
    } else if (type === "search-product") {
      let getAllDataSearch = async () => {
        dispatch(loadingProduct(true));
        await dispatch(
          fetchAllProductSearchRedux({
            limit: LIMIT_SEARCH,
            page: pageCount,
            name: searchText,
          })
        );
        dispatch(loadingProduct(false));
        dispatch(handleResetPagination(false));
        dispatch(handleResetPagination(false));
      };
      getAllDataSearch();
    } else if (type === "voucher") {
      let getAllDataVoucher = async () => {
        dispatch(loadingAdmin(true));
        await dispatch(
          fetchAllVoucherRedux({
            limit: LIMIT,
            page: pageCount,
            pagination: true,
          })
        );
        dispatch(loadingAdmin(false));
        dispatch(handleResetPagination(false));
      };
      getAllDataVoucher();
    } else if (type === "order") {
      let getAllOrder = async () => {
        dispatch(loadingProduct(true));
        await dispatch(
          fetchAllOrderRedux({
            userId: userId,
            status: orderStatus,
            limit: LIMIT_ORDER,
            page: pageCount,
          })
        );
        dispatch(loadingProduct(false));
        dispatch(handleResetPagination(false));
        dispatch(handleResetPagination(false));
      };
      getAllOrder();
    } else if (type === "order-admin") {
      let getAllOrder = async () => {
        dispatch(loadingAdmin(true));
        await dispatch(
          fetchAllOrderAdminRedux({
            limit: LIMIT,
            page: pageCount,
            status: orderStatus,
          })
        );
        dispatch(handleResetPagination(false));
        dispatch(loadingAdmin(false));
      };
      getAllOrder();
    } else if (type === "sale-off-product") {
      let getAllDataProduct = async () => {
        dispatch(loadingProduct(true));
        await dispatch(
          fetchAllProductSaleOffRedux({
            limit: LIMIT_SEARCH,
            page: pageCount,
          })
        );
        dispatch(loadingProduct(false));
        dispatch(handleResetPagination(false));
      };
      getAllDataProduct();
    } else if (type === "report-admin") {
      let getAllProduct = async () => {
        dispatch(loadingAdmin(true));
        await dispatch(
          fetchAllProductOrderRedux({
            limit: LIMIT,
            page: pageCount,
            timeStart: timeReport.timeStart,
            timeEnd: timeReport.timeEnd,
          })
        );
        dispatch(handleResetPagination(false));
        dispatch(loadingAdmin(false));
      };
      getAllProduct();
    } else if (type === "favourite-product") {
      let getAllDataProduct = async () => {
        dispatch(loadingProduct(true));
        await dispatch(
          fetchAllProductFavouriteRedux({
            userId: userId,
            limit: LIMIT_SEARCH,
            page: pageCount,
          })
        );
        dispatch(loadingProduct(false));
        dispatch(handleResetPagination(false));
      };
      getAllDataProduct();
    }
  }, [
    type,
    dispatch,
    pageCount,
    productData?.productId,
    productData?.productTypeData?.productTypeId,
    productTypeId,
    sort,
    filter,
    searchText,
    orderStatus,
    userId,
    searchProductAdmin,
    timeReport,
  ]);

  useEffect(() => {
    if (type === "user") {
      setTotalPage(totalPageUser);
    } else if (type === "product-brand") {
      setTotalPage(totalPageBrand);
    } else if (type === "product-type") {
      setTotalPage(totalPageProductType);
    } else if (type === "product-size") {
      setTotalPage(totalPageSize);
    } else if (type === "product") {
      setTotalPage(totalProduct);
    } else if (type === "productSize") {
      setTotalPage(totalProductSize);
    } else if (type === "user-product") {
      setTotalPage(totalProductOfTheProductType);
    } else if (type === "search-product") {
      setTotalPage(totalProductSearch);
    } else if (type === "voucher") {
      setTotalPage(totalVoucher);
    } else if (type === "order") {
      setTotalPage(totalOrder);
    } else if (type === "order-admin") {
      setTotalPage(totalOrderAdmin);
    } else if (type === "sale-off-product") {
      setTotalPage(totalProductSaleOff);
    } else if (type === "report-admin") {
      setTotalPage(totalProductOrder);
    } else if (type === "favourite-product") {
      setTotalPage(totalProductFavourite);
    }
  }, [
    totalOrder,
    totalProductFavourite,
    totalProductOrder,
    totalOrderAdmin,
    totalPageBrand,
    totalPageProductType,
    totalPageSize,
    totalPageUser,
    totalProduct,
    totalProductOfTheProductType,
    totalProductSearch,
    totalProductSize,
    totalVoucher,
    totalProductSaleOff,
    type,
  ]);

  const handlePageClick = (event) => {
    dispatch(handleChangePage(+event.selected + 1));
  };

  return (
    <div style={{ marginTop: "3rem" }}>
      {((type === "user-product" ||
        type === "sale-off-product" ||
        type === "report-admin" ||
        type === "favourite-product") &&
        (listProduct?.length === 0 ||
          listProductSaleOff?.length === 0 ||
          listProductOrder?.length === 0 ||
          listProductFavourite?.length === 0)) ||
      isResetPagination ? null : (
        <ReactPaginate
          nextLabel={
            <button>
              <span>Next</span>
              <ArrowForwardIcon fontSize="large" />
            </button>
          }
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={totalPage ? totalPage : 1}
          previousLabel={
            <button>
              <ArrowBackIcon fontSize="large" />
              <span>Prev</span>
            </button>
          }
          containerClassName={
            !isLoading ? styles.pagination : styles.hidePagination
          }
          pageLinkClassName={styles.number_a}
          previousClassName={styles.button}
          nextClassName={styles.button}
          activeClassName={styles.active}
          breakLabel="..."
          breakClassName={styles.break}
          renderOnZeroPageCount={null}
        />
      )}
    </div>
  );
}

export default PaginatedItems;
