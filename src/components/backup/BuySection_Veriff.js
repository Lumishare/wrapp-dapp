import { useState, useEffect, useCallback } from 'react';

import {
  Box,
  Button,
  Layer,
  Text,
  Spinner,
  Notification,
} from 'grommet';


import crypto from 'crypto-browserify'

import styled from "styled-components";
import { ethers } from "ethers";

import { useAppContext } from '../hooks/useAppState';
import useOrbis from '../hooks/useOrbis';
import { fromString } from 'uint8arrays'

import GoldListModal from './GoldListModal';
import Stablecoins from './Stablecoins';
import VeriffLayer from './VeriffLayer';

const StyledLayerBuy = styled(Layer)`
  border: 1px solid var(--lines);
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 10px 15px #00000054;
  border: 1px solid #E5E8EB;
  border-radius: 15px;
  opacity: 1;
  width: 355px;
`;


const apiPrivateKey = process.env.REACT_APP_VERIFF_PRIV_KEY;

export default function BuySection(props) {

  const { state } = useAppContext();
  const {
    connectSeed,
    addWallet,
    isUnderVerification
  } = useOrbis();

  const [busd, setBusd] = useState();
  const [value, setValue] = useState("Stablecoin");
  const [show, setShow] = useState();
  const [showVeriff, setShowVeriff] = useState();
  const [underVerification, setUnderVerification] = useState()
  const [veriffReason, setVeriffReason] = useState()
  const [showNotification, setShowNotification] = useState()
  const [notificationShowed, setShowedNotification] = useState()
  const [canShowMessage, setCanShowMessage] = useState()

  const buyTokens = async (total) => {
    const signer = state.provider.getSigner();
    const goldListWithSigner = state.goldList.connect(signer);
    const amount = ethers.utils.parseEther(total).toString()
    let tx;
    if (value === "Native") {
      tx = await goldListWithSigner.claimTokensWithNative({
        value: amount
      });
    } else {
      const allowance = await busd.allowance(state.coinbase, state.goldList.address);
      if (amount > allowance) {
        const busdWithSigner = busd.connect(signer);
        const txApproval = await busdWithSigner.approve(state.goldList.address, amount);
        await txApproval.wait();
      }
      const goldListWithSigner = state.goldList.connect(signer);
      tx = await goldListWithSigner.claimTokensWithStable(busd.address, amount);
    }

    await tx.wait();

  }


  const getExpectedSrg = async (total) => {
    const amount = await state.goldList.getAmountOfTokens(ethers.utils.parseEther(total).toString());
    return (amount.toString() / 10 ** 18);
  }

  const checkVeriffStatus = async () => {

    const payloadAsString = underVerification;

    const signature = crypto
      .createHmac('sha256', apiPrivateKey)
      .update(Buffer.from(payloadAsString, 'utf8'))
      .digest('hex')
      .toLowerCase();

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-HMAC-SIGNATURE': signature,
        "X-AUTH-CLIENT": process.env.REACT_APP_VERIFF_API
      }
    };

    const result = await fetch(`https://stationapi.veriff.com/v1/sessions/${underVerification}/decision`, requestOptions)
    const obj = JSON.parse(await result.text());
    if (obj.verification?.status !== "approved" && obj.verification) {
      setVeriffReason(obj.verification.reason);
      setShowNotification(true)
      setUnderVerification();
      setShowedNotification(true)
    } else if (obj.verification?.status === "abandoned" || !obj.verification) {
      setUnderVerification();
    }
    return (obj)
  }


  useEffect(() => {
    let seed = new Uint8Array(fromString(process.env.REACT_APP_DID_SEED, 'base16'));
    if (state.netId === 56) {
      seed = new Uint8Array(fromString(process.env.REACT_APP_DID_SEED_BSC, 'base16'));
    }
    connectSeed(seed);
  }, [state.netId])

  useEffect(() => {
    if (state.coinbase && !state.whitelisted) {
      isUnderVerification(state.coinbase).then(async newUnderVerification => {
        setUnderVerification(newUnderVerification);
        setCanShowMessage(true);
      })
    }
  }, [
    state.coinbase,
    state.whitelisted
  ]);

  useEffect(() => {
    if(isUnderVerification){
      setTimeout(() => {
        checkVeriffStatus()
      },1000)
    }
  },[isUnderVerification])

  useEffect(() => {

    const interval = setInterval(() => {
      if (underVerification && !state.whitelisted && !notificationShowed) {
        try{
          checkVeriffStatus();
        } catch(err){

        }
      } else {
        clearInterval(interval)
      }
    }, 60000);
    //return () => clearInterval(interval);
  }, [
    notificationShowed,
    underVerification,
    state.whitelisted,
  ])


  return (
    <Box>

      {
        !state.coinbase &&
        <Box width="large" pad={{ bottom: "xlarge" }}>
          <Button primary style={{ borderRadius: "8px" }} color="#ffcc00" size="large" label="Connect" onClick={state.loadWeb3Modal} className="btn-primary" />
        </Box>
      }
      {
        state.coinbase &&
        <>
          {
            !state.whitelisted ?
              (
                !underVerification ?
                  <Box pad={{ bottom: "xlarge" }}>
                    {
                      veriffReason && showNotification &&
                      <Notification
                        toast
                        status="warning"
                        title="Error in Veriff Verification"
                        message={veriffReason}
                        onClose={() => {
                          setShowNotification(false)
                          setShowedNotification(true)
                        }}
                      />

                    }
                    <Button primary style={{ borderRadius: "8px" }} color="#ffcc00" size="large" className="btn-primary" onClick={async () => {
                      const stableBalance = await state.getStablecoinsBalance();
                      if (stableBalance >= 300) {
                        setVeriffReason();
                        setShowNotification(false);
                        setShowVeriff(true);
                      } else {
                        alert("In order to start Verification please ensure your personal wallet is funded with at least 300 worth of USD (USDT, USDC, DAI, BUSD)")
                      }
                    }} label="Verify" />

                  </Box> :
                  <Box align="center" pad={{ bottom: "xlarge" }}>
                    {
                      canShowMessage ?
                        <>
                          <Spinner size="medium" color="white" />
                          <Text size="small" color="white">Under verification</Text>
                          <Text size="xsmall" color="white">It can take up to 10 minutes</Text>
                        </> :
                        <Button primary style={{ borderRadius: "8px" }} color="#ffcc00" size="large" className="btn-primary" disabled label="Verify" />
                    }
                  </Box>
              ) :
              show ?
                <StyledLayerBuy
                  onEsc={() => {
                    setShow(false);
                  }}
                  onClickOutside={() => {
                    setShow(false);
                  }}
                >
                  <Box align="left" pad="medium">
                    <Text style={{
                      textAlign: "left",
                      font: "normal normal 600 20px/40px Poppins",
                      letterSpacing: "0px",
                      color: "black",
                      opacity: 1,
                      paddingBottom: "20px"
                    }}>Payment method</Text>
                    <Stablecoins
                      provider={state.provider}
                      setBusd={setBusd}
                      busd={busd}
                    />
                  </Box>

                  {
                    (
                      value === "Native" ||
                      (
                        value === "Stablecoin" && busd
                      )
                    ) &&
                    <GoldListModal
                      value={value}
                      busd={busd}
                      buyTokens={buyTokens}
                      getExpectedSrg={getExpectedSrg}
                    />
                  }
                </StyledLayerBuy> :
                Number(state.goldListBalance) > 0 ?
                  <Box pad={{ bottom: "xlarge" }}>
                    <Button primary size="large" color="#ffcc00" className="btn-primary" style={{ borderRadius: "8px" }} onClick={() => setShow(true)} label="Buy SRG" />
                  </Box> :
                  <Text size="medium" color="white">Sale ended</Text>
          }
        </>
      }

      {
        showVeriff &&
        <StyledLayerBuy
          onEsc={() => {
            setShowVeriff(false)
          }}
          onClickOutside={() => {
            setShowVeriff(false)
          }}
          height="317px"
        >
          <VeriffLayer
            setShowedNotification={setShowedNotification}
            isUnderVerification={isUnderVerification}
            setUnderVerification={setUnderVerification}
            addWallet={addWallet}
            setShowVeriff={setShowVeriff}
          />
        </StyledLayerBuy>
      }

    </Box>
  )
}
