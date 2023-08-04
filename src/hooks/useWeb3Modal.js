import { useCallback,useMemo, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";



const providerOptions = {

  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      rpc:{
        56: "https://bsc-dataseed1.binance.org/"
      }
    }
  },
};


const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions
});

function useWeb3Modal(config = {}) {
  const [provider, setProvider] = useState(new ethers.providers.JsonRpcProvider("https://bsc-dataseed1.binance.org/"));
  //const [provider, setProvider] = useState(new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com"));
  const [coinbase, setCoinbase] = useState();
  const [netId , setNetId] = useState(56);
  const [connecting , setConnecting] = useState();
  const [autoLoaded, setAutoLoaded] = useState(false);
  // Web3Modal also supports many other wallets.
  // You can see other options at https://github.com/Web3Modal/web3modal
  const logoutOfWeb3Modal = useCallback(
    async function () {
      await web3Modal.clearCachedProvider();
      setCoinbase();
      setNetId(56);
      setProvider(new ethers.providers.JsonRpcProvider("https://bsc-dataseed1.binance.org/"));
      //setProvider(new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com"));
      //setProvider(new ethers.providers.JsonRpcProvider("https://goerli.infura.io/v3/"+process.env.REACT_APP_INFURA))
    },
    [],
  );
  // Open wallet selection modal.
  const loadWeb3Modal = useCallback(async () => {

    try{
      setConnecting(true)
      setAutoLoaded(true);
      const conn = await web3Modal.connect();
      const newProvider = new ethers.providers.Web3Provider(conn,"any");
      const signer = newProvider.getSigner()
      const newCoinbase = await signer.getAddress();
      const {chainId} = await newProvider.getNetwork();

      setProvider(newProvider);
      setCoinbase(newCoinbase);
      setNetId(chainId);
      setConnecting(false);
      conn.on('accountsChanged', accounts => {
        const newProvider = new ethers.providers.Web3Provider(conn,"any");
        setProvider(newProvider)
        setCoinbase(accounts[0]);
      });
      conn.on('chainChanged', async chainId => {
        window.location.reload();
      });
      // Subscribe to provider disconnection
      conn.on("disconnect", async (error: { code: number; message: string }) => {
        logoutOfWeb3Modal();
      });
      conn.on("close", async () => {
        logoutOfWeb3Modal();
      });

      return;
    } catch(err){
      setConnecting(false)
      logoutOfWeb3Modal();
    }

  }, [logoutOfWeb3Modal]);




  // If autoLoad is enabled and the the wallet had been loaded before, load it automatically now.
  useMemo(() => {
    if (!autoLoaded && web3Modal.cachedProvider) {
      try{
        setAutoLoaded(true);
        loadWeb3Modal();
      } catch(err){
        logoutOfWeb3Modal();
      }
    }
  },[autoLoaded,loadWeb3Modal]);



  return({provider, loadWeb3Modal, logoutOfWeb3Modal,coinbase,netId,connecting});
}



export default useWeb3Modal;
