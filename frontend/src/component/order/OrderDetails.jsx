import { Fragment, useEffect } from "react";
import { singleUserOrderAction } from "../actions/OrderAction";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Loader from "../layout/Loader";
import Metadata from "../layout/Metadata";

export default function OrderDetails() {
  const { singleOrder: order, loading } = useSelector(
    (state) => state.orderState
  );
  const {
    shippingInfo = {},
    user = {},
    orderStatus = "Processing",
    orderItems = [],
    totalPrice = 0,
    paymentInfo = {},
  } = order;
  const isPaid =
    paymentInfo && paymentInfo.status === "succeeded" ? true : false;

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(singleUserOrderAction(id));
  }, [id]);

  return (
    <Fragment>
      <Metadata title={"My Orders"} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="container container-fluid">
            <div className="row d-flex justify-content-between">
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
                {order.orderStatus === "Delivered" ? (
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
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
