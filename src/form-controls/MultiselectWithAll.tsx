import React, { useEffect, useMemo, useState } from "react";
import { Multiselect } from "multiselect-react-dropdown";

function MultiselectWithAll({
  options = [],
  selectedValues: selectedValuesProp,
  onSelect = (selectedList: any[], selectedItem: any[]) => {},
  onRemove = (selectedList: any[], selectedItem: any[]) => {},
  ...rest
}) {
  // STATE DECLARATIONS
  const [selectedValues, setSelectedValues]: any[] = useState([]);

  //   Update selected value from props if available
  useEffect(() => {
    if (Array.isArray(selectedValuesProp)) {
      if (options.length === selectedValuesProp.length) {
        // Add all option if not available
        setSelectedValues([
          { label: "All", value: "*" },
          ...selectedValuesProp,
        ]);
      } else {
        setSelectedValues(selectedValuesProp);
      }
    }
  }, [selectedValuesProp]);

  // Add all option to Dropdown
  const optionsWillAll = useMemo(() => {
    if (!Array.isArray(options)) return [];
    return [{ label: "All", value: "*" }, ...options];
  }, [options]);

  // Handle all option on select
  const handleOnSelect = (selectedList: any[], selectedItem: any[]) => {
    if (selectedItem?.value === "*") {
      setSelectedValues([...optionsWillAll]);
      onSelect([...options], selectedItem);
      return;
    } else if (selectedList.length === options.length) {
      setSelectedValues([...optionsWillAll]);
      onSelect([...options], selectedItem);
      return;
    }

    if (onSelect) {
      onSelect(
        selectedList.filter((sl) => sl.value !== "*"),
        selectedItem
      );
    }
  };

  // Handle all option on remove
  const handleOnRemove = (selectedList: any[], selectedItem: any[]) => {
    if (selectedItem.value === "*") {
      setSelectedValues([]);
      onRemove([], selectedItem);
      return;
    } else if (selectedList.length === options.length) {
      const optionsRemovedAll = selectedList.filter((sl) => sl.value !== "*");
      setSelectedValues(optionsRemovedAll);
      onRemove(optionsRemovedAll, selectedItem);
      return;
    }

    // call onremove of parent
    if (onRemove) {
      onRemove(selectedList, selectedItem);
    }
  };

  const selectedValueDecorator = (v: string) =>
    v === "All" ? <></> : <>{v}, </>;

  return (
    <Multiselect
      {...rest}
      options={optionsWillAll}
      onSelect={handleOnSelect}
      onRemove={handleOnRemove}
      selectedValues={selectedValues}
      selectedValueDecorator={selectedValueDecorator}
      //   FOR COMMA SEPERATED VALUES
      customCloseIcon={<></>}
      style={{
        chips: {
          background: "none",
          color: "var(--Green-3, #2D5453)",
          padding: 0,
          margin: "0 4px 0 0",
        },
        multiselectContainer: {},
        searchBox: {},
      }}
    />
  );
}

export default MultiselectWithAll;
