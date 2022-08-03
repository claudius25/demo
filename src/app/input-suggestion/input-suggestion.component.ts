import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IDropdownItem } from '../model/dropdown-item';

@Component({
  selector: 'app-input-suggestion',
  templateUrl: './input-suggestion.component.html',
  styleUrls: ['./input-suggestion.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputSuggestionComponent,
      multi: true,
    },
  ],
})
export class InputSuggestionComponent implements ControlValueAccessor {
  @Input() options: IDropdownItem[] = [];
  @Input() filteredOptions: IDropdownItem[] | null = null;

  public inputValue = '';

  public listSelected: IDropdownItem[] = [];

  public isOpen = false;
  private currentIndex = -1;
  private currentItemHighlight = null;
  private isDisabled;

  onChange = (values: any[]) => {};
  onTouch = () => {};

  constructor(private elem: ElementRef) {}

  writeValue(obj: any): void {
    this.listSelected = obj.value;
    this.listSelected.forEach((selected: IDropdownItem) => {
      const found: IDropdownItem = this.options.find(
        (item) => item.value === selected.value
      );
      if (found) {
        found.selected = true;
      }
    });
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  public get dropdownElement(): Element {
    return (this.elem.nativeElement as HTMLElement).querySelector(
      '.suggestion__options'
    ) as Element;
  }

  @HostListener('document:click', ['$event.target'])
  onClick(target: Node): void {
    const clickedInside = (this.elem.nativeElement as HTMLElement).contains(
      target
    );
    if (!clickedInside) {
      this.isOpen = false;
      this.filteredOptions = [];
    } else {
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvents(event: KeyboardEvent) {
    if (!this.isOpen) {
      return;
    }
    if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
      if (this.currentItemHighlight) {
        this.currentItemHighlight.className = 'suggestion__item';
      }

      if (event.code === 'ArrowUp') {
        if (this.currentIndex < 0) {
          this.currentIndex = 0;
        } else if (this.currentIndex > 0) {
          this.currentIndex--;
        }
      } else if (event.code === 'ArrowDown') {
        if (this.currentIndex < 0) {
          this.currentIndex = 0;
        } else if (this.currentIndex < this.filteredOptions.length - 1) {
          this.currentIndex++;
        }
      }

      this.currentItemHighlight = (this.elem.nativeElement as HTMLElement)
        .querySelectorAll('.suggestion__item')
        .item(this.currentIndex);
      this.currentItemHighlight.className =
        'suggestion__item suggestion__item--selected';
    } else if (event.code === 'Enter' && this.currentIndex >= 0) {
      this.selectByIndex(this.currentIndex);
    } else if (event.code === 'Escape') {
      this.closeDropdown();
    }
  }

  closeDropdown() {
    console.log('closeDropdown');
    this.dropdownElement.setAttribute('aria-expanded', 'false');
    this.currentIndex = -1;
    this.isOpen = false;
  }

  selectByIndex(i: number) {
    this.select(this.filteredOptions[i]);
  }

  select(option: IDropdownItem) {
    option.selected = !option.selected;
    this.updateListSelected();
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    this.dropdownElement.setAttribute(
      'aria-expanded',
      this.isOpen ? 'true' : 'false'
    );
  }

  inputKeyup() {
    this.filteredOptions = this.options.filter(
      (o: IDropdownItem) =>
        o.label.toLowerCase().indexOf(this.inputValue.toLowerCase()) !== -1
    );
  }

  inputClick() {
    this.toggleDropdown();
    this.filteredOptions = this.isOpen ? this.options.concat() : [];
  }

  private updateListSelected(): void {
    this.listSelected = this.options?.filter((o: IDropdownItem) => o.selected);
    this.onChange(this.listSelected);
  }
}
