/*!
 * Copyright 2023, Staffbase GmbH and contributors.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { ReactElement, useEffect, useState } from "react";
import { BlockAttributes, WidgetApi, SBUserProfile } from "widget-sdk";
import Select from "react-select";
// import Multiselect from "multiselect-react-dropdown";
import PeopleCard from "./PeopleCard";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import axios from "axios";
import PeopleDirectoryCard from "./PeopleDirectoryCard";
// import MultiselectWithAll from "./form-controls/MultiselectWithAll";
// import SelectWithSearch from "./form-controls/SelectWithSearch";
// import MultiSelectPosition from "./form-controls/MultiSelectPosition";
import MulSelect from "./form-controls/MulSelect";
import HighlightSearch from "./form-controls/HighlightSearch";

/**
 * React Component
 */
export interface MyFgsDirectoryProps extends BlockAttributes {
  widgetApi: WidgetApi;
}

const apiUrl = `https://myfgs-staffbase-storyblok-proxy-6nar3kdwr-fgh-global.vercel.app/api/`;
// const view_url = "http://localhost:3006/";
const view_url =
  "https://my.fgsglobal.com/content/page/65d2c7a0ff842f089f9ca925";

export const MyFgsDirectory = ({
  widgetApi,
}: MyFgsDirectoryProps): ReactElement | null => {
  const [user, setUser] = useState<SBUserProfile | null>(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [loader, setLoader] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [peopleData, setPeopleData] = useState([]);
  const [searchPeopleData, setSearchPeopleData] = useState([]);

  const searchFromPeople = searchPeopleData.map((searchData) => {
    return {
      label: searchData.firstName,
      value: searchData.firstName,
      email: searchData.email[0].value,
    };
  });

  const [listPositions, setListPosition] = useState([]);
  const [listPositionsSelectedVal, setListPositionsSelectedVal] = useState([]);

  const [listSector, setListSector] = useState([]);
  const [selectedSector, setSelectedSector] = useState([]);

  const [listPractice, setListPractice] = useState([]);
  const [selectedPractice, setSelectedPractice] = useState([]);

  const [listCapability, setListCapability] = useState([]);
  const [selectedCapability, setSelectedCapability] = useState([]);
  const [onRemove, setonRemove] = useState(false);

  useEffect(() => {
    widgetApi.getUserInformation().then((user) => {
      setUser(user);
      verifyToken(user);
    });
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      //   console.log("User logged in succcessfully");
      fetchPeopleDirectoryUsers();
      fetchPeopleCategory();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    var resultOfPractice = [];
    var resultOfPosition = [];
    var resultOfSector = [];
    var resultOfCapability = [];

    if (
      selectedPractice?.length > 0 ||
      listPositionsSelectedVal?.length > 0 ||
      selectedSector?.length > 0 ||
      selectedCapability?.length > 0
    ) {
      if (selectedCapability?.length > 0) {
        // console.log(selectedCapability);
        // const result = selectedCapability.map(
        //   (value) => Object.values(value)[0]
        // );

        let newArray = peopleData.filter((rec) => {
          if (rec?.storyblokData) {
            if (rec?.storyblokData?.capabilities?.length > 0) {
              if (
                rec?.storyblokData?.capabilities.filter((element) =>
                  selectedCapability.includes(element)
                )
              ) {
                resultOfCapability.push(rec);
              }
            }
          }
        });
      }

      if (selectedSector?.length > 0) {
        // console.log(selectedSector);
        const result = selectedSector.map((value) => Object.values(value)[0]);

        let newArray = peopleData.filter((rec) => {
          if (rec?.storyblokData) {
            if (rec?.storyblokData?.sectors?.length > 0) {
              if (
                rec?.storyblokData?.sectors.filter((element) =>
                  selectedSector.includes(element)
                )
              ) {
                resultOfSector.push(rec);
              }
            }
          }
        });
      }

      if (selectedPractice?.length > 0) {
        // console.log(selectedPractice);
        const result = selectedPractice.map((value) => Object.values(value)[0]);

        let newArray = peopleData.filter((rec) => {
          if (rec?.storyblokData) {
            if (rec?.storyblokData?.practice_areas?.length > 0) {
              if (
                rec?.storyblokData?.practice_areas.filter((element) =>
                  selectedPractice.includes(element)
                )
              ) {
                resultOfPractice.push(rec);
              }
            }
          }
        });
        //   console.log("newArray", newArray);
      }

      if (listPositionsSelectedVal?.length > 0) {
        // console.log(listPositionsSelectedVal);
        const result = listPositionsSelectedVal.map(
          (value) => Object.values(value)[0]
        );

        // console.log("before", listPositionsSelectedVal);
        let newArray = peopleData.filter((rec) => {
          if (result.includes(rec?.hr_title)) {
            return resultOfPosition.push(rec);
          }
        });

        // setSearchPeopleData(newArray);
      }

      let peopleObj = [
        ...resultOfPractice,
        ...resultOfPosition,
        ...resultOfSector,
        ...resultOfCapability,
      ];

      setSearchPeopleData([...new Set(peopleObj)]);
    } else {
      setSearchPeopleData(peopleData);
    }

    // setSearchPeopleData
  }, [
    listPositionsSelectedVal,
    selectedPractice,
    selectedCapability,
    selectedSector,
  ]);

  const fetchPeopleCategory = () => {
    const checkDirectoryAuthToken = localStorage.getItem("directoryAuthToken");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiUrl}profiles/attributes`,
      headers: {
        Authorization: checkDirectoryAuthToken.replace(/^"(.*)"$/, "$1"),
      },
    };

    axios
      .request(config)
      .then((response) => {
        let titles_list = response.data.data.titles;
        let practices = response.data.data.practise_areas;
        let sectors = response.data.data.sectors;
        let capability = response.data.data.capabilities;

        // setPractice
        // let out = JSON.stringify(response.data.title);
        //  console.log("response.data.title", practices[0]);
        const titles_list_obj: any = titles_list.map((e) => ({
          label: e,
          value: e,
        }));

        setListPosition(titles_list_obj);
        // setListPositionsSelectedVal(titles_list_obj);

        const sectors_list_obj: any = sectors.map((key, val) => ({
          label: Object.keys(key)[0],
          value: Object.values(key)[0],
        }));

        setListSector(sectors_list_obj);

        const practice_list_obj: any = practices.map((key, val) => ({
          label: Object.keys(key)[0],
          value: Object.values(key)[0],
        }));

        setListPractice(practice_list_obj);

        const capability_list_obj: any = capability.map((key, val) => ({
          label: Object.keys(key)[0],
          value: Object.values(key)[0],
        }));

        setListCapability(capability_list_obj);

        // const sectors_list_obj: any = sectors.map((key, val) => ({
        //   label: key,
        //   value: val,
        // }));

        // console.log("sectors_list_obj sectors_list_obj", sectors_list_obj);

        // setListSector(sectors_list_obj);

        // const titles_list_obj: any = practices.map((e) => ({
        //   label: e,
        //   value: e,
        // }));
      })
      .catch((error) => {
        //  console.log(error);
      });
  };

  const fetchPeopleDirectoryUsers = () => {
    const checkDirectoryAuthToken = localStorage.getItem("directoryAuthToken");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiUrl}profiles/allProfiles`,
      headers: {
        Authorization: checkDirectoryAuthToken.replace(/^"(.*)"$/, "$1"),
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        setPeopleData(response.data.data);
        setSearchPeopleData(response.data.data);
        setLoader(false);
      })
      .catch((error) => {
        // console.log(error);
        setLoader(false);
      });
  };

  const verifyToken = (info) => {
    const checkDirectoryAuthToken = localStorage.getItem("directoryAuthToken");
    if (checkDirectoryAuthToken) {
      let verifyToken = JSON.stringify({
        // userId: info?.externalID,
        userId: "00uwskbw25UJUbQfl1t7",
        token: checkDirectoryAuthToken,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${apiUrl}auth/verify`,
        headers: {
          "Content-Type": "application/json",
        },
        data: verifyToken,
      };

      axios
        .request(config)
        .then((response) => {
          //   console.log("suu", response);
          if (response.data.success) {
            // console.log(JSON.stringify(response.data));
            setIsLoggedIn(true);
          } else {
            authenticateUser(info);
          }
        })
        .catch((error) => {
          //   console.log("catch", error);
          authenticateUser(info);
        });
    } else {
      authenticateUser(info);
    }
  };

  const authenticateUser = (info) => {
    let data = JSON.stringify({
      //   userId: info?.externalID,
      userId: "00uwskbw25UJUbQfl1t7",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiUrl}auth/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        localStorage.setItem("directoryAuthToken", response.data.token);

        localStorage.setItem("loggedEmail", response.data.email);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const resetForm = (e) => {
    setSelectedPractice([]);
    setSelectedSector([]);
    setListPositionsSelectedVal([]);
    setSelectedCapability([]);
    setSearchPeopleData(peopleData);
    setonRemove(!onRemove);
  };

  //   const selectedSearchUser = (sdata) => {
  //     //   e.preventDefault();
  //     localStorage.setItem("view_profile_email", sdata[0].value);
  //     window.location = view_url;

  //     // console.log(sdata[0].value);
  //     // window.location.href = `${view_url}email=${sdata[0].value}`;
  //   };
  //   const mappedData = () => {};
  //   function handleSelect(sdata) {
  //     // console.log("ssss", sdata);
  //     // return;
  //     localStorage.setItem("view_profile_email", sdata.email);
  //     window.location = view_url;
  //     //   setSelectedOptions(data);
  //   }
  return (
    <>
      <div className="directory-main-div">
        {!loader ? (
          <Tabs
            className="dir-tabs"
            selectedIndex={tabIndex}
            onSelect={(index) => setTabIndex(index)}
          >
            <TabList className="dir-tablist">
              <Tab className="dir-tab">People</Tab>
              <Tab className="dir-tab">Business Directory</Tab>
            </TabList>

            <TabPanel>
              <div className="directory-people-card-main-div">
                <div
                  className="directory-filter-div"
                  style={{ display: "flex", flexWrap: "wrap" }}
                >
                  <div
                    className="directory-element-div"
                    style={{ width: "30%", float: "left" }}
                  >
                    <label className="directory-lable">Position</label>
                    <div className="mui-select-dropdown">
                      <MulSelect
                        optionsglobal={listPositions}
                        onSelect={(e: any) => setListPositionsSelectedVal(e)}
                        onRemove={onRemove}
                        width={270}
                        // defaultSelected={listPositions}
                      />
                    </div>
                  </div>

                  <div
                    className="directory-element-div"
                    style={{ width: "70%", float: "left" }}
                  >
                    <label className="directory-lable">Practice</label>
                    <div className="mui-select-dropdown">
                      <MulSelect
                        optionsglobal={listPractice}
                        onSelect={(e: any) => setSelectedPractice(e)}
                        onRemove={onRemove}
                        width={650}
                      />
                    </div>

                    {/* <MultiselectWithAll
                      className="directory-multi-select"
                      displayValue="label"
                      options={listPractice}
                      showCheckbox={true}
                      hidePlaceholder={true}
                      closeOnSelect={true}
                      onSelect={(e: any) => console.log("on-select", e)}
                      onRemove={(e: any) => setSelectedPractice(e)}
                      selectedValues={selectedPractice}
                      // singleSelect={true}
                    /> */}

                    {/* <Multiselect
                      className="directory-multi-select"
                      options={list_practies}
                      isObject={false}
                      showCheckbox={true}
                      hidePlaceholder={true}
                      closeOnSelect={true}
                      onSelect={(e) => setPractice(e)}
                      onRemove={(e) => setPractice(e)}
                      selectedValues={practice}
                    /> */}
                  </div>
                  <div
                    className="directory-element-div"
                    style={{ width: "30%", float: "left" }}
                  >
                    <label className="directory-lable">Sector</label>
                    <div className="mui-select-dropdown">
                      <MulSelect
                        optionsglobal={listSector}
                        onSelect={(e: any) => setSelectedSector(e)}
                        onRemove={onRemove}
                        width={275}
                      />
                    </div>

                    {/* <MultiselectWithAll
                      className="directory-multi-select"
                      displayValue="label"
                      options={listSector}
                      showCheckbox={true}
                      hidePlaceholder={true}
                      closeOnSelect={true}
                      onSelect={(e: any) => setSelectedSector(e)}
                      onRemove={(e: any) => setSelectedSector(e)}
                      selectedValues={selectedSector}
                      // singleSelect={true}
                    /> */}
                  </div>
                  <div
                    className="directory-element-div"
                    style={{ width: "60%", float: "left" }}
                  >
                    <label className="directory-lable">Capability</label>
                    <div className="mui-select-dropdown">
                      <MulSelect
                        optionsglobal={listCapability}
                        onSelect={(e: any) => setSelectedCapability(e)}
                        onRemove={onRemove}
                        width={575}
                      />
                    </div>
                  </div>
                  <div
                    className="directory-element-div"
                    style={{ width: "10%", float: "right" }}
                  >
                    <div
                      className="directory-cancel-button"
                      onClick={(e) => {
                        resetForm(e);
                      }}
                      style={{ marginTop: 50 }}
                    >
                      clear
                    </div>
                  </div>
                </div>
                <hr className="directory-border-color" />
                <div className="directory-select-seach">
                  {/* <Select
                    options={searchFromPeople}
                    placeholder="Find a person"
                    value={""}
                    onChange={handleSelect}
                    isSearchable={true}
                    openMenuOnFocus={false}
                    isMenuOpen={true}
                  /> */}
                  <HighlightSearch
                    options={searchFromPeople}
                    // options={[
                    //   {
                    //     label: "Satyanarayana",
                    //     value: "Satyanarayana",
                    //     email: "satyanarayana.pulipaka@wipro.com",
                    //   },
                    //   {
                    //     label: "Satyanarayana",
                    //     value: "Satyanarayana",
                    //     email: "satyanarayana.pulipaka_extern@fgsglobal.com",
                    //   },
                    //   {
                    //     label: "S",
                    //     value: "S",
                    //     email: "shantanu.singh_extern@fgsglobal.com",
                    //   },
                    // ]}

                    // options={[
                    //   { value: "Spring", label: "Spring" },
                    //   { value: "Summer", label: "Summer" },
                    //   { value: "Autumn", label: "Autumn" },
                    //   { value: "Winter", label: "Winter" },
                    //   { value: "Rain", label: "Rain" },
                    //   { value: "Fog", label: "Fog" },
                    //   { value: "Thunderstrom", label: "Thunderstrom" },
                    //   { value: "Flood", label: "Flood" },
                    //   { value: "Blue", label: "Blue" },
                    //   { value: "Green", label: "Green" },
                    //   { value: "Orange", label: "Orange" },
                    //   { value: "Watermelon", label: "Watermelon" },
                    //   { value: "Banana", label: "Banana" },
                    //   { value: "Apple", label: "Apple" },
                    //   { value: "Mango", label: "Mango" },
                    // ]}
                  />
                </div>

                <div
                  className="directory-filter-div"
                  style={{ display: "flex", flexWrap: "wrap" }}
                >
                  {searchPeopleData &&
                    searchPeopleData.map((user) => {
                      return (
                        <PeopleDirectoryCard
                          person={user}
                          view_url={view_url}
                        />
                      );
                    })}
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="directory-people-card-main-div">
                <div
                  className="directory-filter-div"
                  style={{ display: "flex", flexWrap: "wrap" }}
                >
                  <div
                    className="directory-element-div"
                    style={{ width: "80%", float: "left" }}
                  >
                    <label className="directory-lable">Category</label>
                  </div>
                  <div
                    className="directory-element-div"
                    style={{ width: "20%", float: "left" }}
                  >
                    <div className="directory-cancel-button">Reset</div>
                  </div>
                </div>
                <hr className="directory-border-color" />
                <div
                  className="directory-filter-div"
                  style={{ display: "flex", flexWrap: "wrap" }}
                >
                  <PeopleCard person={user} />
                  <PeopleCard person={user} />

                  <PeopleCard person={user} />

                  <PeopleCard person={user} />

                  <PeopleCard person={user} />

                  <PeopleCard person={user} />

                  <PeopleCard person={user} />

                  <PeopleCard person={user} />

                  <PeopleCard person={user} />

                  <PeopleCard person={user} />
                </div>
              </div>
            </TabPanel>
          </Tabs>
        ) : (
          "loading ...."
        )}
      </div>
    </>
  );
};
