import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '.././data/employee.service';
import { Employee } from '../data/employee';

//assignment 6 additions
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  //Data members
  employees: Employee[];
  getEmployeesSub;
  loadingError: boolean = false;
  //Additional data member for assignment 6
  filteredEmployees: Employee[];

  //Methods
  constructor(private e: EmployeeService, private router: Router) { }

  ngOnInit() {
    try {
      this.getEmployeesSub = this.e.getEmployees()
        .subscribe(
          employees => {
            this.employees = employees;
            this.filteredEmployees = employees;
          }
        );
    } catch (err) {
      this.loadingError = true;
    }
  }

  ngOnDestroy() {
    if (this.getEmployeesSub == null) {
      this.getEmployeesSub.unsubscribe();
    }
  }

  //Assignment 6 Addition
  routeEmployee(id: string) {
    this.router.navigate(['/employee/', id]);
  }

  onEmployeeSearchKeyUP(event: any) {
    this.filteredEmployees = this.employees.filter((e) => {
      return e.FirstName.toLowerCase().includes(event.target.value.toLowerCase()) ||
        e.LastName.toLowerCase().includes(event.target.value.toLowerCase()) ||
        e.Position.PositionName.toLowerCase().includes(event.target.value.toLowerCase());
    });
  }
}
