import { Breadcrumbs, Link } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

const RootStyle = styled(Breadcrumbs)(({ theme }) => ({
  color: "text.secondary",
  backgroundColor: alpha(
    theme.palette.primary.main,
    theme.palette.action.selectedOpacity
  ),
  borderRadius: 10,
  padding: 10,
  paddingLeft: 30,
  marginBottom: 15,
  width: "100%",
}));

export default function LinkBar({ array }) {
  return (
    <RootStyle>
      {array.map((item) => {
        return (
          <Link key={item.label} href={item.href} underline="hover">
            {item.label}
          </Link>
        );
      })}
    </RootStyle>
  );
}
