import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { UserSelection } from '../planets/planets.component';
import { FalconService } from '../shared/falcon.service';
import { FindRequest } from '../shared/models/find.request.model';
import { FindResult } from '../shared/models/find.response.model';
import { Planet } from '../shared/models/planet.model';
import { Vehicle } from '../shared/models/vehicle.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  planets: Planet[] = [];
  vehicles: Vehicle[] = [];

  userSelections: UserSelection[] = [];
  availablePlanets: Planet[] = [];
  availableVehicles: Vehicle[] = [];
  timeTaken: number = 0;
  resetChild: boolean = false;
  currentDestination: number = -1;
  resultsLoading: boolean = false;

  constructor(private falconService: FalconService, private router: Router) {
    falconService.getPlanets().subscribe((response) => {
      this.planets = response;
      this.availablePlanets = [...this.planets];
    });

    falconService.getVehicles().subscribe((response) => {
      this.vehicles = response;
      this.availableVehicles = [...this.vehicles];
    });

    this.currentDestination++;
  }

  ngOnInit(): void {}

  onUserSelection(userSelection: UserSelection) {
    let index = this.userSelections.findIndex(
      (x) => x.destination == userSelection.destination
    );

    if (index >= 0) {
      this.userSelections[index] = userSelection;
    } else {
      this.userSelections.push(userSelection);
    }

    this.currentDestination++;
    this.updateAvailableVehicles(userSelection);
    this.updateAvailablePlanets(userSelection);
    this.updateTimeTaken();
  }

  disableSelection(destinationIndex: number) {
    let destinationSelection = this.userSelections.filter(
      (x) => x.destination == destinationIndex
    );
    if (destinationSelection?.length > 0) {
      return true;
    }

    return false;
  }

  updateAvailableVehicles(userSelection: UserSelection) {
    this.availableVehicles = this.availableVehicles.map((x) => {
      if (x.name === userSelection.vehicle) {
        return {
          name: x.name,
          total_no: x.total_no - 1,
          max_distance: x.max_distance,
          speed: x.speed,
        };
      }
      return x;
    });
  }

  updateAvailablePlanets(userSelection: UserSelection) {
    this.availablePlanets = this.availablePlanets.filter(
      (x) => x.name !== userSelection.planet
    );
  }

  updateTimeTaken() {
    this.userSelections.forEach((x) => {
      let planet = this.planets.filter((p) => p.name === x.planet)[0];
      let vehicle = this.vehicles.filter((v) => v.name === x.vehicle)[0];

      this.timeTaken += planet.distance / vehicle.speed;
    });
  }

  resetSelection() {
    this.userSelections = [];
    this.availablePlanets = [...this.planets];
    this.availableVehicles = [...this.vehicles];
    this.timeTaken = 0;
    this.currentDestination = 0;
    this.resetChild = true;
  }

  findFalcon() {
    this.resultsLoading = true;
    let request: FindRequest = {
      token: '',
      planet_names: this.userSelections.map((x) => x.planet),
      vehicle_names: this.userSelections.map((x) => x.vehicle),
    };

    this.falconService
      .getToken()
      .pipe(
        switchMap((value) => {
          request.token = value.token;
          return this.falconService.findFalcon(request);
        })
      )
      .subscribe((result) => {
        this.resultsLoading = false;
        const findResult = result as FindResult;
        findResult.time_taken = this.timeTaken;
        this.router.navigateByUrl('/result', { state: findResult });
      });
  }
}
