import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators'
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  firstObservable:Subscription; //storing a subscription in a variable will be essential when it comes to destroying it

  constructor(private userService:UserService) { }

  ngOnInit() {
    // this.firstObservable = interval(1000).subscribe(
    //                             count =>{       //Interestingly, this function prints count after that time interval
    //                                 console.log(count)
    //                             }
    //                         )
    const customIntervalObservable = Observable.create(  //creating a custom observable
                      observer => {
                            let count = 0;

                            setInterval(
                              ()=>{
                                  observer.next(count);  //has other methods such as error & complete
                                  
                                  if(count == 2){
                                    observer.complete()   //Complete
                                  }
                                  
                                  if(count > 3){
                                     observer.error(new Error('Count exceeds 3'))// Emitting error
                                  }
                            
                                  count ++;
                              }
                            ,1000)
                      }
    );
    //Wrappable  - before subscribing yo can manipulate the data the way u want using map
    const wrappedCustomIntervalObservable = customIntervalObservable.pipe( 
      filter( //return a boolean whether the process goes on
             (data:number) => {
                 return data > 0
             }
      ),
      map( (data: number) => {
                        return "Round:" + (data+1)
      }
    ))

    //subscribing to our custom observable
    this.firstObservable = wrappedCustomIntervalObservable.subscribe(
                                
                                  count =>{
                                    console.log(count)
                                  },
                                  error => { //Error Handling - wont show red coded at console
                                    console.log(error)
                                    alert(error.message)
                                  }, () => {  //fired on completion of observable based on a certain condition, no need of 
                                              // unsubscribing, --- has no name (fxn)

                                    console.log("Completed")
                                  }
                                

                            );

  }

  ngOnDestroy(){//destroys subscription 
     this.firstObservable.unsubscribe()
  }

  //
  onActivate(){
      // this.userService.activate.emit(true);
      this.userService.activate.next(true);
  }

}
