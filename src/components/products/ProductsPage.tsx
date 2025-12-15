import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { getCart, loadCart } from "../../store/cart";
import { IProduct } from "../../types/product.types";

interface ProductCardProps {
  product: IProduct;
}

export const ProductsPage = ({ product }: ProductCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const cart = useAppSelector(getCart);

  const totalAmount =
    cart?.products.reduce((sum, product) => sum + product.total, 0) || 0;

  const showModal = () => {
    setIsModalOpen(true);
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

  return (
    <Card variant="outlined" sx={{ maxWidth: 460 }}>
      <Box sx={{ p: 4 }}>
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            ${product.price}
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {product.description.length > 100
            ? `${product.description.slice(0, 100)}...`
            : product.description}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 4 }}>
        <Typography gutterBottom variant="body2">
          Category
        </Typography>
        <Stack direction="row" spacing={1}>
          {product.tags?.slice(0, 2).map((tag, index) => (
            <Chip key={index} color="primary" label={tag} size="small" />
          ))}
        </Stack>
      </Box>
    </Card>
  );
};
