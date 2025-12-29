import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { IProductCategories } from '../../types/types';

export const CategoryFilter = ({ categories, selectedCategory, onSelect }: IProductCategories) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
        Categories
      </Typography>

      <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" useFlexGap>
        <Button
          variant={selectedCategory === null ? 'contained' : 'outlined'}
          onClick={() => onSelect(null)}
        >
          All
        </Button>

        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'contained' : 'outlined'}
            onClick={() => onSelect(category)}
          >
            {category}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};
