import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Vehicle } from '../shared/models/vehicle.model';

import { PlanetsComponent } from './planets.component';

describe('PlanetsComponent', () => {
  let component: PlanetsComponent;
  let fixture: ComponentFixture<PlanetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanetsComponent],
      imports: [NgbModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onSelection', () => {
    component.model.planet = 'abc';
    component.model.vehicle = 'def';
    spyOn(component.onUserSelectionEvent, 'emit');
    component.onSelection();

    expect(component.model.destination).toEqual(component.destination);
    expect(component.onUserSelectionEvent.emit).toHaveBeenCalled();
  });

  it('onReset', () => {
    component.model.planet = 'abc';
    component.model.vehicle = 'def';
    component.model.destination = 3;

    component.onReset();

    expect(component.model.destination).toEqual(-1);
    expect(component.model.vehicle).toEqual('');
    expect(component.model.planet).toEqual('');
  });

  it('disableOption 1', () => {
    let v: Vehicle = { name: 'abc', max_distance: 12, speed: 2, total_no: 0 };

    let result = component.disableOption(v);

    expect(result).toBeTrue();
  });

  it('disableOption 2', () => {
    let v: Vehicle = { name: 'abc', max_distance: 12, speed: 2, total_no: 12 };
    component.model.planet = '';

    let result = component.disableOption(v);

    expect(result).toBeTrue();
  });

  it('disableOption3 ', () => {
    let v: Vehicle = {
      name: 'abc',
      max_distance: 12,
      speed: 2,
      total_no: 12,
    };

    component.model.planet = 'abc';
    component.planets = [{ name: 'abc', distance: 15 }];

    let result = component.disableOption(v);

    expect(result).toBeTrue();
  });

  it('ngOnChanges onReset true', () => {
    component.reset = true;
    component.model.planet = 'abc';
    component.model.vehicle = 'def';
    component.model.destination = 2;

    component.ngOnChanges();

    expect(component.model.destination).toBe(-1);
    expect(component.model.planet).toBe('');
    expect(component.model.vehicle).toBe('');
  });

  it('ngOnChanges onReset false ', () => {
    component.reset = false;
    component.model.planet = 'abc';
    component.model.vehicle = 'def';
    component.model.destination = 2;

    component.ngOnChanges();

    expect(component.model.destination).toBe(2);
    expect(component.model.planet).toBe('abc');
    expect(component.model.vehicle).toBe('def');
  });
});
