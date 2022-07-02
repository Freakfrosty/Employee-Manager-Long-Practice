const Employee = require ('./employee');

class Manager extends Employee {
    constructor(name, salary, title, manager, ...employee) {
        super(name, salary, title, manager);
        this.employee = employee;
    }

    addEmployee(employee) {
        this.employee.push(employee)
    }

    _totalSubSalary(employee){
        let sum = 0;
        for(let i = 0; i < employee.length; i++){
            let emp = employee[i]
            if(emp instanceof Manager){
                sum += emp.salary;
                sum += emp._totalSubSalary(emp.employee);
            }
            else if(emp instanceof Employee){
                sum += emp.salary;
            }
        }
        return sum;
    }

    calculateBonus(multiplier){
        // debugger
        let sum = this._totalSubSalary(this.employee);
        let bonus = (this.salary + sum) * multiplier;
        return bonus;
    }
}


const splinter = new Manager('Splinter', 100000, 'Sensei');
const leo = new Manager('Leonardo', 90000, 'Ninja', splinter);
const raph = new Manager('Raphael', 90000, 'Ninja', leo);
const mikey = new Employee('Michelangelo', 85000, 'Grasshopper', raph);
const donnie = new Employee('Donatello', 85000, 'Grasshopper', raph);


console.log(splinter.calculateBonus(0.05)); // => 22500
console.log(leo.calculateBonus(0.05)); // => 17500
console.log(raph.calculateBonus(0.05)); // => 13000
