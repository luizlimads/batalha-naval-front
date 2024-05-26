import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaPreComponent } from './tela-pre.component';

describe('TelaPreComponent', () => {
  let component: TelaPreComponent;
  let fixture: ComponentFixture<TelaPreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TelaPreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelaPreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
