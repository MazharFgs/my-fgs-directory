import React, { createRef, useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import PeopleDirectoryCard from "../PeopleDirectoryCard";

import { apiUrl, getDirectoryAuthtoken, view_url } from "../constants";
import axios from "axios";
import HighlightSearch from "../form-controls/HighlightSearch";
import BackgroundLoader from "../form-controls/BackgroundLoader";
import FailuarCard from "../FailuarCard";

const CategoryDropDown = () => {
  const subcatref = createRef();
  const [selectedCategory, setselectedCategory] = React.useState("");
  const [seletedSubCategry, setseletedSubCategry] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const [peopleData, setPeopleData] = useState<any>([]);
  const [initialPeopleData, setInitialPeopleData] = useState<any>([]);

  const [categoryDrpDwn, setCategoryDrpDwn] = useState<any>([]);
  const [subCategryDrpDwn, setSubCategryDrpDwn] = useState<any>([]);
  const [locationDrpDwn, setlocationDrpDwn] = useState<any>([]);

  const [showLocationDropDown, setShowLocationDropDown] = useState<any>(false);
  const [loading, setLoading] = useState<any>(false);
  const [loadingCategory, setLoadingCategory] = useState<any>(false);

  const searchFromPeople = peopleData.map((searchData: any) => {
    return {
      label: searchData.firstName,
      value: searchData.firstName,
      email: searchData.email[0].value,
    };
  });

  const getBusinessCategories = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiUrl}business-profiles/categories`,
      headers: {
        Authorization: getDirectoryAuthtoken(),
      },
    };

    axios
      .request(config)
      .then((response) => {
        setCategoryDrpDwn(response?.data?.data);
        setLoading(true);
      })
      .catch((error) => {
        let errr = error;
        setLoading(false);
      });
  };

  const fetchPeopleDirectoy = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiUrl}business-profiles/allProfiles`,
      headers: {
        Authorization: getDirectoryAuthtoken(),
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        setLoadingCategory(true);
        setPeopleData(response?.data?.data);
        setInitialPeopleData(response?.data?.data);
      })
      .catch((error: any) => {
        console.log(error);
        // setLoading(false);
      });
  };

  useEffect(() => {
    // setLoading(true);
    fetchPeopleDirectoy();
    getBusinessCategories();
  }, [setCategoryDrpDwn]);

  // useEffect(() => {

  // }, [seletedSubCategry])

  useEffect(() => {
    if (selectedCategory && seletedSubCategry && peopleData.length > 0) {
      setShowLocationDropDown(true);
    } else {
      setShowLocationDropDown(false);
    }
  }, [selectedCategory, seletedSubCategry, showLocationDropDown]);

  const handleCategoryChange = (event: SelectChangeEvent) => {
    // setLoading(true);
    setseletedSubCategry("");
    setselectedCategory(event.target.value);

    let categryfilter = categoryDrpDwn.filter((e: any) => {
      return e.category === event.target.value;
    });

    setSubCategryDrpDwn(categryfilter);

    let peoplefilterbyCategry = initialPeopleData.filter((e: any) => {
      return (
        e.storyblokResolves.global_business_domain_titl === event.target.value
      );
    });

    setPeopleData(peoplefilterbyCategry);
    // setLoading(false);
  };
  const handleSubCategoryChange = (event: SelectChangeEvent) => {
    setseletedSubCategry(event.target.value);

    let peoplefiltbyCategrySubcateg = initialPeopleData.filter((e: any) => {
      return (
        e.storyblokResolves.global_business_domain_titl === selectedCategory &&
        e.storyblokResolves?.global_business_directory?.filter((e: any) => {
          return e.subCategory === event.target.value;
        }).length > 0
      );
    });

    setPeopleData(peoplefiltbyCategrySubcateg);

    // let locationDataset = initialPeopleData?.map((e: any) => {
    //     return e.storyblokData.location.map((e: any) => {
    //         return e
    //     })
    // })
  };
  const handleSelectedLocation = (event: SelectChangeEvent) => {
    setSelectedLocation(event.target.value);

    let filterpeople = peopleData.filter((e: any) => {
      return e.storyblokData.location.map((ele: any) => {
        return ele === event.target.value;
      });
    });

    setPeopleData(filterpeople);
  };
  const handleClearState = () => {
    setPeopleData(initialPeopleData);
    setselectedCategory("");
    setseletedSubCategry("");
  };
  console.log("peopleData", peopleData);
  console.log("peopleData lenght", peopleData.length);

  return (
    <>
      <div
        className="knowledge-category-main-div"
        style={{ display: "flex", flexDirection: "row", columnGap: 32 }}
      >
        <div className="knowledge-category-div">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={selectedCategory}
              onChange={handleCategoryChange}
              label="Category"
              placeholder="Select"
            >
              {categoryDrpDwn.map((e: any) => {
                return <MenuItem value={e.category}>{e.category}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>
        <div className="knowledge-category-div">
          {selectedCategory && (
            <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Sub Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={seletedSubCategry}
                onChange={handleSubCategoryChange}
                label="Sub Category"
                defaultValue={
                  subCategryDrpDwn &&
                  subCategryDrpDwn[0]?.value.map((e: any) => {
                    return e.name;
                  })[0]
                }
                defaultChecked={true}
                ref={subcatref}
              >
                {subCategryDrpDwn[0]?.value?.map((e: any) => {
                  return <MenuItem value={e.name}>{e.name}</MenuItem>;
                })}
              </Select>
            </FormControl>
          )}
        </div>
        <div>
          {showLocationDropDown && (
            <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Location
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={selectedLocation}
                onChange={handleSelectedLocation}
                label="Location"
                disabled={peopleData?.data?.length === 0}

                // defaultValue={subCategryDrpDwn && subCategryDrpDwn[0]?.value.map((e: any) => { return e.name })[0]}
                // defaultChecked={true}
              >
                {peopleData?.map((e: any) => {
                  return e.storyblokData.location.map((e: any) => {
                    return <MenuItem value={e}>{e}</MenuItem>;
                  });
                })}
              </Select>
            </FormControl>
          )}
        </div>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 25,
              cursor: "pointer",
            }}
            onClick={handleClearState}
          >
            Clear
          </div>
        </div>
      </div>
      <hr className="directory-border-color" />
      <div
        className="highlight-search-directory-main-div"
        style={{
          display: "flex",
          justifyContent: "end",
          alignItems: "end",
          width: 500,
        }}
      >
        <div
          className="highlight-search-directory-div"
          style={{ width: "80%" }}
        >
          <HighlightSearch
            options={searchFromPeople}
            // style={{ width: 250 }}
          />
        </div>
      </div>
      {/* Card Section */}
      {loading & loadingCategory ? (
        <div className="directory-filter-div" style={{ display: "flex" }}>
          {peopleData.length > 0 ? (
            peopleData.map((user: any) => {
              return (
                <PeopleDirectoryCard
                  person={user}
                  view_url={view_url}
                ></PeopleDirectoryCard>
              );
            })
          ) : (
            <FailuarCard />
          )}
        </div>
      ) : (
        <BackgroundLoader />
      )}
    </>
  );
};

export default CategoryDropDown;
