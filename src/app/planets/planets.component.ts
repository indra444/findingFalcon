import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  merge,
  Observable,
  OperatorFunction,
  Subject,
} from 'rxjs';
import { Planet } from '../shared/models/planet.model';
import { Vehicle } from '../shared/models/vehicle.model';

export interface UserSelection {
  destination: number;
  planet: string;
  vehicle: string;
}

@Component({
  selector: 'planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss'],
})
export class PlanetsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() public planets: Planet[] = [];
  @Input() public vehicles: Vehicle[] = [];
  @Input() public destination: number = 0;

  model: UserSelection = {
    destination: -1,
    planet: '',
    vehicle: '',
  };

  @Output() onUserSelectionEvent: EventEmitter<UserSelection> =
    new EventEmitter();

  @ViewChild('instance', { static: true })
  instance!: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>
  ) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.click$.pipe(
      filter(() => !this.instance.isPopupOpen())
    );
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term) =>
        (term === ''
          ? this.planets.map((x) => x.name)
          : this.planets
              .map((x) => x.name)
              .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
        ).slice(0, 10)
      )
    );
  };

  onSelection() {
    this.model.destination = this.destination;
    if (this.model.planet != '' && this.model.vehicle != '') {
      this.onUserSelectionEvent.emit(this.model);
    }
  }
}
