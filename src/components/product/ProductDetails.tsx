import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  CardMedia,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Rating,
  Stack,
  Typography,
} from '@mui/material';

import { IProps } from '../../types/types';

export const ProductDetails = ({ open, onClose, product }: IProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h1"> {product.title}</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CardMedia
              component="img"
              src={product.thumbnail}
              alt={product.title}
              sx={{
                maxWidth: '100%',
                maxHeight: 350,
                objectFit: 'contain',
              }}
            />
          </Box>

          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
            }}
          >
            <Typography variant="h5" fontWeight={600} gutterBottom>
              ${product.price}
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              {product.description}
            </Typography>

            {product.tags && (
              <Stack direction="row" spacing={1} mb={2}>
                {product.tags.map((tag) => (
                  <Chip key={tag} label={tag} size="small" color="success" />
                ))}
              </Stack>
            )}

            <Divider sx={{ my: 2 }} />

            <Stack direction="row" justifyContent="center" spacing={1}>
              <Rating
                name="half-rating-read"
                defaultValue={product.rating}
                precision={0.5}
                readOnly
              />
            </Stack>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
