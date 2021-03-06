import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ManualLogComponent } from './manual-log.component';

describe('ManualLogComponent', () => {
  let component: ManualLogComponent;
  let fixture: ComponentFixture<ManualLogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
