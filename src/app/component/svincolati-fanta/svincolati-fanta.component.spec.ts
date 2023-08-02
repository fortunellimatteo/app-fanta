import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvincolatiFantaComponent } from './svincolati-fanta.component';

describe('SvincolatiFantaComponent', () => {
  let component: SvincolatiFantaComponent;
  let fixture: ComponentFixture<SvincolatiFantaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvincolatiFantaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvincolatiFantaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
