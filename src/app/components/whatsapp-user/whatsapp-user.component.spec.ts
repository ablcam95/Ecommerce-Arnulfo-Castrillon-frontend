import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappUserComponent } from './whatsapp-user.component';

describe('WhatsappUserComponent', () => {
  let component: WhatsappUserComponent;
  let fixture: ComponentFixture<WhatsappUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WhatsappUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatsappUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
