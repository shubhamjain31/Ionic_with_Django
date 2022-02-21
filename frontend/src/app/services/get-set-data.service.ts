import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetSetDataService {
  todo_data: any = [];
  session_data: any = {};

  constructor() { }

  set_session_data(data){
    return this.session_data = data;
  }

  get_session_data(){
    return this.session_data;
  }

  set_todo_data(data){
    this.todo_data = data;
  }

  get_todo_data(){
    return this.todo_data || [];
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

  update_todo(single_data: any){
    for(let i=0; i<this.todo_data.length; i++){
      if(this.todo_data[i]['pk'] === single_data['id_']){
        this.todo_data[i]['fields']['name']     = single_data['itemName'];
        this.todo_data[i]['fields']['due_date'] = single_data['itemDueDate'];
        this.todo_data[i]['fields']['priority'] = single_data['itemPriority'];
        this.todo_data[i]['fields']['category'] = single_data['itemCategory'];
      }
    }
    return this.todo_data;
  }

  all_counts(){
    let total_bookmark = 0, total_completed_todos = 0;

    for(let i=0; i<this.todo_data.length; i++){
      if(this.todo_data[i]['fields']['done'] === true){
        total_completed_todos = total_completed_todos + 1;
      }

      if(this.todo_data[i]['fields']['bookmark'] === true){
        total_bookmark = total_bookmark + 1;
      }
    }

    let data_ = {
      total_completed_todos:  total_completed_todos,
      total_bookmark:         total_bookmark,
      total_todos:            this.todo_data.length
    }
    return data_;
  }

  completed_todo_list(){
    let all_todos: any = [];

    for(let i=0; i<this.todo_data.length; i++){
      if(this.todo_data[i]['fields']['done'] === true){
        all_todos.push(this.todo_data[i]);
      }
    }
    return all_todos;
  }

  category_list(){
    let categories: any = [];
    for(let i=0; i<this.todo_data.length; i++){
      categories.push(this.todo_data[i]['fields']['category']);
    }
    return [...new Set(categories)];
  }
}
