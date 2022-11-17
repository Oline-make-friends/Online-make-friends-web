import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';
import { RiSearchLine, RiFilter2Fill } from "react-icons/ri";
import { Toolbar, Tooltip, IconButton, OutlinedInput, InputAdornment, Drawer, Stack, Typography, Divider, FormGroup, FormControlLabel, Checkbox, Radio, RadioGroup, Rating, Box, Button } from '@mui/material';
import { MdOutlineClose } from 'react-icons/md';
import Scrollbar from '../Scrollbar';
import { useState } from 'react';
import { AiOutlineClear } from 'react-icons/ai';

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'left',
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  marginLeft: 10,
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

function FilterSideBar({FilterOption}) {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <>
      <Tooltip title="Filter list">
        <IconButton disableRipple onClick={handleOpenFilter}>
          <RiFilter2Fill />
        </IconButton>
      </Tooltip>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={handleCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Filters
          </Typography>
          <IconButton onClick={handleCloseFilter}>
            <MdOutlineClose sx={20} />
          </IconButton>
        </Stack>

        <Divider />

        {FilterOption}

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            startIcon={<AiOutlineClear />}
          >
            Clear All
          </Button>
        </Box>
      </Drawer>
    </>
  )
}

export default function UserListToolbar({ filterName, onFilterName, FilterOption }) {
  return (
    <RootStyle>
      <FilterSideBar FilterOption={FilterOption}/>
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
    </RootStyle>
  );
}
