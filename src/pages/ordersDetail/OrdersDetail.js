import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {
  handleGetOrderDetailService,
  handleCancleOrderService,
} from "../../services/orderService";
import "./OrdersDetail.scss";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleChangePage } from "../../redux-toolkit/paginationSlice";

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

function OrdersDetail() {
  const [orderDetailData, setOrderDetailData] = useState({});
  const [orderStatus, setOrderStatus] = useState(null);
  const userId = useSelector((state) => state.user.userInfo?.id);

  let { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let getOrderDeatil = async () => {
    try {
      let res = await handleGetOrderDetailService(orderId, userId);
      if (res && res.errCode === 0) {
        setOrderDetailData(res?.data);
        switch (res?.data?.status) {
          case 1:
            setOrderStatus("Chờ xác nhận");
            break;
          case 2:
            setOrderStatus("Đang giao");
            break;
          case 3:
            setOrderStatus("Đã giao");
            break;
          case 0:
            setOrderStatus("Đã hủy");
            break;
          default:
            break;
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getOrderDeatil(orderId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  let handleCancelOrder = async () => {
    try {
      let res = await handleCancleOrderService({
        userId: userId,
        orderId: orderId,
        orderDetail: orderDetailData?.orderDetail,
      });
      if (res && res.errCode === 0) {
        toast.success("Hũy đơn hàng thành công");
        dispatch(handleChangePage(1));
        navigate("/user/orders");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const formatterDate = (date) => {
    const dateObject = new Date(date);
    const formattedTime = dayjs(dateObject).format("DD/MM/YYYY");
    return formattedTime;
  };

  return (
    <div>
      <div className="orderdetail">
        <div className="information">
          <h3 style={{ marginBottom: 6 }}>
            Mã đơn hàng: {orderDetailData?.orderId}
          </h3>
          <h3 style={{ marginBottom: 6 }}>
            Ngày đặt hàng: {formatterDate(orderDetailData?.createdAt)}
          </h3>
          <h3 style={{ marginBottom: 6 }}>
            Tình trạng đơn hàng: {orderStatus}
          </h3>
        </div>

        <div className="information">
          <h3 style={{ marginBottom: 6 }}>
            Người nhận: {orderDetailData?.UserData?.userName}
          </h3>
          <h3 style={{ marginBottom: 6 }}>
            Số điện thoại: {orderDetailData?.UserData?.phoneNumber}
          </h3>
          <h3 style={{ marginBottom: 6 }}>
            Địa chỉ nhận hàng: {orderDetailData?.deliveryAddress}
          </h3>
        </div>

        <div className="information">
          <h3 style={{ marginBottom: 6 }}>Phương thức thanh toán:</h3>
          {orderDetailData?.payment === "COD" ? (
            <h4>Thanh toán khi nhận hàng (COD)</h4>
          ) : orderDetailData?.payment === "PAYPAL" ? (
            <h4>Thanh toán bằng Paypal</h4>
          ) : (
            <h4>Thanh toán bằng VNPAY</h4>
          )}
        </div>
      </div>

      <Grid container spacing={5} className="products">
        {orderDetailData?.orderDetail?.length > 0 &&
          orderDetailData?.orderDetail?.map((item, index) => (
            <Grid item sm={10} md={5} key={index}>
              <Box className="productDetail">
                <img
                  style={{ marginRight: 20, borderRadius: 20 }}
                  src={item.image}
                  alt="thumb"
                  className="thumbnail"
                ></img>
                <div className="info">
                  <div>{item.name}</div>
                  <div style={{ display: "flex", margin: "8px 0" }}>
                    <div
                      style={{
                        color: item.discount !== 0 ? "rgba(0,0,0,.54)" : "",
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
                    </div>
                    {item.discount !== 0 ? (
                      <div>
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
                      </div>
                    ) : null}
                  </div>
                  <div style={{ marginBottom: "8px" }}>
                    Kích cỡ: {item.sizeName}
                  </div>
                  <div>Số lượng: {item.quantity}</div>
                  <p style={{ color: "red" }}>
                    {currencyFormatter.format(item.totalPrice)}
                    <span
                      style={{
                        textDecoration: "underline",
                        marginLeft: 2,
                      }}
                    >
                      đ
                    </span>
                  </p>
                </div>
              </Box>
            </Grid>
          ))}
      </Grid>

      <div className="pay-contact-container">
        <div className="pay-contact">
          <div className="pay_discount">
            <div className="pay">
              <p className="txt_price">Tổng cộng:</p>
              <div className="price">
                {orderDetailData?.VoucherData?.voucherId
                  ? currencyFormatter.format(
                      orderDetailData?.totalPrice -
                        30000 +
                        orderDetailData?.VoucherData?.voucherPrice
                    )
                  : currencyFormatter.format(
                      orderDetailData?.totalPrice - 30000
                    )}
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

            <div className="pay">
              <p className="txt_price">Phí vận chuyển</p>
              <p className="price">
                {currencyFormatter.format(30000)}
                <span
                  style={{
                    textDecoration: "underline",
                    marginLeft: 2,
                  }}
                >
                  đ
                </span>
              </p>
            </div>

            {orderDetailData?.VoucherData?.voucherId ? (
              <div className="pay">
                <p className="txt_price">Giảm giá: </p>
                <p className="price_discount">
                  {currencyFormatter.format(
                    orderDetailData?.VoucherData?.voucherPrice
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
              </div>
            ) : null}

            <div className="pay">
              <p className="txt_pay">Phải trả</p>
              <p className="price">
                {currencyFormatter.format(orderDetailData?.totalPrice)}
                <span
                  style={{
                    textDecoration: "underline",
                    marginLeft: 2,
                  }}
                >
                  đ
                </span>
              </p>
            </div>
          </div>

          <div
            className="btn_contact"
            style={{
              justifyContent:
                orderDetailData?.status !== 1 ? "center" : "space-between",
            }}
          >
            {orderDetailData?.status === 1 ? (
              <button onClick={handleCancelOrder}>Xác nhận hủy</button>
            ) : null}
            <button>
              <a
                style={{ color: "white" }}
                href="https://www.facebook.com/profile.php?id=100075108746922"
              >
                Liên hệ shop
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default OrdersDetail;
