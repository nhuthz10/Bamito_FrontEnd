import React, { useEffect } from "react";
import { Button, TextField, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useForm, Controller } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "../admin.scss";
import {
  handleUpdateSizeService,
  handleCreateSizeService,
} from "../../services/productService";
import { loadingAdmin } from "../../redux-toolkit/adminSlice";
import { useDispatch } from "react-redux";
import CreateCode from "../../utils/commonUtils";
import { path as path_constant } from "../../utils";

function SizePost() {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { state, pathname } = useLocation();
  const { data, productTypeData } = state || {};
  const path = pathname.split("/");
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      setValue("sizeID", data.sizeId);
      setValue("sizeName", data.sizeName);
      setValue("productType", data.productTypeSizeData?.productTypeId);
    }
  }, [data, setValue]);

  const onSubmit = async (submitData) => {
    if (path[3] === "create") {
      try {
        dispatch(loadingAdmin(true));
        let res = await handleCreateSizeService({
          sizeId: submitData.sizeID,
          productTypeId: submitData.productType,
          sizeName: submitData.sizeName,
        });
        if (res && res.errCode === 0) {
          toast.success("Thêm size thành công");
          setValue("sizeID", "");
          setValue("productType", "");
          setValue("sizeName", "");
          navigate(`/admin/${path_constant.PRODUCT_SIZE_ADMIN}`);
        }
      } catch (err) {
        if (err?.response?.data?.errCode === 2) {
          toast.error("Mã size đã tồn tại");
        } else if (err?.response?.data?.errCode === 3) {
          toast.error("Tên size đã tồn tại");
        } else {
          toast.error(err?.response?.data?.message);
        }
      } finally {
        dispatch(loadingAdmin(false));
      }
    } else if (path[3] === "edit") {
      try {
        dispatch(loadingAdmin(true));
        let res = await handleUpdateSizeService({
          id: data.id,
          sizeId: submitData.sizeID,
          productTypeId: submitData.productType,
          sizeName: submitData.sizeName,
        });
        if (res && res.errCode === 0) {
          toast.success("Cập nhật size thành công");
          setValue("sizeID", "");
          setValue("productType", "");
          setValue("sizeName", "");
          navigate(`/admin/${path_constant.PRODUCT_SIZE_ADMIN}`);
        }
      } catch (err) {
        if (err?.response?.data?.errCode === 2) {
          toast.error("Mã size đã tồn tại");
        } else if (err?.response?.data?.errCode === 3) {
          toast.error("Tên size đã tồn tại");
        } else if (err?.response?.data?.errCode === 4) {
          toast.error("Size không tồn tại");
        } else {
          toast.error(err?.response?.data?.message);
        }
      } finally {
        dispatch(loadingAdmin(false));
      }
    }
  };

  const handleChangeSizeName = (e) => {
    if (e.target.value) {
      let sizeId = CreateCode(e.target.value);
      setValue("sizeID", sizeId, { shouldValidate: true });
    } else {
      setValue("sizeID", "", { shouldValidate: false });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="Modal-Add">
      <h2 className="header-text">
        {path[3] === "create" ? "Thêm size" : "Sửa size"}
      </h2>
      <div className="modal-add-input">
        <p className="label">Loại sản phẩm</p>
        <Controller
          control={control}
          name="productType"
          rules={{
            required: "Chọn mã size",
          }}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              error={errors.productType ? true : false}
              select
              variant="filled"
              hiddenLabel
              inputProps={{ className: "text-field-text" }}
              SelectProps={{
                IconComponent: () => (
                  <ArrowDropDownIcon
                    style={{
                      fontSize: "3.5rem",
                    }}
                  />
                ),
              }}
              className="text-field"
            >
              {productTypeData &&
                productTypeData.length > 0 &&
                productTypeData.map((option) => (
                  <MenuItem
                    key={option.productTypeId}
                    value={option.productTypeId}
                    style={{
                      fontSize: "var(--text-fontSize)",
                    }}
                  >
                    {option.productTypeName}
                  </MenuItem>
                ))}
            </TextField>
          )}
        />
        {errors.productType && (
          <p className="error-message">{errors.productType.message}</p>
        )}
      </div>
      <div className="modal-add-input">
        <p className="label">Mã size</p>
        <Controller
          control={control}
          name="sizeID"
          rules={{
            required: "Nhập mã size",
          }}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              error={errors.sizeID ? true : false}
              variant="filled"
              hiddenLabel
              inputProps={{ className: "text-field-text" }}
              className="text-field"
            />
          )}
        />
        {errors.sizeID && (
          <p className="error-message">{errors.sizeID.message}</p>
        )}
      </div>
      <div className="modal-add-input">
        <p className="label">Tên size</p>
        <Controller
          control={control}
          name="sizeName"
          rules={{
            required: "Nhập tên size",
          }}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              error={errors.sizeName ? true : false}
              variant="filled"
              onChange={(e) => {
                field.onChange(e);
                handleChangeSizeName(e);
              }}
              hiddenLabel
              inputProps={{ className: "text-field-text" }}
              className="text-field"
            />
          )}
        />
        {errors.sizeName && (
          <p className="error-message">{errors.sizeName.message}</p>
        )}
      </div>

      <Button type="submit" variant="contained" className="btn">
        {path[3] === "create" ? "Thêm" : "Cập nhật"}
      </Button>
    </form>
  );
}

export default SizePost;
