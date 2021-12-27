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

  constructor(private falconService: FalconService) {
    falconService.getPlanets().subscribe((response) => {
      this.planets = response;
    });

    falconService.getVehicles().subscribe((response) => {
      this.vehicles = response;
    });
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

  // getAvailableVehicles() {
  //   let availableVehicles: Vehicle[] = [];
  //   this.vehicles.forEach((x) => {
  //     let clonedVehicle = Object.assign({}, x);
  //     clonedVehicle.total_no -= this.userSelections.filter(
  //       (y) => y.vehicle == x.name
  //     )?.length;
  //     availableVehicles.push(clonedVehicle);
  //   });

  //   return availableVehicles;
  // }
}
