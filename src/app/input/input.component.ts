import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  @Input() inputText!: string;
  @Input() inputType!: string;
  @Input() inputId!: string;
  @Output() pts = new EventEmitter();

  form: FormGroup = this.fb.group({
    inputData: ['']
  });

  constructor(private fb: FormBuilder) {

  }

  fnVerifyId() {
    if (this.inputId === 'txtPassword') {
      const COMMAND = { text: this.form.get('inputData')!.value }
      this.pts.emit(COMMAND)
    }
  }

}
