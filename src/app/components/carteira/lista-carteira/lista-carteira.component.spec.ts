import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCarteiraComponent } from './lista-carteira.component';

describe('ListaCarteiraComponent', () => {
  let component: ListaCarteiraComponent;
  let fixture: ComponentFixture<ListaCarteiraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaCarteiraComponent]
    });
    fixture = TestBed.createComponent(ListaCarteiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
