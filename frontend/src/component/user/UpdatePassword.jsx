import { useEffect, useState } from "react";
import { clearAuthError, updatePasswordAction } from "../actions/LoginAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function UpdatePassword() {
  const { isUpdated, error } = useSelector((state) => state.authState);

  const dispatch = useDispatch();

  const [oldPassword, setOldPassword] = useState("");

  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("oldPassword", oldPassword);
    formdata.append("password", password);
    dispatch(updatePasswordAction(formdata));
  };

  useEffect(() => {
    if (isUpdated) {
      toast("Password has been successfully update", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setOldPassword("");
      setPassword("");

      return;
    }

    if (error) {
      toast(error, {
        type: "error",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => {
          dispatch(clearAuthError);
        },
      });
      return;
    }
  }, [isUpdated, error, dispatch]);

  return (
    <div className="container-container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form onSubmit={submitHandler} className="shadow-lg">
            <h1 className="mt-2 mb-5">Update Password</h1>
            <div className="form-group">
              <label htmlFor="old_password_field">Old Password</label>
              <input
                type="password"
                id="old_password_field"
                className="form-control"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="new_password_field">New Password</label>
              <input
                type="password"
                id="new_password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
