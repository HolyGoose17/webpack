import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useGetProductsQuery } from "../api/api";
import { ProductsPage } from "../components/products/ProductsPage";

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
        gap: 2,
        p: 2,
      }}
    >
      {data?.map((product) => (
        <Box
          key={product.id}
          sx={{
            minWidth: 280,
          }}
        >
          <ProductsPage product={product} />
        </Box>
      ))}
    </Box>
  );
};
