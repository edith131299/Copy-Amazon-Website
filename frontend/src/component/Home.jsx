import { Fragment, useEffect, useState } from "react";
import Metadata from "./layout/Metadata";
import { useDispatch, useSelector } from "react-redux";
import { GetProducts } from "./actions/ProductAction";
import Loader from "./layout/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductsDetails from "./Product/ProductsDetails";
import Pagination from "react-js-pagination";

export default function Home() {
  const dispatch = useDispatch();

  const [CurrentPage, setCurrentPage] = useState(1);

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
    dispatch(GetProducts(null, null, null, null, CurrentPage)); //how the get products function is called when the argument of it is dispatch. then why dispatch is called and inside it getproducts is called
  }, [error, dispatch, CurrentPage]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title={"Buy Best Product"} />
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <ProductsDetails
                    col={3}
                    product={product}
                    key={product._id}
                  />
                ))}
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
