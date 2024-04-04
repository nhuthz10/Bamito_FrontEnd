import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faRectangleXmark,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";

import "./modalDelete.scss";

function ModalDelete({ handleDelete }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClickDelete = () => {
    handleDelete();
    setOpen(false);
  };

  return (
    <div>
      <div onClick={handleOpen} style={{ width: "26px", height: "40px" }}>
        <FontAwesomeIcon
          icon={faTrash}
          style={{ color: "red", height: "100%", width: "100%" }}
        />
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="Modal-Global"
      >
        <div className="Modal-Delete">
          <div
            style={{
              width: "100%",
              height: "50%",
            }}
          >
            <h1 style={{ fontSize: 25, marginTop: 30, textAlign: "center" }}>
              BẠN CÓ MUỐN XOÁ ?
            </h1>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-evenly",
              textAlign: "center",
            }}
          >
            <Button onClick={handleClose}>
              <FontAwesomeIcon icon={faRectangleXmark} size="5x" color="red" />
            </Button>
            <Button onClick={handleClickDelete}>
              <FontAwesomeIcon icon={faCircleCheck} size="5x" />
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalDelete;
