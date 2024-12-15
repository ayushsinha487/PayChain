const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "employeeAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "salary",
				"type": "uint256"
			}
		],
		"name": "addEmployee",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "payEmployees",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "employeeAddress",
				"type": "address"
			}
		],
		"name": "removeEmployee",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "initialFunding",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "employeeAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "newSalary",
				"type": "uint256"
			}
		],
		"name": "updateSalary",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "employees",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTotalSalaries",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "totalSalaries",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "salaries",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const contractAddress = "0x11aE6A63F94A123EC22B8439fdd3d5E5C908718f";

let web3;
let contract;

window.onload = async () => {
	if (window.ethereum) {
		web3 = new Web3(window.ethereum); // No need to import
        await ethereum.request({ method: "eth_requestAccounts" });
        contract = new web3.eth.Contract(contractABI, contractAddress);
        document.getElementById("status").innerText = "Connected to Ethereum!";
    } else {
		document.getElementById("status").innerText = "Please install MetaMask!";
    }
};


// Add employee
// Add an employee
async function addEmployee() {
    const address = document.getElementById("employeeAddress").value;
	const salary = parseFloat(document.getElementById("employeeSalary").value);

    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.addEmployee(address, salary).send({ from: accounts[0] });
        document.getElementById("status").innerText = "Employee added successfully!";
    } catch (error) {
        console.error("Error adding employee:", error);
        document.getElementById("status").innerText = "Failed to add employee.";
    }
}

// Update an employee's salary
async function updateEmployeeSalary() {
    const address = document.getElementById("updateEmployeeAddress").value;
    const newSalary = document.getElementById("newEmployeeSalary").value;

    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.updateSalary(address, newSalary).send({ from: accounts[0] });
        document.getElementById("status").innerText = "Salary updated successfully!";
    } catch (error) {
        console.error("Error updating salary:", error);
        document.getElementById("status").innerText = "Failed to update salary.";
    }
}

// Remove an employee
async function removeEmployee() {
    const address = document.getElementById("removeEmployeeAddress").value;

    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.removeEmployee(address).send({ from: accounts[0] });
        document.getElementById("status").innerText = "Employee removed successfully!";
    } catch (error) {
        console.error("Error removing employee:", error);
        document.getElementById("status").innerText = "Failed to remove employee.";
    }
}

// Pay all employees and clear employee records
async function payEmployees() {
    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.payEmployees().send({ from: accounts[0] });

        document.getElementById("status").innerText = "Salaries paid successfully!";
        document.getElementById("employeeList").innerHTML = ""; // Clear the employee list on UI
    } catch (error) {
        console.error("Error paying employees:", error);
        document.getElementById("status").innerText = "Failed to pay employees.";
    }
}



async function checkOwner() {
    try {
        const owner = await contract.methods.owner().call();
        console.log("Contract Owner:", owner);
        const accounts = await web3.eth.getAccounts();
        console.log("Connected Account:", accounts[0]);
        if (owner === accounts[0]) {
            console.log("You are the owner!");
        } else {
            console.log("You are not the owner!");
        }
    } catch (error) {
        console.error("Error fetching owner:", error);
    }
}
