import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryFantaComponent } from './summary-fanta.component';

describe('SummaryFantaComponent', () => {
  let component: SummaryFantaComponent;
  let fixture: ComponentFixture<SummaryFantaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryFantaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryFantaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
