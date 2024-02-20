import React, { useEffect, useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    // width: "300px",
  },
  indeterminateColor: {
    color: "#f50057",
  },
  selectAllText: {
    fontWeight: 500,
  },
  selectedAll: {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.08)",
    },
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ListIconrops = {
  PaperProps: {
    style: {
      maxWidth: 33,
    },
  },
};

function MulSelect({
  optionsglobal,
  onSelect = (selectedList: any[]) => {},
  onRemove,
  width,
  type = "",
}) {
  const classes = useStyles();
  const [selected, setSelected] = useState<any>([]);
  const options = optionsglobal.map((e) => e.label);
  const optArray = optionsglobal.map((e) => {
    return { label: e.label, value: e.value };
  });
  const isAllSelected =
    options?.length > 0 && selected?.length === options?.length;
  const finalSelectedPosition = isAllSelected ? optionsglobal : selected;
  useEffect(() => {
    if (finalSelectedPosition.length === 0) {
      onSelect([]);
    }
  }, [selected]);

  useEffect(() => {
    setSelected(options);
    onSelect(optionsglobal);
  }, []);
  useEffect(() => {
    if (onRemove) {
      setSelected([]);
    }
  }, [onRemove]);

  console.log("IsSelect", isAllSelected ? optionsglobal : selected);

  const handleChange = (event: any) => {
    const value = event.target.value;
    // if (value.length === optArray.length + 1) {
    //   onSelect([]);
    //   //   setSelected([]);
    // }
    // if (!isAllSelected && value.length == 0) {
    //   onSelect([]);
    // }
    if (value[value.length - 1] === "all") {
      setSelected(selected.length === options.length ? [] : options);
      onSelect(optArray);
      return;
    }
    setSelected(value);

    const selectedValArray = value.map((m) => {
      //   console.log("optArray.length", optArray.length);
      for (let i = 0; i < optArray.length; i++) {
        console.log("optArray.length", optArray[i].label);

        if (optArray[i].label === m) {
          console.log("optArray[i]", optArray[i]);
          return optArray[i];
        }
      }
    });

    onSelect(selectedValArray);
  };

  return (
    <FormControl className={classes.formControl} style={{ width: width }}>
      <Select
        labelId="mutiple-select-label"
        multiple
        value={selected}
        onChange={handleChange}
        renderValue={(selected: any) =>
          isAllSelected ? `All ${type}` : selected.join(", ")
        }
        MenuProps={MenuProps}
      >
        <MenuItem
          value="all"
          classes={{
            root: isAllSelected ? classes.selectedAll : "",
          }}
        >
          <ListItemIcon>
            <Checkbox
              classes={{ indeterminate: classes.indeterminateColor }}
              checked={isAllSelected}
              indeterminate={
                selected?.length > 0 && selected?.length < options?.length
              }
            />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.selectAllText }}
            primary="All"
          />
        </MenuItem>
        <br className="mui-br-for-adjust" style={{ display: "none" }} />
        {options.map((option: any) => (
          <MenuItem key={option} value={option}>
            <ListItemIcon>
              <Checkbox checked={selected?.indexOf(option) > -1} />
            </ListItemIcon>
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default MulSelect;
