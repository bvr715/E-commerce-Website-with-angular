import { TestBed } from '@angular/core/testing';
import { ByeProductResolveServiceService } from './bye-product-resolve-service.service';



describe('ByeProductResolveServiceService', () => {
  let service: ByeProductResolveServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ByeProductResolveServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
