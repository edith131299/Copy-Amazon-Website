import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, updateProfileAction } from "../actions/LoginAction";
import { toast } from "react-toastify";
import { clearUpdateError } from "../Slices/AuthSlice";

export default function UpdateProfile() {
  const { loading, isUpdated, user, error } = useSelector(
    (state) => state.authState
  );

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [avatar, setAvatar] = useState("");

  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.png"
  );

  const dispatch = useDispatch();

  const onChangeAvatar = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(e.target.files[0]);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("avatar", avatar);
    console.log(formdata)
    dispatch(updateProfileAction(formdata));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      if (user.avatar) {
        setAvatarPreview(user.avatar);
      }
    }

    if (isUpdated) {
      toast("Profile Updated Successfully", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => {
          dispatch(clearUpdateError());
        },
      });

      return;
    }
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
  }, [user, error, isUpdated, dispatch]);

  return (
    <div className="container-container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            onSubmit={submitHandler}
            className="shadow-lg"
            encType="multipart/form-data"
          >
            <h1 className="mt-2 mb-5">Update Profile</h1>

            <div className="form-group">
              <label htmlFor="email_field">Name</label>
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
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="Avatar Preview"
                    />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    onChange={onChangeAvatar}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
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
      </div>
    </div>
  );
}
