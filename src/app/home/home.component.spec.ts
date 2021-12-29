import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { UserSelection } from '../planets/planets.component';
import { FindRequest } from '../shared/models/find.request.model';
import { FindResponse } from '../shared/models/find.response.model';
import { Planet } from '../shared/models/planet.model';
import { TokenResponse } from '../shared/models/token.response.model';
import { Vehicle } from '../shared/models/vehicle.model';
import { FalconService } from '../shared/services/falcon.service';
import { InterceptorMessageService } from '../shared/services/InterceptorMessageService';
import { HomeComponent } from './home.component';

let falconServiceStub: Partial<FalconService>;

class MockRouter {
  navigateByUrl = () => {
    return {
      then: () => {},
    };
  };
}

class MockMessageService {
  isError = new BehaviorSubject<any>(null);
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let messageService = new MockMessageService();

  beforeEach(async () => {
    falconServiceStub = {
      getPlanets() {
        let p: Planet[] = [
          { name: 'Pluto', distance: 300 },
          { name: 'Jupiter', distance: 250 },
        ];
        return of(p);
      },
      getVehicles() {
        let v: Vehicle[] = [
          { name: 'tram', max_distance: 200, speed: 20, total_no: 5 },
          { name: 'bus', max_distance: 300, speed: 50, total_no: 2 },
        ];
        return of(v);
      },
      getToken() {
        let token: TokenResponse = { token: 'tokenString' };
        return of(token);
      },
      findFalcon(requestBody: FindRequest) {
        let response: FindResponse = { status: 'failure', planet_name: '' };
        return of(response);
      },
    };

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: FalconService, useValue: falconServiceStub },
        {
          provide: Router,
          useClass: MockRouter,
        },
        {
          provide: InterceptorMessageService,
          useValue: messageService,
        },
      ],
    }).compileComponents();

    falconServiceStub = TestBed.inject(FalconService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onUserSelection', () => {
    component.currentDestination = 1;
    component.userSelections = [
      { destination: 1, planet: 'Jupiter', vehicle: 'tram' },
    ];
    component.planets = [
      { name: 'Pluto', distance: 300 },
      { name: 'Jupiter', distance: 250 },
    ];
    component.vehicles = [
      { name: 'tram', max_distance: 200, speed: 20, total_no: 5 },
      { name: 'bus', max_distance: 300, speed: 50, total_no: 2 },
    ];

    let userSelection: UserSelection = {
      planet: 'Pluto',
      vehicle: 'bus',
      destination: 2,
    };
    component.onUserSelection(userSelection);

    expect(component.userSelections.length).toEqual(2);

    expect(component.availablePlanets.length).toEqual(
      component.planets.length - 1
    );
    expect(component.availableVehicles.length).toEqual(
      component.vehicles.length
    );
    expect(
      component.availableVehicles.filter(
        (x) => x.name == userSelection.vehicle
      )[0].total_no
    ).toEqual(
      component.vehicles.filter((x) => x.name == userSelection.vehicle)[0]
        .total_no - 1
    );

    expect(component.timeTaken).toEqual(300 / 50 + 250 / 20);
  });

  it('reset selection', () => {
    component.resetSelection();

    expect(component.userSelections).toEqual([]);
    expect(component.availablePlanets.length).toEqual(component.planets.length);
    expect(component.availablePlanets.length).toEqual(
      component.availableVehicles.length
    );
    expect(component.timeTaken).toEqual(0);
    expect(component.currentDestination).toEqual(0);
    expect(component.resetChild).toBeTrue();
  });

  it('should call Router.navigateByUrl', inject([Router], (router: Router) => {
    const spy = spyOn(router, 'navigateByUrl');

    component.findFalcon();

    expect(router.navigateByUrl).toHaveBeenCalled();
  }));

  it('when error occurs', () => {
    messageService.isError.next(true);

    expect(component.errorMessage).toBeTrue();
    expect(component.resultsLoading).toBeFalse();
  });
});
