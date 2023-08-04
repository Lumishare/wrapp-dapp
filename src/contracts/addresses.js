// This address points to a dummy ERC20 contract deployed on Ethereum Mainnet,
// Goerli, Kovan, Rinkeby and Ropsten. Replace it with your smart contracts.
const addresses = {
  srg: {
    goerli: "0x8D9a2BFd40B529Ca5F0a60b6606aec376554add0",
    bsctestnet: "0x58C388bb71Ff2a926963cf888Cd793De700d6E9e",
    mumbai: "0x2D7D4Ec919C5c642F040b820ed4F05dCd40b2892",
    bsc: "0xcc88982f38dBDFda5ed9748363294966Fc2D707E",
    sepolia: "0x58e0e26ee6293Fc77db36E5ad204c4C8f61ff58C"
  },
  goldList: {
    goerli: "0xf68a7fea591bfa6d0e912d9acb0278a7d2cd928d",
    bsctestnet: "0x5c19ec2dfd13cbdc5efa34f77f4bc83669604fa6",
    mumbai: "0x2D7D4Ec919C5c642F040b820ed4F05dCd40b2892",
    bsc: "0x153687b63cDB26dD97Eb98FCCe6604ce178dECBc" // bsc: "0x38f6dd59ec1269c04df5e4906eddabcf3ed4bca0" version no goldlisted
  },
  coldStaking: {
    goerli: "0x65c307AB0d8a745C8Ba2D81a3436dE16bb4c4050",
    bsctestnet: "0x3D2A57136B2458a175a7eE3C4781dBa5750659D0",
    mumbai: "0x2D7D4Ec919C5c642F040b820ed4F05dCd40b2892",
    bsc: "0x8632e0Ee04fD054Eb911C3C98B656e83512F7867"
  },
  wrapper: {
    bsc: "0x0248cE2b4925433063309e5CeA3761924F86654c",
    sepolia: "0xb01653926e391a022b6f6fc0216df9b4d029968a"
  },
  srgV1: {
    goerli: "0x65c307AB0d8a745C8Ba2D81a3436dE16bb4c4050",
    bsctestnet: "0x3D2A57136B2458a175a7eE3C4781dBa5750659D0",
    mumbai: "0x5f4395996479eF6ff57da6f28779Cc8EA2350258",
    bsc: "0x5ae6862b92fe443d2c4addd9c6e65fc0c7ccddc0"
  }
};

export default addresses;
