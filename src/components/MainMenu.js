import React from 'react';

import {
  Header,
  Button,
  Image,
  Box,
  Text,
  ResponsiveContext,
  Nav,
  Anchor,
} from 'grommet';

import { useAppContext } from '../hooks/useAppState';

export default function MainMenu(props) {
  const { state } = useAppContext();
  const size = React.useContext(ResponsiveContext);

  return (
    <Header background="#060707" pad="small">
      <Box width={size}>
        <Anchor href="https://lumishare.io/" target="_blank">
          <Image
            src={require("../assets/logo-2.png")}
            style={{maxWidth:"200px"}}
            width={size}
            href="https://lumishare.io/" target="_blank"
          />
        </Anchor>
      </Box>
      <Nav align="center" >
      {
        !state.coinbase ?
        <Button
          primary
          size={size}
          icon={
            <Image src={require("../assets/icons/wallet.png")} fit="cover"/>
          }
          label={window.innerWidth >= 500 ? "Connect Your Wallet" : "Connect"}
          color="#ffcc00"
          className="btn-primary"
          onClick={state.loadWeb3Modal}
        /> :
        state.whitelisted ?
        <>
          <Text color="white" size="xsmall">Connected</Text>
          {
            window.innerWidth >= 500 &&
            <Text color="white" size="7px">{state.coinbase}</Text>
          }
          <Text color="white" size="8px">Your LUMI Balance</Text>
          <Text color="white" size="8px">{Number(state.coinbaseBalance)/10**18} LUMI</Text>
        </> :
        <>
        {
          window.innerWidth >= 500 &&
          <Text color="white" size="xsmall">{state.coinbase}</Text>
        }
        </>
      }
      </Nav>
    </Header>
  )
}
