import Rating from '@mui/material/Rating';
import { styled } from '@mui/system';

const CustomRating = styled(Rating)({
  '& .MuiRating-iconEmpty': {
    color: 'rgb(177 179 181 / 81%)', // Optional: Customize empty star color
  },
  '& .MuiRating-iconFilled': {
    color: '#d97a07', // Optional: Customize filled star color
  },
});

export default  CustomRating;