import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ordersHistory.scss";
import PaginatedItems from "../../components/Pagination/Pagination";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { handleChangePage } from "../../redux-toolkit/paginationSlice";
import dayjs from "dayjs";

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

function OrdersHistory() {
  const STATUSES = [
    {
      key: 1,
      value: "Chờ xác nhận",
      selected: true,
    },
    {
      key: 2,
      value: "Đang giao",
      selected: false,
    },
    {
      key: 3,
      value: "Hoàn tất",
      selected: false,
    },
    {
      key: 0,
      value: "Đã hủy",
      selected: false,
    },
  ];
  const [orderStatus, setOrderStatus] = useState(1);
  const [allStatus, setAllStatus] = useState(STATUSES);
  const allOrder = useSelector((state) => state.order.allOrder.data);
  const dispatch = useDispatch();

  const handleChangeStatus = (status) => {
    let result = allStatus.map((item) => {
      item.key === status.key
        ? (item.selected = true)
        : (item.selected = false);
      return item;
    });
    setAllStatus(result);
    setOrderStatus(status.key);
    dispatch(handleChangePage(1));
  };

  const formatterDate = (date) => {
    const dateObject = new Date(date);
    const formattedTime = dayjs(dateObject).format("DD/MM/YYYY");
    return formattedTime;
  };

  return (
    <div className="pageOrdersHitory">
      <div className="btn-order-status-container">
        {allStatus &&
          allStatus?.length > 0 &&
          allStatus?.map((status, index) => (
            <button
              key={index}
              onClick={() => handleChangeStatus(status)}
              className={`btn_orderStatus ${status.selected ? "active" : null}`}
            >
              {status.value}
            </button>
          ))}
      </div>

      <div style={{ minHeight: "60rem" }}>
        <table className="orders">
          <tbody>
            {allOrder && allOrder?.length !== 0
              ? allOrder?.map((order, index) => {
                  return (
                    <tr className="order-row" key={index}>
                      <td>{index + 1}</td>
                      <td>Mã đơn hàng: {order.orderId}</td>
                      <td>Ngày đặt: {formatterDate(order.createdAt)}</td>
                      <td>
                        Tổng tiền: {currencyFormatter.format(order.totalPrice)}
                        <span
                          style={{
                            textDecoration: "underline",
                            marginLeft: 2,
                          }}
                        >
                          đ
                        </span>
                      </td>
                      <td>
                        <Link to={order.orderId} className="link">
                          Xem chi tiết
                        </Link>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>

      <PaginatedItems type={"order"} orderStatus={orderStatus} />
    </div>
  );
}

export default OrdersHistory;
