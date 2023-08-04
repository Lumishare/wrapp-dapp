import { useState, useEffect, useMemo, useCallback } from 'react';

import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';

import {
  Box,
  Layer,
  Text,
  Anchor,
  ThemeContext
} from 'grommet';
import { ethers } from "ethers";
import { ChatBox } from '@orbisclub/modules'
import "@orbisclub/modules/dist/index.modern.css";
//import { User,Connect,Nodes,Help,Projects,Clock } from 'grommet-icons';

import { AppContext, useAppState } from './hooks/useAppState'

import useWeb3Modal from './hooks/useWeb3Modal'
import useGraphClient from './hooks/useGraphClient';

import Wrapper from './pages/Wrapper';

import MainMenu from './components/MainMenu';
import DappFooter from './components/DappFooter';

import abis from "./contracts/abis";
import addresses from "./contracts/addresses";





export default function App() {

  const { state, actions } = useAppState();

  const [srg, setSrg] = useState();
  const [srgV1, setSrgV1] = useState();
  const [wrapper, setWrapper] = useState();
  const [stablecoins, setStablecoins] = useState();


  const {
    provider,
    coinbase,
    netId,
    loadWeb3Modal
  } = useWeb3Modal();


  useEffect(() => {
    actions.setProvider(provider)
  }, [provider])
  useEffect(() => {
    actions.setCoinbase(coinbase)
  }, [coinbase]);

  useEffect(() => {
    if (coinbase && srg) {
      srg.balanceOf(coinbase).then(newBalance => {
        actions.setCoinbaseBalance(newBalance.toString());
        srg.on("Transfer", async (from, to, value) => {
          if (
            from.toLowerCase() === coinbase.toLowerCase() ||
            to.toLowerCase() === coinbase.toLowerCase()
          ) {
            const newBalance = await srg.balanceOf(coinbase);
            actions.setCoinbaseBalance(newBalance.toString());
          }
        });
      });
    }
  }, [coinbase, srg]);

  useEffect(() => {
    if (wrapper && coinbase) {
      wrapper.balanceOf(coinbase).then(balance => {
        actions.setWrapperBalance(balance.toString());
        wrapper.on("Transfer", async (from, to, value) => {
          if (
            from.toLowerCase() === coinbase.toLowerCase()
          ) {
            const newWrapperBalance = await wrapper.balanceOf(coinbase);
            actions.setWrapperBalance(newWrapperBalance.toString());
          }
        });
      });
    }
  }, [wrapper, coinbase]);

  useEffect(() => {
    actions.setNetId(netId)
  }, [netId])
  useEffect(() => {
    actions.setSrg(srg)
  }, [srg])
  useEffect(() => {
    actions.setWrapper(wrapper)
  }, [wrapper])
  useEffect(() => {
    actions.setLoadWeb3Modal(loadWeb3Modal)
  }, [loadWeb3Modal])

  useEffect(() => {
    actions.setStablecoins(stablecoins)
  }, [stablecoins])

  useEffect(() => {
    // Goerli

    let newSrg, newWrapper;
    // Mumbai
    if (netId === 80001) {
      newSrg = new ethers.Contract(addresses.srg.mumbai, abis.srg, provider);
      newWrapper = new ethers.Contract(addresses.wrapper.mumbai, abis.wrapper, provider);
    }
    if (netId === 56) {
      newSrg = new ethers.Contract(addresses.srg.bsc, abis.srg, provider);
      newWrapper = new ethers.Contract(addresses.wrapper.bsc, abis.wrapper, provider);
    }
    if (netId === 11155111) {
      newSrg = new ethers.Contract(addresses.srg.sepolia, abis.srg, provider);
      newWrapper = new ethers.Contract(addresses.wrapper.sepolia, abis.wrapper, provider);
    }
    setSrg(newSrg);
    setWrapper(newWrapper);
  }, [netId]);

  return (
    <AppContext.Provider value={{ state, actions }} >
      <ThemeContext.Extend
        value={
          {
            text: {
              font: {
                family: "'Exo 2'"
              }
            },
            meter: {
              color: "#FAC73F"
            },
            anchor: {
              color: "#ffcc00"
            },
            global: {
              hover: {
                color: "white"
              },
              focus: {
                border: {
                  color: "none"
                }
              },
              colors: {
                control: '#ffcc00'
              },
              font: {
                weight: 600,
                family: "Exo 2"
              }
            },
            select: {
              options: {
                text: {
                  color: "#ffcc00"
                }
              },
              clear: {
                text: {
                  color: "black"
                }
              },
              control: {
                extend: {
                  color: "black"
                }
              }
            }
          }
        }
      >
        <Router >
          {
            /*
            <ChatBox context="kjzl6cwe1jw14808eb8yfpg3g3olvhi4os1n089xyoji6jekrsit97xtxyo9t0z" poweredByOrbis="black" />
            */
          }
          <Box>
            <MainMenu />
            {
              netId !== 56 && netId !== 11155111 && //netId !== 137 && netId !== 5 && netId !== 56 &&
              <Box align="center" >
                <Layer background="status-error" responsive={false}>
                  <Box width="medium" pad="large">
                    <Text textAlign="center"><Anchor color="white" weight="bold" href="https://chainlist.network/" target="_blank">Please connect to Binance Smart Chain network</Anchor></Text>
                  </Box>
                </Layer>
              </Box>
            }
            <Box pad={{ top: "xxsmall", bottom: "small" }} flex={false}>
              <Routes>
                <Route path="/" element={<Wrapper />} />

                <Route render={() => {

                  return (
                    <Navigate to="/" />
                  );

                }} />
              </Routes>
            </Box>
            <DappFooter height="small" />
          </Box>
        </Router>
      </ThemeContext.Extend>
    </AppContext.Provider>
  )
}
