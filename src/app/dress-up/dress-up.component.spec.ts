import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DressUpComponent } from './dress-up.component';

describe('DressUpComponent', () => {
  let component: DressUpComponent;
  let fixture: ComponentFixture<DressUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DressUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DressUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
