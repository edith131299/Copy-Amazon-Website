import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { MDBDataTable } from "mdbreact";
import Loader from "../layout/Loader";
import SideBar from "./sidebar";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { deleteReviewAction, getReviewAction } from "../actions/ProductAction";
import { clearError, clearReviewDeleted } from "../Slices/ProductSlice";

export default function ReviewList() {
  const {
    reviews = [],
    loading,
    error,
    isReviewDeleted,
  } = useSelector((state) => state.productState);

  const dispatch = useDispatch();

  const [productId, setProductId] = useState("");

  const setReviews = () => {
    const data = {
      columns: [
        {
          label: "Id",
          field: "id",
          sort: "asc",
        },
        {
          label: "Rating",
          field: "rating",
          sort: "asc",
        },
        {
          label: "User",
          field: "user",
          sort: "asc",
        },
        {
          label: "Comment",
          field: "comment",
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

    reviews.forEach((review) => {
      data.rows.push({
        id: review._id,
        rating: review.rating,
        user: review.user.name,
        comment: review.comment,
        action: (
          <Fragment>
            <Button
              onClick={(e) => deleteHandler(e, review._id)}
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

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getReviewAction(productId));
  };

  const deleteHandler = (e, id) => {
    e.target.disabeld = true;
    dispatch(deleteReviewAction(productId, id));
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
    if (isReviewDeleted) {
      toast("User Successfully Deleted", {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "success",
        onOpen: () => dispatch(clearReviewDeleted()),
      });
      dispatch(getReviewAction(productId));
      return;
    }
  }, [dispatch, error, isReviewDeleted]);

  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <SideBar />
      </div>

      <div className="col-12 col-md-10">
        <h1 className="my-4">Users List</h1>
        <div className="row justify-content-center mt-5">
          <div className="col-5">
            <form onSubmit={submitHandler}>
              <div className="form-group">
                <label>Product ID</label>
                <input
                  type="text"
                  onChange={(e) => setProductId(e.target.value)}
                  value={productId}
                  className="form-control"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-block py-2"
              >
                Search
              </button>
            </form>
          </div>
        </div>
        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              className="px-3"
              striped
              hover
              bordered
              data={setReviews()}
            />
          )}
        </Fragment>
      </div>
    </div>
  );
}
