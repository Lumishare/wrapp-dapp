import React from 'react';

import {
  Box,
  Text,
  ResponsiveContext,
  Heading
} from 'grommet';



export default function Banner() {
  const size = React.useContext(ResponsiveContext);
  return (
    <>
    <Box align="center" flex={false} gap={"large"} pad={{ horizontal: "large", top: "small" }} >

      <Box align={"center"} pad={{ top: "xsmall" }} width="large" >
        <Box direction="row" gap="small" >
          <Heading className="golden_heading" size={"medium"}>
            GOLDEN
          </Heading>
          <Heading className="exo_heading" color="#FFFFFF">
            LAUNCHPAD
          </Heading>
        </Box>
        <Box direction="row" >
          <Text size="large" className="exo_heading" color="#FFFFFF">
            Pre-sale Achieved A <Text className="golden_heading" size="large">Success</Text> Rate Of <Text className="golden_heading" size="large">288%</Text>
          </Text>
        </Box>
      </Box>
      <Box background="black" direction="row" alignSelf="center" alignContent="center" pad="medium"  gap="medium">
        <Box gap="small" align="center">
          <Text weight="bold" color="white" size={"medium"}>Exclusive Price</Text>
          <Text weight="bold" className="golden_heading" size={"xxlarge"}>US$ 0.135</Text>
          <Text weight="bold" color="white" size={"medium"}>Per $LUMI Token</Text>
          <Text weight="bold" color="white" size={"xsmall"}>(10% discount on the Launchpad price of $0.15)</Text>
        </Box>
      </Box>
    </Box>

    </>
  )
}
