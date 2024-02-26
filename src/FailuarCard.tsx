import React from "react";
const FailuarCard = () => {
  return (
    <div className="directory-failuar-card">
      <div className="failuar-card-main-div">
        <div className="failuar-Card-Imgplaceholder">
          <img
            className="image-failuar"
            src={
              "https://cdn-de1.staffbase.com/eyo-live-de/image/upload/t_preview/c_limit,h_300/v1706724426/AjgTciAW4XIioQJbQwuycpRCNXi8VgvE1wQTchoFQpIlDSsDbBCvjMHHSQNkafq3mTHam973ysvlU3NjHJMCgBXKRf4s2j4t4QNKwds094m3yca4KI3E4LwrbUoJXx2ibmmoapti3X7lcVlQu94GLO27MiL6P64OC0ph0bw9YF4PlG8Da2Excim6nS3yXP9I/Card-Img48x48.png"
            }
          />
        </div>
        <div className="failuar-InfoboxContent">
          <div className="failuar-card-title">No Results Found</div>
          <div className="failuar-card-para">
            Please reset a filter and try again
          </div>
        </div>
      </div>
    </div>
  );
};

export default FailuarCard;
