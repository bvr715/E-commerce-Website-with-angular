import { DragDirective } from './drag.directive';
import { DomSanitizer } from '@angular/platform-browser';

describe('DragDirective', () => {
  it('should create an instance', () => {
    const sanitizerMock = {} as DomSanitizer;
    const directive = new DragDirective(sanitizerMock);
    expect(directive).toBeTruthy();
  });
});
