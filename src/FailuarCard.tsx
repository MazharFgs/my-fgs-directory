import React from 'react';
const FailuarCard = () => {
  return (
    <div className="directory-failuar-card">
      <div className="People-Card" style={{width: '198px', padding: '16px', background: 'white', borderRadius: '8px', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px', display: 'inline-flex'}}>
        <div className="People-Card-Container" style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: '12px', display: 'flex'}}>
          <div className="People-Card-Imgplaceholder">
            <img src={'https://cdn-de1.staffbase.com/eyo-live-de/image/upload/w_166,h_237/c_limit,w_2000,h_2000/v1706792579/OUEOcGLz7i4q2k6tYK6OoNaTKHZrPrL0tARdTSMzo6Q8IAt2JkDsEG10i3g2TC52fsfFW3uRqzVAEWsCJmIS7MvDoF0JVNu5lepOFphe5ZyIWzI9WWR9ysgapfnUxE2tmfYR8Ab10OpReGxtm0Pd4gdTFfGyxzuEv3d2oBFNKWxjqs1bsFBF0VhDpqQdfmTP/Card-ImgPeople.png'} height="237" width="166" />
          </div>
          <div className="People-Card-Contents" style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '10px', display: 'flex'}}>
            <div className="People-Card-NameDesignation" style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '2px', display: 'flex'}}>
              <div className="People-Card-Name" style={{width: '166px', wordWrap: 'break-word'}}></div>
              <div className="People-Card-Business-Name" style={{width: '166px', wordWrap: 'break-word'}}>business Title</div>
              <div className="People-Card-Business-Name" style={{width: '166px', wordWrap: 'break-word'}}>Acme Department</div>
            </div>
            <div className="People-Card-ContactDetails" style={{width: '166px', height: '50px', position: 'relative'}}>
              <div className="People-Card-Number-Detail" style={{width: '166px', left: '0px', top: '0px', wordWrap: 'break-word'}}>000-0000-0000</div>
              <div className="People-Card-Email-Detail" style={{width: '166px', left: '0px', top: '16px', wordWrap: 'break-word'}}>employee@fgsglobal.com</div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default FailuarCard;
