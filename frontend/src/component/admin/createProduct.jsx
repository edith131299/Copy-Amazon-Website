import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "./sidebar";
import { createNewProductAction } from "../actions/ProductAction";
import { clearError, clearNewProduct } from "../Slices/ProductSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/Loader";

export default function CreateProduct() {
  const { loading, isProductSubmitted, error } = useSelector(
    (state) => state.productState
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Electronics",
    "Mobile Phones",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  const onImageChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, file]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("price", price);
    formdata.append("description", description);
    formdata.append("category", category);
    formdata.append("stock", stock);
    formdata.append("seller", seller);
    images.forEach((image) => {
      formdata.append("images", image);
    });

    dispatch(createNewProductAction(formdata));
  };

  useEffect(() => {
    if (isProductSubmitted) {
      toast("Product Created Successfully", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => {
          dispatch(clearNewProduct());
        },
      });
      navigate("/admin/products");
    }

    if (error) {
      if (error) {
        toast(error, {
          type: "error",
          position: toast.POSITION.BOTTOM_CENTER,
          onOpen: () => {
            dispatch(clearError());
          },
        });
      }
    }
  }, [error, isProductSubmitted, dispatch]);

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
              <form
                onSubmit={submitHandler}
                className="shadow-lg"
                encType="multipart/form-data"
              >
                <h1 className="mb-4">New Product</h1>

                <div className="form-group">
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price_field">Price</label>
                  <input
                    type="text"
                    id="price_field"
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description_field">Description</label>
                  <textarea
                    className="form-control"
                    id="description_field"
                    rows="8"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="category_field">Category</label>
                  <select
                    onClick={(e) => setCategory(e.target.value)}
                    className="form-control"
                    id="category_field"
                  >
                    <option value="">Select</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="stock_field">Stock</label>
                  <input
                    type="number"
                    id="stock_field"
                    className="form-control"
                    onChange={(e) => setStock(e.target.value)}
                    value={stock}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="seller_field">Seller Name</label>
                  <input
                    type="text"
                    id="seller_field"
                    className="form-control"
                    onChange={(e) => setSeller(e.target.value)}
                    value={seller}
                  />
                </div>

                <div className="form-group">
                  <label>Images</label>

                  <div className="custom-file">
                    <input
                      type="file"
                      name="product_images"
                      className="custom-file-input"
                      id="customFile"
                      multiple
                      onChange={onImageChange}
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Images
                    </label>
                  </div>
                  {imagesPreview.map((image) => (
                    <img
                      className="mt-3 mr-2"
                      key={image}
                      src={image}
                      alt="images-preview"
                      height="52"
                      width="55"
                    />
                  ))}
                </div>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                  disabled={loading}
                >
                  CREATE
                </button>
              </form>
            </div>
          )}
        </Fragment>
      </div>
    </div>
  );
}
