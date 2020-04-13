import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';


/*
* Subject is more recommended than the normal angular evant emitter since it is 
* more flexible. instead of emit(data) , next(data) is used.
* But subscription is the same. Note that one must unsubscribe where u are 
* consuming the data from the subject.
*/
export class UserService{
    //  activate = new EventEmitter<boolean>();
    activate = new Subject<boolean>();  
}