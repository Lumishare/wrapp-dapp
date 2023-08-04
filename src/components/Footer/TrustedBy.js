import React from "react";

import { Image, Box, Paragraph,Anchor } from "grommet";

const TrustedBy = () => (
  <Box
    direction="row-responsive"
    justify="center"
    align="center"
  >
    <Box align="center" margin="medium" size="small">
      <Paragraph size="small" textAlign="center" className="golden_heading" style={{font: "normal normal normal 18px/27px"}}>
        SMART-CONTRACT AUDIT BY
      </Paragraph>
      <Box direction="row" gap="small">
        <Box width="xsmall">
          <Image src={require("../../assets/cyber_scope_logo.png")} fit="cover" />
        </Box>
        <Box width="xsmall" as={Anchor} href="https://www.certik.com/projects/lumishare" target="_blank">
          <Image src={require("../../assets/certik_logo.png")} fit="cover" />
        </Box>
      </Box>
    </Box>
    <Box align="center" margin="medium">
      <Paragraph size="small" textAlign="center" className="golden_heading" style={{font: "normal normal normal 18px/27px"}}>
        SECURED BY
      </Paragraph>
      <Box direction="row" gap="small">
        <Box width="xsmall">
          <Image src={require("../../assets/brain_shield_logo.png")} fit="cover" />
        </Box>
        <Box width="xsmall">
          <Image src={require("../../assets/cye_logo.png")} fit="cover" />
        </Box>
      </Box>
    </Box>
  </Box>
);

export default TrustedBy;
