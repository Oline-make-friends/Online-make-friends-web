import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';
import { RiSearchLine, RiFilter2Fill } from "react-icons/ri";
import { Toolbar, Tooltip, IconButton, OutlinedInput, InputAdornment } from '@mui/material';

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

UserListToolbar.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function UserListToolbar({ filterName, onFilterName }) {
  return (
    <RootStyle>
      <SearchStyle
        value={filterName}
        onChange={onFilterName}
        placeholder="Search user..."
        startAdornment={
          <InputAdornment position="start">
            <RiSearchLine color="text.disabled" size={20} />
          </InputAdornment>
        }
      />

      <Tooltip title="Filter list">
        <IconButton>
          <RiFilter2Fill />
        </IconButton>
      </Tooltip>
    </RootStyle>
  );
}
