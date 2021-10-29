import { Component, OnInit } from '@angular/core';
import { PositionService } from '.././data/position.service';
import { Position } from '../data/position';

//Assignment 6 Additions
import { Router } from '@angular/router';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {
  //Data members
  positions: Position[];
  getPositionSub;
  loadingError: boolean = false;

  //Functions
  constructor(private p: PositionService, private router: Router) { }

  ngOnInit() {
    try {
      this.getPositionSub = this.p.getPositions()
        .subscribe(
          employees => { this.positions = employees }
        );
    } catch (err) {
      this.loadingError = true;
    }
  }

  ngOnDestroy() {
    if (this.getPositionSub == null) {
      this.getPositionSub.unsubscribe();
    }
  }

  //New function for assignment 6
  routePosition(id: string) {
    this.router.navigate(['/position/', id]);
  }
}
