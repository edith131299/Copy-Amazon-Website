import { Fragment, useEffect, useState } from "react";
import Metadata from "../layout/Metadata";
import { useDispatch, useSelector } from "react-redux";
import { GetProducts } from "../actions/ProductAction";
import Loader from "../layout/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductsDetails from "../Product/ProductsDetails";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";

export default function ProductSearch() {
  const dispatch = useDispatch();

  const { keyword } = useParams();

  const [CurrentPage, setCurrentPage] = useState(1);

  const [price, setPrice] = useState([1, 1000]);

  const [priceChanged, setPriceChanged] = useState(price);

  const [category, setCategory] = useState();

  const [rating, setRating] = useState();

  const categories = [
    "Electronics",
    "Mobile Phones",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  const { products, loading, error, count, resPerPage } = useSelector(
    (state) => state.productsState
  );

  const setPage = (pageno) => {
    setCurrentPage(pageno);
  };

  useEffect(() => {
    if (error) {
      return toast.error(error, { position: toast.POSITION.BOTTOM_CENTER });
    }
    dispatch(GetProducts(keyword, priceChanged, category, rating, CurrentPage)); //how the get products function is called when the argument of it is dispatch. then why dispatch is called and inside it getproducts is called
  }, [error, dispatch, keyword, priceChanged, category, rating, CurrentPage]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title={"Buy Best Product"} />
          <h1 id="products_heading">Search Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              <div className="col-6 col-md-3 mb-5 mt-5">
                <div className="px-5" onMouseUp={() => setPriceChanged(price)}>
                  <Slider
                    range={true}
                    marks={{
                      1: "$1",
                      1000: "$1000",
                    }}
                    pushable={true}
                    min={1}
                    max={1000}
                    defaultValue={price}
                    onChange={(e) => {
                      setPrice(e);
                    }}
                    handleRender={(renderProps) => {
                      return (
                        <Tooltip
                          overlay={`${renderProps.props["aria-valuenow"]}`}
                        >
                          <div {...renderProps.props}></div>
                        </Tooltip>
                      );
                    }}
                  />
                </div>
                <hr className="my-5" />
                {/* Category Filter */}
                <div className="mt-5">
                  <h3 className="mb-3">Categories</h3>
                  {categories.map((category) => (
                    <ul className="pl-0">
                      <li
                        style={{
                          cursor: "pointer",
                          listStyle: "none",
                        }}
                        key={category}
                        onClick={() => setCategory(category)}
                      >
                        {category}
                      </li>
                    </ul>
                  ))}
                </div>
                <hr className={"my-5"} />
                {/* Rating Filter */}
                <div className="mt-5">
                  <h3 className="mb-3"> Rating filter </h3>
                  <ul className="pl-0">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <li
                        style={{ cursor: "pointer", listStyle: "none" }}
                        key={star}
                        onClick={() => setRating(star)}
                      >
                        <div className="rating-outer">
                          <div
                            className="rating-inner"
                            style={{ width: `${star * 20}%` }}
                          ></div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-6 col-md-9 ">
                <div className="row">
                  {products &&
                    products.map((product) => (
                      <ProductsDetails
                        col={4}
                        product={product}
                        key={product._id}
                      />
                    ))}
                </div>
              </div>
            </div>
          </section>
          <div className={"d-flex justify-content-center mt-5"}>
            {count > 0 && count > resPerPage ? (
              <Pagination
                activePage={CurrentPage}
                onChange={setPage}
                totalItemsCount={count}
                itemsCountPerPage={resPerPage}
                nextPageText={"Next"}
                firstPageText={"First"}
                lastPageText={"Last"}
                linkClass="page-link"
                itemClass="page-item"
              />
            ) : null}
          </div>
        </Fragment>
      )}
    </>
  );
}
