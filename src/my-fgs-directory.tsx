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
import Multiselect from "multiselect-react-dropdown";
import PeopleCard from "./PeopleCard";

/**
 * React Component
 */
export interface MyFgsDirectoryProps extends BlockAttributes {
  widgetApi: WidgetApi;
}


export const MyFgsDirectory = ({ widgetApi }: MyFgsDirectoryProps): ReactElement | null => {
  const [user, setUser] = useState<SBUserProfile | null>(null);
  const [position, setPosition] = useState([])
  const [practice, setPractice] = useState([])
  const [sector, setSector] = useState([])
  const [capability, setCapability] = useState([])



  const list_position = ['Position A', 'Position B', 'Position C', 'Position D', 'Position E'];
  const list_practies = ['Practice A', 'Practice B', 'Practice C'];
  const list_sectors = ['Sector A', 'Sector B', 'Sector C']
  const list_capabilities = ['Capability A', 'Capability B', 'Capability C']
  useEffect(() => {
    widgetApi.getUserInformation().then((user) => {
      console.log("user", user)
      setUser(user);
    });
  }, []);
  console.log(position)

  const resetForm = () => {
    setPosition([])
    setPractice([])
    setSector([])
    setCapability([])


  }

  // const components = {
  //   MultiValueContainer: ({ selectProps, data }) => {
  //     console.log("selectProps" , selectProps)
  //     console.log("data" , data)

  //     const values = selectProps.value;
  //     console.log(values)
  //     if (values) {
  //       const v= values[values.length - 1].label === data.label
  //         ? data.label
  //         : data.label + ", ";
  //         console.log(v)
  //         return v
  //     } else return "";
  //   }
  // };


  return <>
    <div className="directory-main-div">
      <div className="directory-filter-div" style={{ display: 'flex', flexWrap: 'wrap' }} >
        <div className="edit-profile-element-div" style={{ width: "30%", float: "left" }}>
          <label className="edit-profile-lable"
            style={{
              height: '24px', alignSelf: "stretch", color: "var(--Gray-2, #65696B)",
              fontFamily: "FK Grotesk", fontSize: "14px", fontStyle: "normal", fontWeight: "300", lineHeight: "32px"
            }}>
            Position
          </label>

          <Multiselect
            className="edit-profile-single-select"
            options={list_position}
            isObject={false}
            showCheckbox={true}
            hidePlaceholder={true}
            closeOnSelect={true}
            onSelect={(e) => setPosition(e)}
            onRemove={(e) => setPosition(e)}
            selectedValues={position}
          // singleSelect={true}
          />
        </div>
        <div className="edit-profile-element-div" style={{ width: "70%", float: "left" }}>
          <label className="edit-profile-lable"
            style={{
              height: '24px', alignSelf: "stretch", color: "var(--Gray-2, #65696B)",
              fontFamily: "FK Grotesk", fontSize: "14px", fontStyle: "normal", fontWeight: "300", lineHeight: "32px"
            }}>
            Practice
          </label>

          <Multiselect
            className="edit-profile-single-select"
            options={list_practies}
            isObject={false}
            showCheckbox={true}
            hidePlaceholder={true}
            closeOnSelect={true}
            onSelect={(e) => setPractice(e)}
            onRemove={(e) => setPractice(e)}
            selectedValues={practice}
          />
        </div>
        <div className="edit-profile-element-div" style={{ width: "40%", float: "left" }}>
          <label className="edit-profile-lable"
            style={{
              height: '24px', alignSelf: "stretch", color: "var(--Gray-2, #65696B)",
              fontFamily: "FK Grotesk", fontSize: "14px", fontStyle: "normal", fontWeight: "300", lineHeight: "32px"
            }}>
            Sector
          </label>

          <Multiselect
            className="edit-profile-single-select"
            options={list_sectors}
            isObject={false}
            showCheckbox={true}
            hidePlaceholder={true}
            closeOnSelect={true}
            onSelect={(e) => setSector(e)}
            onRemove={(e) => setSector(e)}
            selectedValues={sector}
          />
        </div>
        <div className="edit-profile-element-div" style={{ width: "40%", float: "left" }}>
          <label className="edit-profile-lable"
            style={{
              height: '24px', alignSelf: "stretch", color: "var(--Gray-2, #65696B)",
              fontFamily: "FK Grotesk", fontSize: "14px", fontStyle: "normal", fontWeight: "300", lineHeight: "32px"
            }}>
            Capability
          </label>

          <Multiselect
            className="edit-profile-single-select"
            options={list_capabilities}
            isObject={false}
            showCheckbox={true}
            hidePlaceholder={true}
            closeOnSelect={true}
            onSelect={(e) => setCapability(e)}
            onRemove={(e) => setCapability(e)}
            selectedValues={capability}
          />
        </div>
        <div className="edit-profile-element-div" style={{ width: "20%", float: "left" }}>
          <div className="directory-cancel-button" onClick={resetForm}>
            Reset
          </div>
        </div>
        
      </div>
      <hr className="directory-border-color"/>
      <div className="directory-filter-div" style={{ display: 'flex', flexWrap: 'wrap' }} >
      <PeopleCard person={user}/>
      <PeopleCard person={user}/>

      <PeopleCard person={user}/>

      <PeopleCard person={user}/>

      <PeopleCard person={user}/>

      <PeopleCard person={user}/>

      <PeopleCard person={user}/>

      <PeopleCard person={user}/>

      <PeopleCard person={user}/>

      <PeopleCard person={user}/>
      </div>

      </div>


  </>;


};

