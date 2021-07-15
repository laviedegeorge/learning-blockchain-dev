// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract AdvanceStorage {
    uint256[] ids;

    function addIds(uint256 _id) public returns (bool) {
        ids.push(_id);
        return true;
    }

    function getId(uint256 _index) public view returns (uint256) {
        return ids[_index];
    }

    function getAllIds() public view returns (uint256[] memory) {
        return ids;
    }
}
