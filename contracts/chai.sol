// SPDX-License-Identifier: UNLICENSED
pragma solidity >0.5.0 <0.9.0;
contract chai{
    struct memo{
        string Name;
        string description;
        uint timestamp;
        address from;
    }
    memo[] public memos;
    address payable owner;
    constructor(){
        owner=payable(msg.sender);
    }
    function buychai(string memory name, string memory message) public payable{
        require(msg.value>0,"please pay greater than 0 other");
        owner.transfer(msg.value);
        memos.push(memo(name,message,block.timestamp,msg.sender));
    }

    function getMemos() public view returns(memo[] memory){
        return memos; 
    }
    
}