import React from "react";
import styled from "styled-components";

import {
  Box,
  Text,
  ResponsiveContext
} from "grommet";



const About = () => {
  const size = React.useContext(ResponsiveContext);

  const StyledText = styled(Text)`
      font: normal normal 600 ${size !== "small" ? "42px":"30px"}/62px Poppins;
      letter-spacing: 0px;
      height: ${size !== "small" ? "42px":"30px"}/62px Poppins
      text-transform: capitalize;
      opacity: 1;
      ${size === "small" && "height: 45px;" }
  `;

  return(
    <Box align="center" pad={{vertical:"small",horizontal:"large" }} style={{minHeight: size}}>
      <Box align="center" width="large" direction="row-responsive"  >
          <StyledText color="#F1F1F1" textAlign="center">
            Welcome To The 
          </StyledText>
          <StyledText  textAlign="center" color="#FFCC00">New Golden Era</StyledText>
      </Box>
    </Box>
  )
}



export default About;
