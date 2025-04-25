import { Component, OnInit } from '@angular/core';
import { ClFeedback } from '../modelo/ClFeedback';
import { FeedbackService } from '../feedback-service.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.page.html',
  styleUrls: ['./feedback-list.page.scss'],
})
export class FeedbackListPage implements OnInit {
  feedbackList: ClFeedback[] = [];
  feedbackFiltrados: ClFeedback[] = []; // Feedback filtrados
  searchTerm: string = ''; // Término de búsqueda

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit() {
    // Obtiene la lista de retroalimentación
    this.feedbackService.getFeedback().subscribe((feedback: ClFeedback[]) => {
      this.feedbackList = feedback;
      this.feedbackFiltrados = this.feedbackList; // Inicializa con todos los feedbacks
    });
  }

  // Función para filtrar la retroalimentación según el término de búsqueda
  filtrarFeedback() {
    const term = this.searchTerm.toLowerCase();
    this.feedbackFiltrados = this.feedbackList.filter(fb =>
      fb.nombreCompleto.toLowerCase().includes(term) || 
      fb.comentario.toLowerCase().includes(term)
    );
  }
}
