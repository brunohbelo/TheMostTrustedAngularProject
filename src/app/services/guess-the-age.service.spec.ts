import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'

import { GuessTheAgeService } from './guess-the-age.service';

describe('GuessTheAgeService', () => {
  let service: GuessTheAgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        GuessTheAgeService
      ]
    });
    service = TestBed.inject(GuessTheAgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
