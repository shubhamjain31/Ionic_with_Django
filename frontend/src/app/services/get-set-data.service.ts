import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetSetDataService {
  todo_data: any = [];

  constructor() { }

  set_todo_data(data){
    this.todo_data = data;
  }

  get_todo_data(){
    return {'todo_data': this.todo_data}
  }

  todo_completed_or_not(all_data: any, single_data: number, status: boolean){
    for(let i=0; i<all_data.length; i++){
      if(all_data[i]['pk'] === single_data){
        all_data[i]['fields']['done'] = status;
        return all_data;
      }
    }
  }

  change_bookmark_status(all_data: any, single_data: number, status: boolean){
    for(let i=0; i<all_data.length; i++){
      if(all_data[i]['pk'] === single_data){
        all_data[i]['fields']['bookmark'] = status;
        return all_data;
      }
    }
  }

  delete_todo(all_data: any, index: number){
    all_data.splice(index, 1);
    return all_data;
  }
}
