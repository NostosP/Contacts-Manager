import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyContactPage } from './modify-contact.page';

describe('ModifyContactPage', () => {
  let component: ModifyContactPage;
  let fixture: ComponentFixture<ModifyContactPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyContactPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyContactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
