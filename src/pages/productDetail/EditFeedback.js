import React, { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import "./EditFeedback.scss";
import { handleUpdateFeedbackService } from "../../services/productService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function EditFeedback({ data, setIsOpen, getAllDataFeedback }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const isLogin = useSelector((state) => state.user.login);
  const userId = useSelector((state) => state.user.userInfo?.id);

  useEffect(() => {
    if (data) {
      setComment(data.description);
      setRating(data.rating);
    }
  }, [data]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleRatingChange = (event, newRating) => {
    setRating(newRating);
  };

  const submitCommentAndRating = async () => {
    if (isLogin) {
      try {
        let res = await handleUpdateFeedbackService({
          userId: userId,
          feedbackId: data.id,
          description: comment,
          rating: rating,
        });
        if (res && res.errCode === 0) {
          setComment("");
          setRating(0);
          setIsOpen(false);
          getAllDataFeedback();
          toast.success("Chỉnh sửa đánh giá sản phầm thành công");
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
        console.log(error);
      }
    } else {
      toast.error("Vui lòng đăng nhập");
    }
  };

  return (
    <div className="comment-rating-form">
      <Rating
        name="product-rating"
        value={rating}
        defaultValue={0}
        precision={0.5}
        className="comment-rating"
        onChange={handleRatingChange}
      />
      <textarea
        className="coment-content"
        onChange={handleCommentChange}
        value={comment}
        placeholder="Viết phản hồi..."
      ></textarea>

      <div className="ctn_send_btn">
        <button className="contain_send_btn" onClick={submitCommentAndRating}>
          Hoàn thành
        </button>
      </div>
    </div>
  );
}

export default EditFeedback;
