import { Component } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { DragulaOptions } from 'dragula';
 
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  q1 = [
    { value: 'Buy Milk', color: 'primary', selectedQuadrant: 'q1' },
    { value: 'Write new Post', color: 'primary', selectedQuadrant: 'q1'  }
  ];
  q2 = [
    { value: 'Schedule newsletter', color: 'secondary',selectedQuadrant: 'q2' },
    { value: 'Find new Ionic Academy topics', color: 'secondary',selectedQuadrant: 'q2' }
  ];
  q3 = [
    { value: 'Improve page performance', color: 'tertiary',selectedQuadrant: 'q3' },
    { value: 'Clean the house', color: 'tertiary',selectedQuadrant: 'q3' }
  ];
  q4 = [
    { value: 'Unimportant things', color: 'warning', selectedQuadrant: 'q4' },
    { value: 'Watch Netflix', color: 'warning', selectedQuadrant: 'q4' }
  ];
 
  todo = { value: '', color: '' };
  selectedQuadrant = 'q1';
 
  constructor(private dragulaService: DragulaService, private toastController: ToastController) {

    this.dragulaService.drag('bag')
    .subscribe(({ name, el, source }) => {
      el.setAttribute('color', 'danger');
    });
 
    this.dragulaService.removeModel('bag')
    .subscribe(({ source, item }) => {
      this.toastController.create({
        message: 'Aproximar ao topo da coluna e soltar',
        duration: 2000
      }).then(toast => toast.present());
      this.selectedQuadrant = source.id;
        item.selectedQuadrant = this.selectedQuadrant;
        this.todo = item;
        setTimeout(() => {
          this.addTodo();
        })
    });
 
    this.dragulaService.dropModel('bag')
      .subscribe(({ name, el, source, item}) => {
        item['color'] = 'success';
        this.selectedQuadrant = el.parentElement.id;
        item.selectedQuadrant = this.selectedQuadrant;
      });
 
    this.dragulaService.createGroup('bag', {
      removeOnSpill: true
    });

  }

  addTodo() {
    switch (this.selectedQuadrant) {
      case 'q1':
        this.todo.color = 'primary';
        break;
      case 'q2':
        this.todo.color = 'secondary';
        break;
      case 'q3':
        this.todo.color = 'tertiary';
        break;
      case 'q4':
        this.todo.color = 'warning';
        break;
    }
    this[this.selectedQuadrant].push(this.todo);
    this.todo = { value: '', color: '' };
  }
 
}