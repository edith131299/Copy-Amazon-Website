import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetProduct, updateProductAction } from "../actions/ProductAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader";
import { toast } from "react-toastify";
import SideBar from "./sidebar";
import { clearError, clearUpdateProduct } from "../Slices/ProductSlice";

export default function UpdateProduct() {
  const {
    product = {},
    loading,
    error,
    isProductUpdated,
  } = useSelector((state) => state.productState);

  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesCleared, setImagesCleared] = useState(false);
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
  const submitHandler = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("price", price);
    formdata.append("description", description);
    formdata.append("category", category);
    formdata.append("stock", stock);
    formdata.append("seller", seller);
    formdata.append("imagesCleared", imagesCleared);
    images.forEach((image) => {
      formdata.append("images", image);
    });
    dispatch(updateProductAction(id, formdata));
  };

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

  const clearImageHandler = () => {
    setImages([]);
    setImagesPreview([]);
    setImagesCleared(true);
  };

  useEffect(() => {
    if (isProductUpdated) {
      toast("Product Updated Successfully", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => {
          dispatch(clearUpdateProduct());
        },
      });
      setImages([]);
      return;
    }

    if (error) {
      toast(error, {
        type: "error",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => {
          dispatch(clearError());
        },
      });

      return;
    }
    dispatch(GetProduct(id));
  }, [error, dispatch, isProductUpdated]);

  useEffect(() => {
    if (product._id) {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setStock(product.stock);
      setSeller(product.seller);

      let images = [];
      product.images.forEach((image) => {
        images.push(image.image);
      });
      setImagesPreview(images);
    }
  }, [product]);

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
                <h1 className="mb-4">Update Product</h1>

                <div className="form-group">
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price_field">Price</label>
                  <input
                    type="text"
                    id="price_field"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description_field">Description</label>
                  <textarea
                    className="form-control"
                    id="description_field"
                    rows="8"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="category_field">Category</label>
                  <select
                    onClick={(e) => setCategory(e.target.value)}
                    className="form-control"
                    id="category_field"
                  >
                    <option>Books</option>
                    {categories.map((i) => (
                      <option value={category} key={i}>
                        {i}
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
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="seller_field">Seller Name</label>
                  <input
                    type="text"
                    id="seller_field"
                    className="form-control"
                    value={seller}
                    onChange={(e) => setSeller(e.target.value)}
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
                  {imagesPreview.length > 0 && (
                    <span
                      className="mr-4"
                      onClick={clearImageHandler}
                      style={{ cursor: "pointer" }}
                    >
                      <i className="fa fa-trash"></i>
                    </span>
                  )}
                  {imagesPreview.map((image, i) => (
                    <img
                      className="mt-3 mr-2"
                      key={i}
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
                  UPDATE
                </button>
              </form>
            </div>
          )}
        </Fragment>
      </div>
    </div>
  );
}
