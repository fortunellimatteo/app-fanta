import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamDTO } from 'src/app/DTO/TeamDTO';
import * as XLSX from 'xlsx';
import { TeamService } from 'src/app/service/team.service';
import { PlayerDTO } from 'src/app/DTO/PlayerDTO';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatChip } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateLegaDTO } from 'src/app/DTO/UpdateLegaDTO';

@Component({
  selector: 'app-home-fanta',
  templateUrl: './home-fanta.component.html',
  styleUrls: ['./home-fanta.component.scss']
})

export class HomeFantaComponent implements OnInit {

  public playersLst: Array<any> = new Array<any>();
  public arrayLst: Array<any> = new Array<any>();
  public datasource: Array<any> = new Array<any>();
  displayedColumns: string[] = ['id', 'nameTeam', 'authorTeam', 'btn'];

  @ViewChild('inputExcel') inputExcel: ElementRef;
  @ViewChild('nameTeam') nameTeam: ElementRef;
  @ViewChild('teamManager') teamManager: ElementRef;
  @ViewChild('crediti500') crediti500: MatCheckbox;
  @ViewChild('crediti1000') crediti1000: MatCheckbox;
  creditoXteam: number;
  @ViewChild('chip') chip: MatChip;
  excelB: boolean;
  lega: any;
  idlega: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private readonly cd: ChangeDetectorRef,
    private service: TeamService,
    private _snackBar: MatSnackBar){}

  ngOnInit() {
    this.creditoXteam = 0;
    this.playersLst = [];
    this.excelB = false;
    this.lega = this.route.snapshot.paramMap.get('nomelega');
    this.idlega = this.route.snapshot.paramMap.get('idlega');
    this.getAllTeams();
  }

  public getAllTeams() {
    this.service.getAllTeams(this.idlega).subscribe(res=>{
      this.datasource = res;
   });
  }

  public inserisciTeam() {
    if (this.nameTeam.nativeElement.value != "" && this.teamManager.nativeElement.value != "" &&
        this.lega != "") {
      let newTeam = new TeamDTO;
      
      newTeam.nameTeam = this.nameTeam.nativeElement.value;
      newTeam.authorTeam = this.teamManager.nativeElement.value;
      newTeam.idLega = +this.idlega;
      newTeam.creditoResiduo = this.creditoXteam;
      newTeam.porR = 3;
      newTeam.difR = 8;
      newTeam.cenR = 8;
      newTeam.attR = 6;
      if((newTeam.nameTeam != null && newTeam.nameTeam != '') &&
         (newTeam.authorTeam != null && newTeam.authorTeam != '')) {
          let t = 0;
          this.service.getMaxIdTeam().subscribe(res=>{
            t = res;
            newTeam.id = t + 1;
            this.service.insertTeam(newTeam).subscribe(res=>{
              console.log("Team inserito"+res+this.nameTeam.nativeElement.value);
              this.getAllTeams();
            });
          });
      }
    }
  }

  public deleteField() {
    this.nameTeam.nativeElement.value = '';
    this.teamManager.nativeElement.value = '';
  }

  public deleteTeam(id: number) {
    console.log(id);
    this.service.deleteTeam(id).subscribe(res=>{
      console.log("Team inserito"+res+id);
      this.getAllTeams();
    });
  }

  public nextPage() {
    //this.router.navigate(['update-reservation', {idReservation: id, nameReservation: surname}], { relativeTo: this.route.parent });
    this.router.navigate(['playersFanta', {"nomelega": this.lega,"idlega":this.idlega}], {relativeTo: this.route.parent});
  }

  public back() {
    //this.router.navigate(['update-reservation', {idReservation: id, nameReservation: surname}], { relativeTo: this.route.parent });
    this.router.navigate(['legaFanta'], {relativeTo: this.route.parent});
  }

  readExcel(event: any) {
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (e)=>{
      var workbook = XLSX.read(fileReader.result, {type:'binary'});
      var sheetsName = workbook.SheetNames;
      this.arrayLst = XLSX.utils.sheet_to_json(workbook.Sheets[sheetsName[0]]);

      for(let i = 1;i<this.arrayLst.length;i++) {
        let newPlayer = new PlayerDTO;
        let p = 0;
        this.service.getMaxIdPlayer().subscribe(res=>{
          p = res;
          newPlayer.id = p + 1;
        });
        //newPlayer.Id = this.arrayLst[i].Quotazioni Fantacalcio Stagione 2022 23;
        newPlayer.r = this.arrayLst[i].__EMPTY;
        newPlayer.rm = this.arrayLst[i].__EMPTY_1;
        newPlayer.nome = this.arrayLst[i].__EMPTY_2;
        newPlayer.squadra = this.arrayLst[i].__EMPTY_3;
        newPlayer.quotaI = this.arrayLst[i].__EMPTY_5;
        newPlayer.idLega = +this.idlega;
        newPlayer.pagato = 0;
        newPlayer.team = "";
        this.playersLst.push(newPlayer);
      }

      this.service.insertPlayers(this.playersLst).subscribe(res=>{
      });
    }
    this.excelB = true;
    this.inputExcel.nativeElement.disabled = true;
  }

  cambiaValore500(ob: MatCheckboxChange) {
    if(ob.checked===true) {
      let obj = new UpdateLegaDTO();
      obj.creditoIniziale = 500;
      this.service.updateCreditoIni(this.idlega, obj).subscribe(res=>{
        this._snackBar.open("Inserito 500 come credito iniziale", "chiudi");
      });
      this.crediti1000.disabled=true;
      this.creditoXteam = 500;
    } else {
      let obj = new UpdateLegaDTO();
      obj.creditoIniziale = 0;
      this.service.updateCreditoIni(this.idlega, obj).subscribe(res=>{
        this._snackBar.open("Credito iniziale ripristinato a 0", "chiudi");
      });
      this.crediti1000.disabled=false;
      this.creditoXteam = 0;
    }
    
  }

  cambiaValore1000(ob: MatCheckboxChange) {
    if(ob.checked===true) {
      let obj = new UpdateLegaDTO();
      obj.creditoIniziale = 1000;
      this.service.updateCreditoIni(this.idlega, obj).subscribe(res=>{
        this._snackBar.open("Inserito 1000 come credito iniziale", "chiudi");
      });
      this.crediti500.disabled=true;
      this.creditoXteam = 1000;
    } else {
      let obj = new UpdateLegaDTO();
      obj.creditoIniziale = 0;
      this.service.updateCreditoIni(this.idlega, obj).subscribe(res=>{
        this._snackBar.open("Credito iniziale ripristinato a 0", "chiudi");
      });
      this.crediti500.disabled=false;
      this.creditoXteam = 0;
    }
  }
}