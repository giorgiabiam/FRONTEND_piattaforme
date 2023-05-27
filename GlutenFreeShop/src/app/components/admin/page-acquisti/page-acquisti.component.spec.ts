import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAcquistiComponent } from './page-acquisti.component';

describe('PageAcquistiComponent', () => {
  let component: PageAcquistiComponent;
  let fixture: ComponentFixture<PageAcquistiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageAcquistiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageAcquistiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
