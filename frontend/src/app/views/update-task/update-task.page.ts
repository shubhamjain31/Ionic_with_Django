import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.page.html',
  styleUrls: ['./update-task.page.scss'],
})
export class UpdateTaskPage implements OnInit {

  constructor(public modalCtlr:ModalController,) { }

  ngOnInit() {
  }

  async dismis(){
    await this.modalCtlr.dismiss()
  }

}
