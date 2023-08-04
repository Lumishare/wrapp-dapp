import React,{useState} from 'react';
import {ethers} from 'ethers';
import {
  Layer,
  Button,
  Image,
  Box,
  Text,
  ResponsiveContext,
  Nav,
  Anchor,
} from 'grommet';

import { useAppContext } from '../hooks/useAppState';

export default function WrapperSection(props) {
  const { state } = useAppContext();
  const size = React.useContext(ResponsiveContext);

  const [show, setShow] = useState();
  const [total,setTotal] = useState();
  const [lumiToMexc,setLumiToMexc] = useState();

  const wrap = async (total) => {
    const signer = state.provider.getSigner();
    const wrapperWithSigner = state.wrapper.connect(signer);
    const amount = ethers.utils.parseEther(total).toString();
    let tx;
    if(lumiToMexc){
      const allowance = await state.srg.allowance(state.coinbase, state.wrapper.address);
      if (Number(amount) > allowance) {
        const srgWithSigner = state.srg.connect(signer);
        const txApproval = await srgWithSigner.approve(state.wrapper.address, amount);
        await txApproval.wait();
      }
      tx = await wrapperWithSigner.swapLumiToLumiMexc(amount);
    } else {
      tx = await wrapperWithSigner.swapLumiMexcToLumi(amount);
    }


    await tx.wait();

  }

  return (
    <Box pad={{top: "medium"}}>
    {
      state.coinbase ?
      <>
      {
        show &&
        <Layer
          onEsc={() => setShow(false)}
          onClickOutside={() => setShow(false)}
        >
          <Box gap="small" pad="large">
            {
              lumiToMexc ?
              <Text>Swap Lumi to LumiMEXC</Text> :
              <Text>Swap LumiMEXC to Lumi</Text>
            }
            <input
              placeholder="Amount"
              onChange={(e) => {

                if(e.target.value < 0 || (e.target.value > 0 && e.target.value <= 0.0001)){
                  e.target.value = 0.0001
                }
                setTotal(e.target.value)
              }}
              type="number"
              step="0.0001"
              min={0.0001}
              value={total}
              style={{
                background: "#FFFFFF 0% 0% no-repeat padding-box",
                border: "3px solid #E6E6E6",
                borderRadius: "8px",
                opacity: 1,
                height: "46px",
                font: "normal normal normal 16px/40px",
              }}
             />
           <Button primary label={ lumiToMexc ? "Wrap" : "Unwrap"} onClick={() => {
             wrap(total)
           }} />

          </Box>
          <Button label="close" onClick={() => setShow(false)} />
        </Layer>
      }
      <Box>
        <Text color="white">Lumi Balance: {ethers.utils.formatEther(state.coinbaseBalance).toString()}</Text>
        <Text color="white">LumiMEXC Balance: {ethers.utils.formatEther(state.wrapperBalance).toString()}</Text>
      </Box>
      <Box direction="row-responsive" gap="medium" pad={{top: "medium"}}>
        <Button
          primary
          size={size}
          icon={
            <Image src={require("../assets/icons/wallet.png")} fit="cover"/>
          }
          label={"Swap to LumiMEXC"}
          color="#ffcc00"
          className="btn-primary"
          onClick={() => {
            setShow(true);
            setLumiToMexc(true);
          }}
        />
        <Button
          primary
          size={size}
          icon={
            <Image src={require("../assets/icons/wallet.png")} fit="cover"/>
          }
          label={"Swap to Lumi"}
          color="#ffcc00"
          className="btn-primary"
          onClick={() => {
            setShow(true);
            setLumiToMexc(false);
          }}
        />
      </Box>

      </> :
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
      />
    }
    </Box>
  )
}
