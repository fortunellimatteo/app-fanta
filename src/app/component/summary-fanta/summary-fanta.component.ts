import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from 'src/app/service/team.service';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { UpdateLegaDTO } from 'src/app/DTO/UpdateLegaDTO';
import { UpdatePlayerDTO } from 'src/app/DTO/UpdatePlayerDTO';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCheckbox } from '@angular/material/checkbox';
import { UpdatePlayerXScambioDTO } from 'src/app/DTO/UpdatePlayerXScambioDTO';
import { SendEmailService } from 'src/app/service/send-email.service';

@Component({
  selector: 'app-summary-fanta',
  templateUrl: './summary-fanta.component.html',
  styleUrls: ['./summary-fanta.component.scss']
})
export class SummaryFantaComponent implements OnInit{

  @ViewChild('giocatoreFiltrato') giocatoreFiltrato: ElementRef;
  @ViewChild('teamFiltrato') teamFiltrato: ElementRef;
  @ViewChild('scambioG') scambioG: MatCheckbox;
  public dt: Array<any> = new Array<any>();
  public dtXFiltro: Array<any> = new Array<any>();
  public creditiRXTeam: Array<any> = new Array<any>();
  displayedColumns: string[] = ['R', 'Nome', 'Squadra','Team','Pagato', 'btn'];
  idlega: any;
  nomeLega: any;
  public scambio: Array<any> = new Array<any>();

  constructor(private route: ActivatedRoute,
              private service: TeamService,
              private serviceMail: SendEmailService,
              private readonly cd: ChangeDetectorRef,
              private router: Router,
              private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.scambio = new Array();
    this.idlega = this.route.snapshot.paramMap.get('idlega');
    this.nomeLega = this.route.snapshot.paramMap.get('nomelega');
    //TODO - su servizio REST prendere solo quelli con team valorizzato
    // e ordinarli per team e ruolo.
    this.service.getPlayersComprati(this.idlega).subscribe(res=>{
      this.dt = res;
      this.dtXFiltro = res;
    });
    this.creditiRimastiXTeam();
  }

  creditiRimastiXTeam() {
    this.service.getAllTeams(this.idlega).subscribe(res=>{
      this.creditiRXTeam = res;
    });
  }

  goEmail() {
    this.serviceMail.callPHPFileForEmail().subscribe(res=>{
      this._snackBar.open(res);
      console.log(res);
    });
  }

  resetFilter() {
    this.giocatoreFiltrato.nativeElement.value = "";
    this.teamFiltrato.nativeElement.value = "";
    this.service.getPlayersComprati(this.idlega).subscribe(res=>{
      this.dt = res;
    });
  }

  doFilterT(event: any) {
    let dtFiltered = new Array<any>();
    if(this.teamFiltrato.nativeElement.value.length > 0) {
      for(let j = 0;j<this.dtXFiltro.length;j++) {
        if (this.dtXFiltro[j].team.includes(this.teamFiltrato.nativeElement.value.trim())) {
          dtFiltered.push(this.dtXFiltro[j]);
        }
      }
      this.dt = [...dtFiltered];
    } else {
      this.dt = [...this.dtXFiltro];
    }
  }

  doFilterG(event: any) {
    let dtFiltered = new Array<any>();
    if(this.giocatoreFiltrato.nativeElement.value.length > 0) {
      let appoggioS = this.giocatoreFiltrato.nativeElement.value.trim()[0].toUpperCase() + this.giocatoreFiltrato.nativeElement.value.trim().slice(1);
      for(let j = 0;j<this.dtXFiltro.length;j++) {
        if (this.dtXFiltro[j].Nome.includes(appoggioS)) {
          dtFiltered.push(this.dtXFiltro[j]);
        }
      }
      this.dt = [...dtFiltered];
    } else {
      this.dt = [...this.dtXFiltro];
    }
  }

  svincolaGiocatore(id: any, teamA: any) {
    // se svincolati giocatore non viene aggiunto il costo pagato oppure 1 al credito residuo
    let svincPlayer = new UpdatePlayerDTO;
    svincPlayer.pagato = 0;
    svincPlayer.team = "";
    this.service.updatePlayer(id, svincPlayer).subscribe(res=>{
      this.service.getPlayersComprati(this.idlega).subscribe(res=>{
        this.dt = res;
        this.dtXFiltro = res;
        this.router.navigate(['svincolatiFanta', {"idlega":this.idlega, "nomelega":this.nomeLega, "teamA": teamA}], {relativeTo: this.route.parent});
      });
    });
  }

  checkScambio(idGiocatore: any) {
    let booleanScambio = false;
    if(this.scambio.length===0) {
      this.scambio.push(idGiocatore);
    } else {
      booleanScambio = this.scambio.includes(idGiocatore);
      if(booleanScambio === true) {
        this.scambio.forEach((element,index)=>{
          if(element===idGiocatore) this.scambio.splice(index,1);
       });
      } else if (booleanScambio === false) {
        this.scambio.push(idGiocatore);
      }
    }
  }

  goScambi() {
    if(this.scambio.length===2) {
      let updGiocatore1 = new UpdatePlayerXScambioDTO;
      let updGiocatore2 = new UpdatePlayerXScambioDTO;
      this.service.getPlayer(this.scambio[0]).subscribe(res=>{
        updGiocatore1.team = res.team;
        this.service.getPlayer(this.scambio[1]).subscribe(res=>{
          updGiocatore2.team = res.team;
          this.service.updatePlayerXScambio(this.scambio[0], updGiocatore2).subscribe(res=>{
            this.service.updatePlayerXScambio(this.scambio[1], updGiocatore1).subscribe(res=>{
              this.service.getPlayersComprati(this.idlega).subscribe(res=>{
                this.dt = res;
                this.dtXFiltro = res;
                this._snackBar.open("Scambio effettuato","Chiudi");
              });
            });
          });
        });
      });
    } else {
      this._snackBar.open("Impossibile fare lo scambio, selezionare 2 giocatori","Chiudi");
    }
  }

  goSvincolati() {
    this.router.navigate(['svincolatiFanta', {"idlega":this.idlega, "nomelega":this.nomeLega}], {relativeTo: this.route.parent});
  }

  goBack() {
    this.router.navigate(['legaFanta'], {relativeTo: this.route.parent});
  };
}
