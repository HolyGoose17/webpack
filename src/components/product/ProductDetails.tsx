import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetProductByIdQuery } from '../../store/api';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetProductByIdQuery(id!);

  return (
    <Box
      sx={{
        marginTop: '9%',
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            mt: 6,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            maxWidth: '70%',
            mx: 'auto',
            my: 6,
            px: 2,
          }}
        >
          <Card
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              boxShadow: 4,
              borderRadius: 3,
              overflow: 'hidden',
            }}
          >
            <CardMedia
              component="img"
              src={data?.thumbnail}
              alt={data?.title}
              sx={{
                width: { xs: '100%', md: 400 },
                height: { xs: 250, md: '100%' },
                objectFit: 'contain',
                backgroundColor: '#f5f5f5',
              }}
            />

            <CardContent sx={{ flex: 1, position: 'relative', p: 4 }}>
              <IconButton
                onClick={() => navigate('/products')}
                sx={{ position: 'absolute', top: 16, right: 16 }}
              >
                <CloseIcon />
              </IconButton>

              <Typography variant="h4" fontWeight={700} gutterBottom>
                {data?.title}
              </Typography>

              <Typography variant="h5" fontWeight={600} gutterBottom>
                ${data?.price}
              </Typography>

              <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                <Rating
                  name="half-rating-read"
                  defaultValue={data?.rating}
                  precision={0.5}
                  readOnly
                />
                <Typography variant="h5">{data?.rating} / 5</Typography>
              </Stack>

              <Typography variant="body1" color="text.secondary" paragraph>
                {data?.description}
              </Typography>

              {data?.tags && (
                <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
                  {data.tags.map((tag) => (
                    <Chip key={tag} label={tag} size="small" color="success" sx={{ mb: 1 }} />
                  ))}
                </Stack>
              )}

              <Divider sx={{ my: 2 }} />
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};
