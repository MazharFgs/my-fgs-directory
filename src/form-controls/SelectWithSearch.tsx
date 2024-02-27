import React, { useMemo, useEffect, useState } from "react";
import { Multiselect } from "multiselect-react-dropdown";

function SelectWithSearch({
  selectedValues: selectedValuesProp,
  options,
  onSelect = (selectedList: any[]) => {},
  ...rest
}) {
  // STATE DECLARATIONS
  const [selectedValues, setSelectedValues] = useState([]);
  const [textSearch, setTextSearch] = useState("");

  //   Update selected value from props if available
  useEffect(() => {
    if (Array.isArray(selectedValuesProp) && selectedValuesProp.length) {
      setSelectedValues(selectedValuesProp);
    }
  }, [selectedValuesProp]);

  const handleOnSearch = (value) => {};

  const handleOnSelect = (selectedList: any[], selectedItem: any[]) => {};

  /**
   * Function is to handle decorator text
   * @param {*} v String
   * @param {*} option
   * @returns
   */
  const handleValueDecorator = (v, option) => {
    // return if empty or not matching
    if (
      textSearch === "" ||
      !v.toLowerCase().includes(textSearch.toLowerCase())
    ) {
      return v;
    }
    // highlight searched portion
    const regex = new RegExp(textSearch, "gi");
    const highlightedContent = v.replace(
      regex,
      (match) => `<strong className="highlight">${match}</strong>`
    );
    return (
      <span dangerouslySetInnerHTML={{ __html: highlightedContent }}></span>
    );
  };

  const optionsWillAll = useMemo(() => {
    if (!Array.isArray(options)) return [];
    return [{ ...options }];
  }, [options]);
  console.log("optionsWillAll", optionsWillAll);
  return (
    <Multiselect
      {...rest}
      options={options}
      selectedValues={selectedValues}
      customCloseIcon={<></>}
      selectionLimit={1}
      avoidHighlightFirstOption
      onSearch={handleOnSearch}
      //   onSelect={}
      onSelect={handleOnSelect}
      //   optionValueDecorator={handleValueDecorator}
      hidePlaceholder
      style={{
        chips: {
          background: "none",
          color: "var(--Green-3, #2D5453)",
          padding: 0,
          margin: "0 4px 0 0",
        },
      }}
    />
  );
}

export default SelectWithSearch;
