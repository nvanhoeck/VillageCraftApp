import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NO_TEXT} from "../../../constants/labels";
import {COLOR_TYPES} from "../../../constants/styling";
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";

export const BUTTON_TYPE_CARD_ACTION_SMALL: StyleProps = {
  backgroundColor: 'BLACK',
  fontColor: 'WHITE',
  size: 'SMALL',
  name: 'BUTTON_TYPE_CARD_ACTION_SMALL',
  rounded: 'SMALL'
}

export const BUTTON_TYPE_PRIMARY_DEFAULT: StyleProps = {
  backgroundColor: 'WHITE',
  fontColor: 'PRIMARY',
  size: 'MEDIUM',
  name: 'BUTTON_TYPE_PRIMARY_DEFAULT',
  rounded: 'MEDIUM'
}

type StyleProps = {
  backgroundColor: COLOR_TYPES
  fontColor: COLOR_TYPES
  size: 'SMALL' | 'MEDIUM' | 'LARGE',
  name: string
  rounded: 'SMALL' | 'MEDIUM' | 'LARGE' | 'NONE'
}

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input()
  text: string = NO_TEXT;
  @Input()
  styleProps: StyleProps = BUTTON_TYPE_PRIMARY_DEFAULT
  @Input()
  icon: string | undefined = undefined
  @Output()
  onClickHandler: EventEmitter<Event> =  new EventEmitter<Event>

  handleClick (clickEvent: Event) {
    this.onClickHandler.emit(clickEvent)
  }

  public getClassNames() {
    const classNames = ['btn']
    if (this.styleProps) {
      //TODO make this inferred
      this.handleDefaultStyling(classNames);
      this.overridesBorderRadius(classNames, this.styleProps.rounded)
    } else {
      this.changeToDefaultStyling(classNames)
    }
    return classNames
  }

  private handleDefaultStyling(classNames: string[]) {
    switch (this.styleProps.name) {
      case 'BUTTON_TYPE_CARD_ACTION_SMALL':
        this.changeToCardButtonActions(classNames);
        break;
      case 'BUTTON_TYPE_PRIMARY_DEFAULT':
        this.changeToDefaultStyling(classNames);
        break;
      default:
        this.changeToDefaultStyling(classNames)
    }
  }

  private changeToDefaultStyling(classNames: string[]) {
    classNames.push('btn--medium')
    classNames.push('btn--bg-black')
    classNames.push('btn--font-white')
  }

  private changeToCardButtonActions(classNames: string[]) {
    classNames.push('btn--small')
    classNames.push('btn--bg-black')
    classNames.push('btn--font-white')
  }

  private overridesBorderRadius(classNames: string[], rounded: StyleProps['rounded']) {
    switch (rounded) {
      case "SMALL":
        classNames.push('btn--rounded--small');
        break;
      case "MEDIUM":
        classNames.push('btn--rounded--medium');
        break;
      case "LARGE":
        classNames.push('btn--rounded--large');
        break;
      case "NONE":
        return
      default:
        return

    }
  }
}
