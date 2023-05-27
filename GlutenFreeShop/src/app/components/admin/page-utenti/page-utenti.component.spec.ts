import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageUtentiComponent } from './page-utenti.component';

describe('PageUtentiComponent', () => {
  let component: PageUtentiComponent;
  let fixture: ComponentFixture<PageUtentiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageUtentiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageUtentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
