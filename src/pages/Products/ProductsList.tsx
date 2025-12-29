import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';

import { CategoryFilter } from '../../components/categories/CategoryFilter';
import { ProductCart } from '../../components/product/ProductCart';
import { ProductsCard } from '../../components/product/ProductsCard';
import { useGetAllProductsQuery, useGetProductsByCategoryQuery } from '../../store/api';

const ProductsList = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const {
    data: products,
    isLoading: loadProducts,

    isError: errorProducts,
  } = useGetAllProductsQuery();
  const { data: productsByCategory, isLoading } = useGetProductsByCategoryQuery(
    selectedCategory || undefined
  );
  const categories = Array.from(new Set(products?.map((prod) => prod.category)));

  if (errorProducts) {
    return <Box sx={{ mt: 4 }}>Error loading products</Box>;
  }

  return (
    <Box sx={{ paddingTop: 8 }}>
      {loadProducts || isLoading ? (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            mt: 4,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 2,
            }}
          >
            {productsByCategory?.map((product) => (
              <Box key={product.id}>
                <ProductsCard product={product} />
              </Box>
            ))}
          </Box>
        </>
      )}

      <ProductCart />
    </Box>
  );
};

export default ProductsList;
