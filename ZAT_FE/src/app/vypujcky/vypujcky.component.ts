import { Component } from '@angular/core';
import { User } from '../interface/user';

@Component({
  selector: 'app-pozadavky',
  templateUrl: './vypujcky.component.html',
  styleUrls: ['./vypujcky.component.css']
})
export class VypujckyComponent{
  users: User[] = [];
}