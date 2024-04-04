import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { loadingAdmin } from "../../redux-toolkit/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  handleCreateProductSizeService,
  handleUpdateProductSizeService,
} from "../../services/productService";
import "../admin.scss";
import { path as path_constant, regex } from "../../utils";

function ProductSizePost() {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { state, pathname } = useLocation();
  const { data } = state || {};
  const path = pathname.split("/");
  const [productId, setProductId] = useState("");
  const productData = useSelector((state) => state.admin.productData);
  const sizeProductTypes = useSelector(
    (state) => state.admin.allProductSizeOfTheProductType
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      setValue("productName", data.ProductSizeData?.name);
      setValue("sizeId", data.SizeData?.sizeId);
      setValue("quantity", data.quantity);
    }
    if (productData) {
      setValue("productName", productData.name);
      setProductId(productData.productId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, setValue, productData]);

  const onSubmit = async (submitData) => {
    if (path[4] === "create") {
      try {
        dispatch(loadingAdmin(true));
        let res = await handleCreateProductSizeService({
          sizeId: submitData.sizeId,
          productId: productId,
          quantity: submitData.quantity,
        });
        if (res && res.errCode === 0) {
          toast.success("Thêm kích cõ sản phẩm thành công");
          setValue("sizeId", "");
          setValue("quantity", "");

          navigate(
            `/admin/${path_constant.PRODUCT_ADMIN}/${path_constant.PRODUCT_PRODUCTSIZE_ADMIN}`
          );
        }
      } catch (err) {
        if (err.response.data.errCode === 2) {
          toast.error("Kích cỡ sản phẩm đã tồn tại");
        } else {
          toast.error(err?.response?.data?.message);
        }
      } finally {
        dispatch(loadingAdmin(false));
      }
    } else if (path[4] === "edit") {
      try {
        dispatch(loadingAdmin(true));

        let res = await handleUpdateProductSizeService({
          id: data.id,
          sizeId: submitData.sizeId,
          productId: productId,
          quantity: submitData.quantity,
        });
        if (res && res.errCode === 0) {
          toast.success("Cập nhật kích cỡ sản phẩm thành thành công");
          setValue("sizeId", "");
          setValue("quantity", "");

          navigate(
            `/admin/${path_constant.PRODUCT_ADMIN}/${path_constant.PRODUCT_PRODUCTSIZE_ADMIN}`
          );
        }
      } catch (err) {
        if (err.response.data.errCode === 2) {
          toast.error("Kích cỡ sản phẩm đã tồn tại");
        } else {
          toast.error(err?.response?.data?.message);
        }
      } finally {
        dispatch(loadingAdmin(false));
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="Modal-Add"
      style={{ width: 800 }}
    >
      <div>
        <h2
          style={{
            margin: "20px 0 30px 0",
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          {path[4] === "create"
            ? "Thêm kích cỡ sản phẩm"
            : "Sửa thông tin  kích cỡ sản phẩm"}
        </h2>
      </div>

      <div className="modal-add-input modal-add-input-flex">
        <p
          style={{
            fontSize: 18,
            fontWeight: "Bold",
            color: "#00000099",
          }}
        >
          Tên sản phẩm
        </p>
        <Controller
          control={control}
          name="productName"
          rules={{
            required: "Nhập tên sản phẩm",
          }}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              error={errors.productName ? true : false}
              variant="filled"
              disabled
              hiddenLabel
              InputProps={{
                style: {
                  fontSize: "var(--text-fontSize)",
                },
              }}
              style={{
                marginTop: 15,
                width: "100%",
                fontSize: 30,
              }}
            />
          )}
        />
        {errors.productName && (
          <p className="error-message">{errors.productName.message}</p>
        )}
      </div>
      <div className="modal-add-input modal-add-input-flex">
        <p
          style={{
            fontSize: 18,
            fontWeight: "Bold",
            color: "#00000099",
          }}
        >
          Kích cỡ
        </p>
        <Controller
          control={control}
          name="sizeId"
          rules={{
            required: "Chọn loại sản phẩm",
          }}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              error={errors.sizeId ? true : false}
              select
              variant="filled"
              hiddenLabel
              InputProps={{
                style: {
                  fontSize: "var(--text-fontSize)",
                },
              }}
              SelectProps={{
                IconComponent: () => (
                  <ArrowDropDownIcon
                    style={{
                      fontSize: "3.5rem",
                    }}
                  />
                ),
              }}
              style={{
                marginTop: 15,
                width: "100%",
                fontSize: 30,
              }}
            >
              {sizeProductTypes &&
                sizeProductTypes.length > 0 &&
                sizeProductTypes.map((option) => (
                  <MenuItem
                    key={option.sizeId}
                    value={option.sizeId}
                    style={{
                      fontSize: "var(--text-fontSize)",
                    }}
                  >
                    {option.sizeName}
                  </MenuItem>
                ))}
            </TextField>
          )}
        />
        {errors.sizeId && (
          <p className="error-message">{errors.sizeId.message}</p>
        )}
      </div>
      <div className="modal-add-input modal-add-input-flex">
        <p
          style={{
            fontSize: 18,
            fontWeight: "Bold",
            color: "#00000099",
          }}
        >
          Số lượng sản phẩm
        </p>
        <Controller
          control={control}
          name="quantity"
          rules={{
            required: "Nhập số lượng sản phẩm",
            pattern: {
              value: regex.QUANTITY,
              message: "Số lượng không hợp lệ",
            },
          }}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              error={errors.quantity ? true : false}
              variant="filled"
              hiddenLabel
              InputProps={{
                style: {
                  fontSize: "var(--text-fontSize)",
                },
              }}
              style={{
                marginTop: 15,
                width: "100%",
              }}
            />
          )}
        />
        {errors.quantity && (
          <p className="error-message">{errors.quantity.message}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="contained"
        className="btn"
        style={{ margin: "30px 0" }}
      >
        {path[4] === "create" ? "Thêm" : "Cập nhật"}
      </Button>
    </form>
  );
}

export default ProductSizePost;
