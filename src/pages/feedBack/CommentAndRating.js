import React, { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import "./CommentAndRating.scss";
import { handleCreateFeedbackService } from "../../services/productService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function CommentAndRatingForm({
  productData,
  setIsOpen,
  getAllProductFeedBack,
}) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const isLogin = useSelector((state) => state.user.login);
  const userId = useSelector((state) => state.user.userInfo.id);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleRatingChange = (event, newRating) => {
    setRating(newRating);
  };

  const submitCommentAndRating = async () => {
    if (isLogin) {
      try {
        let res = await handleCreateFeedbackService({
          productId: productData.productId,
          userId: userId,
          description: comment,
          rating: rating,
          orderId: productData.orderId,
          sizeId: productData.sizeId,
        });
        if (res && res.errCode === 0) {
          setComment("");
          setRating(0);
          setIsOpen(false);
          getAllProductFeedBack();
          toast.success("Đánh giá sản phầm thành công");
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

export default CommentAndRatingForm;
