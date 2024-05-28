import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaPartidaComponent } from './tela-partida.component';

describe('TelaPartidaComponent', () => {
  let component: TelaPartidaComponent;
  let fixture: ComponentFixture<TelaPartidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TelaPartidaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelaPartidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
