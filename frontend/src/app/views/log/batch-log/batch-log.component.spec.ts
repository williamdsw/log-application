import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchLogComponent } from './batch-log.component';

describe('BatchLogComponent', () => {
  let component: BatchLogComponent;
  let fixture: ComponentFixture<BatchLogComponent>;

  beforeEach(async(() => {
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
