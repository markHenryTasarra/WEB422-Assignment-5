import { Component, OnInit, OnDestroy } from '@angular/core';

//Assignment 6 additions
import { ActivatedRoute } from '@angular/router'
import { PositionService } from '../data/position.service';
import { Position } from '../data/position';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  paramSubscription;
  positionSubscription;
  savePositionSubscription;
  position: Position;
  successMessage: boolean = false;
  failMessage: boolean = false;

  constructor(private a: ActivatedRoute, private p: PositionService) { }

  ngOnInit() {
    let _id = "";
    this.paramSubscription = this.a.params.subscribe((params) => {
      _id = params['_id'];
    });
    this.positionSubscription = this.p.getPosition(_id).subscribe((position) => {
      this.position = position[0];
    })
  }

  onSubmit(f: NgForm) {
    this.savePositionSubscription = this.p.savePosition(this.position).subscribe(() => {
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
    if (this.positionSubscription)
      this.positionSubscription.unsubscribe();
    if (this.savePositionSubscription)
      this.savePositionSubscription.unsubscribe();
  }
}
