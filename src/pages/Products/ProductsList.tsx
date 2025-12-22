import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { ProductsPage } from '../../components/product/ProductsPage';
import { ProductCart } from '../../components/product/ProductCart';
import { useGetProductsQuery } from '../../store/api';

const ProductsList = () => {
  const { data, isLoading, isError } = useGetProductsQuery();

  if (isError) {
    return <Box sx={{ mt: 4 }}>Error loading products</Box>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 2,
        p: 2,
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        data?.map((product) => (
          <Box key={product.id} sx={{ marginTop: 6 }}>
            <ProductsPage product={product} />
          </Box>
        ))
      )}
      <ProductCart />
    </Box>
  );
};

export default ProductsList;
