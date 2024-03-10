import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Moment } from 'src/app/interfaces/Moment';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.scss']
})
export class MomentFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Moment>();
  @Input() btnText!: string;
  @Input() momentData: Moment | null = null;

  momentForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.momentForm = new FormGroup({
      id: new FormControl(this.momentData?.id || ''),
      title: new FormControl(this.momentData?.title || '', [Validators.required]),
      description: new FormControl(this.momentData?.description || '', [Validators.required]),
      image: new FormControl(''),
    });
  }

  get title() {
    return this.momentForm.get('title')!;
  }

  get description() {
    return this.momentForm.get('description')!;
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files![0];

    this.momentForm.patchValue({
      image: file
    });
  }

  submit() {
    if (this.momentForm.invalid) {
      return;
    }

    this.onSubmit.emit(this.momentForm.value);
  }
}
