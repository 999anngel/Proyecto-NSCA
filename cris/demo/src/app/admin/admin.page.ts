import { Component, OnInit } from '@angular/core';
import { SessionServiceService } from '../sesion/session-service.service';
import { ClSesion } from '../sesion/modelo/ClSesion';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  sesion: ClSesion | null = null;  // Declare the 'sesion' property

  constructor(private sessionService: SessionServiceService) {}

  ngOnInit() {
    this.loadSesion();  // Load session data when the component initializes
  }

  loadSesion() {
    // Assuming sessionService has a method to retrieve the current session
    this.sessionService.getSession('1').subscribe((sesion: ClSesion) => {
      this.sesion = sesion;
    }, error => {
      console.error('Error loading session:', error);
    });
  }
}
