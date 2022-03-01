import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetSetDataService {
  todo_data: any = [];
  session_data: any = {};
  theme_mode: boolean;
  torb: boolean;
  moveticked: boolean;

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

  all_todos(){
    let all_todos: any = [];

    for(let i=0; i<this.todo_data.length; i++){
      if(this.todo_data[i]['fields']['trash'] != true){
        all_todos.push(this.todo_data[i]);
      }
    }

    if(!this.torb){
      all_todos = all_todos.reverse();
    }
    return all_todos;
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

  trash_todo(all_data: any, item: any, index: number){
    all_data.splice(index, 1);
    
    for(let i=0; i<this.todo_data.length; i++){
      if(this.todo_data[i]['pk'] === item['pk']){
        this.todo_data[i]['fields']['trash'] = true;
      }
    }
    return this.todo_data, all_data;
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
      if(this.todo_data[i]['fields']['done'] === true && this.todo_data[i]['fields']['trash'] === false){
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

  trash_todos(){
    let all_todos: any = [];

    for(let i=0; i<this.todo_data.length; i++){
      if(this.todo_data[i]['fields']['trash'] === true){
        all_todos.push(this.todo_data[i]);
      }
    }
    return all_todos;
  }

  undo_todo(all_data: any, item: any, index: number){
    all_data.splice(index, 1);
    return all_data;
  }

  archieve_todos(){
    let all_todos: any = [];

    for(let i=0; i<this.todo_data.length; i++){
      if(this.todo_data[i]['fields']['bookmark'] === true && this.todo_data[i]['fields']['trash'] === false){
        all_todos.push(this.todo_data[i]);
      }
    }
    return all_todos;
  }

  unarchive_todo(all_data: any, item: any, index: number){
    all_data.splice(index, 1);
    return all_data;
  }

  todays_todo(){
    let all_todos: any = [];
    let today = new Date();
    let g1 = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    for(let i=0; i<this.todo_data.length; i++){
      let todo_date = new Date(this.todo_data[i]['fields']['date_created']);
      let g2 = new Date(todo_date.getFullYear(), todo_date.getMonth(), todo_date.getDate());
      
      if(String(g2) === String(g1)){
        all_todos.push(this.todo_data[i]);
      }
    }
    return all_todos;
  }

  set_theme_mode(status: boolean){
    this.theme_mode = status;
    return this.theme_mode;
  }

  get_theme_mode(){
    return this.theme_mode;
  }

  set_add_top_or_bottom(status: boolean){
    this.torb = status;
    return this.torb;
  }

  get_add_top_or_bottom(){
    return this.torb;
  }

  set_move_ticked_item(status: boolean){
    this.moveticked = status;
    return this.moveticked;
  }

  get_move_ticked_item(){
    return this.moveticked;
  }
}
