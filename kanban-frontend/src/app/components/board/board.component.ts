import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { KanbanService } from '../../services/kanban.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  boardLists: any[] = [];
  
  // El ID exacto de tu tablero
  boardId = '6add800e94d7a77722eec928'; 

  constructor(
    private kanbanService: KanbanService,
    private cdr: ChangeDetectorRef // 1. Inyectamos la herramienta para forzar el dibujo
  ) {}

  ngOnInit(): void {
    this.loadBoardData();
  }

  loadBoardData(): void {
    this.kanbanService.getListsByBoard(this.boardId).subscribe(lists => {
      this.boardLists = lists;
      
      this.cdr.detectChanges(); // 2. ¡Le ordenamos a Angular que dibuje las columnas!
      
      this.boardLists.forEach(list => {
        this.kanbanService.getCardsByList(list._id).subscribe(cards => {
          list.cards = cards; 
          
          this.cdr.detectChanges(); // 3. ¡Le ordenamos a Angular que dibuje las tarjetas!
        });
      });
    });
  }

  drop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const movedCard = event.container.data[event.currentIndex];
      const newListId = event.container.id; 
      
      const updateData = {
        listId: newListId,
        position: event.currentIndex
      };

      this.kanbanService.updateCard(movedCard._id, updateData).subscribe(res => {
        console.log('Tarjeta guardada en base de datos:', res);
      });
    }
  }
}