import { Fragment, useEffect } from "react";
import PaymentSteps from "./PaymentSteps";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { validateShipping } from "./Shipping";

export default function ConfirmOrder() {
  const { items: cartItems, shippingInfo } = useSelector(
    (state) => state.cartState
  );

  const { user } = useSelector((state) => state.authState);

  const navigate = useNavigate();

  let itemsprice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  itemsprice = Number(itemsprice).toFixed(2);

  const shipping = itemsprice > 200 ? 0 : 20;

  let taxPrice = Number(0.5 * itemsprice);

  taxPrice = Number(taxPrice).toFixed(2);

  const totalPrice = Number(itemsprice) + Number(shipping) + Number(taxPrice);

  const processPayment = () => {
    const data = {
      itemsprice,
      shipping,
      taxPrice,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/payment");
  };

  useEffect(() => {
    validateShipping(shippingInfo, navigate);
  }, []);

  return (
    <Fragment>
      <PaymentSteps shipping confirmOrder />
      <div className="container container-fluid">
        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8 mt-5 order-confirm">
            <h4 className="mb-3">Shipping Info</h4>
            <p>
              <b>Name:</b> {user.name}
            </p>
            <p>
              <b>Phone:</b> {shippingInfo.phoneNo}
            </p>
            <p className="mb-4">
              <b>Address:</b> {shippingInfo.address},
            </p>

            <hr />
            <h4 className="mt-4">Your Cart Items:</h4>
            {cartItems.map((item, i) => (
              <Fragment key={i}>
                <div className="cart-item my-1">
                  <div className="row">
                    <div className="col-4 col-lg-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        height="45"
                        width="65"
                      />
                    </div>

                    <div className="col-5 col-lg-6">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>

                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                      <p>
                        {item.quantity} x ${item.price} ={" "}
                        <b>${Number(item.quantity * item.price).toFixed(2)}</b>
                      </p>
                    </div>
                  </div>
                </div>
                <hr />
              </Fragment>
            ))}
          </div>

          <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />
              <p>
                Subtotal:{" "}
                <span className="order-summary-values">${itemsprice}</span>
              </p>
              <p>
                Shipping:{" "}
                <span className="order-summary-values">${shipping}</span>
              </p>
              <p>
                Tax: <span className="order-summary-values">${taxPrice}</span>
              </p>

              <hr />

              <p>
                Total:{" "}
                <span className="order-summary-values">${totalPrice}</span>
              </p>

              <hr />
              <button
                id="checkout_btn"
                className="btn btn-primary btn-block"
                onClick={processPayment}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
