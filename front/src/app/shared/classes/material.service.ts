import {ElementRef} from '@angular/core'

declare var M: any

export interface MaterialInstance {
  open? : any
  close?: any
  destroy?: any
}

export class MaterialService {
  static toast(message: string) {
    M.toast({html: message})
  }

  static initializeFloatingButton(ref: ElementRef) {
    M.FloatingActionButton.init(ref.nativeElement)
  }

  static initTapTarget(ref: ElementRef):MaterialInstance{
    return M.TapTarget.init(ref.nativeElement);
  }

  static updateTextInputs() {
    M.updateTextFields()
  }

  static initModal(ref: ElementRef): MaterialInstance {
    return M.Modal.init(ref.nativeElement)
  }
  static initMater(ref: ElementRef): MaterialInstance {
    return M.Materialbox.init(ref.nativeElement)
  }
}
