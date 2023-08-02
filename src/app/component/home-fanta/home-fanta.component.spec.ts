import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFantaComponent } from './home-fanta.component';

describe('HomeFantaComponent', () => {
  let component: HomeFantaComponent;
  let fixture: ComponentFixture<HomeFantaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeFantaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeFantaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
