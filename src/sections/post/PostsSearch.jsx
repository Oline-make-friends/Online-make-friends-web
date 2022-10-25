import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';
import { Autocomplete, InputAdornment, Popper, TextField } from '@mui/material';

import { RiSearchLine } from "react-icons/ri";

const PopperStyle = styled((props) => <Popper placement="bottom-start" {...props} />)({
  width: '280px !important',
});

PostsSearch.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default function PostsSearch({ posts }) {
  return (
    <Autocomplete
      sx={{ width: 280 }}
      autoHighlight
      popupIcon={null}
      PopperComponent={PopperStyle}
      options={posts}
      getOptionLabel={(post) => post.title}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search post..."
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <RiSearchLine size={20} color="text.disable" sx={{ ml: 1 }} />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}
