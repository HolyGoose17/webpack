import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useGetProductsQuery } from "../api/api";
import { ProductsPage } from "../components/products/ProductsPage";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button } from "@mui/material";

export const ProductsList = () => {
  const { data, isLoading, isError } = useGetProductsQuery();
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return <Box sx={{ mt: 4 }}>Ошибка загрузки товаров</Box>;
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
      {data?.map((product) => (
        <Box key={product.id}>
          <ProductsPage product={product} />
        </Box>
      ))}
      <Button
        size="large"
        sx={{
          // backgroundColor: "rgba(49, 237, 77, 0.7)",
          color: "black",
          position: "fixed",
          top: "94%",
          left: "94%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <ShoppingCartIcon />
      </Button>
    </Box>
  );
};
