import React from "react";
import { Anchor, Box } from "grommet";
import { FacebookOption, Instagram, Youtube,Home } from "grommet-icons";

const SocialMedia = () => (
  <Box direction="row" gap="xxsmall" justify="center" alignSelf="center" alignContent="center">
    <Anchor
      icon={<Home color="white" size="medium" />}
      href="https://lumishare.io/"
      target="_blank"
      a11yTitle="Go to Homepage"
    />
    <Anchor
      target="_blank"
      a11yTitle="Share feedback on Instagram"
      href="https://www.instagram.com/lumishare_lumi/"
      icon={<Instagram color="white" size="medium" />}
    />
    <Anchor
      target="_blank"
      a11yTitle="Chat with us on Facebook"
      href="https://www.facebook.com/LumiShareSRG"
      icon={<FacebookOption color="white" size="medium" />}
    />
    <Anchor
      target="_blank"
      a11yTitle="Youtube"
      href="https://www.youtube.com/@LumiShareLUMI"
      icon={<Youtube color="white" size="medium" />}
    />
  </Box>
);

export default SocialMedia;
