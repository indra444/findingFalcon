import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FindResult } from '../shared/models/find.response.model';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  isSuccess: boolean = false;
  planetName: string = '';
  timeTaken: number = 0;
  isRouteData: boolean = false;

  constructor(private location: Location) {}

  ngOnInit(): void {
    const routeData = this.location.getState() as FindResult;
    if (routeData?.status) {
      this.isRouteData = true;
      this.isSuccess =
        routeData.status.toLowerCase() === 'success' ? true : false;
      this.planetName = routeData.planet_name;
      this.timeTaken = routeData.time_taken;
    }
  }
}
