import { useMemo } from 'react';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useGetProductsQuery } from '../../store/api';

export const CategoriesMenu = () => {
  const { data } = useGetProductsQuery();

  const categories = useMemo(() => {
    if (!data) return [];

    return Array.from(new Set(data.map((product) => product.category)));
  }, [data]);

  return (
    <List sx={{ padding: 1 }}>
      {categories.map((category) => (
        <ListItem key={category} disablePadding>
          <ListItemButton>
            <ListItemText primary={category} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
