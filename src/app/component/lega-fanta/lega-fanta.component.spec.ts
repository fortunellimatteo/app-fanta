import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegaFantaComponent } from './lega-fanta.component';

describe('LegaFantaComponent', () => {
  let component: LegaFantaComponent;
  let fixture: ComponentFixture<LegaFantaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegaFantaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegaFantaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
