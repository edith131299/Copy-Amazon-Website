import { Fragment, useEffect } from "react";
import { clearError } from "../Slices/ProductsSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteProductAction,
  getAdminProducts,
} from "../actions/ProductAction";
import { MDBDataTable } from "mdbreact";
import Loader from "../layout/Loader";
import SideBar from "./sidebar";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { clearDeleteProduct } from "../Slices/ProductSlice";
export default function ProductsList() {
  const {
    products = [],
    loading,
    error,
  } = useSelector((state) => state.productsState);

  const { isProductDeleted, error: deleteError } = useSelector(
    (state) => state.productState
  );

  const dispatch = useDispatch();

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "Id",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "asc",
        },
        {
          label: "Action",
          field: "action",
          sort: "asc",
        },
      ],
      rows: [],
    };
    const deleteHandler = (e, id) => {
      dispatch(deleteProductAction(id));
    };

    products.forEach((product) => {
      data.rows.push({
        id: product._id,
        name: product.name,
        price: `$${product.price}`,
        stock: product.stock,
        action: (
          <Fragment>
            <Link
              to={`/admin/product/${product._id}`}
              className="btn btn-primary"
            >
              {" "}
              <i className="fa fa-pencil"></i>
            </Link>
            <Button
              onClick={(e) => deleteHandler(e, product._id)}
              className="btn btn-danger py-1 px-2 ml-2"
            >
              <i className="fa fa-trash"></i>
            </Button>
          </Fragment>
        ),
      });
    });
    return data;
  };

  useEffect(() => {
    if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "error",
        onOpen: () => dispatch(clearError()),
      });
      return;
    }
    if (isProductDeleted) {
      toast("Product Successfully Deleted", {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "success",
        onOpen: () => dispatch(clearDeleteProduct()),
      });
      return;
    }
    if (deleteError) {
      toast(deleteError, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "error",
        onOpen: () => dispatch(clearError()),
      });
      return;
    }
    dispatch(getAdminProducts);
  }, [dispatch, error, isProductDeleted]);

  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <SideBar />
      </div>

      <div className="col-12 col-md-10">
        <h1 className="my-4">Products</h1>
        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              className="px-3"
              striped
              hover
              bordered
              data={setProducts()}
            />
          )}
        </Fragment>
      </div>
    </div>
  );
}
