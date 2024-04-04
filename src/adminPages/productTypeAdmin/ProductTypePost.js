import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { Button, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { loadingAdmin } from "../../redux-toolkit/adminSlice";
import { useDispatch } from "react-redux";
import CreateCode from "../../utils/commonUtils";
import { path as path_constant } from "../../utils";
import {
  handleCreateProductTypeService,
  handleUpdateProductTypeService,
} from "../../services/productService";
import "../admin.scss";

function ProductTypePost() {
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
      setValue("typeID", data.productTypeId);
      setValue("typeName", data.productTypeName);
    }
  }, [data, setValue]);

  const onSubmit = async (submitData) => {
    if (path[3] === "create") {
      try {
        dispatch(loadingAdmin(true));
        let res = await handleCreateProductTypeService({
          productTypeId: submitData.typeID,
          productTypeName: submitData.typeName,
        });
        if (res && res.errCode === 0) {
          toast.success("Thêm loại sản phẩm thành công");
          setValue("typeID", "");
          setValue("typeName", "");

          navigate(`/admin/${path_constant.PRODUCT_TYPE_ADMIN}`);
        }
      } catch (err) {
        if (err?.response?.data?.errCode === 2) {
          toast.error("Mã loại sản phẩm đã tồn tại");
        } else if (err?.response?.data?.errCode === 3) {
          toast.error("Tên loại sản phẩm đã tồn tại");
        } else {
          toast.error(err?.response?.data?.message);
        }
      } finally {
        dispatch(loadingAdmin(false));
      }
    } else if (path[3] === "edit") {
      try {
        dispatch(loadingAdmin(true));
        let res = await handleUpdateProductTypeService({
          id: data.id,
          productTypeId: submitData.typeID,
          productTypeName: submitData.typeName,
        });
        if (res && res.errCode === 0) {
          toast.success("Cập nhật thông loại sản phẩm thành công");
          navigate(`/admin/${path_constant.PRODUCT_TYPE_ADMIN}`);
        }
      } catch (err) {
        if (err?.response?.data?.errCode === 2) {
          toast.error("Mã loại sản phẩm đã tồn tại");
        } else if (err?.response?.data?.errCode === 3) {
          toast.error("Tên loại sản phẩm đã tồn tại");
        } else if (err?.response?.data?.errCode === 4) {
          toast.error("Loại sản phẩm không tồn tại");
        } else {
          toast.error(err?.response?.data?.message);
        }
      } finally {
        dispatch(loadingAdmin(false));
      }
    }
  };

  let handleChangeProductTypeName = (e) => {
    if (e.target.value) {
      let typeId = CreateCode(e.target.value);
      setValue("typeID", typeId, { shouldValidate: true });
    } else {
      setValue("typeID", "", { shouldValidate: false });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="Modal-Add">
      <h2 className="header-text">
        {path[3] === "create" ? "Thêm loại sản phẩm" : "Sửa loại sản phẩm"}
      </h2>
      <div className="modal-add-input">
        <p className="label">Mã loại sản phẩm</p>
        <Controller
          control={control}
          name="typeID"
          rules={{
            required: "Nhập mã loại sản phẩm",
          }}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              error={errors.typeID ? true : false}
              variant="filled"
              hiddenLabel
              inputProps={{ className: "text-field-text" }}
              className="text-field"
            />
          )}
        />
        {errors.typeID && (
          <p className="error-message">{errors.typeID.message}</p>
        )}
      </div>
      <div className="modal-add-input">
        <p className="label">Tên loại sản phẩm</p>
        <Controller
          control={control}
          name="typeName"
          rules={{
            required: "Nhập tên loại sản phẩm",
          }}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              error={errors.typeName ? true : false}
              variant="filled"
              onChange={(e) => {
                field.onChange(e);
                handleChangeProductTypeName(e);
              }}
              hiddenLabel
              inputProps={{ className: "text-field-text" }}
              className="text-field"
            />
          )}
        />
        {errors.typeName && (
          <p className="error-message">{errors.typeName.message}</p>
        )}
      </div>

      <Button type="submit" variant="contained" className="btn">
        {path[3] === "create" ? "Thêm" : "Cập nhật"}
      </Button>
    </form>
  );
}

export default ProductTypePost;
