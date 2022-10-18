import { Stack, Button, Divider, Typography } from '@mui/material';
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaTwitter } from "react-icons/fa";

export default function AuthSocial() {
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button fullWidth size="large" color="inherit" variant="outlined">
          <FcGoogle size={22}/>
        </Button>

        <Button fullWidth size="large" color="inherit" variant="outlined">
          <FaFacebookF color="#1877F2" size={22} />
        </Button>

        <Button fullWidth size="large" color="inherit" variant="outlined">
          <FaTwitter color="#1C9CEA" size={22} />
        </Button>
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>
    </>
  );
}
