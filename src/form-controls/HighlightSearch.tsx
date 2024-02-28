import React, { useState, useRef } from "react";
import Select, { components } from "react-select";
import SearchIcon from "@material-ui/icons/Search";

const view_url =
  "https://my.fgsglobal.com/content/page/65d2c7a0ff842f089f9ca925";

const getFormatedV2 = (label, userInput) => {
  // Highlight letters
  return label?.split(" ").map((word: string) =>
    word.split("").map((c: string) =>
      userInput.toLowerCase().includes(c.toLowerCase()) ? (
        // <b style={{ color: "#e5f3f4" }}>{c}</b>
        <b style={{ color: "black" }}>{c}</b>
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

const HighlightSearch = ({
  options,
  onSelectSearch = (selectedList: any[]) => {},
}) => {
  console.log("options all", options);
  //   const [searchVal, setSearchVal] = useState("");
  const searchVal = useRef("");
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
    onSelectSearch(sdata.value);

    console.log("sdata", sdata);
    // setSearchVal(sdata)

    // if (sdata.key !== "Enter") {
    //   localStorage.setItem("view_profile_email", sdata.email);
    //   window.location = view_url;
    // }
    // console.log("ssss", sdata);
    // return;

    //   setSelectedOptions(data);
  }
  //   function enterKey(e) {
  //     if (e.key == "Enter") {
  //       console.log("enter", e);
  //     }
  //   }
  console.log("searchVal.current ", searchVal.current);
  const keyDownHandler = (e) => {
    console.log("hettt", searchVal.current);
    if (e.key === "Enter") {
      e.preventDefault();
      onSelectSearch(searchVal.current);
    }
  };
  return (
    <>
      <Select
        options={options}
        classNamePrefix="hightlight-filter-search"
        // placeholder="Find a person"
        placeholder={
          <>
            <label style={{ float: "left" }}>Type a name</label>
            <SearchIcon style={{ float: "right" }} />
          </>
        }
        noOptionsMessage={() => null}
        onBlur={false}
        // onKeyDown={enterKey}
        onInputChange={(newValue: string) => {
          //   console.log("newValue", newValue);

          searchVal.current = newValue;
        }}
        // isOptionDisabled={(o) => o.disabled}
        isOptionDisabled={() => {}}
        onChange={handleSelect}
        filterOption={filterOption}
        components={{ Option }}
        onKeyDown={keyDownHandler}
      />
    </>
  );
};
export default HighlightSearch;
