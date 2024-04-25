import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button';
import { NavbarComponent } from './navbar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [ButtonComponent, NavbarComponent],
    exports: [ButtonComponent, NavbarComponent],
    imports: [CommonModule, MatIconModule],
})
export class SharedModule {}
