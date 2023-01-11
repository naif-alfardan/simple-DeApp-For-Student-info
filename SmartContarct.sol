// SPDX-License-Identifier:UNLICENSED
pragma solidity ^0.8.4;

contract Student {

    event NewStudent(string name);

    // struct Student {
    //     address student;
    //     string name;
    //     uint256 id;
    // }

    // Student[] students;
    string std;


    function setStudentsInfo(string memory _name) public {
        // students.push(Student(msg.sender, _name, _id));
        std=_name;
        emit  NewStudent( _name);

    }

    function getStudentInfo() public view returns (string memory){
        return std;
    }
}