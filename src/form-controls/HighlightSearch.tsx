import React, { useState } from "react";
import Select, { components } from "react-select";
import SearchIcon from "@material-ui/icons/Search";

const view_url =
  "https://my.fgsglobal.com/content/page/65d2c7a0ff842f089f9ca925";

const getFormatedV2 = (label, userInput) => {
  // Highlight letters
  return label
    ?.split(" ")
    .map((word: string) =>
      word
        .split("")
        .map((c: string) =>
          userInput.toLowerCase().includes(c.toLowerCase()) ? (
            <b style={{ color: "#e5f3f4;" }}>{c}</b>
          ) : (
            c
          )
        )
    );
};

// Custom components for highlight on search
const Option = (props) => {
  const userInput = props?.selectProps?.inputValue || "";
  const label = props?.data?.label || "";
  return (
    <components.Option {...props}>
      <div>
        {userInput?.length
          ? label?.split(" ").length
            ? getFormatedV2(label, userInput)
            : label
          : label}
      </div>
    </components.Option>
  );
};

const HighlightSearch = ({ options }) => {
  const filterOption = (option, inputValue) => {
    if (inputValue) {
      const { label, value } = option;
      const otherKey = options.filter((opt) => {
        return opt.label.toLowerCase().includes(inputValue.toLowerCase());
      });

      return (
        value.includes(inputValue.charAt(0).toUpperCase()) &&
        otherKey.length > 0
      );
    }
  };

  function handleSelect(sdata) {
    // console.log("ssss", sdata);
    // return;
    localStorage.setItem("view_profile_email", sdata.email);
    window.location = view_url;
    //   setSelectedOptions(data);
  }

  return (
    <>
      <Select
        options={options}
        // placeholder="Find a person"
        placeholder={
          <>
            <label>Find a person</label>
            <SearchIcon style={{ float: "right" }} />
          </>
        }
        onChange={handleSelect}
        filterOption={filterOption}
        components={{ Option }}
      />
    </>
  );
};
export default HighlightSearch;
