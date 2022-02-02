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

  async addData(item) {
      let storeDAta = await this.storage.get(STORAGE_KEY) || [];
    //   storeDAta.push(item);
      storeDAta = item;
      return this.storage.set(STORAGE_KEY, storeDAta);
    }

    async removeData(index) {
        const storeData = await this.storage.get(STORAGE_KEY) || [];
        storeData.splice(index, 1);
        return this.storage.set(STORAGE_KEY, storeData);
      }
}
