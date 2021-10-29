import { Component, OnInit } from '@angular/core';
import { EmployeeRaw } from '../data/EmployeeRaw';
import { Position } from '../data/position';
import { EmployeeService } from '../data/employee.service';
import { ActivatedRoute } from '@angular/router';
import { PositionService } from '../data/position.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  paramSubscription;
  employeeSubscription;
  getPositionsSubcription;
  saveEmployeeSubscription;
  employee: EmployeeRaw;
  positions: Position[];
  successMessage: boolean = false;
  failMessage: boolean = false;

  constructor(private e: EmployeeService, private a: ActivatedRoute, private p: PositionService) { }

  ngOnInit() {
    let _id = "";
    this.paramSubscription = this.a.params.subscribe((params) => {
      _id = params['_id'];
    });
    this.employeeSubscription = this.e.getEmployee(_id).subscribe((employee) => {
      console.log(employee[0]);
      this.employee = employee[0];
    });
    this.getPositionsSubcription = this.p.getPositions().subscribe((positions) => {
      this.positions = positions;
    })
  }

  ngOnSubmit(f: NgForm) {
    this.saveEmployeeSubscription = this.e.saveEmployees(this.employee).subscribe(() => {
      this.successMessage = true;
      setTimeout(() => {
        this.successMessage = false;
      }, 2500),
        () => {
          this.failMessage = true;
          setTimeout(() => {
            this.failMessage = false;
          }, 2500)
        }
    });
  }

  ngOnDestroy() {
    if (this.paramSubscription)
      this.paramSubscription.unsubscribe();
    if (this.employeeSubscription)
      this.employeeSubscription.unsubscribe();
    if (this.getPositionsSubcription)
      this.getPositionsSubcription.unsubscribe();
    if (this.saveEmployeeSubscription)
      this.saveEmployeeSubscription.unsubscribe();
  }

}
