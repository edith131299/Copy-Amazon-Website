import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginAction, clearAuthError } from "../actions/LoginAction";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.authState
  );

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const location = useLocation();

  const redirect = location.search ? "/" + location.search.split("=")[1] : "/";

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(LoginAction(email, password));
  };

  useEffect(() => {
    if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "error",
        onOpen: () => {
          dispatch(clearAuthError);
        },
      });
      return;
    }

    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [error, isAuthenticated, dispatch, navigate]);

  return (
    <Fragment>
      <div className="container container-fluid">
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form onSubmit={submitHandler} className="shadow-lg">
              <h1 className="mb-3">Login</h1>
              <div className="form-group">
                <label htmlFor="email_field">Email</label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password_field">Password</label>
                <input
                  type="password"
                  id="password_field"
                  className="form-control"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                />
              </div>

              <Link to="/password/forgot" className="float-right mb-4">
                Forgot Password?
              </Link>

              <button
                id="login_button"
                type="submit"
                className="btn btn-block py-3"
              >
                LOGIN
              </button>

              <Link to={"/register"} className="float-right mt-3">
                New User?
              </Link>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
