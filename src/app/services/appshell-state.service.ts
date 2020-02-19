import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppshellStateService {

  public refreshToken: string;
  public expiresIn: number;
  public userName: string;
  constructor() { }
}
