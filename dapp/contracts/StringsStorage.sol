// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract StringsStorage {

    mapping(address => string[]) public strings;
    mapping(address => uint) public stringCount;
    event StringsAdded(address owner, string[] v, uint count);

    function add(string memory v) public {
        string[] memory vArr = new string[](1);
        vArr[0] = v;
        _add(vArr);
    }

    function addMany(string[] memory v) public {
        _add(v);
    }

    function _add(string[] memory v) private {
        stringCount[msg.sender] += v.length;
        for (uint i = 0; i < v.length; i++) {
            strings[msg.sender].push(v[i]);
        }
        emit StringsAdded(msg.sender, v, stringCount[msg.sender]);
    }

    function get() public view returns (string[] memory) {
        uint c = stringCount[msg.sender];
        string[] memory res = new string[](c);
        for (uint i = 0; i < c; i++) {
            res[i] = strings[msg.sender][i];
        }
        return res;
    }    
}
