import { Component } from '@angular/core';
import { Vypujcka } from '../interface/vypujcka';
import { NosicTyp } from '../interface/nosic-typ';
import { Stav } from '../interface/stav';
import { NosicTypService } from '../service/nosic-typ.service';
import { StavService } from '../service/stav.service';
import { VypujckaService } from '../service/vypujcka.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pozadavky',
  templateUrl: './vypujcky.component.html',
  styleUrls: ['./vypujcky.component.css']
})
export class VypujckyComponent{
  vypujcky: Vypujcka[] = [];
  nosicTyp: NosicTyp[] = [];
  stavy: Stav[] = [];
  editable: boolean = true;

  
constructor(private nosicTypService: NosicTypService, private stavService: StavService, private vypujckaService: VypujckaService, 
  protected router: Router){}

  ngOnInit(){
    this.onGetNosicTypes();
  }

  onGetVypujcky(): void {
    this.vypujckaService.getVypujcky().subscribe(data => {
      this.vypujcky = data;
      this.onGetStav();
    })
  }
  
  onGetNosicTypes(): void {
    this.nosicTypService.getNosicTypes().subscribe(data => {
      this.nosicTyp = data;
      this.onGetVypujcky();
    })
  }

  onGetStav() {
    this.stavService.getStavy().subscribe(data => {
      this.stavy = data;
      this.stavy.pop();
    })
  }
  

  /************* Buttons *************/
  handleClickEditVypujcka(dataItem: any): void {
    const kodVypujcky = dataItem.vypujcka_id;
    window.location.href = `${window.location.pathname}/edit-vypujcka/${kodVypujcky}`;
  }
}