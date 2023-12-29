import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader";
import { toast } from "react-toastify";
import SideBar from "./sidebar";
import {
  singleUserOrderAction,
  updateAdminOrderAction,
} from "../actions/OrderAction";
import { clearOrderError, clearUpdateOrder } from "../Slices/OrderSlice";

export default function UpdateOrder() {
  const {
    isOrderUpdated,
    loading,
    error,
    singleOrder: order,
  } = useSelector((state) => state.orderState);
  const {
    shippingInfo = {},
    user = {},
    orderItems = [],
    totalPrice = 0,
    paymentInfo = {},
  } = order;

  const { id } = useParams();

  const dispatch = useDispatch();

  const [orderStatus, setOrderStatus] = useState("Processing");

  const submitHandler = () => {
    const orderData = {};

    orderData.orderStatus = orderStatus;

    dispatch(updateAdminOrderAction(id, orderData));
  };

  useEffect(() => {
    if (isOrderUpdated) {
      toast("Order Updated Successfully", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => {
          dispatch(clearUpdateOrder());
        },
      });
      return;
    }

    if (error) {
      toast(error, {
        type: "error",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => {
          dispatch(clearOrderError());
        },
      });

      return;
    }
    dispatch(singleUserOrderAction(id));
  }, [error, dispatch, isOrderUpdated]);

  useEffect(() => {
    if (order._id) {
      setOrderStatus(order.orderStatus);
    }
  }, [order]);
  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <SideBar />
      </div>

      <div className="col-12 col-md-10">
        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <div className="row d-flex justify-content-around">
              <div className="col-12 col-lg-8 mt-5 order-details">
                <h1 className="my-5">Order #{order._id} </h1>

                <h4 className="mb-4">Shipping Info</h4>
                <p>
                  <b>Name:</b> {user.name}
                </p>
                <p>
                  <b>Phone:</b> {shippingInfo.phoneNo}
                </p>
                <p className="mb-4">
                  <b>Address:</b>
                  {shippingInfo.address},{shippingInfo.city}.
                  {shippingInfo.country}
                </p>
                <p>
                  <b>Amount:</b> ${totalPrice}
                </p>

                <hr />

                <h4 className="my-4">Payment</h4>
                {paymentInfo.status === "succeeded" ? (
                  <p className="greenColor">
                    <b>PAID</b>
                  </p>
                ) : (
                  <p className="redColor">
                    <b>NOT PAID</b>
                  </p>
                )}

                <h4 className="my-4">Order Status:</h4>
                {orderStatus && orderStatus === "Delivered" ? (
                  <p className="greenColor">
                    <b>Delivered</b>
                  </p>
                ) : (
                  <p className="redColor">
                    <b>Procesing</b>
                  </p>
                )}

                <h4 className="my-4">Order Items:</h4>

                <hr />
                <div className="cart-item my-1">
                  {orderItems &&
                    orderItems.map((item, i) => (
                      <div key={i} className="row my-5">
                        <div className="col-4 col-lg-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            height="45"
                            width="65"
                          />
                        </div>

                        <div className="col-5 col-lg-5">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                          <p>${item.price}</p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                          <p>{item.quantity} Piece(s)</p>
                        </div>
                      </div>
                    ))}
                </div>
                <hr />
              </div>
              <div className="col-12 col-lg-3 mt-5 ">
                <h4 className="my-4">Order Status</h4>
                <div className="form-group">
                  <select
                    className="form-control"
                    value={orderStatus}
                    onChange={(e) => setOrderStatus(e.target.value)}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipping">Shipping</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
                <button
                  className="btn btn-primary btn-block"
                  onClick={submitHandler}
                >
                  Update Status
                </button>
              </div>
            </div>
          )}
        </Fragment>
      </div>
    </div>
  );
}
