import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdatePlayerDTO } from 'src/app/DTO/UpdatePlayerDTO';
import { UpdateTeamsSoloCreditoResDTO } from 'src/app/DTO/UpdateTeamsSoloCreditoResDTO';
import * as XLSX from 'xlsx';
import { TeamService } from 'src/app/service/team.service';
import { PlayerDTO } from 'src/app/DTO/PlayerDTO';
import { UpdateMercatoInvernalelegaDTO } from 'src/app/DTO/UpdateMercatoInvernalelegaDTO';

@Component({
  selector: 'app-svincolati-fanta',
  templateUrl: './svincolati-fanta.component.html',
  styleUrls: ['./svincolati-fanta.component.scss']
})
export class SvincolatiFantaComponent implements OnInit{

  public dt: Array<any> = new Array<any>();
  public dtXFiltro: Array<any> = new Array<any>();
  @ViewChild('inputExcel') inputExcel: ElementRef;
  @ViewChild('giocatoreFiltrato') giocatoreFiltrato: ElementRef;
  displayedColumns: string[] = ['R', 'Nome', 'Squadra','quotaI', 'btn'];
  idlega: any;
  nomeLega: any;
  teamA: any;
  creditoR: any;
  idt: any;
  public arrayLst: Array<any> = new Array<any>();
  public playersLst: Array<any> = new Array<any>();
  excelB: boolean = false;
  flgMercatoInv: boolean;

  constructor(private route: ActivatedRoute,
              private service: TeamService,
              private readonly cd: ChangeDetectorRef,
              private router: Router,
              private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.excelB = false;
    this.teamA = "";
    this.idlega = this.route.snapshot.paramMap.get('idlega');
    this.nomeLega = this.route.snapshot.paramMap.get('nomelega');
    this.teamA = this.route.snapshot.paramMap.get('teamA');
    if (this.teamA!=null) {
      this.service.getCreditoRXTeamAggiornatoByName(this.teamA).subscribe(res=>{
        this.creditoR = res[0].creditoResiduo;
        this.idt = res[0].id;
      });
    }
    //TODO - su servizio REST prendere solo quelli con team non valorizzato
    // e ordinarli per ruolo
    this.service.getPlayersSvincolati(this.idlega).subscribe(res=>{
      this.dt = res;
      this.dtXFiltro = res;
      this.service.getLega(this.idlega).subscribe(res=>{
        this.flgMercatoInv = res.flgMercatoInvernale;
      });
    });
  }

  goBack() {
    this.router.navigate(['summaryFanta', {"idlega":this.idlega, "nomelega":this.nomeLega}], {relativeTo: this.route.parent});
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

  resetFilter() {
    this.giocatoreFiltrato.nativeElement.value = "";
    this.service.getPlayersComprati(this.idlega).subscribe(res=>{
      this.dt = res;
    });
  }

  prendiSvincolato(id: any, quotaI:any) {
    if (this.creditoR >= quotaI && this.teamA!="") {
      let c = new UpdateTeamsSoloCreditoResDTO;
      c.creditoResiduo = this.creditoR - +quotaI;
      let svincPlayer = new UpdatePlayerDTO;
      svincPlayer.pagato = +quotaI;
      svincPlayer.team = this.teamA;
      this.service.updateCreditoResByname(this.idt ,c).subscribe(res=>{
        this.service.updatePlayer(id, svincPlayer).subscribe(res=>{
          this.service.getPlayersComprati(this.idlega).subscribe(res=>{
            this.dt = res;
            this.dtXFiltro = res;
            this.router.navigate(['summaryFanta', {"idlega":this.idlega, "nomelega":this.nomeLega}], {relativeTo: this.route.parent});
            this._snackBar.open("Giocatore svincolato comprato", "chiudi");
          });
        });
      });
    } else {
      this._snackBar.open("Credito non sufficente o giocatore non precedentemente svincolato", "chiudi");
    }
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
        newPlayer.id = i;
        //newPlayer.Id = this.arrayLst[i].Quotazioni Fantacalcio Stagione 2022 23;
        newPlayer.r = this.arrayLst[i].__EMPTY;
        newPlayer.rm = this.arrayLst[i].__EMPTY_1;
        newPlayer.nome = this.arrayLst[i].__EMPTY_2;
        newPlayer.squadra = this.arrayLst[i].__EMPTY_3;
        newPlayer.quotaI = this.arrayLst[i].__EMPTY_5;
        newPlayer.idLega = +this.idlega;
        newPlayer.pagato = 0;
        newPlayer.team = "";
        console.log(newPlayer);
        this.playersLst.push(newPlayer);
      }

      for(let j = 0;j<this.playersLst.length;j++) {
        // controlla se già esiste
        console.log(this.playersLst[j]+ "controllo");
        this.service.getPlayerXNome(this.playersLst[j].Nome).subscribe(res=>{
          if(res.length===0) {
            console.log("inserisco");
  //            this.service.getMaxIdPlayer().subscribe(res=>{
              let newPlayerSvinc = new PlayerDTO;
              newPlayerSvinc.nome = this.playersLst[j].Nome;
              newPlayerSvinc.r = this.playersLst[j].R;
              newPlayerSvinc.rm = this.playersLst[j].RM;
              newPlayerSvinc.squadra = this.playersLst[j].Squadra;
              newPlayerSvinc.idLega = +this.idlega;
              newPlayerSvinc.pagato = 0;
              newPlayerSvinc.quotaI = this.playersLst[j].quotaI;
              newPlayerSvinc.team = "";
              console.log(newPlayerSvinc);
              let p = 0;
              this.service.getMaxIdPlayer().subscribe(res=>{
                p = res;
                newPlayerSvinc.id = p + 1;
                this.service.insertPlayer(newPlayerSvinc).subscribe(res=>{
                    this.service.getPlayersSvincolati(this.idlega).subscribe(res=>{
                      this.dt = res;
                      this.dtXFiltro = res;
                    });
                  });
              });
          }
        });
    }


      // recupera idmax per inserire player

      // inserisce player
    }
    let mercInv = new UpdateMercatoInvernalelegaDTO;
    mercInv.flgMercatoInvernale = true;
    this.service.updateLega(this.idlega, mercInv).subscribe(res=>{
      console.log(res);
    });
    this.excelB = true;
    this.inputExcel.nativeElement.disabled = true;
    this._snackBar.open("giocatori inseriti per mercato invernale");
  }
}
