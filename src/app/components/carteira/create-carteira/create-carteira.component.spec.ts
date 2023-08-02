import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCarteiraComponent } from './create-carteira.component';

describe('CreateCarteiraComponent', () => {
  let component: CreateCarteiraComponent;
  let fixture: ComponentFixture<CreateCarteiraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCarteiraComponent]
    });
    fixture = TestBed.createComponent(CreateCarteiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
