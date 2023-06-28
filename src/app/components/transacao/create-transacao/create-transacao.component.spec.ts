import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTransacaoComponent } from './create-transacao.component';

describe('CreateTransacaoComponent', () => {
  let component: CreateTransacaoComponent;
  let fixture: ComponentFixture<CreateTransacaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTransacaoComponent]
    });
    fixture = TestBed.createComponent(CreateTransacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
