import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { MDBDataTable } from "mdbreact";
import Loader from "../layout/Loader";
import SideBar from "./sidebar";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { deleteUserAction, getUsersAction } from "../actions/UserAction";
import { clearDeleteUser, clearError } from "../Slices/UserSlice";

export default function UserList() {
  const {
    users = [],
    loading,
    error,
    isUserDeleted,
  } = useSelector((state) => state.userState);

  const dispatch = useDispatch();

  const setUsers = () => {
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
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Role",
          field: "role",
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
      dispatch(deleteUserAction(id));
    };

    users.forEach((user) => {
      data.rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        action: (
          <Fragment>
            <Link to={`/admin/user/${user._id}`} className="btn btn-primary">
              {" "}
              <i className="fa fa-pencil"></i>
            </Link>
            <Button
              onClick={(e) => deleteHandler(e, user._id)}
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
    if (isUserDeleted) {
      toast("User Successfully Deleted", {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "success",
        onOpen: () => dispatch(clearDeleteUser()),
      });
      return;
    }

    dispatch(getUsersAction());
  }, [dispatch, error, isUserDeleted]);

  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <SideBar />
      </div>

      <div className="col-12 col-md-10">
        <h1 className="my-4">Users List</h1>
        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              className="px-3"
              striped
              hover
              bordered
              data={setUsers()}
            />
          )}
        </Fragment>
      </div>
    </div>
  );
}
