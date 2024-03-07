import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaImportaExtratoComponent } from './lista-importa-extrato.component';

describe('ListaImportaExtratoComponent', () => {
  let component: ListaImportaExtratoComponent;
  let fixture: ComponentFixture<ListaImportaExtratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaImportaExtratoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaImportaExtratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
