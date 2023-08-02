import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersFantaComponent } from './players-fanta.component';

describe('PlayersFantaComponent', () => {
  let component: PlayersFantaComponent;
  let fixture: ComponentFixture<PlayersFantaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayersFantaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayersFantaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
