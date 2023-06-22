import React, { useEffect, useRef, useState } from "react";
import "./Feedback.css";
import axios from "axios";
import SignUp from "./SignUp";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

export default function Feedback() {
  let useRefSend = useRef();
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

    // console.log(products);
  };

  let OnClickFilterSelection = (e, filter) => {
    setaFilter(filter);
    setActivateFilterSelection(true);
    try {
      if (refOfLastClickedFilter !== "undefined") {
        refOfLastClickedFilter.remove("addon-css-mob");
      }
    } catch (err) {
      // console.log(err);
    }

    console.log(filter);
    e.currentTarget.classList.toggle("addon-css-mob");
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
    document.getElementsByClassName("suggest-sort-products-mob")[0].style.zIndex = -1;
    document.getElementsByClassName("apply-feedback-filters-mob")[0].style.zIndex =
      -1;
    document.getElementsByClassName("post-feedback-mob")[0].style.zIndex = -1;
    document.getElementsByClassName("navbar-main-mob")[0].style.zIndex = -1;
    document.getElementsByClassName("hero-main-mob")[0].style.zIndex = -1;
  };

  let makeBgColorDark = () => {
    let node = document.getElementsByClassName("container-main-mob")[0];
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
    <div className="feedback-main-mob">
      <div className="feedback-left-mob">
        <div
          className={`suggest-sort-products-mob ${
            zIndex === true ? "makeZIndex-mob" : ""
          }`}
        >
          <div className="suggest-sort-mob">
            <p className="suggestion-count-mob">
              {products.length} Suggestions
            </p>
            <div className="select-sortby-caption-mob">
              <p className="sortby-caption-mob">Sort by:</p>
              <select
                name="sort"
                className="sortby-feedback-mob"
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
            className="addProduct-btn-mob"
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
        <p className="filter-name-written-mob">Filters:</p>
        <div className="apply-feedback-filters-mob">
          {filters.map((filter) => (
            <div
              className="individual-filter-mob"
              onClick={(e) => {
                OnClickFilterSelection(e, filter);
              }}
            >
              {filter}
            </div>
          ))}
        </div>
      </div>
      <div className="feedback-right-mob">
        <div className="post-feedback-mob">
          {products.map((product) => (
            <div className="wrapper-post-mob">
              <div className="post-details-overview-mob">
                <div className="post-left-mob">
                  <img
                    src={`${product.logoUrl}`}
                    alt=""
                    className="logo-product-mob"
                  />
                  <div className="product-details-mob">
                    <h2 className="product-name-mob">{product.name}</h2>
                    <p className="product-caption-mob">{product.desc}</p>
                    <div className="feedback-filter-comments-mob">
                      <div className="given-feedback-filters-mob">
                        {product.category.map((category) => (
                          <div className="filters-of-product-mob">
                            <p className="filter-name-product-mob">
                              {category}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div
                        className="comment-logo-caption-mob"
                        onClick={() => commentButtonClicked(product._id)}
                      >
                        <img
                          src="message.png"
                          alt=""
                          className="comment-icon-mob"
                        />
                        {/* <p className="message-caption-mob">Comment</p> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="post-right-mob">
                  <div
                    className="upvotes-count-box-mob"
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
                    <p className="arrow-mob">^</p>
                    {!isUpvoteClicked && upvoteprodId !== product._id && (
                      <p className="upvote-count-mob">{product.upvotesCount}</p>
                    )}
                    {isUpvoteClicked && upvoteprodId === product._id && (
                      <p className="upvote-count-mob">{upvotesCount}</p>
                    )}
                    {isUpvoteClicked && upvoteprodId !== product._id && (
                      <p className="upvote-count-mob">{product.upvotesCount}</p>
                    )}
                  </div>
                  <div className="edit-comments-count-box-mob">
                    {isLoggedIn && (
                      <button
                        className="edit-product-mob"
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
                    <div className="comment-count-box-mob">
                      <p className="comment-count-mob">
                        {!myMapComments.get(product._id)
                          ? 0
                          : myMapComments.get(product._id).length}
                      </p>
                      <img
                        src="comments.png"
                        alt=""
                        className="comment-box-icon-mob"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {isCommentBtnClicked && commentprodId === product._id && (
                <div className="post-comments-section-mob">
                  <div className="input-send-section-mob">
                    <input
                      ref={useRefSend}
                      type="text"
                      className="comment-message-mob"
                      name="comment"
                      placeholder="Add a comment...."
                      onChange={(e) => setAComment(e.target.value)}
                    />
                    <img
                      src="send.png"
                      alt=""
                      className="send-icon-mob"
                      onClick={() => {
                        postAComment(product._id);
                      }}
                    />
                  </div>
                  <div className="view-all-comments-mob">
                    {[...myMapComments.keys()].map((key) => {
                      if (key === commentprodId) {
                        {
                          return myMapComments.get(key).map((value) => (
                            <div className="a-comment-mob">
                              <img
                                src="bullet.png"
                                alt=""
                                className="bullet-icon-mob"
                              />

                              <p className="comment-content-mob">{value}</p>
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
