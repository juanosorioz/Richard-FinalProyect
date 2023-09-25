import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAlquilerComponent } from './lista-alquiler.component';

describe('ListaAlquilerComponent', () => {
  let component: ListaAlquilerComponent;
  let fixture: ComponentFixture<ListaAlquilerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAlquilerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAlquilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
