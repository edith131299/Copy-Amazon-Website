import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { MDBDataTable } from "mdbreact";
import Loader from "../layout/Loader";
import SideBar from "./sidebar";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import {
  adminOrderAction,
  deleteAdminOrderAction,
} from "../actions/OrderAction";
import { clearDeleteOrder, clearOrderError } from "../Slices/OrderSlice";

export default function OrdersList() {
  const {
    adminOrders = [],
    loading,
    error,
    isOrderDeleted,
  } = useSelector((state) => state.orderState);

  const dispatch = useDispatch();

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Id",
          field: "id",
          sort: "asc",
        },
        {
          label: "Number Of Items",
          field: "numOfItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
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
      dispatch(deleteAdminOrderAction(id));
    };

    adminOrders.forEach((order) => {
      data.rows.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        status: (
          <p
            style={{
              color: order.orderStatus.includes("Processing") ? "red" : "green",
            }}
          >
            {order.orderStatus}
          </p>
        ),
        action: (
          <Fragment>
            <Link to={`/admin/order/${order._id}`} className="btn btn-primary">
              {" "}
              <i className="fa fa-pencil"></i>
            </Link>
            <Button
              onClick={(e) => deleteHandler(e, order._id)}
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
        onOpen: () => dispatch(clearOrderError()),
      });
      return;
    }
    if (isOrderDeleted) {
      toast("Order Successfully Deleted", {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "success",
        onOpen: () => dispatch(clearDeleteOrder()),
      });
      return;
    }

    dispatch(adminOrderAction());
  }, [dispatch, error, isOrderDeleted]);

  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <SideBar />
      </div>

      <div className="col-12 col-md-10">
        <h1 className="my-4">Admin Orders</h1>
        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              className="px-3"
              striped
              hover
              bordered
              data={setOrders()}
            />
          )}
        </Fragment>
      </div>
    </div>
  );
}
