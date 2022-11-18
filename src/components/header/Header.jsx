import PropTypes from 'prop-types';

import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';

import AccountPopover from './AccountPopover';
import NotificationsPopover from './NotificationsPopover';

import { AiOutlineMenuFold } from "react-icons/ai";

const DRAWER_WIDTH = 280;
const APPBAR_SMALLSCREEN = 64;
const APPBAR_LARGESCREEN = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)',
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_SMALLSCREEN,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_LARGESCREEN,
    padding: theme.spacing(0, 5),
  },
}));

Header.propTypes = {
  onOpenSidebar: PropTypes.func,
};

export default function Header({ onOpenSidebar }) {
  return (
    <RootStyle>
      <ToolbarStyle>
        <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary', display: { lg: 'none' } }}>
          <AiOutlineMenuFold/>
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <NotificationsPopover />
          <AccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
