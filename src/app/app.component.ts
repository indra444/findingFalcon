import { Component } from '@angular/core';
import { UserSelection } from './planets/planets.component';
import { FalconService } from './shared/falcon.service';
import { Planet } from './shared/models/planet.model';
import { Vehicle } from './shared/models/vehicle.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'findingFalcon';

  planets: Planet[] = [];
  vehicles: Vehicle[] = [];

  userSelections: UserSelection[] = [];
  availablePlanets: Planet[] = [];
  availableVehicles: Vehicle[] = [];
  timeTaken: number = 0;
  resetChild: boolean = false;
  currentDestination: number = -1;

  constructor(private falconService: FalconService) {
    falconService.getPlanets().subscribe((response) => {
      this.planets = response;
      this.availablePlanets = response;
    });

    falconService.getVehicles().subscribe((response) => {
      this.vehicles = response;
      this.availableVehicles = response;
    });

    this.currentDestination++;
  }

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
    this.availableVehicles
      .filter((x) => x.name === userSelection.vehicle)
      .map((x) => {
        return --x.total_no;
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

  resetSelection($event: boolean) {
    this.resetChild = true;
    this.userSelections = [];
    this.availablePlanets = this.planets;
    this.availableVehicles = this.vehicles;
    this.timeTaken = 0;
  }
}
