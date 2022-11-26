import { Stack, TableCell, TableRow, Typography } from "@mui/material";

export default function InfoItem({ title, value, isRequired }){
    return (
        <TableRow>
          <TableCell width="130">
            <Stack direction="row">
              {isRequired && (
                <Typography variant="subtitle2" color="error.main">
                  *
                </Typography>
              )}
              <Typography variant="subtitle2">{title}:</Typography>
            </Stack>
          </TableCell>
          <TableCell sx={{ alignItems: "start" }}>
            <Typography variant="body2">{value}</Typography>
          </TableCell>
        </TableRow>
      );
}