// SPDX-License-Identifier: MIT

pragma solidity ^0.8.12;
contract SalaryDistribution {
    address public owner;
    mapping(address => uint256) public salaries;
    address[] public employees;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function.");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addEmployee(address employeeAddress, uint256 salary) public onlyOwner {
        employees.push(employeeAddress);
        salaries[employeeAddress] = salary;
    }

    function removeEmployee(address employeeAddress) public onlyOwner {
        for (uint256 i = 0; i < employees.length; i++) {
            if (employees[i] == employeeAddress) {
                delete employees[i];
                delete salaries[employeeAddress];
                break;
            }
        }
    }

    function updateSalary(address employeeAddress, uint256 newSalary) public onlyOwner {
        require(salaries[employeeAddress] > 0, "The specified address is not an employee.");
        salaries[employeeAddress] = newSalary;
    }

    function payEmployees() public onlyOwner {
        uint256 totalSalaries = getTotalSalaries();
        require(address(this).balance >= totalSalaries, "Insufficient contract balance to pay employees.");

        for (uint256 i = 0; i < employees.length; i++) {
            address payable employeeAddress = payable(employees[i]);
            uint256 salary = salaries[employeeAddress];
            employeeAddress.transfer(salary);
        }
    }

    function getTotalSalaries() public view onlyOwner returns (uint256 totalSalaries) {
        for (uint256 i = 0; i < employees.length; i++) {
            address employeeAddress = employees[i];
            totalSalaries += salaries[employeeAddress];
        }
    }

    receive() external payable{}
}