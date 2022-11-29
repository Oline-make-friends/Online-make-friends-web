import PropTypes from "prop-types";

import { Paper, Typography } from "@mui/material";

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string,
};

export default function SearchNotFound({ searchQuery = "", ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Not found
      </Typography>
      {searchQuery.length > 0 && (
        <Typography variant="body2" align="center">
          No results found for &nbsp;
          <strong>&quot;{searchQuery}&quot;</strong>. Try checking for typos or
          using complete words.
        </Typography>
      )}
      {searchQuery.length === 0 && (
        <Typography variant="body2" align="center">
          No results found
        </Typography>
      )}
    </Paper>
  );
}
