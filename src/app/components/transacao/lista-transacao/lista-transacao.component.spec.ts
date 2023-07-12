import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTransacaoComponent } from './lista-transacao.component';

describe('ListaTransacaoComponent', () => {
  let component: ListaTransacaoComponent;
  let fixture: ComponentFixture<ListaTransacaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaTransacaoComponent]
    });
    fixture = TestBed.createComponent(ListaTransacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
