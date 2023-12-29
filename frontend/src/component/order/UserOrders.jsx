import { Fragment, useEffect } from "react";

import { MDBDataTable } from "mdbreact";
import { useSelector, useDispatch } from "react-redux";
import { userOrderAction } from "../actions/OrderAction";
import { Link } from "react-router-dom";
import Metadata from "../layout/Metadata";

export default function UserOrders() {
  const { userOrders } = useSelector((state) => state.orderState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userOrderAction);
  }, []);

  const setOrder = () => {
    const data = {
      columns: [
        {
          label: "Order Id",
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
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    userOrders.forEach((userOrder) =>
      data.rows.push({
        id: userOrder._id,
        numOfItems: userOrder.orderItems.length,
        amount: `$${userOrder.totalPrice}`,
        status:
          userOrder.orderStatus &&
          userOrder.orderStatus.includes("Delivered") ? (
            <p style={{ color: "green" }}>{userOrder.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{userOrder.orderStatus}</p>
          ),
        actions: (
          <Link to={`/order/${userOrder._id}`} className="btn btn-primary">
            <i className="fa fa-eye"></i>
          </Link>
        ),
      })
    );

    return data;
  };

  return (
    <Fragment>
      <Metadata title={"My Orders"} />
      <div className="container container-fluid">
        {/* <Metadata title="My Orders" /> */}
        <h1 className="mt-5">My Orders</h1>
        <MDBDataTable
          className="px-3"
          bordered
          hover
          stripped
          data={setOrder()}
        />
      </div>
    </Fragment>
  );
}
