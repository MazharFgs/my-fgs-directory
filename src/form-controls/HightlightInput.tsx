import React, { useState } from "react";
import createTheme from "@mui/material/styles/createTheme";
import { ThemeProvider } from "@emotion/react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center",
  },
  variant: "menu",
};

const useStyles: any = makeStyles(() => ({
  formControl: {
    "& .MuiSelect-root": {
      minWidth: 10,
    },
  },
}));

const theme = createTheme({
  components: {
    // Name of the component
    MuiPaper: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          padding: 0,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          padding: 0,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          padding: 0,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          padding: 0,
        },
      },
    },
  },
});

function HightlightInput({ listOptions, onSelectSearch = () => {} }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [autoCompleteval, setAutocompleteval] = useState("");
  const [inputValue, setInputValue] = React.useState("");
  const [valueState, setValueState] = React.useState("");
  const [cancelIcon, setCancelIcon] = React.useState(false);

  const onAutoCompletechange = (event: any, newValue: any) => {
    const selectedOption = newValue?.label || "";
    setValueState(selectedOption);
    setInputValue(selectedOption);
    setOpen(false);
    setAutocompleteval(selectedOption);
    onSelectSearch(selectedOption);
  };
  const keyDownHandler = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSelectSearch(inputValue);
    }
  };

  const handleOpen = () => {
    if (inputValue.length > 2) {
      setOpen(true);
    }
    if (inputValue.length > 1) {
      setCancelIcon(true);
    }
  };

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    setValueState(newInputValue);
    if (newInputValue.length > 2) {
      setOpen(true);
    } else {
      setOpen(false);
    }
    if (newInputValue.length > 1) {
      setCancelIcon(true);
    } else {
      setCancelIcon(false);
    }
  };

  const onCancelEvent = () => {
    setInputValue("");
    onSelectSearch("");
    setValueState("");
    setAutocompleteval("");
    setOpen(false);
    setCancelIcon(false);
    setValueState("");
  };

  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        sx={{
          "& legend": { display: "none" },
          "& fieldset": { top: 0 },
          width: 500,
        }}
        id="autocomplete-highlight-id"
        className="autocomplete-highlight-id"
        open={open}
        inputValue={valueState}
        onOpen={handleOpen}
        onClose={() => setOpen(false)}
        options={listOptions.map((option) => option)}
        onChange={onAutoCompletechange}
        disableClearable={false}
        clearOnBlur={false}
        // noOptionsMessage={() => null}
        onInputChange={handleInputChange}
        onKeyDown={keyDownHandler}
        value={autoCompleteval}
        disableCloseOnSelect
        renderInput={(params) => (
          <TextField
            className="autocomplete-textfield-highlight"
            placeholder={"Type a name"}
            sx={{
              "& legend": { display: "none" },
              "& .MuiOutlinedInput-root": {
                padding: "0px !important",
                paddingRight: "8px !important",
              },
              "& fieldset": { top: 0 },
            }}
            {...params}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {cancelIcon && (
                    <CancelIcon
                      className="autocomplete-cancel-highlight"
                      onClick={onCancelEvent}
                    ></CancelIcon>
                  )}
                  <SearchOutlinedIcon
                    className="autocomplete-searchoutline-highlight"
                    onClick={() => onSelectSearch(inputValue)}
                  ></SearchOutlinedIcon>
                </>
              ),
            }}
          />
        )}
        renderOption={(props, option: any, { inputValue }) => {
          const matches = match(option.label, inputValue, {
            insideWords: true,
          });
          const parts = parse(option.label, matches);
          console.log("partsparts", parts);

          return (
            <li {...props} className="highlight-input-li">
              <div className="highlight-input-li-div">
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                ))}
              </div>
            </li>
          );
        }}
      />
    </ThemeProvider>
  );
}

export default HightlightInput;
