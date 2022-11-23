import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import { Box, Heading, Text, Image } from "grommet";

const StyledText = styled(Text)`
    font: normal normal 600 ${window.innerWidth >= 500 ? "42px":"30px"}/62px Poppins;;
    letter-spacing: 0px;
    text-transform: capitalize;
    opacity: 1;
`;
const StyledTextSub = styled(Text)`
    font: normal normal 600 ${window.innerWidth >= 500 ? "28px":"22px"}/62px Poppins;;
    letter-spacing: 0px;
    text-transform: capitalize;
    opacity: 1;
`;



const About = () => {
  const { uri } = useParams();

  return(
    <Box align="center" pad={{vertical:"small",horizontal:"large" }} style={{minHeight: `${window.innerWidth <= 500 ? "300px" : "150px"}`}}>
      <Box align="center" gap="medium" width="large" >
          <StyledText color="#F1F1F1" textAlign="center">
            Welcome To The <StyledText color="#FFCC00">New Golden Era</StyledText>
          </StyledText>
          {
            uri === "eventGoldList" &&
            <StyledTextSub color="#F1F1F1" size="28px" textAlign="center">
              You Are Only <StyledTextSub color="#FFCC00">One Step Away</StyledTextSub> From Getting Into SRG's Gold List Spot
            </StyledTextSub>
          }

      </Box>
    </Box>
  )
}



export default About;
