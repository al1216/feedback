import React, { useEffect, useRef, useState } from "react";
import "./Feedback.css";

export default function Feedback() {
  let useRefSend = useRef();
  let [isCommentBtnClicked, setIsCommentBtnClicked] = useState(false);
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let [allComments, setAllComments] = useState([]);
  let [aComment, setAComment] = useState("");
  let [upvotesCount,setUpvotesCount] = useState(0);
  let [commentsCount,setCommentsCount] = useState(0);

  let commentButtonClicked = () => {
    setIsCommentBtnClicked(!isCommentBtnClicked);
  };

  let postAComment = () => {
    setAllComments([aComment, ...allComments]);
    useRefSend.current.value = "";
  };

  let upVoteClicked = () => {
    upvotesCount = upvotesCount + 1;
    setUpvotesCount(upvotesCount);
  }

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token === "undefined" || !token) setIsLoggedIn(false);
    else setIsLoggedIn(true);

    setCommentsCount(allComments.length);
  }, [allComments.length]);

  return (
    <div className="feedback-main">
      <div className="feedback-left">
        <div className="feedback-box">
          <h1 className="feedback-heading-box">Feedback</h1>
          <p className="content-box">Apply Filter</p>
        </div>
        <div className="apply-feedback-filters">
          <div className="individual-filter">
            <p className="filter-name">All</p>
          </div>
          <div className="individual-filter">
            <p className="filter-name">Fintech</p>
          </div>
          <div className="individual-filter">
            <p className="filter-name">Edtech</p>
          </div>
          <div className="individual-filter">
            <p className="filter-name">B2B</p>
          </div>
          <div className="individual-filter">
            <p className="filter-name">Saas</p>
          </div>
          <div className="individual-filter">
            <p className="filter-name">Agritech</p>
          </div>
          <div className="individual-filter">
            <p className="filter-name">Medtech</p>
          </div>
        </div>
      </div>
      <div className="feedback-right">
        <div className="suggest-sort-products">
          <div className="suggest-sort">
            <p className="suggestion-count">10 Suggestions</p>
            <div className="select-sortby-caption">
              <p className="sortby-caption">Sort by:</p>
              <select name="sort" className="sortby-feedback">
                <option value="Upvotes" selected>
                  Upvotes
                </option>
                <option value="Comment">Comment</option>
              </select>
            </div>
          </div>
          <button className="addProduct-btn">+ Add product</button>
        </div>
        <div className="post-feedback">
          <div className="wrapper-post">
            <div className="post-details-overview">
              <div className="post-left">
                <img src="cred.png" alt="" className="logo-product" />
                <div className="product-details">
                  <h2 className="product-name">Cred Club</h2>
                  <p className="product-caption">
                    It is good for credit card payments,it is fast,secure
                  </p>
                  <div className="feedback-filter-comments">
                    <div className="given-feedback-filters">
                      <div className="filters-of-product">
                        <p className="filter-name-product">Fintech</p>
                      </div>
                      <div className="filters-of-product">
                        <p className="filter-name-product">B2B</p>
                      </div>
                    </div>
                    <div
                      className="comment-logo-caption"
                      onClick={() => commentButtonClicked()}
                    >
                      <img src="message.png" alt="" className="comment-icon" />
                      <p className="message-caption">Comment</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="post-right">
                <div className="upvotes-count-box" onClick={() => upVoteClicked()}>
                  <p className="arrow">^</p>
                  <p className="upvote-count">{upvotesCount}</p>
                </div>
                <div className="edit-comments-count-box">
                  {isLoggedIn && <button className="edit-product">Edit</button>}
                  <div className="comment-count-box">
                    <p className="comment-count">{commentsCount}</p>
                    <img
                      src="comments.png"
                      alt=""
                      className="comment-box-icon"
                    />
                  </div>
                </div>
              </div>
            </div>
            {isCommentBtnClicked && (
              <div className="post-comments-section">
                <div className="input-send-section">
                  <input
                  ref={useRefSend}
                    type="text"
                    className="comment-message"
                    name="comment"
                    placeholder="Add a comment...."
                    onChange={(e) => setAComment(e.target.value)}
                  />
                  <img
                    src="send.png"
                    alt=""
                    className="send-icon"
                    onClick={() => postAComment()}
                  />
                </div>
                <div className="view-all-comments">
                  {allComments.map((comment) => (
                    <div className="a-comment">
                      <img src="bullet.png" alt="" className="bullet-icon" />

                      <p className="comment-content">{comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
