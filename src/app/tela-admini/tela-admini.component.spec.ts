import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaAdminiComponent } from './tela-admini.component';

describe('TelaAdminiComponent', () => {
  let component: TelaAdminiComponent;
  let fixture: ComponentFixture<TelaAdminiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TelaAdminiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelaAdminiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
