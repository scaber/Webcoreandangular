/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MembersCardComponent } from './members-card.component';

describe('MembersCardComponent', () => {
  let component: MembersCardComponent;
  let fixture: ComponentFixture<MembersCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
