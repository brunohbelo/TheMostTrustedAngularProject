import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { GuessTheAgeService } from '../services/guess-the-age.service';

@Component({
  selector: 'app-guess-the-age',
  template: `
    <p>Tell me your name so I can tell your age</p>
    <input id='name' [formControl]="nameControl"/>
    <p id='predictedAge' *ngIf="age > 0">Your age should be {{age}}</p>
    <p id='specialNameMessge' *ngIf="ageNotFounded === true">Sorry your name is so special that your age cannot be predicted</p>
  `,
})
export class GuessTheAgeComponent implements OnInit {

  constructor(private guessTheService: GuessTheAgeService) {
  }

  readonly INITIAL_AGE: number = -1
  readonly MINIMAL_NAME_LENGHT: number = 2;
  readonly NAME_INPUT_WAIT_TIME = 500;

  public nameControl = new FormControl();
  public age: number = this.INITIAL_AGE;
  public ageNotFounded: boolean = false;


  private setAge(value: number | null) {
    if (value === null) {
      this.ageNotFounded = true;
      this.age = this.INITIAL_AGE;
      return;
    }

    this.ageNotFounded = false;
    this.age = <number>value;
    console.log(this.age);
  }

  ngOnInit(): void {
    
    this.nameControl.valueChanges.pipe(debounceTime(this.NAME_INPUT_WAIT_TIME)).subscribe(async () => {
      if (this.nameControl.value.length <= this.MINIMAL_NAME_LENGHT) {
        this.setAge(this.INITIAL_AGE)
        return;
      }

      this.setAge(await this.guessTheService.getAge(this.nameControl.value));
    });
  }

}
