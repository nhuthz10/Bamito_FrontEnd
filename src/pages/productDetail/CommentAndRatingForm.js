import React, { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import "./CommentAndRatingForm.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import {
  handleAllFeedbackService,
  handleDeleteFeedbackService,
} from "../../services/productService";
import Modal from "@mui/material/Modal";
import EditFeedback from "./EditFeedback";
import avatarDefault from "../../assets/default-avatar.png";

const formatDate = (date) => {
  const dateTime = dayjs(date);
  const formattedTime = dateTime.format("DD/MM/YYYY HH:mm:ss");
  return formattedTime;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  background: "white",
  borderRadius: 8,
  padding: 20,
};

function CommentAndRatingForm() {
  const [allFeedback, setAllFeeddack] = useState([]);
  const [currentFeedback, setCurrentFeedback] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  let { productId } = useParams();
  const userId = useSelector((state) => state.user.userInfo.id);

  let getAllDataFeedback = async () => {
    try {
      let res = await handleAllFeedbackService(productId);
      if (res && res.errCode === 0) {
        let result = res?.data?.map((item) => {
          item.userId === userId
            ? (item.myReview = true)
            : (item.myReview = false);
          return item;
        });
        setAllFeeddack(result);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllDataFeedback();
  }, [userId]);

  const handleClose = () => {
    setIsOpen(false);
  };

  let handleUpdateFeedback = (description, rating, id) => {
    setCurrentFeedback({
      id: id,
      description: description,
      rating: rating,
    });
    setIsOpen(true);
  };

  let handleDeleteFeedback = async (id) => {
    try {
      let res = await handleDeleteFeedbackService(id, userId);
      if (res && res.errCode === 0) {
        getAllDataFeedback();
        toast.success("Xóa đánh giá thành công");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };

  return (
    <div className="feedback-container">
      <div className="comment-rating-form">
        {allFeedback &&
          allFeedback.length > 0 &&
          allFeedback.map((review, index) => (
            <div key={index} className="review-item">
              <div className="user-info">
                <img
                  src={review.avatar ? review.avatar : avatarDefault}
                  alt="Avatar"
                  className="user-avatar"
                />
                <div className="wrap-user-name">
                  <div className="user-name">{review.userName}</div>
                  <div className="timestamp">
                    {formatDate(review.updatedAt)}
                  </div>
                </div>
              </div>
              <Rating
                name={`rating-${index}`}
                style={{ fontSize: "3.675rem", margin: "10px 0" }}
                value={review.rating}
                precision={0.5}
                readOnly
              />
              <div className="user-comment">{review.description}</div>
              {review.myReview ? (
                <div className="edit-feedback">
                  <div
                    className="edit-feedback-btn"
                    style={{ marginLeft: "auto" }}
                    onClick={() =>
                      handleUpdateFeedback(
                        review.description,
                        review.rating,
                        review.id
                      )
                    }
                  >
                    Chỉnh sửa
                  </div>
                  <div
                    className="edit-feedback-btn"
                    onClick={() => handleDeleteFeedback(review.id)}
                  >
                    Xóa
                  </div>
                </div>
              ) : null}
            </div>
          ))}
      </div>
      <Modal open={isOpen} onClose={handleClose}>
        <div style={{ ...style }}>
          <div
            style={{ fontSize: "2.4rem", fontWeight: 600, marginBottom: 16 }}
          >
            ĐÁNH GIÁ SẢN PHẨM
          </div>
          <EditFeedback
            setIsOpen={setIsOpen}
            data={currentFeedback}
            getAllDataFeedback={getAllDataFeedback}
          ></EditFeedback>
        </div>
      </Modal>
    </div>
  );
}

export default CommentAndRatingForm;
