// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const[owner,from1,from2,from3]=await hre.ethers.getSigners(); //this line will help you to provide address to the different owner
  const chai = await hre.ethers.getContractFactory("chai"); //it will connect your smartcontract with js file
  const contract = await chai.deploy(); //instance of contract
  await contract.deployed();
  console.log("address of contract",contract.address)
  
  const addresses=[owner.address,from1.address,from2.address,from3.address];
  console.log("before buying chai");
  await cosoleBalances(addresses)
  const amount ={value:hre.ethers.utils.parseEther("1")}
  await contract.connect(from1).buychai("from1","very nice chai",amount);
  await contract.connect(from2).buychai("from2","very nice chai",amount);
  await contract.connect(from3).buychai("from3","very nice dish",amount);
  console.log("after buying chai");
  await cosoleBalances(addresses)



}
async function getBalances(address){
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}
async function cosoleBalances(addresses){
  let counter=0;
  for(const address of addresses){
    console.log('Address ${counter} balance:', await getBalances(address))
  }
}
async function consolememos(memos){
  for(const memo of memos){
    const timestamp=memo.timestamp;
    const name = memo.name;
    const from = memo.from;
    const message = memo.message;

  console.log('At ${timestamp}, name ${name}, address ${from},message ${message}')

  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
