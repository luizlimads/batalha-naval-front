import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DressUpAvatarComponent } from './dress-up-avatar.component';

describe('DressUpAvatarComponent', () => {
  let component: DressUpAvatarComponent;
  let fixture: ComponentFixture<DressUpAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DressUpAvatarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DressUpAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
