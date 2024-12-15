# PayChain

## Project Overview
The Decentralized Salary Management System is a blockchain-powered solution that leverages Ethereum-compatible smart contracts to securely and transparently manage employee salaries. The system allows employers to add, update, remove employees, and pay salaries using smart contract functions. By utilizing blockchain technology, the platform ensures data privacy, security, and efficient payroll management.

## Features
- **Add Employee:** Add a new employee and assign a salary.
- **Remove Employee:** Remove an employee and their associated salary from the system.
- **Update Salary:** Update the salary of an existing employee.
- **Pay Employees:** Pay salaries to all employees directly from the smart contract, ensuring transparency and security.

## Contract Details

- **Contract Address**: `0x11aE6A63F94A123EC22B8439fdd3d5E5C908718f`
- **Network**: Mantle Sepolia Testnet
## Deployment

- **Contract Address**: [View on Explorer](https://explorer.sepolia.mantle.xyz/address/0x11aE6A63F94A123EC22B8439fdd3d5E5C908718f)
- **Coin Used**: MNT


## Smart Contract
The smart contract `SalaryDistribution` enables the following functionality:

- **Add Employee:** The owner can add an employee’s address and their salary.
- **Remove Employee:** The owner can remove an employee from the list and delete their salary.
- **Update Salary:** The owner can update the salary of any existing employee.
- **Pay Employees:** The owner can pay all employees their respective salaries, as long as the contract balance is sufficient.
- **Get Total Salaries:** The contract calculates the total salaries of all employees.
