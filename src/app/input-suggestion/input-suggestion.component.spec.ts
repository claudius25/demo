import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSuggestionComponent } from './input-suggestion.component';

describe('InputSuggestionComponent', () => {
  let component: InputSuggestionComponent;
  let fixture: ComponentFixture<InputSuggestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputSuggestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
