import React,{ useState,useMemo,useContext } from 'react'




/**
 * Our custom React hook to manage state
 */

 const AppContext = React.createContext({})



const useAppState = () => {
  const initialState = {
    provider: null,
    netId: null,
    coinbase: null,
    goldList: null,
    srg: null,
    client: null,
    loadWeb3Modal: null,
    stablecoins: null,
    whitelisted: true,
    goldListBalance: null,
    coinbaseBalance: 0,
    setGetStablecoinsBalance: null,
    srgV1Balance: null,
    srgV1: null,
    getStakes: null,
    wrapper: null,
    wrapperBalance: 0
  }

  // Manage the state using React.useState()
  const [state, setState] = useState(initialState)

  // Build our actions. We'll use useMemo() as an optimization,
  // so this will only ever be called once.
  const actions = useMemo(() => getActions(setState), [setState])

  return { state, actions }
}

// Define your actions as functions that call setState().
// It's a bit like Redux's dispatch(), but as individual
// functions.
const getActions = (setState) => ({
  setProvider: (provider) => {
    setState((state) => ({ ...state, provider: provider }))
  },
  setNetId: (netId) => {
    setState((state) => ({ ...state, netId: netId }))
  },
  setCoinbase: (coinbase) => {
    setState((state) => ({ ...state, coinbase: coinbase }))
  },
  setClient: (client) => {
    setState((state) => ({ ...state, client: client }))
  },
  setGoldList: (goldList) => {
    setState((state) => ({ ...state, goldList: goldList }))
  },
  setSrg: (srg) => {
    setState((state) => ({ ...state, srg: srg }))
  },
  setLoadWeb3Modal: (loadWeb3Modal) => {
    setState((state) => ({ ...state, loadWeb3Modal: loadWeb3Modal }))
  },
  setStablecoins: (stablecoins) => {
    setState((state) => ({ ...state, stablecoins: stablecoins }))
  },
  setWhitelisted: (whitelisted) => {
    setState((state) => ({ ...state, whitelisted: whitelisted }))
  },
  setGoldListBalance: (goldListBalance) => {
    setState((state) => ({ ...state, goldListBalance: goldListBalance }))
  },
  setCoinbaseBalance: (coinbaseBalance) => {
    setState((state) => ({ ...state, coinbaseBalance: coinbaseBalance }))
  },
  setGetStablecoinsBalance: (getStablecoinsBalance) => {
    setState((state) => ({ ...state, getStablecoinsBalance: getStablecoinsBalance }))
  },
  setSrgV1: (srgV1) => {
    setState((state) => ({ ...state, srgV1: srgV1 }))
  },
  setSrgV1Balance: (srgV1Balance) => {
    setState((state) => ({ ...state, srgV1Balance: srgV1Balance }))
  },
  setGetStakes: (getStakes) => {
    setState((state) => ({ ...state, getStakes: getStakes }))
  },
  setWrapper: (wrapper) => {
    setState((state) => ({ ...state, wrapper: wrapper }))
  },
  setWrapperBalance: (wrapperBalance) => {
    setState((state) => ({ ...state, wrapperBalance: wrapperBalance }))
  },
})


const useAppContext = () => {
  return useContext(AppContext)
}

export { AppContext, useAppState, useAppContext }
