import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerDTO } from 'src/app/DTO/PlayerDTO';
import { TeamService } from 'src/app/service/team.service';
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-players-fanta',
  templateUrl: './players-fanta.component.html',
  styleUrls: ['./players-fanta.component.scss']
})
export class PlayersFantaComponent implements OnInit {

  @ViewChild('tablePlayers') tablePlayers: MatTable<any> = {} as MatTable<any>;
  public dt: Array<any> = new Array<any>();
  public selectTeams: Array<any> = new Array<any>();
  public selectTeamsXCreditiR: Array<any> = new Array<any>();
  displayedColumns: string[] = ['R', 'Nome', 'Squadra','Team','Pagato', 'btn'];
  columns: string[] = ['column'];
  nomeLega: any;
  idlega: any;
  disableSelect = new FormControl(true);
  @ViewChild('pagato') pagato: ElementRef= {} as ElementRef;
  @ViewChild('acquistato') acquistato: MatOption= {} as MatOption;
  isVisibleCreditiXTeam: boolean;
  public itemSort: EventEmitter<any> = new EventEmitter<any>();
  animal: string;
  name: string;
  sortedData: SortThings[];
  randomCharacter: string;
  pageSlice = this.dt.slice(0,5);
  public pg: PageEvent = new PageEvent;
  sortPrecedente: any;
  ruoloPrecedente: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private matDialog: MatDialog,
    private readonly cd: ChangeDetectorRef,
    private service: TeamService,
    private _snackBar: MatSnackBar){}
  
  ngOnInit() {
    this.sortPrecedente = "";
    this.ruoloPrecedente = "";
    this.pg.length = this.dt.length;
    this.pg.pageIndex = 0;
    this.pg.pageSize = 5;
    this.pg.previousPageIndex = 0;
    this.isVisibleCreditiXTeam = true;
    this.randomCharacter = "";
    this.idlega = this.route.snapshot.paramMap.get('idlega');
    this.nomeLega = this.route.snapshot.paramMap.get('nomelega');
    this.selectTeams = ["-"];
    this.getTeamsXLega();
    this.getPlayersXLega();
  }

  getPlayersXLega() {
    this.service.getPlayersXLega(this.idlega).subscribe(res=>{
      this.dt = res;
      this.pageSlice = this.dt.slice(0,5);
   });
  }

  getTeamsXLega() {
    this.service.getAllTeams(this.idlega).subscribe(res=>{
      this.selectTeams = res;
      this.selectTeamsXCreditiR = res;
   });
  }

  goBack() {
    this.router.navigate(['legaFanta'], {relativeTo: this.route.parent});
  }

  rispristinfiltri() {
    this.service.getPlayersXLega(this.idlega).subscribe(res=>{
      this.dt = res;
      this.pageSlice = this.dt.slice(0,5);
      this.service.getAllTeams(this.idlega).subscribe(res=>{
        this.selectTeamsXCreditiR = res;
        this.cd.detectChanges();
     });
    });
  }

  openDialog(idPlayer: any, ruolo: string) {
    //this.matDialogRef.afterClosed
    this.matDialog.open(CourseDialogComponent , {
      data: {selectTeamsD: this.selectTeams, idPlayerD: idPlayer,ruoloD: ruolo, 
             idLegaD: this.idlega, selectTeamsXCreditiR: this.selectTeamsXCreditiR},
    }).afterClosed().subscribe(
      (data) => {
        if(data==="agg") {
          this.render();
          this.renderCrediti();
        }
      }
    );
  }

  render() {
    this.itemSort.arguments = {active: this.sortPrecedente, direction: 'asc'};
    this.service.getPlayersXLega(this.idlega).subscribe(res=>{
      this.dt = res;
      this.pageSlice = this.dt.slice(0,5);
      if (this.ruoloPrecedente!="") {
        this.filtraRuolo2(this.ruoloPrecedente);
      } else {
        this.sortData2(this.itemSort);
        this.onPageChange2(this.pg);
      }
   });
  }

  renderCrediti() {
    this.service.getAllTeams(this.idlega).subscribe(res=>{
      this.selectTeamsXCreditiR = res;
      this.cd.detectChanges();
   });
  }

  randomLetter() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)];
    this._snackBar.open("Filtro giocatori per " + this.randomCharacter, "chiudi");
    //const regex = new RegExp(`(^${this.randomCharacter}.*)|( ${this.randomCharacter}.*)`, 'i');
    //this.dt = this.dt.filter(x => regex.test(x));
    //console.log(this.dt);
  }

  onPageChange(event: PageEvent) {
    this.pg.length = event.length;
    this.pg.pageIndex = event.pageIndex;
    this.pg.pageSize = event.pageSize;
    this.pg.previousPageIndex = event.previousPageIndex;
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.dt.length) {
      endIndex = this.dt.length;
    }
    this.pageSlice = this.dt.slice(startIndex, endIndex);
  }

  onPageChange2(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.dt.length) {
      endIndex = this.dt.length;
    }
    this.pageSlice = this.dt.slice(startIndex, endIndex);
  }

  sortData(sort: any) {
    this.sortPrecedente = sort.active;
    const data = this.dt.slice();
    if (!sort.active || sort.direction === '') {
      this.pageSlice = data.slice(0,5);
      return;
    }

    this.dt = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'R':
          return compare(a.R, b.R, isAsc);
        case 'Nome':
          return compare(a.Nome, b.Nome, isAsc);
        case 'Squadra':
          return compare(a.Squadra, b.Squadra, isAsc);
        case 'pagato':
          return compare(a.pagato, b.pagato, isAsc);
        default:
          return 0;
      }
    });
    this.pageSlice = this.dt.slice(0,5);
  }

  sortData2(sort: any) {
    const data = this.dt.slice();
    if (!sort.arguments.active || sort.arguments.direction === '') {
      this.pageSlice = data.slice(0,5);
      return;
    }

    this.dt = data.sort((a, b) => {
      const isAsc = sort.arguments.direction === 'asc';
      switch (sort.arguments.active) {
        case 'R':
          return compare(a.R, b.R, isAsc);
        case 'Nome':
          return compare(a.Nome, b.Nome, isAsc);
        case 'Squadra':
          return compare(a.Squadra, b.Squadra, isAsc);
        case 'pagato':
          return compare(a.pagato, b.pagato, isAsc);
        default:
          return 0;
      }
    });
    this.pageSlice = this.dt.slice(0,5);
  }

  filtraRuolo(ruolo: any) {
    this.ruoloPrecedente = ruolo;
    this.service.getPlayersXRuolo(this.idlega,ruolo).subscribe(res=>{
      this.dt = res;
      this.pageSlice = this.dt.slice(0,5);
   });
  }

  filtraRuolo2(ruolo: any) {
    this.ruoloPrecedente = ruolo;
    this.service.getPlayersXRuolo(this.idlega,ruolo).subscribe(res=>{
      this.dt = res;
      this.pageSlice = this.dt.slice(0,5);
      this.sortData2(this.itemSort);
      this.onPageChange2(this.pg);
   });
  }

  hideCreditoXTeam(ob: MatCheckboxChange) {
    if(ob.checked===true) {
      this.isVisibleCreditiXTeam = false;
    } else {
      this.isVisibleCreditiXTeam = true;
    }
  }

  nextPage() {
    this.router.navigate(['summaryFanta', {"idlega":this.idlega, "nomelega":this.nomeLega}], {relativeTo: this.route.parent});
  }
}

function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

export interface SortThings {
  ruolo: string;
  giocatore: string;
  squadra: string;
  pagato: number;
}