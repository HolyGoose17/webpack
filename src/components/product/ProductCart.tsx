import {
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook';
import { clearCart, getCart, loadCart, removeFromCart } from '../../store/cart';
import { useEffect, useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useOrderSubmitMutation } from '../../store/api';

export const ProductCart = () => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cart = useAppSelector(getCart);
  const [orderSubmit] = useOrderSubmitMutation();

  const totalAmount = cart?.products.reduce((sum, product) => sum + product.total, 0) || 0;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (!cart || cart.products.length === 0) return;
    setIsModalOpen(false);

    try {
      await orderSubmit(cart).unwrap();
      dispatch(clearCart());
    } catch (err) {
      console.error('Failed to submit the order', err);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(loadCart());
  }, []);

  return (
    <>
      <IconButton
        size="large"
        onClick={showModal}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          bgcolor: 'background.paper',
          boxShadow: 3,
        }}
      >
        <Badge badgeContent={cart?.products.length || 0} color="error" showZero>
          <ShoppingCartIcon />
        </Badge>
      </IconButton>

      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Your order</DialogTitle>
        <DialogContent dividers sx={{ maxHeight: 400 }}>
          {cart && cart.products.length > 0 ? (
            <Stack spacing={2}>
              {cart.products.map((product) => (
                <Box
                  key={product.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="h1">{product.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${product.price} × {product.quantity}
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography fontWeight={600}>${product.total}</Typography>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => dispatch(removeFromCart(product.id))}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Box>
              ))}
            </Stack>
          ) : (
            <Typography color="text.secondary">Your cart is empty</Typography>
          )}
        </DialogContent>
        <DialogContent>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6">${totalAmount.toFixed(2)}</Typography>
          </Stack>

          <Button color="error" size="small" onClick={() => dispatch(clearCart())}>
            Clear cart
          </Button>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button variant="contained" onClick={handleOk}>
            Order
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
