// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract SimpleStorage {
    string public data;
    
    function setData(string memory _data) public {
        data = _data;
    }
    
    function getData() public view returns(string memory) {
        return data;
    }
}
