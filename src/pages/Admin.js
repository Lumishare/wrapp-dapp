import React,{useState,useEffect} from 'react';

import {
  Box,
  Button,
  TextInput
} from 'grommet';

import { Orbis } from "@orbisclub/orbis-sdk";

let orbis = new Orbis();

export default function Admin() {


  const [res,setRes] = useState();
  const [value, setValue] = useState('');


  const setProfileDescription = async () => {
    let res = await orbis.updateProfile({
      description: value
    });
  }

  useEffect(() => {
    orbis.connect().then(res => {
      console.log(res)
      setRes(res);
    })
  },[]);

  useEffect(() => {
    orbis.getProfile("did:pkh:eip155:1:0x853bce6243f85a3291df47b2242a1cb688c4e5c6").then(({ data, error }) => {
      if(!isNaN(Number(data.profile?.description)) && Number(data.profile?.description) > 0){
        setValue(data.profile?.description);
      }
    });
  },[]);

  return (
    <>
    <Box flex={false} align="center">
      <Box pad={{top:"medium"}} alignContent="center"  width="large" >
        {
          res?.did === "did:pkh:eip155:1:0x853bce6243f85a3291df47b2242a1cb688c4e5c6" &&
          <>
          <TextInput
            placeholder="% here"
            value={value}
            onChange={event => setValue(event.target.value)}
          />
          <Button onClick={setProfileDescription} primary label="Update" disabled={isNaN(Number(value))} />
          </>
        }
      </Box>
    </Box>
    </>
  )
}
