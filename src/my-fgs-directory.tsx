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
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import axios from "axios";
import PeopleDirectoryCard from "./PeopleDirectoryCard";
import MultiselectWithAll from "./form-controls/MultiselectWithAll";
import SelectWithSearch from "./form-controls/SelectWithSearch";
/**
 * React Component
 */
export interface MyFgsDirectoryProps extends BlockAttributes {
  widgetApi: WidgetApi;
}

const apiUrl = "http://127.0.0.1:5000/api/";

export const MyFgsDirectory = ({
  widgetApi,
}: MyFgsDirectoryProps): ReactElement | null => {
  const [user, setUser] = useState<SBUserProfile | null>(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [loader, setLoader] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [peopleOffset, setSetPeopleOffset] = useState(1);
  const [peopleData, setPeopleData] = useState([
    {
      storyblokData: {},
      firstName: "Staffbase",
      lastName: "Support",
      email: [
        {
          value: "andres.beltre+fgs@staffbase.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: {},
      phone: {},
      hr_title: {},
      department: {},
    },
    {
      storyblokData: {},
      firstName: "Fareed",
      lastName: "Ahmed",
      email: [
        {
          value: "fareed.ahmed@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: [
        {
          locality: "New York",
          region: "NY",
          country: "US",
          primary: true,
        },
      ],
      phone: [
        {
          value: "(212) 687 8080",
          type: "work",
          primary: true,
        },
      ],
      hr_title: "IT, Senior Systems & Cloud Architect",
      department: {},
    },
    {
      storyblokData: {
        email: "frank.catapano@fgsglobal.com",
        title: "Director of IT Security & Infrastructure",
        name: "Frank Catapano",
        image: {
          id: "5005102",
          alt: null,
          name: "",
          focus: null,
          title: null,
          filename:
            "https://s3.amazonaws.com/a.storyblok.com/f/137553/1024x1400/c60caeeb66/frank-catapano.jpg",
          copyright: null,
          fieldtype: "asset",
        },
        capabilities: [],
        sectors: [],
        practice_areas: [],
      },
      firstName: "Frank",
      lastName: "Catapano",
      email: [
        {
          value: "frank.catapano@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: [
        {
          locality: "New York",
          country: "US",
          primary: true,
        },
      ],
      phone: {},
      hr_title: {},
      department: {},
    },
    {
      storyblokData: {},
      firstName: "Satyanarayana",
      lastName: "Pulipaka",
      email: [
        {
          value: "satyanarayana.pulipaka@wipro.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: {},
      phone: {},
      hr_title: {},
      department: {},
    },
    {
      storyblokData: {},
      firstName: "Satyanarayana",
      lastName: "Pulipaka",
      email: [
        {
          value: "satyanarayana.pulipaka_extern@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: {},
      phone: {},
      hr_title: {},
      department: {},
    },
    {
      storyblokData: {},
      firstName: "Vinoth",
      lastName: "Kannan",
      email: [
        {
          value: "vinoth.kannan_extern@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: {},
      phone: {},
      hr_title: {},
      department: {},
    },
    {
      storyblokData: {},
      firstName: "Rahul",
      lastName: "Ray",
      email: [
        {
          value: "rahul.ray_extern@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: {},
      phone: {},
      hr_title: {},
      department: {},
    },
    {
      storyblokData: {
        email: "rebecca.gasser@fgsglobal.com",
        title: "Global Chief Information Officer",
        name: "Rebecca Gasser",
        image: {
          id: 10890923,
          alt: "",
          name: "",
          focus: "",
          title: "",
          source: "",
          filename:
            "https://a.storyblok.com/f/137553/1024x1400/e04bd35a22/rebecca-gasser-1.jpg",
          copyright: "",
          fieldtype: "asset",
          meta_data: {},
          is_external_url: false,
        },
        capabilities: [],
        sectors: [],
        practice_areas: [],
      },
      firstName: "Rebecca",
      lastName: "Gasser",
      email: [
        {
          value: "rebecca.gasser@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: [
        {
          country: "US",
          primary: true,
        },
      ],
      phone: {},
      hr_title: "Global CIO",
      department: "Corporate",
    },
    {
      storyblokData: {},
      firstName: "Jenny",
      lastName: "Bloom",
      email: [
        {
          value: "jenny.bloom@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: [
        {
          locality: "Washington",
          region: "DC",
          postalCode: "20004",
          country: "US",
          primary: true,
        },
      ],
      phone: {},
      hr_title: "Digital Project Manager",
      department: "Digital Communications",
    },
    {
      storyblokData: {
        email: "dan.stone@fgsglobal.com",
        cellphone: "",
        title: "Partner, Head of Digital Development",
        name: "Dan Stone",
        image: {
          id: "5004599",
          alt: null,
          name: "",
          focus: null,
          title: null,
          filename:
            "https://s3.amazonaws.com/a.storyblok.com/f/137553/1024x1400/587dce10d3/dan-stone.jpg",
          copyright: null,
          fieldtype: "asset",
        },
        capabilities: [],
        sectors: [
          "fed3db29-2407-4a5e-952a-57ad65f42a27",
          "7aef3ffa-e827-4127-bfa4-1f594b4b003b",
          "9be07806-b139-4587-b5b6-ed959297c5f8",
        ],
        practice_areas: [
          "fed3db29-2407-4a5e-952a-57ad65f42a27",
          "7aef3ffa-e827-4127-bfa4-1f594b4b003b",
          "9be07806-b139-4587-b5b6-ed959297c5f8",
        ],
      },
      firstName: "Dan",
      lastName: "Stone",
      email: [
        {
          value: "dan.stone@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: [
        {
          locality: "New York",
          primary: true,
        },
      ],
      phone: [
        {
          value: "(646) 616-5471",
          type: "work",
          primary: true,
        },
      ],
      hr_title: "Partner, Head Of Digital Development",
      department: {},
    },
    {
      storyblokData: {},
      firstName: "S",
      lastName: "Sing",
      email: [
        {
          value: "shantanu.singh_extern@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: {},
      phone: {},
      hr_title: {},
      department: {},
    },
    {
      storyblokData: {},
      firstName: "Rahul",
      lastName: "Ramawath",
      email: [
        {
          value: "rahul.ramawath_extern@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: {},
      phone: [
        {
          value: "6392993818",
          type: "mobile",
        },
      ],
      hr_title: {},
      department: {},
    },
    {
      storyblokData: {
        email: "willie.roberson@fgsglobal.com",
        title: "director",
        name: "Willie Roberson",
        image: {
          id: "5017678",
          alt: "",
          name: "",
          focus: null,
          title: "",
          filename:
            "https://a.storyblok.com/f/137553/1024x1400/e516e780e6/willie-robinson.jpg",
          copyright: "",
          fieldtype: "asset",
        },
        capabilities: [],
        sectors: [],
        practice_areas: [],
      },
      firstName: "Willie",
      lastName: "Roberson",
      email: [
        {
          value: "willie.roberson@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: [
        {
          locality: "Washington DC",
          primary: true,
        },
      ],
      phone: [
        {
          value: "(202) 481-8701",
          type: "work",
          primary: true,
        },
      ],
      hr_title: "Director",
      department: {},
    },
    {
      storyblokData: {},
      firstName: "John",
      lastName: "Doe",
      email: [
        {
          value: "shantanu.singh10@wipro.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: {},
      phone: {},
      hr_title: {},
      department: {},
    },
    {
      storyblokData: {},
      firstName: "Arnipalli",
      lastName: "Bharati",
      email: [
        {
          value: "arnipalli.bharati_extern@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: {},
      phone: {},
      hr_title: {},
      department: {},
    },
    {
      storyblokData: {},
      firstName: "Prince",
      lastName: "Jaiswal",
      email: [
        {
          value: "prince.jaiswal_extern@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: {},
      phone: {},
      hr_title: {},
      department: {},
    },
    {
      storyblokData: {},
      firstName: "Mazhar",
      lastName: "Shaikh",
      email: [
        {
          value: "mazharali.shaikhaliyarvarjang_extern@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: {},
      phone: {},
      hr_title: {},
      department: {},
    },
    {
      storyblokData: {
        email: "alvaro.giorgetta@fgsglobal.com",
        title: "Managing Director, UX & Digital Design",
        name: "Alvaro Giorgetta",
        image: {
          id: "5005271",
          alt: null,
          name: "",
          focus: null,
          title: null,
          filename:
            "https://s3.amazonaws.com/a.storyblok.com/f/137553/1024x1400/24ee5e4046/alvaro-giorgetta.jpg",
          copyright: null,
          fieldtype: "asset",
        },
        capabilities: [],
        sectors: [],
        practice_areas: [],
      },
      firstName: "Alvaro",
      lastName: "Giorgetta",
      email: [
        {
          value: "alvaro.giorgetta@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: [
        {
          locality: "Washington DC",
          primary: true,
        },
      ],
      phone: [
        {
          value: "(202) 741-5576",
          type: "work",
          primary: true,
        },
      ],
      hr_title: "Managing Director, UX & Digital Design",
      department: {},
    },
    {
      storyblokData: {},
      firstName: "Lindsay",
      lastName: "Hutton",
      email: [
        {
          value: "lindsay.hutton@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: [
        {
          locality: "New York",
          primary: true,
        },
      ],
      phone: [
        {
          value: "(646) 616-5469",
          type: "work",
          primary: true,
        },
      ],
      hr_title: "Director, Digital Operations",
      department: {},
    },
    {
      storyblokData: {},
      firstName: "John",
      lastName: "Fink",
      email: [
        {
          value: "john.fink@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: [
        {
          locality: "New York",
          primary: true,
        },
      ],
      phone: [
        {
          value: "(646) 805-2061",
          type: "work",
          primary: true,
        },
      ],
      hr_title: "Director of Design",
      department: {},
    },
    {
      storyblokData: {
        email: "andre.malkine@fgsglobal.com",
        title: "Managing Director, Digital Development",
        name: "André Malkine",
        image: {
          id: "5028924",
          alt: "Andre Malkine",
          name: "",
          focus: null,
          title: "Andre Malkine, Director",
          filename:
            "https://a.storyblok.com/f/137553/1024x1400/1161fad21f/andre-malkine.jpg",
          copyright: "",
          fieldtype: "asset",
        },
        capabilities: [],
        sectors: [],
        practice_areas: [],
      },
      firstName: "Andre",
      lastName: "Malkine",
      email: [
        {
          value: "andre.malkine@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: [
        {
          locality: "New York",
          primary: true,
        },
      ],
      phone: [
        {
          value: "(646) 616-5464",
          type: "work",
          primary: true,
        },
      ],
      hr_title: "Director, Product Experience",
      department: {},
    },
    {
      storyblokData: {},
      firstName: "Rabia",
      lastName: "Kapoor",
      email: [
        {
          value: "rabia.kapoor@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: {},
      phone: {},
      hr_title: {},
      department: {},
    },
    {
      storyblokData: {
        email: "erin.barth-dwyer@fgsglobal.com",
        title: "senior associate",
        name: "Erin Barth-Dwyer",
        image: {
          id: "5004595",
          alt: null,
          name: "",
          focus: null,
          title: null,
          filename:
            "https://s3.amazonaws.com/a.storyblok.com/f/137553/1024x1400/c2db43dcab/erin-barth-dwyer.jpg",
          copyright: null,
          fieldtype: "asset",
        },
        capabilities: [],
        sectors: [],
        practice_areas: [],
      },
      firstName: "Erin",
      lastName: "Barth-Dwyer",
      email: [
        {
          value: "erin.barth-dwyer@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: [
        {
          locality: "New York",
          primary: true,
        },
      ],
      phone: [
        {
          value: "(646) 495-1902",
          type: "work",
          primary: true,
        },
      ],
      hr_title: "Senior Associate",
      department: {},
    },
    {
      storyblokData: {},
      firstName: "Milo",
      lastName: "Axelrod",
      email: [
        {
          value: "milo.axelrod@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: [
        {
          locality: "New York",
          primary: true,
        },
      ],
      phone: [
        {
          value: "(646) 616-5463",
          type: "work",
          primary: true,
        },
      ],
      hr_title: "UX/UI Designer",
      department: {},
    },
    {
      storyblokData: {},
      firstName: "Noelle",
      lastName: "Morris",
      email: [
        {
          value: "noelle.morris@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: [
        {
          locality: "New York",
          region: "New York",
          postalCode: "10022",
          country: "US",
          primary: true,
        },
      ],
      phone: [
        {
          value: "(646) 616-5468",
          type: "work",
          primary: true,
        },
      ],
      hr_title: "Associate Director, UX/UI Designer",
      department: {},
    },
    {
      storyblokData: {},
      firstName: "Corrine",
      lastName: "Dunn",
      email: [
        {
          value: "corrine.dunn@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: [
        {
          locality: "New  York",
          region: "New York",
          postalCode: "10022",
          country: "US",
          primary: true,
        },
      ],
      phone: [
        {
          value: "(202) 980-7680",
          type: "work",
          primary: true,
        },
      ],
      hr_title: "Senior Associate, Digital & Technology",
      department: {},
    },
    {
      storyblokData: {},
      firstName: "Angela",
      lastName: "Zirkelbach",
      email: [
        {
          value: "angela.zirkelbach@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: [
        {
          locality: "New York",
          primary: true,
        },
      ],
      phone: [
        {
          value: "(646) 616-5477",
          type: "work",
          primary: true,
        },
      ],
      hr_title: "Managing Director",
      department: {},
    },
    {
      storyblokData: {},
      firstName: "Robert",
      lastName: "Collegio",
      email: [
        {
          value: "robert.collegio@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: [
        {
          locality: "New York",
          country: "US",
          primary: true,
        },
      ],
      phone: [
        {
          value: "(212) 687 8080",
          type: "work",
          primary: true,
        },
      ],
      hr_title: "IT Operations Manager",
      department: {},
    },
    {
      storyblokData: {},
      firstName: "Chris",
      lastName: "Levesque",
      email: [
        {
          value: "christine.levesque@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: {},
      phone: {},
      hr_title: {},
      department: {},
    },
    {
      storyblokData: {},
      firstName: "Sarath",
      lastName: "Kumar",
      email: [
        {
          value: "sarath.kumar19@wipro.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: {},
      phone: {},
      hr_title: {},
      department: {},
    },
    {
      storyblokData: {},
      firstName: "Kavitha",
      lastName: "Kumarasamy",
      email: [
        {
          value: "kavitha.49@wipro.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: {},
      phone: {},
      hr_title: {},
      department: {},
    },
    {
      storyblokData: {},
      firstName: "Adam",
      lastName: "Keys",
      email: [
        {
          value: "adam.keys@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: {},
      phone: {},
      hr_title: {},
      department: {},
    },
  ]);
  const [searchPeopleData, setSearchPeopleData] = useState([
    {
      storyblokData: {},
      firstName: "Staffbase",
      lastName: "Support",
      email: [
        {
          value: "andres.beltre+fgs@staffbase.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: {},
      phone: {},
      hr_title: {},
      department: {},
    },
    {
      storyblokData: {},
      firstName: "Fareed",
      lastName: "Ahmed",
      email: [
        {
          value: "fareed.ahmed@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: [
        {
          locality: "New York",
          region: "NY",
          country: "US",
          primary: true,
        },
      ],
      phone: [
        {
          value: "(212) 687 8080",
          type: "work",
          primary: true,
        },
      ],
      hr_title: "IT, Senior Systems & Cloud Architect",
      department: {},
    },
    {
      storyblokData: {
        email: "frank.catapano@fgsglobal.com",
        title: "Director of IT Security & Infrastructure",
        name: "Frank Catapano",
        image: {
          id: "5005102",
          alt: null,
          name: "",
          focus: null,
          title: null,
          filename:
            "https://s3.amazonaws.com/a.storyblok.com/f/137553/1024x1400/c60caeeb66/frank-catapano.jpg",
          copyright: null,
          fieldtype: "asset",
        },
        capabilities: [],
        sectors: [],
        practice_areas: [],
      },
      firstName: "Frank",
      lastName: "Catapano",
      email: [
        {
          value: "frank.catapano@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: [
        {
          locality: "New York",
          country: "US",
          primary: true,
        },
      ],
      phone: {},
      hr_title: {},
      department: {},
    },
    {
      storyblokData: {},
      firstName: "Satyanarayana",
      lastName: "Pulipaka",
      email: [
        {
          value: "satyanarayana.pulipaka@wipro.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: {},
      phone: {},
      hr_title: {},
      department: {},
    },
    {
      storyblokData: {},
      firstName: "Satyanarayana",
      lastName: "Pulipaka",
      email: [
        {
          value: "satyanarayana.pulipaka_extern@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: {},
      phone: {},
      hr_title: {},
      department: {},
    },
    {
      storyblokData: {},
      firstName: "Vinoth",
      lastName: "Kannan",
      email: [
        {
          value: "vinoth.kannan_extern@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: {},
      phone: {},
      hr_title: {},
      department: {},
    },
    {
      storyblokData: {},
      firstName: "Rahul",
      lastName: "Ray",
      email: [
        {
          value: "rahul.ray_extern@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: {},
      phone: {},
      hr_title: {},
      department: {},
    },
    {
      storyblokData: {
        email: "rebecca.gasser@fgsglobal.com",
        title: "Global Chief Information Officer",
        name: "Rebecca Gasser",
        image: {
          id: 10890923,
          alt: "",
          name: "",
          focus: "",
          title: "",
          source: "",
          filename:
            "https://a.storyblok.com/f/137553/1024x1400/e04bd35a22/rebecca-gasser-1.jpg",
          copyright: "",
          fieldtype: "asset",
          meta_data: {},
          is_external_url: false,
        },
        capabilities: [],
        sectors: [],
        practice_areas: [],
      },
      firstName: "Rebecca",
      lastName: "Gasser",
      email: [
        {
          value: "rebecca.gasser@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: [
        {
          country: "US",
          primary: true,
        },
      ],
      phone: {},
      hr_title: "Global CIO",
      department: "Corporate",
    },
    {
      storyblokData: {},
      firstName: "Jenny",
      lastName: "Bloom",
      email: [
        {
          value: "jenny.bloom@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: [
        {
          locality: "Washington",
          region: "DC",
          postalCode: "20004",
          country: "US",
          primary: true,
        },
      ],
      phone: {},
      hr_title: "Digital Project Manager",
      department: "Digital Communications",
    },
    {
      storyblokData: {
        email: "dan.stone@fgsglobal.com",
        cellphone: "",
        title: "Partner, Head of Digital Development",
        name: "Dan Stone",
        image: {
          id: "5004599",
          alt: null,
          name: "",
          focus: null,
          title: null,
          filename:
            "https://s3.amazonaws.com/a.storyblok.com/f/137553/1024x1400/587dce10d3/dan-stone.jpg",
          copyright: null,
          fieldtype: "asset",
        },
        capabilities: [],
        sectors: [
          "fed3db29-2407-4a5e-952a-57ad65f42a27",
          "7aef3ffa-e827-4127-bfa4-1f594b4b003b",
          "9be07806-b139-4587-b5b6-ed959297c5f8",
        ],
        practice_areas: [
          "fed3db29-2407-4a5e-952a-57ad65f42a27",
          "7aef3ffa-e827-4127-bfa4-1f594b4b003b",
          "9be07806-b139-4587-b5b6-ed959297c5f8",
        ],
      },
      firstName: "Dan",
      lastName: "Stone",
      email: [
        {
          value: "dan.stone@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: [
        {
          locality: "New York",
          primary: true,
        },
      ],
      phone: [
        {
          value: "(646) 616-5471",
          type: "work",
          primary: true,
        },
      ],
      hr_title: "Partner, Head Of Digital Development",
      department: {},
    },
    {
      storyblokData: {},
      firstName: "S",
      lastName: "Sing",
      email: [
        {
          value: "shantanu.singh_extern@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: {},
      phone: {},
      hr_title: {},
      department: {},
    },
    {
      storyblokData: {},
      firstName: "Rahul",
      lastName: "Ramawath",
      email: [
        {
          value: "rahul.ramawath_extern@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: {},
      phone: [
        {
          value: "6392993818",
          type: "mobile",
        },
      ],
      hr_title: {},
      department: {},
    },
    {
      storyblokData: {
        email: "willie.roberson@fgsglobal.com",
        title: "director",
        name: "Willie Roberson",
        image: {
          id: "5017678",
          alt: "",
          name: "",
          focus: null,
          title: "",
          filename:
            "https://a.storyblok.com/f/137553/1024x1400/e516e780e6/willie-robinson.jpg",
          copyright: "",
          fieldtype: "asset",
        },
        capabilities: [],
        sectors: [],
        practice_areas: [],
      },
      firstName: "Willie",
      lastName: "Roberson",
      email: [
        {
          value: "willie.roberson@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: [
        {
          locality: "Washington DC",
          primary: true,
        },
      ],
      phone: [
        {
          value: "(202) 481-8701",
          type: "work",
          primary: true,
        },
      ],
      hr_title: "Director",
      department: {},
    },
    {
      storyblokData: {},
      firstName: "John",
      lastName: "Doe",
      email: [
        {
          value: "shantanu.singh10@wipro.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: {},
      phone: {},
      hr_title: {},
      department: {},
    },
    {
      storyblokData: {},
      firstName: "Arnipalli",
      lastName: "Bharati",
      email: [
        {
          value: "arnipalli.bharati_extern@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: {},
      phone: {},
      hr_title: {},
      department: {},
    },
    {
      storyblokData: {},
      firstName: "Prince",
      lastName: "Jaiswal",
      email: [
        {
          value: "prince.jaiswal_extern@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: {},
      phone: {},
      hr_title: {},
      department: {},
    },
    {
      storyblokData: {},
      firstName: "Mazhar",
      lastName: "Shaikh",
      email: [
        {
          value: "mazharali.shaikhaliyarvarjang_extern@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: {},
      phone: {},
      hr_title: {},
      department: {},
    },
    {
      storyblokData: {
        email: "alvaro.giorgetta@fgsglobal.com",
        title: "Managing Director, UX & Digital Design",
        name: "Alvaro Giorgetta",
        image: {
          id: "5005271",
          alt: null,
          name: "",
          focus: null,
          title: null,
          filename:
            "https://s3.amazonaws.com/a.storyblok.com/f/137553/1024x1400/24ee5e4046/alvaro-giorgetta.jpg",
          copyright: null,
          fieldtype: "asset",
        },
        capabilities: [],
        sectors: [],
        practice_areas: [],
      },
      firstName: "Alvaro",
      lastName: "Giorgetta",
      email: [
        {
          value: "alvaro.giorgetta@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: [
        {
          locality: "Washington DC",
          primary: true,
        },
      ],
      phone: [
        {
          value: "(202) 741-5576",
          type: "work",
          primary: true,
        },
      ],
      hr_title: "Managing Director, UX & Digital Design",
      department: {},
    },
    {
      storyblokData: {},
      firstName: "Lindsay",
      lastName: "Hutton",
      email: [
        {
          value: "lindsay.hutton@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: [
        {
          locality: "New York",
          primary: true,
        },
      ],
      phone: [
        {
          value: "(646) 616-5469",
          type: "work",
          primary: true,
        },
      ],
      hr_title: "Director, Digital Operations",
      department: {},
    },
    {
      storyblokData: {},
      firstName: "John",
      lastName: "Fink",
      email: [
        {
          value: "john.fink@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: [
        {
          locality: "New York",
          primary: true,
        },
      ],
      phone: [
        {
          value: "(646) 805-2061",
          type: "work",
          primary: true,
        },
      ],
      hr_title: "Director of Design",
      department: {},
    },
    {
      storyblokData: {
        email: "andre.malkine@fgsglobal.com",
        title: "Managing Director, Digital Development",
        name: "André Malkine",
        image: {
          id: "5028924",
          alt: "Andre Malkine",
          name: "",
          focus: null,
          title: "Andre Malkine, Director",
          filename:
            "https://a.storyblok.com/f/137553/1024x1400/1161fad21f/andre-malkine.jpg",
          copyright: "",
          fieldtype: "asset",
        },
        capabilities: [],
        sectors: [],
        practice_areas: [],
      },
      firstName: "Andre",
      lastName: "Malkine",
      email: [
        {
          value: "andre.malkine@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: [
        {
          locality: "New York",
          primary: true,
        },
      ],
      phone: [
        {
          value: "(646) 616-5464",
          type: "work",
          primary: true,
        },
      ],
      hr_title: "Director, Product Experience",
      department: {},
    },
    {
      storyblokData: {},
      firstName: "Rabia",
      lastName: "Kapoor",
      email: [
        {
          value: "rabia.kapoor@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: {},
      phone: {},
      hr_title: {},
      department: {},
    },
    {
      storyblokData: {
        email: "erin.barth-dwyer@fgsglobal.com",
        title: "senior associate",
        name: "Erin Barth-Dwyer",
        image: {
          id: "5004595",
          alt: null,
          name: "",
          focus: null,
          title: null,
          filename:
            "https://s3.amazonaws.com/a.storyblok.com/f/137553/1024x1400/c2db43dcab/erin-barth-dwyer.jpg",
          copyright: null,
          fieldtype: "asset",
        },
        capabilities: [],
        sectors: [],
        practice_areas: [],
      },
      firstName: "Erin",
      lastName: "Barth-Dwyer",
      email: [
        {
          value: "erin.barth-dwyer@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: [
        {
          locality: "New York",
          primary: true,
        },
      ],
      phone: [
        {
          value: "(646) 495-1902",
          type: "work",
          primary: true,
        },
      ],
      hr_title: "Senior Associate",
      department: {},
    },
    {
      storyblokData: {},
      firstName: "Milo",
      lastName: "Axelrod",
      email: [
        {
          value: "milo.axelrod@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: [
        {
          locality: "New York",
          primary: true,
        },
      ],
      phone: [
        {
          value: "(646) 616-5463",
          type: "work",
          primary: true,
        },
      ],
      hr_title: "UX/UI Designer",
      department: {},
    },
    {
      storyblokData: {},
      firstName: "Noelle",
      lastName: "Morris",
      email: [
        {
          value: "noelle.morris@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: [
        {
          locality: "New York",
          region: "New York",
          postalCode: "10022",
          country: "US",
          primary: true,
        },
      ],
      phone: [
        {
          value: "(646) 616-5468",
          type: "work",
          primary: true,
        },
      ],
      hr_title: "Associate Director, UX/UI Designer",
      department: {},
    },
    {
      storyblokData: {},
      firstName: "Corrine",
      lastName: "Dunn",
      email: [
        {
          value: "corrine.dunn@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: [
        {
          locality: "New  York",
          region: "New York",
          postalCode: "10022",
          country: "US",
          primary: true,
        },
      ],
      phone: [
        {
          value: "(202) 980-7680",
          type: "work",
          primary: true,
        },
      ],
      hr_title: "Senior Associate, Digital & Technology",
      department: {},
    },
    {
      storyblokData: {},
      firstName: "Angela",
      lastName: "Zirkelbach",
      email: [
        {
          value: "angela.zirkelbach@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: [
        {
          locality: "New York",
          primary: true,
        },
      ],
      phone: [
        {
          value: "(646) 616-5477",
          type: "work",
          primary: true,
        },
      ],
      hr_title: "Managing Director",
      department: {},
    },
    {
      storyblokData: {},
      firstName: "Robert",
      lastName: "Collegio",
      email: [
        {
          value: "robert.collegio@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: [
        {
          locality: "New York",
          country: "US",
          primary: true,
        },
      ],
      phone: [
        {
          value: "(212) 687 8080",
          type: "work",
          primary: true,
        },
      ],
      hr_title: "IT Operations Manager",
      department: {},
    },
    {
      storyblokData: {},
      firstName: "Chris",
      lastName: "Levesque",
      email: [
        {
          value: "christine.levesque@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: {},
      phone: {},
      hr_title: {},
      department: {},
    },
    {
      storyblokData: {},
      firstName: "Sarath",
      lastName: "Kumar",
      email: [
        {
          value: "sarath.kumar19@wipro.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: {},
      phone: {},
      hr_title: {},
      department: {},
    },
    {
      storyblokData: {},
      firstName: "Kavitha",
      lastName: "Kumarasamy",
      email: [
        {
          value: "kavitha.49@wipro.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: {},
      phone: {},
      hr_title: {},
      department: {},
    },
    {
      storyblokData: {},
      firstName: "Adam",
      lastName: "Keys",
      email: [
        {
          value: "adam.keys@fgsglobal.com",
          primary: true,
          providerID: "staffbase",
        },
      ],
      office: {},
      phone: {},
      hr_title: {},
      department: {},
    },
  ]);

  //   const [listSelectedValues, setLSV] = useState([]);
  const [listPositions, setListPosition] = useState([]);
  const [listPositionsSelectedVal, setListPositionsSelectedVal] = useState([]);

  const [listSector, setListSector] = useState([]);
  const [selectedSector, setSelectedSector] = useState([]);

  const [listPractice, setListPractice] = useState([]);
  const [selectedPractice, setSelectedPractice] = useState([]);

  const [listCapability, setListCapability] = useState([]);
  const [selectedCapability, setSelectedCapability] = useState([]);

  useEffect(() => {
    widgetApi.getUserInformation().then((user) => {
      console.log("user", user);
      setUser(user);
      verifyToken(user);
    });
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      console.log("User logged in succcessfully");
      //   fetchPeopleDirectoryUsers();
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
      selectedCapability?.length
    ) {
      if (selectedCapability?.length > 0) {
        console.log(selectedCapability);
        const result = selectedCapability.map(
          (value) => Object.values(value)[0]
        );

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
        console.log(selectedSector);
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
        //   console.log("newArray", newArray);
      }

      if (selectedPractice?.length > 0) {
        console.log(selectedPractice);
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
        console.log(listPositionsSelectedVal);
        const result = listPositionsSelectedVal.map(
          (value) => Object.values(value)[0]
        );

        console.log("before", listPositionsSelectedVal);
        let newArray = peopleData.filter((rec) => {
          if (result.includes(rec?.hr_title)) {
            return resultOfPosition.push(rec);
          }
        });

        // setSearchPeopleData(newArray);
      }

      console.log("resultOfSector", resultOfSector);
      console.log("selectedCapability", selectedCapability);

      let peopleObj = [
        ...resultOfPractice,
        ...resultOfPosition,
        ...resultOfSector,
        ...selectedCapability,
      ];

      setSearchPeopleData([...new Set(peopleObj)]);
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
        console.log("response.data.title", practices[0]);
        const titles_list_obj: any = titles_list.map((e) => ({
          label: e,
          value: e,
        }));

        setListPosition(titles_list_obj);

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
        console.log(error);
      });
  };

  const fetchPeopleDirectoryUsers = () => {
    const checkDirectoryAuthToken = localStorage.getItem("directoryAuthToken");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://127.0.0.1:5000/api/profiles`,
      headers: {
        Authorization: checkDirectoryAuthToken.replace(/^"(.*)"$/, "$1"),
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setPeopleData(response.data.data);
        setSearchPeopleData(response.data.data);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  };

  const verifyToken = (info) => {
    const checkDirectoryAuthToken = localStorage.getItem("directoryAuthToken");
    if (checkDirectoryAuthToken) {
      let verifyToken = JSON.stringify({
        userId: "00uwskbw25UJUbQfl1t7",
        token: checkDirectoryAuthToken.replace(/^"(.*)"$/, "$1"),
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://127.0.0.1:5000/api/auth/verify",
        headers: {
          "Content-Type": "application/json",
        },
        data: verifyToken,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setIsLoggedIn(true);
        })
        .catch((error) => {
          authenticateUser(info);
          console.log(error);
        });
    } else {
      authenticateUser(info);
    }
  };

  const authenticateUser = (info) => {
    let data = JSON.stringify({
      userId: "00uwskbw25UJUbQfl1t7",
      userName: "mazharali.shaikhaliyarvarjang_extern[at]fgsglobal.com",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://127.0.0.1:5000/api/auth/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        localStorage.setItem(
          "directoryAuthToken",
          JSON.stringify(response.data.token)
        );
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const resetForm = () => {
    setSelectedPractice([]);
    setSelectedSector([]);
    setListPositionsSelectedVal([]);
    setSelectedCapability([]);
    setSearchPeopleData(peopleData);
  };

  //   const mappedData = () => {};

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

                    <MultiselectWithAll
                      className="directory-multi-select"
                      displayValue="label"
                      options={listPositions}
                      showCheckbox={true}
                      hidePlaceholder={true}
                      closeOnSelect={true}
                      onSelect={(e: any) => setListPositionsSelectedVal(e)}
                      onRemove={(e: any) => setListPositionsSelectedVal(e)}
                      selectedValues={listPositionsSelectedVal}
                      // singleSelect={true}
                    />
                  </div>

                  <div
                    className="directory-element-div"
                    style={{ width: "70%", float: "left" }}
                  >
                    <label className="directory-lable">Practice</label>

                    <MultiselectWithAll
                      className="directory-multi-select"
                      displayValue="label"
                      options={listPractice}
                      showCheckbox={true}
                      hidePlaceholder={true}
                      closeOnSelect={true}
                      onSelect={(e: any) => setSelectedPractice(e)}
                      onRemove={(e: any) => setSelectedPractice(e)}
                      selectedValues={selectedPractice}
                      // singleSelect={true}
                    />

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
                    style={{ width: "40%", float: "left" }}
                  >
                    <label className="directory-lable">Sector</label>

                    <MultiselectWithAll
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
                    />
                  </div>
                  <div
                    className="directory-element-div"
                    style={{ width: "40%", float: "left" }}
                  >
                    <label className="directory-lable">Capability</label>

                    <MultiselectWithAll
                      className="directory-multi-select"
                      displayValue="label"
                      options={listCapability}
                      showCheckbox={true}
                      hidePlaceholder={true}
                      closeOnSelect={true}
                      onSelect={(e: any) => setSelectedCapability(e)}
                      onRemove={(e: any) => setSelectedCapability(e)}
                      selectedValues={selectedCapability}
                      // singleSelect={true}
                    />
                  </div>
                  <div
                    className="directory-element-div"
                    style={{ width: "20%", float: "left" }}
                  >
                    <div
                      className="directory-cancel-button"
                      onClick={resetForm}
                    >
                      Reset
                    </div>
                  </div>
                </div>
                <hr className="directory-border-color" />
                <div>
                  <SelectWithSearch
                    isObject={false}
                    onKeyPressFn={function noRefCheck() {}}
                    onRemove={function noRefCheck() {}}
                    onSearch={function noRefCheck() {}}
                    onSelect={function noRefCheck() {}}
                    options={[
                      "Sarath Kumar",
                      "Narmadha",
                      "Uthra",
                      "Sathick basha",
                      "Furkan",
                    ]}
                    placeholder="Find a person"
                  />
                </div>

                <div
                  className="directory-filter-div"
                  style={{ display: "flex", flexWrap: "wrap" }}
                >
                  {searchPeopleData &&
                    searchPeopleData.map((user) => {
                      return <PeopleDirectoryCard person={user} />;
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
                    <div
                      className="directory-cancel-button"
                      onClick={resetForm}
                    >
                      Reset
                    </div>
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
