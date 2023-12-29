import axios from "axios";
import { cartError, cartRequest, cartSuccess } from "../Slices/CartSlice";

export const CartAction = (id, quantity) => async (dispatch) => {
  try {
    dispatch(cartRequest());

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch(
      cartSuccess({
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].image,
        stock: data.product.stock,
        quantity,
      })
    );
  } catch (error) {}
};
