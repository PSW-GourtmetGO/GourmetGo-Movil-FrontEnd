import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OlvidoClavePage } from './olvido-clave.page';

describe('OlvidoClavePage', () => {
  let component: OlvidoClavePage;
  let fixture: ComponentFixture<OlvidoClavePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OlvidoClavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
