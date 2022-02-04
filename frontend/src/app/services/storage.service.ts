import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

const STORAGE_KEY = "mylist";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { 
      this.init();
  }

  init(){
      this.storage.create();
  }

  getData(){
      return this.storage.get(STORAGE_KEY) || [];
  }

  addData(item) {
    let storeDAta = this.storage.get(STORAGE_KEY) || {};
    storeDAta = item;
    return this.storage.set(STORAGE_KEY, storeDAta);
  }

  removeData(item) {
      let storeData = this.storage.get(STORAGE_KEY) || {};
      storeData = item;
      return this.storage.set(STORAGE_KEY, storeData);
    }
}
