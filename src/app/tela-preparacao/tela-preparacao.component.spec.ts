import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaPreparacaoComponent } from './tela-preparacao.component';

describe('TelaPreparacaoComponent', () => {
  let component: TelaPreparacaoComponent;
  let fixture: ComponentFixture<TelaPreparacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TelaPreparacaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelaPreparacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
