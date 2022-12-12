import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GuessTheAgeService {

  constructor(private httpClient: HttpClient) { }

  public async getAge(name: string): Promise<number>{
    name = name.trim();
    const ageResponse: any = await firstValueFrom(this.httpClient.get(`https://api.agify.io/?name=${name}`));
    return ageResponse.age;
  }
}
