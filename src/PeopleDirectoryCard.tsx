import React, { useState } from "react";
const PeopleDirectoryCard = ({ person, view_url }) => {
  //   console.log("person", person);
  const onclick = (e) => {
    e.preventDefault();
    localStorage.setItem("view_profile_email", person?.email[0].value);
    window.location = view_url;
  };
  return (
    <div className="People-Card-Group-Container">
      <div
        className="People-Card"
        style={{
          width: "198px",
          padding: "16px",
          background: "white",
          borderRadius: "8px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          display: "inline-flex",
        }}
      >
        <div
          className="People-Card-Container"
          style={{
            alignSelf: "stretch",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "12px",
            display: "flex",
          }}
        >
          <a onClick={onclick} href="#">
            {/* <div>
              <img
                src="https://cdn-de1.staffbase.com/eyo-live-de/image/upload/v1708955982/PiCTGomSNVEwu2sfFr4muuH2AMYowOVahtPL20Fl7DOvLhAhcrfTTFDOTd9tSP66GTNggEZB9eJAx7yZeMHfJ3ZWx8dS9lYyTjKZMqlfB8VxIyKCWKTXnYdFULjnFoB4pXzawCPD6M4Rxoz8NkzDnKVQtJyFoiN4YZfMZzSUomFt2nCPn6IQkQUGBxxS280D/Profile-Star-Icon.png"
                className=""
                width="32px"
                height="32px"
              />
            </div> */}

            <div className="People-Card-Imgplaceholder">
              {Object.keys(person?.storyblokData).length === 0 ? (
                <img
                  src={
                    "https://cdn-de1.staffbase.com/eyo-live-de/image/upload/w_166,h_237/c_limit,w_2000,h_2000/v1706792579/OUEOcGLz7i4q2k6tYK6OoNaTKHZrPrL0tARdTSMzo6Q8IAt2JkDsEG10i3g2TC52fsfFW3uRqzVAEWsCJmIS7MvDoF0JVNu5lepOFphe5ZyIWzI9WWR9ysgapfnUxE2tmfYR8Ab10OpReGxtm0Pd4gdTFfGyxzuEv3d2oBFNKWxjqs1bsFBF0VhDpqQdfmTP/Card-ImgPeople.png"
                  }
                  height="237"
                  width="166"
                />
              ) : Object.keys(person?.storyblokData?.image).length === 0 ? (
                <img
                  src={
                    "https://cdn-de1.staffbase.com/eyo-live-de/image/upload/w_166,h_237/c_limit,w_2000,h_2000/v1706792579/OUEOcGLz7i4q2k6tYK6OoNaTKHZrPrL0tARdTSMzo6Q8IAt2JkDsEG10i3g2TC52fsfFW3uRqzVAEWsCJmIS7MvDoF0JVNu5lepOFphe5ZyIWzI9WWR9ysgapfnUxE2tmfYR8Ab10OpReGxtm0Pd4gdTFfGyxzuEv3d2oBFNKWxjqs1bsFBF0VhDpqQdfmTP/Card-ImgPeople.png"
                  }
                  height="237"
                  width="166"
                />
              ) : (
                <img
                  src={person?.storyblokData?.image.filename}
                  height="237"
                  width="166"
                />
              )}
            </div>
          </a>
          <div
            className="People-Card-Contents"
            style={{
              alignSelf: "stretch",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: "10px",
              display: "flex",
            }}
          >
            <a onClick={onclick} href="#">
              <div
                className="People-Card-NameDesignation"
                style={{
                  alignSelf: "stretch",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: "2px",
                  display: "flex",
                }}
              >
                <div
                  className="People-Card-Name"
                  style={{ width: "166px", wordWrap: "break-word" }}
                >
                  {person?.firstName} {person?.lastName}
                </div>
                <div
                  className="People-Card-Business-Name"
                  style={{ width: "166px", wordWrap: "break-word" }}
                >
                  {Object.keys(person.hr_title).length === 0
                    ? ""
                    : person?.hr_title}
                </div>
                <div
                  className="People-Card-Business-Name"
                  style={{ width: "166px", wordWrap: "break-word" }}
                >
                  {Object.keys(person.department).length === 0
                    ? ""
                    : person?.department}
                </div>
              </div>
            </a>

            <div
              className="People-Card-ContactDetails"
              style={{ width: "166px", height: "50px", position: "relative" }}
            >
              <a onClick={onclick} href="#">
                <div
                  className="People-Card-Number-Detail"
                  style={{
                    width: "166px",
                    left: "0px",
                    top: "0px",
                    wordWrap: "break-word",
                  }}
                >
                  {Object.keys(person?.phone).length === 0
                    ? ""
                    : person?.phone[0].value}
                </div>
              </a>
              {Object.keys(person.email).length === 0 ? (
                ""
              ) : (
                <a href={`mailto:${person?.email[0].value}`}>
                  <div
                    className="People-Card-Email-Detail"
                    style={{
                      width: "166px",
                      left: "0px",
                      top: "16px",
                      wordWrap: "break-word",
                    }}
                  >
                    {person?.email[0].value}
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeopleDirectoryCard;
