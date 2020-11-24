import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BatchLogComponent } from './batch-log.component';

describe('BatchLogComponent', () => {
  let component: BatchLogComponent;
  let fixture: ComponentFixture<BatchLogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
