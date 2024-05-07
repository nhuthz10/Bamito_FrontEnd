import React, { useEffect, useState, useRef } from "react";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import RemoveIcon from "@mui/icons-material/Remove";
import { PayPalButton } from "react-paypal-button-v2";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MonetizationOnTwoToneIcon from "@mui/icons-material/MonetizationOnTwoTone";
import PaymentsIcon from "@mui/icons-material/Payments";
import PaymentTwoToneIcon from "@mui/icons-material/PaymentTwoTone";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  handleGetAllProductCart,
  handleUpdateProductCartService,
  handleDeleteProductCartService,
  handleCreateNewOrderService,
  handlePaymentByVnPayService,
} from "../../services/productService";
import { handleGetInforUserService } from "../../services/userService";
import { handleGetPaypalClientId } from "../../services/productService";
import { useSelector } from "react-redux";
import styles from "./Cart.module.scss";
import Voucher from "../../components/voucher/Voucher";
import { useDebounce } from "../../utils/commonUtils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

function Cart() {
  const [paymentValue, setPaymentValue] = useState("COD");
  const [allProduct, setAllProduct] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({});
  const [voucherSelect, setVoucherSelect] = useState(false);
  const [voucherPrice, setVoucherPrice] = useState(0);
  const [isScript, setIsScript] = useState(false);
  const [voucherId, setVoucherId] = useState("");
  const [currentTotalPrice, setCurrentTotalPrice] = useState("");
  const [pricePaypal, setPricePaypal] = useState("");
  const cartId = useSelector((state) => state.user.cartId);
  const userId = useSelector((state) => state.user.userInfo.id);
  const paymentRef = useRef(null);
  const [userInfo, setUserInfo] = useState({});
  const navigation = useNavigate();

  let currentProductDebounce = useDebounce(currentProduct, 500);

  let getInforUser = async () => {
    try {
      let access_token = localStorage.getItem("access_token");
      let res = await handleGetInforUserService(userId, access_token);
      if (res && res.errCode === 0) {
        setUserInfo({
          name: res?.data?.userName,
          phone: res?.data?.phoneNumber,
          address: res?.data?.deliveryAddressData[0],
          email: res?.data?.email,
        });
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllProductCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartId]);

  useEffect(() => {
    getInforUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPricePaypal(currentTotalPrice - voucherPrice + 30000);
  }, [voucherPrice, currentTotalPrice]);

  useEffect(() => {
    if (Object.keys(currentProduct).length !== 0) {
      updateProductCart(currentProduct);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProductDebounce]);

  useEffect(() => {
    const paymentElement = paymentRef.current;
    if (!paymentElement) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            handleIntersection(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    paymentElement.childNodes.forEach((child) => {
      if (child.nodeType === 1) {
        observer.observe(child);
      }
    });
    return () => {
      observer.disconnect();
    };
  }, [paymentValue]);

  const handleIntersection = (target) => {
    var elements = document.querySelectorAll(".paypal-buttons");
    var elementToKeep = elements[0];

    elements.forEach(function (element) {
      if (elementToKeep && element !== elementToKeep) {
        element.style.display = "none";
      }
    });
  };

  const handleAddScriptPaypal = async () => {
    try {
      let res = await handleGetPaypalClientId();
      if (res && res.errCode === 0) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://www.paypal.com/sdk/js?client-id=${res?.data}`;
        script.async = true;
        script.onload = () => {
          setIsScript(true);
        };
        document.body.appendChild(script);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!window.paypal) {
      handleAddScriptPaypal();
    } else {
      setIsScript(true);
    }
  }, []);

  const updateProductCart = async (data) => {
    try {
      let res = await handleUpdateProductCartService(data);
      if (res && res.errCode === 0) {
        getAllProductCart();
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const getAllProductCart = async () => {
    try {
      let res = await handleGetAllProductCart(cartId);
      if (res && res.errCode === 0) {
        setAllProduct(res?.data);
        let totalPrice = res?.data?.reduce(
          (accumulator, product) => product.totalPrice + accumulator,
          0
        );
        setCurrentTotalPrice(totalPrice);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleChangePayment = (e) => {
    if (!userInfo.phone) {
      toast.error("Vui lòng cập nhật số điện thoại để tiếp tục mua hàng");
    } else if (!userInfo.address) {
      toast.error("Vui lòng cập nhật địa chỉ để tiếp tục mua hàng");
    } else if (allProduct?.length === 0 && e.target.value === "PAYPAL") {
      toast.error("Không có sản phẩm nào để đặt hàng");
    } else {
      setPaymentValue(e.target.value);
    }
  };

  const handleChangeName = (e) => {
    setUserInfo({ ...userInfo, name: e.target.value });
  };

  const handleChangePhone = (e) => {
    setUserInfo({ ...userInfo, phone: e.target.value });
  };

  const handleChangeAddress = (e) => {
    setUserInfo({ ...userInfo, address: e.target.value });
  };

  const handleChangeEmail = (e) => {
    setUserInfo({ ...userInfo, email: e.target.value });
  };

  const handleSelectVoucher = () => {
    setVoucherSelect(true);
  };

  const handleDecrement = (product) => {
    if (product.quantity >= 2) {
      let currentProduct = allProduct.map((item) => {
        if (
          item.productId === product.productId &&
          item.sizeId === product.sizeId
        ) {
          item.quantity = item.quantity - 1;
        }
        return item;
      });
      setCurrentProduct({
        cartId: cartId,
        productId: product.productId,
        quantity: product.quantity,
        sizeId: product.sizeId,
        totalPrice:
          +product.quantity *
          (+product.price - (+product.price * +product.discount) / 100),
      });
      setAllProduct(currentProduct);
    }
  };

  const handleIncrement = (product) => {
    if (product.quantity < product.quantitySize) {
      let currentProduct = allProduct.map((item) => {
        if (
          item.productId === product.productId &&
          item.sizeId === product.sizeId
        ) {
          item.quantity = item.quantity + 1;
        }
        return item;
      });
      setCurrentProduct({
        cartId: cartId,
        productId: product.productId,
        quantity: product.quantity,
        sizeId: product.sizeId,
        totalPrice:
          +product.quantity *
          (+product.price - (+product.price * +product.discount) / 100),
      });
      setAllProduct(currentProduct);
    }
  };

  const handleDeleteProductCart = async (product) => {
    try {
      let res = await handleDeleteProductCartService(
        cartId,
        product.productId,
        product.sizeId
      );
      if (res && res.errCode === 0) {
        getAllProductCart();
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleOrderProduct = async () => {
    if (!userInfo.phone) {
      toast.error("Vui lòng cập nhật số điện thoại để tiếp tục mua hàng");
    } else if (!userInfo.address) {
      toast.error("Vui lòng cập nhật địa chỉ để tiếp tục mua hàng");
    } else {
      if (allProduct?.length > 0) {
        if (paymentValue === "COD") {
          try {
            let res = await handleCreateNewOrderService({
              cartId: cartId,
              userId: userId,
              voucherId: voucherId,
              payment: paymentValue,
              totalPrice: pricePaypal,
              deliveryAddress: userInfo.address,
              status: 1,
            });
            if (res && res.errCode === 0) {
              getAllProductCart();
              toast.success("Đặt hàng thành công");
              navigation(`/user/orders/${res?.orderId}`);
            }
          } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
          }
        }
        if (paymentValue === "VNPAY") {
          try {
            let res = await handlePaymentByVnPayService({
              cartId: cartId,
              userId: userId,
              voucherId: voucherId,
              payment: paymentValue,
              totalPrice: pricePaypal,
              deliveryAddress: userInfo.address,
              status: 1,
            });
            if (res && res.errCode === 0) {
              // getAllProductCart();
              // toast.success("Đặt hàng thành công");
              window.location.href = res.urlPayment;
            }
          } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
          }
        }
      } else {
        toast.error("Không có sản phẩm nào để đặt hàng");
      }
    }
  };

  const handlePaymentByPaypal = async (data, detail) => {
    try {
      let res = await handleCreateNewOrderService({
        cartId: cartId,
        userId: userId,
        voucherId: voucherId,
        payment: paymentValue,
        totalPrice: pricePaypal,
        deliveryAddress: userInfo.address,
        status: 1,
      });
      if (res && res.errCode === 0) {
        getAllProductCart();
        toast.success("Đặt hàng thành công");
        navigation(`/user/orders/${res?.orderId}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className={styles.page}>
      <h1>Giỏ hàng của bạn</h1>
      <div className={styles.container}>
        <div className={styles.product}>
          {allProduct &&
            allProduct?.length > 0 &&
            allProduct?.map((product, index) => {
              return (
                <div key={index}>
                  <div className={styles.eachProduct}>
                    <div className={styles.inforProduct}>
                      <img
                        src={product.image}
                        alt="product"
                        className={styles.imgProduct}
                      />
                      <div className={styles.namePriceProduct}>
                        <div className={styles.nameProduct}>
                          <p>{product.name}</p>
                        </div>
                        <div className={styles.priceProduct}>
                          <p
                            style={{
                              color:
                                product.discount !== 0
                                  ? "rgba(0,0,0,.54)"
                                  : "var(--primary-color)",
                              textDecoration:
                                product.discount !== 0 ? "line-through" : "",
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
                        <div style={{ fontSize: "var(--text-fontSize)" }}>
                          Kích cỡ: {product.sizeName}
                        </div>
                        <div className={styles.totalPrice}>
                          <p>
                            {currencyFormatter.format(product.totalPrice)}
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
                    </div>

                    <div className={styles.actionProduct}>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDeleteProductCart(product)}
                      >
                        <DeleteForeverTwoToneIcon
                          className={styles.deleteIcon}
                        />
                      </button>
                      <div className={styles.quantityBtn}>
                        <button
                          className={styles.subtractBtn}
                          onClick={() => handleDecrement(product)}
                        >
                          <RemoveIcon className={styles.quantityIcon} />
                        </button>
                        <p>{product.quantity}</p>
                        <button
                          className={styles.addBtn}
                          onClick={() => handleIncrement(product)}
                        >
                          <AddTwoToneIcon className={styles.quantityIcon} />
                        </button>
                      </div>
                    </div>
                  </div>
                  {allProduct?.length - 1 !== index ? (
                    <div className={styles.line}></div>
                  ) : null}
                </div>
              );
            })}
        </div>
        <div className={styles.order}>
          {!voucherSelect ? (
            <>
              <div className={styles.orderElementWrapper}>
                <h1>Thông tin người nhận</h1>
                <div className={styles.orderElement}>
                  <label htmlFor="name" className={styles.label}>
                    Họ tên
                  </label>
                  <TextField
                    className={styles.input}
                    variant="standard"
                    error={userInfo?.name?.length === 0 ? true : false}
                    inputProps={{
                      id: "name",
                      style: { textAlign: "right", fontSize: "2rem" },
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                    FormHelperTextProps={{
                      style: {
                        textAlign: "right",
                        fontSize: "1.5rem",
                        fontFamily: "Inter, sans-serif",
                      },
                    }}
                    value={userInfo.name ? userInfo.name : ""}
                    onChange={handleChangeName}
                  />
                </div>
                <div className={styles.orderElement}>
                  <label htmlFor="phone" className={styles.label}>
                    Số điện thoại
                  </label>
                  <TextField
                    className={styles.input}
                    variant="standard"
                    error={
                      userInfo?.phone?.length === 0 || !userInfo?.phone
                        ? true
                        : false
                    }
                    inputProps={{
                      id: "phone",
                      style: { textAlign: "right", fontSize: "2rem" },
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                    FormHelperTextProps={{
                      style: {
                        textAlign: "right",
                        fontSize: "1.5rem",
                        fontFamily: "Inter, sans-serif",
                      },
                    }}
                    value={userInfo.phone ? userInfo.phone : ""}
                    onChange={handleChangePhone}
                  />
                </div>
                <div className={styles.orderElement}>
                  <label htmlFor="address" className={styles.label}>
                    Địa chỉ
                  </label>
                  <TextField
                    className={styles.input}
                    variant="standard"
                    error={
                      userInfo?.address?.length === 0 || !userInfo?.address
                        ? true
                        : false
                    }
                    inputProps={{
                      id: "address",
                      style: { textAlign: "right", fontSize: "2rem" },
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                    FormHelperTextProps={{
                      style: {
                        textAlign: "right",
                        fontSize: "1.5rem",
                        fontFamily: "Inter, sans-serif",
                      },
                    }}
                    value={userInfo.address ? userInfo.address : ""}
                    onChange={handleChangeAddress}
                  />
                </div>
                <div className={styles.orderElement}>
                  <label htmlFor="email" className={styles.label}>
                    Email
                  </label>
                  <TextField
                    className={styles.input}
                    variant="standard"
                    error={userInfo?.email?.length === 0 ? true : false}
                    inputProps={{
                      id: "email",
                      style: { textAlign: "right", fontSize: "2rem" },
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                    FormHelperTextProps={{
                      style: {
                        textAlign: "right",
                        fontSize: "1.5rem",
                        fontFamily: "Inter, sans-serif",
                      },
                    }}
                    value={userInfo.email ? userInfo.email : ""}
                    onChange={handleChangeEmail}
                  />
                </div>
              </div>

              <div className={styles.line}></div>

              <div className={styles.orderElementWrapper}>
                <h1>Thông tin đơn hàng</h1>
                <div className={styles.orderElement}>
                  <label className={styles.label}>Tổng cộng</label>
                  <TextField
                    className={styles.input}
                    variant="standard"
                    value={
                      currentTotalPrice
                        ? currencyFormatter.format(currentTotalPrice)
                        : 0
                    }
                    inputProps={{
                      style: { textAlign: "right", fontSize: "2rem" },
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
                <div className={styles.orderElement}>
                  <label className={styles.label}>Giảm giá</label>
                  <TextField
                    className={styles.input}
                    variant="standard"
                    value={`- ${currencyFormatter.format(voucherPrice)}`}
                    inputProps={{
                      style: {
                        textAlign: "right",
                        fontSize: "2rem",
                        color: "red",
                      },
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
                <div className={styles.orderElement}>
                  <label className={styles.label}>Phí vận chuyển</label>
                  <TextField
                    className={styles.input}
                    variant="standard"
                    value={currencyFormatter.format(30000)}
                    inputProps={{
                      style: { textAlign: "right", fontSize: "2rem" },
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
                <div className={styles.orderElement}>
                  <label className={styles.label}>Phải trả</label>
                  <TextField
                    className={styles.input}
                    variant="standard"
                    value={
                      pricePaypal ? currencyFormatter.format(pricePaypal) : 0
                    }
                    inputProps={{
                      style: { textAlign: "right", fontSize: "2rem" },
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
              </div>

              <div className={styles.line}></div>

              <div className={styles.orderElementWrapper}>
                <h1>Phương thức thanh toán</h1>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  className={styles.radioGroup}
                  onChange={handleChangePayment}
                  value={paymentValue}
                >
                  <FormControlLabel
                    value="COD"
                    control={
                      <Radio
                        sx={{
                          "&.Mui-checked": {
                            color: "var(--primary-color)",
                          },
                        }}
                      />
                    }
                    label={
                      <span className={styles.radioLabel}>
                        <p>Khi nhận hàng</p>{" "}
                        <MonetizationOnTwoToneIcon
                          style={{
                            fontSize: "3.5rem",
                            color:
                              paymentValue === "COD"
                                ? "var(--primary-color)"
                                : null,
                          }}
                        />
                      </span>
                    }
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: "2.5rem",
                      },
                      width: "30rem",
                    }}
                    className={styles.radio}
                  />
                  <FormControlLabel
                    value="VNPAY"
                    control={
                      <Radio
                        sx={{
                          "&.Mui-checked": {
                            color: "var(--primary-color)",
                          },
                        }}
                      />
                    }
                    label={
                      <span className={styles.radioLabel}>
                        <p
                          style={{
                            marginRight: "12.3rem",
                          }}
                        >
                          VNPAY
                        </p>
                        <PaymentsIcon
                          style={{
                            fontSize: "3.5rem",
                            color:
                              paymentValue === "VNPAY"
                                ? "var(--primary-color)"
                                : null,
                          }}
                        />
                      </span>
                    }
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: "2.5rem",
                      },
                      width: "30rem",
                    }}
                    className={styles.radio}
                  />
                  <FormControlLabel
                    value="PAYPAL"
                    control={
                      <Radio
                        sx={{
                          "&.Mui-checked": {
                            color: "var(--primary-color)",
                          },
                        }}
                      />
                    }
                    label={
                      <span className={styles.radioLabel}>
                        <p style={{ marginRight: "12.5rem" }}>PayPal</p>
                        <PaymentTwoToneIcon
                          style={{
                            fontSize: "3.5rem",
                            color:
                              paymentValue === "PAYPAL"
                                ? "var(--primary-color)"
                                : null,
                          }}
                        />
                      </span>
                    }
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: "2.5rem",
                      },
                      width: "30rem",
                    }}
                    className={styles.radio}
                  />
                </RadioGroup>
              </div>

              <div
                className="payment"
                ref={paymentRef}
                style={{ marginTop: "2.5rem" }}
              >
                {paymentValue === "PAYPAL" && isScript ? (
                  <PayPalButton
                    amount={Math.round(pricePaypal / 25000)}
                    onSuccess={handlePaymentByPaypal}
                    onError={(data) => {
                      console.log(data);
                    }}
                  />
                ) : null}
              </div>

              <div className={styles.line}></div>

              <div className={styles.voucherWrapper}>
                <div className={styles.voucherName}>
                  <SellOutlinedIcon className={styles.voucherIcon} />
                  <p>
                    {voucherId === ""
                      ? "Hãy chọn mã voucher của bạn"
                      : voucherId}
                  </p>
                </div>
                <button
                  className={styles.voucherBtn}
                  onClick={handleSelectVoucher}
                >
                  <p>Chọn Voucher</p>
                </button>
              </div>

              <button className={styles.orderBtn} onClick={handleOrderProduct}>
                <ShoppingCartIcon className={styles.orderIcon} />
                <p>Đặt hàng</p>
              </button>
            </>
          ) : (
            <Voucher
              setVoucherSelect={setVoucherSelect}
              setVoucherPrice={setVoucherPrice}
              setVoucherId={setVoucherId}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
