import React from 'react';

import Banner from '../components/Banner';
import WrapperSection from '../components/WrapperSection';


import {
  Box,
} from 'grommet';



export default function Wrapper() {
  return (
    <>
    <Box flex={false} align="center">
      <WrapperSection/>
    </Box>
    </>
  )
}
