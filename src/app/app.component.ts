import { Component, OnInit, VERSION } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin, from, Observable } from 'rxjs';
import { filter, map, toArray, delay, mergeMap } from 'rxjs/operators';
import { TestService } from './test.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  number = from([1, 5, 10, 349, 90]);
  users: Observable<any>;
  filteredUsers: any;
  studenetForm : FormGroup;
  constructor(private testService: TestService,
    private fb: FormBuilder
    ) {}

  ngOnInit() {
    this.studenetForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      age: new FormControl()
    })

    console.log(this.studenetForm.value)
    const user1 = this.testService.getUsers1();
    const user2 = this.testService.getUsers2()
    const user3 = this.testService.getUsers3();
    
    forkJoin([user1, user2, user3]).subscribe(res => {
     this.users = from(res);
     this.users.pipe(
       map((u: any) => ({name: u.name, id: u.id, address: u.address})),
       filter((u: any) => u.id > 2)
     ).subscribe(r => {
       console.log(r)
     })
    })
  }
}
