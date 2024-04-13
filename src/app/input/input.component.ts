import { Component, EventEmitter, HostBinding, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent implements OnChanges {
  @Input() inputText!: string;
  @Input() inputType!: string;
  @Input() inputId!: string;
  @Input() resetForm: boolean = false;
  @Output() pts = new EventEmitter();
  @Output() data = new EventEmitter();

  form: FormGroup = this.fb.group({
    inputData: ['']
  });

  constructor(private fb: FormBuilder) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.resetForm === true ? this.form.reset() : null;
  }

  fnVerifyId() {
    if (this.inputId === 'txtPassword') {
      const COMMAND = { text: this.form.get('inputData')!.value }
      this.pts.emit(COMMAND)
    }
  }

  sendData() {
    this.data.emit(this.form.get('inputData')!.value);
  }
}
