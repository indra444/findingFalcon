import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { ResultComponent } from './result.component';
import { FindResult } from '../shared/models/find.response.model';

describe('ResultComponent on success', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;
  let locationStub: Partial<Location>;

  locationStub = {
    getState() {
      let result: FindResult = {
        status: 'success',
        planet_name: 'abc',
        time_taken: 12,
      };

      return result;
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultComponent],
      providers: [{ provide: Location, useValue: locationStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOninit', () => {
    component.ngOnInit();

    expect(component.isRouteData).toBeTrue();
    expect(component.isSuccess).toBeTrue();
    expect(component.planetName).toBe('abc');
    expect(component.timeTaken).toBe(12);
  });
});

describe('ResultComponent on failure', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;
  let locationStub: Partial<Location>;

  locationStub = {
    getState() {
      let result: FindResult = {
        status: 'failed',
        planet_name: '',
        time_taken: -54,
      };

      return result;
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultComponent],
      providers: [{ provide: Location, useValue: locationStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOninit', () => {
    component.ngOnInit();

    expect(component.isRouteData).toBeTrue();
    expect(component.isSuccess).toBeFalse();
  });
});
