import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { Button, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import { path as path_constant } from "../../utils";
import {
  handleCreateBrandService,
  handleUpdateBrandService,
} from "../../services/productService";
import { loadingAdmin } from "../../redux-toolkit/adminSlice";
import { useDispatch } from "react-redux";
import CreateCode from "../../utils/commonUtils";
import "../admin.scss";

function BrandPost() {
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
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      setValue("brandID", data.brandId);
      setValue("brandName", data.brandName);
    }
  }, [data, setValue]);

  const onSubmit = async (submitData) => {
    if (path[3] === "create") {
      try {
        dispatch(loadingAdmin(true));
        let res = await handleCreateBrandService({
          brandId: submitData.brandID,
          brandName: submitData.brandName,
        });
        if (res && res.errCode === 0) {
          toast.success("Thêm thương hiệu thành công");
          setValue("brandID", "");
          setValue("brandName", "");

          navigate(`/admin/${path_constant.PRODUCT_BRAND_ADMIN}`);
        }
      } catch (err) {
        if (err?.response?.data?.errCode === 2) {
          toast.error("Mã thương hiệu đã tồn tại");
        } else if (err?.response?.data?.errCode === 3) {
          toast.error("Tên thương hiệu đã tồn tại");
        } else {
          toast.error(err?.response?.data?.message);
        }
      } finally {
        dispatch(loadingAdmin(false));
      }
    } else if (path[3] === "edit") {
      try {
        dispatch(loadingAdmin(true));
        let res = await handleUpdateBrandService({
          id: data.id,
          brandId: submitData.brandID,
          brandName: submitData.brandName,
        });
        if (res && res.errCode === 0) {
          toast.success("Cập nhật thông thương hiệu thành công");
          navigate(`/admin/${path_constant.PRODUCT_BRAND_ADMIN}`);
        }
      } catch (err) {
        if (err?.response?.data?.errCode === 2) {
          toast.error("Mã thương hiệu đã tồn tại");
        } else if (err?.response?.data?.errCode === 3) {
          toast.error("Tên thương hiệu đã tồn tại");
        } else if (err?.response?.data?.errCode === 4) {
          toast.error("Thương hiệu không tồn tại");
        } else {
          toast.error(err?.response?.data?.message);
        }
      } finally {
        dispatch(loadingAdmin(false));
      }
    }
  };

  const handleChangeBrandName = (e) => {
    if (e.target.value) {
      let brandID = CreateCode(e.target.value);
      setValue("brandID", brandID, { shouldValidate: true });
    } else {
      setValue("brandID", "", { shouldValidate: false });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="Modal-Add">
      <h2 className="header-text">
        {path[3] === "create" ? "Thêm thương hiệu" : "Sửa thương hiệu"}
      </h2>
      <div className="modal-add-input">
        <p className="label">Mã thương hiệu</p>
        <Controller
          control={control}
          name="brandID"
          rules={{
            required: "Nhập mã thương hiệu",
          }}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              error={errors.brandID ? true : false}
              variant="filled"
              hiddenLabel
              inputProps={{ className: "text-field-text" }}
              className="text-field"
            />
          )}
        />
        {errors.brandID && (
          <p className="error-message">{errors.brandID.message}</p>
        )}
      </div>
      <div className="modal-add-input">
        <p className="label">Tên thương hiệu</p>
        <Controller
          control={control}
          name="brandName"
          rules={{
            required: "Nhập tên thương hiệu",
          }}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              error={errors.brandName ? true : false}
              variant="filled"
              hiddenLabel
              onChange={(e) => {
                field.onChange(e);
                handleChangeBrandName(e);
              }}
              inputProps={{ className: "text-field-text" }}
              className="text-field"
            />
          )}
        />
        {errors.brandName && (
          <p className="error-message">{errors.brandName.message}</p>
        )}
      </div>

      <Button type="submit" variant="contained" className="button">
        {path[3] === "create" ? "Thêm" : "Cập nhật"}
      </Button>
    </form>
  );
}

export default BrandPost;
