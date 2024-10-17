import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEligiblityComponent } from './add-eligiblity.component';

describe('AddEligiblityComponent', () => {
  let component: AddEligiblityComponent;
  let fixture: ComponentFixture<AddEligiblityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEligiblityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEligiblityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
