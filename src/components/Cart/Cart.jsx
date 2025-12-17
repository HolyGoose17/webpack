import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppSelector } from "../../hooks/redux.hook";
import { clearCart, getCart, loadCart, removeFromCart } from "";

export const Cart = () => {
  const cart = useAppSelector(getCart);
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
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
                  <Button onClick={() => dispatch(removeFromCart(product.id))}>
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
  );
};
