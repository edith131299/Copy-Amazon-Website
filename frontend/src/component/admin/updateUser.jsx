import { Fragment, useEffect, useState } from "react";
import SideBar from "./sidebar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader";
import { getUserAction, updateUserAction } from "../actions/UserAction";
import { toast } from "react-toastify";
import { clearError, clearUpdateUser } from "../Slices/UserSlice";
import { loadUserAction } from "../actions/LoginAction";

export default function UpdateUser() {
  const { id } = useParams();

  const {
    user = [],
    error,
    isUserUpdated,
    loading,
  } = useSelector((state) => state.userState);

  const { user: authUser } = useSelector((state) => state.authState);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const dispatch = useDispatch();

  const submitHandler = () => {
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("role", role);
    dispatch(updateUserAction(id, formdata));
  };

  useEffect(() => {
    if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "error",
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }

    if (isUserUpdated) {
      toast("User Updated Succesfully", {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "success",
        onOpen: () => {
          dispatch(clearUpdateUser());
        },
      });
      dispatch(loadUserAction);
      return;
    }

    dispatch(getUserAction(id));
  }, [dispatch, isUserUpdated, error]);

  useEffect(() => {
    if (user._id) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user]);

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
            <div className="wrapper my-5">
              <form onSubmit={submitHandler} className="shadow-lg">
                <h1 className="mt-2 mb-5">Update User</h1>

                <div className="form-group">
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="name"
                    id="name_field"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="role_field">Role</label>

                  <select
                    id="role_field"
                    className="form-control"
                    name="role"
                    value={role}
                    disabled={user._id === authUser._id}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn update-btn btn-block mt-4 mb-3"
                  disabled={loading}
                >
                  Update
                </button>
              </form>
            </div>
          )}
        </Fragment>
      </div>
    </div>
  );
}
