import React from "react";

import { jwtDecode } from "jwt-decode";
function Calendar() {
  const responseGoogle = (response) => {
    const credentials = response.credential;
    console.log(credentials);
    console.log(jwtDecode(credentials));
  };
  const responseError = (error) => {
    console.log(error);
  };
  return (
    <>
      <div>Calendar</div>
      <GoogleOAuthProvider clientId="19682570152-dvs7v9kbjvqf7i6t8mjdipo2i59j6knq.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={responseGoogle}
          onError={responseError}
          cookiePolicy={"single_host_origin"}
        />
      </GoogleOAuthProvider>
    </>
  );
}

export default Calendar;
