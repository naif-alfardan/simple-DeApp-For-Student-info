// SPDX-License-Identifier:UNLICENSED
pragma solidity ^0.8.4;

contract Student {
    uint256 totalwaves;

    event NewStudent(address indexed student, string name, uint256 id);

    struct Student {
        address student;
        string name;
        uint256 id;
    }

    Student[]  students;
    string std;

    function setStudentsInfo(string memory _name, uint256 _id) public {
        // students.push(Student(msg.sender, _name, _id));
        std=_name;
        emit  NewStudent(msg.sender, _name, _id);
    }

    function getStudentInfo() public view returns (Student[] memory){
        return students;
    }
}