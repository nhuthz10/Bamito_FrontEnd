import React from "react";
import { toast } from "react-toastify";
import "../admin.scss";
import { handleDeleteService } from "../../services/userService";
import {
  fetchAllRoleRedux,
  fetchAllUserRedux,
} from "../../redux-toolkit/adminSlice";
import { useSelector, useDispatch } from "react-redux";
import { LIMIT } from "../../utils";
import { loadingAdmin } from "../../redux-toolkit/adminSlice";
import GridData from "../../components/gridData";

function UserAdmin() {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.pagination.page);

  const handleDeleteUser = async (user) => {
    try {
      dispatch(loadingAdmin(true));
      let access_token = localStorage.getItem("access_token");
      let res = await handleDeleteService(user.id, access_token);
      if (res && res.errCode === 0) {
        await dispatch(fetchAllUserRedux({ limit: LIMIT, page: page }));
        await dispatch(fetchAllRoleRedux());
        toast.success("Xóa người dùng thành công");
      }
    } catch (err) {
      if (err?.response?.data?.errCode === 2) {
        toast.error("Người dùng không tồn tại");
      } else {
        toast.error(err?.response?.data?.message);
      }
    } finally {
      dispatch(loadingAdmin(false));
    }
  };

  const tableColumns = [
    {
      label: "STT",
      key: "",
      style: { borderTopLeftRadius: 15, paddingLeft: "2rem" },
    },
    { label: "TÊN", key: "userName" },
    { label: "SỐ ĐIỆN THOẠI", key: "phoneNumber" },
    { label: "EMAIL", key: "email" },
    { label: "TÌNH TRẠNG", key: "status" },
    { label: "QUYỀN HẠN" },
    { label: "", key: "", style: { borderTopRightRadius: 15 } },
  ];

  const getRoleString = (roleId) => {
    const roleMappings = {
      R1: "Quản trị viên",
      R2: "Khách hàng",
    };

    return roleMappings[roleId];
  };

  return (
    <GridData
      tableColumns={tableColumns}
      handleDelete={handleDeleteUser}
      getRoleString={getRoleString}
      headerString="Quản lý người dùng"
      gridType="user"
    />
  );
}

export default UserAdmin;
