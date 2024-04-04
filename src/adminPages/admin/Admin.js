import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./admin.scss";
import Chart from "../../components/chart/Chart";
import revenueImg from "../../assets/image 29.png";
import orderImg from "../../assets/image 28.png";
import productImg from "../../assets/image 27.png";
import { handleGetAllOrderStatistics } from "../../services/productService";
import img34 from "../../assets/image 34.png";
import img35 from "../../assets/image 35.png";
import img36 from "../../assets/image 36.png";
import img37 from "../../assets/image 37.png";

const xLabels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

function Admin() {
  const [revenueData, setRevenueData] = useState([]);
  const [allOrderStatus, setAllOrderStatus] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalOrer, setTotalOrder] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [chartData, setChartData] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  useEffect(() => {
    let getAllOrderStatistics = async () => {
      try {
        let res = await handleGetAllOrderStatistics();
        if (res && res.errCode === 0) {
          setRevenueData(res?.data?.allProduct);
          setTotalIncome(res?.data?.totalIncome);
          setTotalOrder(res?.data?.totalOrder);
          setTotalProduct(res?.data?.totalProduct);
          setAllOrderStatus(
            res?.data?.allTotalOrder.map((status) => {
              if (status.label === "Xác nhận") {
                status.img = img37;
                status.to = "order-waiting";
              } else if (status.label === "Đang giao") {
                status.img = img36;
                status.to = "order-delivery";
              } else if (status.label === "Hoàn tất") {
                status.img = img34;
                status.to = "order-done";
              } else {
                status.img = img35;
                status.to = "order-canceled";
              }
              return status;
            })
          );
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
      }
    };
    getAllOrderStatistics();
  }, []);

  useEffect(() => {
    const handleRevenueToMonth = () => {
      const newData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      revenueData?.forEach((item) => {
        let currentYear = new Date().getFullYear();
        let date = new Date(item.time);
        let month = date.getMonth();
        let year = date.getFullYear();
        if (year === currentYear) {
          switch (month) {
            case 0:
              newData[0] += item.totalPrice;
              break;
            case 1:
              newData[1] += item.totalPrice;
              break;
            case 2:
              newData[2] += item.totalPrice;
              break;
            case 3:
              newData[3] += item.totalPrice;
              break;
            case 4:
              newData[4] += item.totalPrice;
              break;
            case 5:
              newData[5] += item.totalPrice;
              break;
            case 6:
              newData[6] += item.totalPrice;
              break;
            case 7:
              newData[7] += item.totalPrice;
              break;
            case 8:
              newData[8] += item.totalPrice;
              break;
            case 9:
              newData[9] += item.totalPrice;
              break;
            case 10:
              newData[10] += item.totalPrice;
              break;
            case 11:
              newData[11] += item.totalPrice;
              break;
            default:
              break;
          }
        }
      });
      setChartData(newData);
    };
    handleRevenueToMonth();
  }, [revenueData]);

  return (
    <div className="admin-overview">
      <div className="statistic">
        <div className="statistic-item">
          <img className="statistic-item-img" src={revenueImg} alt="img"></img>
          <div className="statistic-item-info">
            <p className="text">Tổng doanh thu</p>
            <p className="number">{currencyFormatter.format(totalIncome)}</p>
          </div>
        </div>
        <div className="statistic-item">
          <img className="statistic-item-img" src={productImg} alt="img"></img>
          <div className="statistic-item-info">
            <p className="text">Tổng đơn hàng</p>
            <p className="number">{currencyFormatter.format(totalOrer)}</p>
          </div>
        </div>
        <div className="statistic-item">
          <img className="statistic-item-img" src={orderImg} alt="img"></img>
          <div className="statistic-item-info">
            <p className="text">Tổng sản phẩm</p>
            <p className="number">{currencyFormatter.format(totalProduct)}</p>
          </div>
        </div>
      </div>
      <div className="chart-container">
        <h1 className="text">THỐNG KÊ DOANH THU</h1>
        <Chart chartData={chartData} xLabels={xLabels} />
      </div>
      <div className="order-status-container">
        <h1 className="order-status-heading">THỐNG KÊ TRẠNG THÁI ĐƠN HÀNG</h1>
        <Grid className="order-status-grid-container" container>
          <Grid className="order-status-item order-item-left" item xs={6}>
            <h2>Trạng thái đơn hàng</h2>
          </Grid>
          <Grid className="order-status-item order-item-right" item xs={6}>
            <h2>Số lượng</h2>
          </Grid>
          {allOrderStatus?.length > 0 &&
            allOrderStatus?.map((item, index) => (
              <React.Fragment key={index}>
                <Grid className="order-status-item order-item-left" item xs={6}>
                  <img src={item.img} alt="img"></img>
                  <p>{item.label}</p>
                </Grid>
                <Grid
                  className="order-status-item order-item-right"
                  item
                  xs={6}
                >
                  <p>{item.quantity}</p>
                  <Link className="detail" to={item.to}>
                    Xem chi tiết
                  </Link>
                </Grid>
              </React.Fragment>
            ))}
        </Grid>
      </div>
    </div>
  );
}

export default Admin;
