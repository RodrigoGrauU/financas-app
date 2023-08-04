import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumoMesComponent } from './resumo-mes.component';

describe('ResumoMesComponent', () => {
  let component: ResumoMesComponent;
  let fixture: ComponentFixture<ResumoMesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResumoMesComponent]
    });
    fixture = TestBed.createComponent(ResumoMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
