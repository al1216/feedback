import React, { useEffect, useRef, useState } from "react";
import "./Feedback.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SignUp from "./SignUp";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import ReactDOM from "react-dom";

export default function Feedback() {
  let useRefSend = useRef();
  let navigate = useNavigate();
  let [isCommentBtnClicked, setIsCommentBtnClicked] = useState(false);
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let [myMapComments, setMyMapComments] = useState(new Map());
  let [aComment, setAComment] = useState("");
  let [upvotesCount, setUpvotesCount] = useState(0);
  let [products, setProducts] = useState([]);
  let [commentprodId, setcommentProdId] = useState("");
  let [upvoteprodId, setUpvoteprodId] = useState("");
  let [isUpvoteClicked, setIsUpvoteClicked] = useState(false);
  let [sortbySelection, setSortBySelection] = useState("");
  let [filters, setFilters] = useState([]);
  let [refOfLastClickedFilter, setRefOfLastClickedFilter] = useState();
  let [activateFilterSelection, setActivateFilterSelection] = useState(false);
  let [afilter, setaFilter] = useState("");
  let [clickedAddProduct, setClikedAddProduct] = useState();
  let [isLogIn, setIsLogIn] = useState();
  let [isEditBtnClicked, setIsEditButtonClicked] = useState();
  let [zIndex, setZIndex] = useState();

  let onChangeSortBy = async (sort) => {
    setSortBySelection(sort);
    console.log(sort);
    if (sort === "Comment") {
      await axios
        .get(`${process.env.REACT_APP_HOST}/comments`)
        .then((res) => {
          if (JSON.stringify(res.data) !== JSON.stringify(products)) {
            setProducts(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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
    let keys = Array.from(map.keys());
    let values = Array.from(map.values());
    await axios
      .get(`${process.env.REACT_APP_HOST}/update-comments`, {
        params: {
          keys: keys,
          values: values,
        },
      })
      .then((res) => {
        console.log("done map");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let commentButtonClicked = (id) => {
    setcommentProdId(id);
    setIsCommentBtnClicked(!isCommentBtnClicked);
  };

  let postAComment = (id) => {
    setcommentProdId(id);
    if (myMapComments.has(id) === true) {
      setMyMapComments(
        myMapComments.set(id, [aComment, ...myMapComments.get(id)])
      );
    } else {
      setMyMapComments(myMapComments.set(id, [aComment, ...[]]));
    }
    updateCommentsInDatabase(myMapComments);
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

  let getProductsByUpvotes = async (filter) => {
    if (sortbySelection === "Comment") {
      onChangeSortBy(sortbySelection);
    } else {
      await axios
        .get(`${process.env.REACT_APP_HOST}/products`, {
          params: {
            filter: filter,
          },
        })
        .then((res) => {
          if (JSON.stringify(res.data) !== JSON.stringify(products)) {
            setProducts(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    console.log(products);
  };

  let OnClickFilterSelection = (e, filter) => {
    setaFilter(filter);
    setActivateFilterSelection(true);
    try {
      if (refOfLastClickedFilter !== "undefined") {
        refOfLastClickedFilter.remove("addon-css");
      }
    } catch (err) {
      // console.log(err);
    }

    console.log(filter);
    e.currentTarget.classList.toggle("addon-css");
    setRefOfLastClickedFilter(e.currentTarget.classList);
    getProductsByUpvotes(filter);
  };

  let feedFilterIntoFrontend = async () => {
    await axios
      .get(`${process.env.REACT_APP_HOST}/feed-filters`)
      .then((res) => {
        setFilters(res.data.filters);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let makeZIndexToAllComponents = () => {
    document.getElementsByClassName("feedback-box")[0].style.zIndex = -1;
    document.getElementsByClassName("apply-feedback-filters")[0].style.zIndex =
      -1;
    document.getElementsByClassName("post-feedback")[0].style.zIndex = -1;
    document.getElementsByClassName("navbar-main")[0].style.zIndex = -1;
    document.getElementsByClassName("hero-main")[0].style.zIndex = -1;
  };

  let makeBgColorDark = () => {
    let node = document.getElementsByClassName("container-main")[0];
    node.style.background = "rgba(0, 0, 0, 0.6)";
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token === "undefined" || !token) setIsLoggedIn(false);
    else setIsLoggedIn(true);

    feedFilterIntoFrontend();

    if (!activateFilterSelection) getProductsByUpvotes("");

    for (let i = 0; i < products.length; i++) {
      let id = products[i]._id;
      let c = products[i].comments;

      myMapComments.set(id, c);
    }

    let closeSignUp = localStorage.getItem("closeSignUp");
    if (closeSignUp === "true") {
      setIsLogIn(true);
      localStorage.removeItem("closeSignUp");
    }
  }, [
    products,
    myMapComments,
    filters,
    sortbySelection,
    activateFilterSelection,
    afilter,
    getProductsByUpvotes,
  ]);

  return (
    <div className="feedback-main">
      <div className="feedback-left">
        <div className="feedback-box">
          <h1 className="feedback-heading-box">Feedback</h1>
          <p className="content-box">Apply Filter</p>
        </div>
        <div className="apply-feedback-filters">
          {filters.map((filter) => (
            <div
              className="individual-filter"
              onClick={(e) => {
                OnClickFilterSelection(e, filter);
              }}
            >
              {filter}
            </div>
          ))}
        </div>
      </div>
      <div className="feedback-right">
        <div
          className={`suggest-sort-products ${
            zIndex === true ? "makeZIndex" : ""
          }`}
        >
          <div className="suggest-sort">
            <p className="suggestion-count">{products.length} Suggestions</p>
            <div className="select-sortby-caption">
              <p className="sortby-caption">Sort by:</p>
              <select
                name="sort"
                className="sortby-feedback"
                onChange={(e) => onChangeSortBy(e.target.value)}
              >
                <option value="Upvotes" selected>
                  Upvotes
                </option>
                <option value="Comment">Comment</option>
              </select>
            </div>
          </div>
          <button
            className="addProduct-btn"
            onClick={() => {
              setZIndex(true);
              makeZIndexToAllComponents();
              makeBgColorDark();
              if (isLoggedIn) {
                setClikedAddProduct(true);
                setIsLogIn(true);
              } else {
                setIsLogIn(false);
                setClikedAddProduct(false);
              }
            }}
          >
            + Add product
          </button>
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
                      <button
                        className="edit-product"
                        onClick={() => {
                          localStorage.setItem("id", product._id);
                          setIsEditButtonClicked(true);
                          setZIndex(true);
                          makeZIndexToAllComponents();
                          makeBgColorDark();
                        }}
                      >
                        Edit
                      </button>
                    )}
                    <div className="comment-count-box">
                      <p className="comment-count">
                        {!myMapComments.get(product._id)
                          ? 0
                          : myMapComments.get(product._id).length}
                      </p>
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

      {clickedAddProduct === true && <AddProduct />}
      {isLogIn === false && <SignUp />}
      {isEditBtnClicked === true && <EditProduct />}
    </div>
  );
}
