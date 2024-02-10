import {Component, Input} from '@angular/core';
import {NO_TEXT} from "../../../constants/labels";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input()
  text: string = NO_TEXT;
  @Input()
  onClickHandler: (clickEvent: Event) => void | Promise<void> = (clickEvent: Event) => console.warn('no click event initialized for this component')

}
