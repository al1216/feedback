import React, { useEffect, useRef, useState } from "react";
import "./Feedback.css";
import axios from "axios";

export default function Feedback() {
  let useRefSend = useRef();
  let [isCommentBtnClicked, setIsCommentBtnClicked] = useState(false);
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let [allComments, setAllComments] = useState([]);
  let [myMapComments, setMyMapComments] = useState(new Map());
  let [aComment, setAComment] = useState("");
  let [upvotesCount, setUpvotesCount] = useState(0);
  let [products, setProducts] = useState([]);
  let [commentprodId, setcommentProdId] = useState("");
  let [upvoteprodId, setUpvoteprodId] = useState("");
  let [isUpvoteClicked, setIsUpvoteClicked] = useState(false);

  let updateUpvotesInDatabase = async (count, id) => {
    await axios
      .get(`${process.env.REACT_APP_HOST}/update-upvote-count`, {
        params: {
          count: count,
          id: id,
        },
      })
      .then((res) => {
        // setProducts(res.data);
        console.log("done-updating");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let updateCommentsInDatabase = async (map) => {
    let keys = Array.from( map.keys() );
    let values = Array.from( map.values() );
    await axios.get(`${process.env.REACT_APP_HOST}/update-comments`, {
      params: {
        keys: keys,
        values: values
      }
    }).then((res) => {
      console.log('done map');
    }).catch((err) => {
      console.log(err);
    })
  }
  let commentButtonClicked = (id) => {
    setcommentProdId(id);
    setIsCommentBtnClicked(!isCommentBtnClicked);
  };

  let postAComment = (id) => {
    setcommentProdId(id);
    setAllComments([aComment, ...allComments]);
    if (myMapComments.has(id) === true){
      setMyMapComments(myMapComments.set(id, [aComment, ...myMapComments.get(id)]));
    }
    else{
      setMyMapComments(myMapComments.set(id, [aComment, ...[]]));
    }
    updateCommentsInDatabase(myMapComments);
    // console.log(myMapComments); 
    // console.log(id,commentprodId);
    useRefSend.current.value = "";
  };

  let upVoteClicked = (upvotesCount, id) => {
    setUpvoteprodId(id);
    upvotesCount = upvotesCount + 1;
    updateUpvotesInDatabase(upvotesCount, id);
    setUpvotesCount(upvotesCount);

    if (isUpvoteClicked === false) setIsUpvoteClicked(true);
  };

  let upVoteClickedState = (id) => {
    setUpvoteprodId(id);
    upvotesCount = upvotesCount + 1;
    updateUpvotesInDatabase(upvotesCount, id);
    setUpvotesCount(upvotesCount);
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token === "undefined" || !token) setIsLoggedIn(false);
    else setIsLoggedIn(true);

    axios
      .get(`${process.env.REACT_APP_HOST}/products`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

      for(let i = 0; i < products.length; i++){
        let id = products[i]._id;
        let c = products[i].comments;

        myMapComments.set(id,c);
      }
  }, [allComments.length, products,myMapComments]);

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
          {products.map((product) => (
            <div className="wrapper-post">
              <div className="post-details-overview">
                <div className="post-left">
                  <img
                    src={`${product.logoUrl}`}
                    alt=""
                    className="logo-product"
                  />
                  <div className="product-details">
                    <h2 className="product-name">{product.name}</h2>
                    <p className="product-caption">{product.desc}</p>
                    <div className="feedback-filter-comments">
                      <div className="given-feedback-filters">
                        {product.category.map((category) => (
                          <div className="filters-of-product">
                            <p className="filter-name-product">{category}</p>
                          </div>
                        ))}
                      </div>
                      <div
                        className="comment-logo-caption"
                        onClick={() => commentButtonClicked(product._id)}
                      >
                        <img
                          src="message.png"
                          alt=""
                          className="comment-icon"
                        />
                        <p className="message-caption">Comment</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="post-right">
                  <div
                    className="upvotes-count-box"
                    onClick={() => {
                      if (isUpvoteClicked === false) {
                        upVoteClicked(product.upvotesCount, product._id);
                      }
                      if (
                        isUpvoteClicked === true &&
                        upvoteprodId === product._id
                      ) {
                        upVoteClickedState(product._id);
                      }
                      if (
                        isUpvoteClicked === true &&
                        upvoteprodId !== product._id
                      ) {
                        upVoteClicked(product.upvotesCount, product._id);
                      }
                    }}
                  >
                    <p className="arrow">^</p>
                    {!isUpvoteClicked && upvoteprodId !== product._id && (
                      <p className="upvote-count">{product.upvotesCount}</p>
                    )}
                    {isUpvoteClicked && upvoteprodId === product._id && (
                      <p className="upvote-count">{upvotesCount}</p>
                    )}
                    {isUpvoteClicked && upvoteprodId !== product._id && (
                      <p className="upvote-count">{product.upvotesCount}</p>
                    )}
                  </div>
                  <div className="edit-comments-count-box">
                    {isLoggedIn && (
                      <button className="edit-product">Edit</button>
                    )}
                    <div className="comment-count-box">
                      <p className="comment-count">{!myMapComments.get(product._id) ? 0 : myMapComments.get(product._id).length}</p>
                      <img
                        src="comments.png"
                        alt=""
                        className="comment-box-icon"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {isCommentBtnClicked && commentprodId === product._id && (
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
                      onClick={() => {
                        postAComment(product._id);
                      }}
                    />
                  </div>
                  <div className="view-all-comments">
                    {[...myMapComments.keys()].map((key) => {
                      if (key === commentprodId) {
                        {
                          return myMapComments.get(key).map((value) => (
                            <div className="a-comment">
                              <img
                                src="bullet.png"
                                alt=""
                                className="bullet-icon"
                              />

                              <p className="comment-content">{value}</p>
                            </div>
                          ));
                        }
                      }
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
