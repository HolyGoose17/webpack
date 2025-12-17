import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useGetProductsQuery } from "../api/api";
import { ProductsPage } from "../components/products/ProductsPage";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Backdrop,
  Badge,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "../hooks/redux.hook";
import { useEffect, useState } from "react";
import { clearCart, getCart, loadCart, removeFromCart } from "../store/cart";
// import { Cart } from "../components/Cart/Cart.jsx";

export const ProductsList = () => {
  const { data, isLoading, isError } = useGetProductsQuery();
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cart = useAppSelector(getCart);

  const totalAmount =
    cart?.products.reduce((sum, product) => sum + product.total, 0) || 0;

  const showModal = () => {
    setIsModalOpen(true);
    console.log(cart?.products.length);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(loadCart());
  }, [dispatch]);

  if (isError) {
    return <Box sx={{ mt: 4 }}>Error dowload products</Box>;
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 2,
        p: 2,
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        data?.map((product) => (
          <Box key={product.id}>
            <ProductsPage product={product} />
          </Box>
        ))
      )}
      <Button
        size="large"
        onClick={showModal}
        sx={{
          color: "black",
          position: "fixed",
          top: "94%",
          left: "94%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Badge badgeContent={cart?.products.length || 0} color="error" showZero>
          <ShoppingCartIcon />
        </Badge>
      </Button>
      <Backdrop open={isModalOpen} onClick={handleCancel}>
        {/* <Cart /> */}
        <Card>
          <CardContent>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              Your Order
            </Typography>
            {cart && cart.products.length > 0 ? (
              <Container>
                {/* Список товаров */}
                <Box>
                  {cart.products.map((product) => (
                    <Box
                      key={product.id}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        border: "1px solid #f0f0f0",
                        borderRadius: 1,
                        background: "#fafafa",
                      }}
                    >
                      <Box>
                        <Typography>{product.title}</Typography>
                        <Typography>
                          Цена: ${product.price} * {product.quantity} = $
                          {product.total}
                        </Typography>
                      </Box>
                      <Button
                        onClick={() => dispatch(removeFromCart(product.id))}
                      >
                        <DeleteIcon />
                      </Button>
                    </Box>
                  ))}
                </Box>
                {/* Итоговая сумма  */}
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography>Total:</Typography>
                  <Typography fontSize="18px" color="#1890ff">
                    ${totalAmount.toFixed(2)}
                  </Typography>
                </Box>
                {/* Кнопка очистки корзины */}
                <Button
                  sx={{ padding: 0, marginTop: 0.5 }}
                  color="error"
                  onClick={() => dispatch(clearCart())}
                >
                  Clean all products
                </Button>
              </Container>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#fafafa",
                }}
              >
                <Typography>Your cart is empty</Typography>
              </Box>
            )}
          </CardContent>
          <Box>
            <Button onClick={handleCancel}>
              <Typography>Cancel</Typography>
            </Button>
            <Button onClick={handleOk}>
              <Typography>Order</Typography>
            </Button>
          </Box>
        </Card>
      </Backdrop>
    </Box>
  );
};
