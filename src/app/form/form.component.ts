import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [FormBuilder]
})
export class FormComponent implements OnInit {

  constructor(
    public formBuilder: FormBuilder,
    private readonly dataService: DataService
  ) { } 

  ionicForm: FormGroup;
  isSubmitted: boolean = false;

  get errorControl(){
    return this.ionicForm.controls;
  }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      name: ['',[Validators.required, Validators.minLength(5)]],
      lastname: ['',[Validators.required, Validators.minLength(5)]],
      email: ['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      age: ['',[Validators.required, Validators.min(15), Validators.max(99)]],
      mobile: ['',[Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  addContact(){
    this.isSubmitted = true;
    if(!this.ionicForm.valid){
      console.log('Por favor, rellana los campos requeridos');
      return false;
    } else {
      this.dataService.createContact(this.ionicForm.value);
      console.log('Listo!');
      this.ionicForm.reset();
      Object.keys(this.ionicForm.controls).forEach(key => {
        this.ionicForm.get(key).setErrors(null);
      });
    }
  }

}
