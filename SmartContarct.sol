// SPDX-License-Identifier:UNLICENSED
pragma solidity ^0.8.4;

contract Student {

    event NewStudent(string name);

    string std;


    function setStudentsInfo(string memory _name) public {
        std=_name;
        emit  NewStudent( _name);

    }

    function getStudentInfo() public view returns (string memory){
        return std;
    }
}