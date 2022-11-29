import { styled } from "@mui/material/styles";
import { RiSearchLine } from "react-icons/ri";
import {
  Toolbar,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "left",
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 300,
  marginLeft: 10,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": { width: 350, boxShadow: theme.customShadows.z8 },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

const FormControlStyle = styled(FormControl)(({ theme }) => ({
  width: 150,
  marginLeft: 10,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

const DatePickerStyle = styled(DatePicker)(({ theme }) => ({
  width: 250,
  marginLeft: 10,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

export default function TableToolbar({ conditions }) {
  return (
    <RootStyle direction="row" justifyItems="space-between">
      {conditions &&
        conditions.map((condition) => {
          return (
            <div>
              {condition.type === "input" && (
                <SearchStyle
                  value={condition.query}
                  onChange={condition.onChange}
                  placeholder={condition.label}
                  startAdornment={
                    <InputAdornment position="start">
                      <RiSearchLine color="text.disabled" size={20} />
                    </InputAdornment>
                  }
                />
              )}
              {condition.type === "select" && condition.items && (
                <FormControlStyle fullWidth>
                  <InputLabel>{condition.label}</InputLabel>
                  <Select
                    value={condition.query}
                    label={condition.label}
                    onChange={condition.onChange}
                  >
                    {condition.items.map((item) => {
                      return (
                        <MenuItem value={item.value}>{item.display}</MenuItem>
                      );
                    })}
                  </Select>
                </FormControlStyle>
              )}
              {condition.type === "date" && (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePickerStyle
                    label={condition.label}
                    value={condition.query}
                    onChange={condition.onChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              )}
            </div>
          );
        })}
    </RootStyle>
  );
}
