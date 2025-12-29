import DescriptionIcon from '@mui/icons-material/Description';
import SoapIcon from '@mui/icons-material/Soap';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/redux.hook';
import { addToCart } from '../../store/cart';
import { IProduct } from '../../types/types';

interface ProductCardProps {
  product: IProduct;
}

export const ProductsCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          minWidth: 450,
          maxWidth: 450,

          boxShadow: 1,
          '&:hover': {
            boxShadow: 4,
          },
        }}
      >
        <CardMedia
          component="img"
          sx={{ height: 220, objectFit: 'contain' }}
          image={product.thumbnail}
          alt={product.title}
          onClick={() => navigate(`/products/${product.id}`)}
        />
        <Box sx={{ p: 2 }}>
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography gutterBottom variant="h1" component="div">
              {product.title}
            </Typography>
            <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '1rem' }}>
              ${product.price}
            </Typography>
          </Stack>
          <Typography variant="body2" sx={{ color: 'text.secondary', minHeight: 40 }}>
            {product.description.length > 100
              ? `${product.description.slice(0, 100)}...`
              : product.description}
          </Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            p: 2,
            maxHeight: 75,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: 1,
            padding: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography gutterBottom variant="body2">
              Tags
            </Typography>
            <Stack direction="row" spacing={1}>
              {product.tags?.slice(0, 2).map((tag, index) => (
                <Chip key={index} color="success" label={tag} size="small" />
              ))}
            </Stack>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              onClick={() => navigate(`/products/${product.id}`)}
              size="small"
              title="Description"
              sx={{ minWidth: 0 }}
            >
              <DescriptionIcon />
            </Button>
            <Button
              onClick={() => dispatch(addToCart(product))}
              size="small"
              title="Take it"
              sx={{ minWidth: 0 }}
            >
              <SoapIcon />
            </Button>
          </Box>
        </Box>
      </Card>
    </>
  );
};
