import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdatePlayerDTO } from 'src/app/DTO/UpdatePlayerDTO';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TeamService } from 'src/app/service/team.service';
import { UpdateTeamsCreditoResDTO } from 'src/app/DTO/UpdateTeamsCreditoResDTO';
import { PlayersFantaComponent } from '../players-fanta/players-fanta.component';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.scss']
})
export class CourseDialogComponent implements OnInit{

  @ViewChild('pagato') pagato: ElementRef= {} as ElementRef;
  @ViewChild('acquistato') acquistato: MatSelect= {} as MatSelect;
  public selectTeams: Array<any> = new Array<any>();
  selectedTeam: string;
  //nomeLega: any;
  idlega: any;
  cILega: any;

  constructor(private dialogRef: MatDialogRef<CourseDialogComponent>,
              private service: TeamService,
              private route: ActivatedRoute,
              private readonly cd: ChangeDetectorRef,
              private router: Router,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
    this.idlega = this.data.idLegaD;
    //this.nomeLega = this.route.snapshot.paramMap.get('nomelega');
    this.selectTeams = this.data.selectTeamsD;
    this.service.getLega(this.idlega).subscribe(res=>{
      this.cILega = res.creditoIniziale;
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    let idTeamD = 0;
    let creditoAgg = 0;
    let porR = 0;
    let difR = 0;
    let cenR = 0;
    let attR = 0;
    for(let i=0;i<this.selectTeams.length;i++) {
      if(this.acquistato.value === this.selectTeams[i].nameTeam) {
        idTeamD = this.selectTeams[i].id
      }
    }
    if ((this.pagato.nativeElement.value != null && this.pagato.nativeElement.value != "" && this.pagato.nativeElement.value != undefined) &&
      (this.acquistato.value != null && this.acquistato.value != "" && this.acquistato.value != undefined)
      && this.pagato.nativeElement.value < this.cILega) {
        let updateCreditoR = new UpdateTeamsCreditoResDTO;
        this.service.getCreditoRXTeamAggiornato(idTeamD).subscribe(res=>{
        creditoAgg = res.creditoResiduo;
        porR = res.porR;
        difR = res.difR;
        cenR = res.cenR;
        attR = res.attR;
        updateCreditoR.creditoResiduo = creditoAgg - +this.pagato.nativeElement.value;
        if (this.data.ruoloD === 'P') {
          updateCreditoR.porR = porR-1;
        }
        if (this.data.ruoloD === 'D') {
          updateCreditoR.difR = difR-1;
        }
        if (this.data.ruoloD === 'C') {
          updateCreditoR.cenR = cenR-1;
        } 
        if (this.data.ruoloD === 'A') {
          updateCreditoR.attR = attR-1;
        }
        let updateP = new UpdatePlayerDTO;
        updateP.team = this.acquistato.value;
        updateP.pagato = +this.pagato.nativeElement.value;
        this.service.updatePlayer(this.data.idPlayerD, updateP).subscribe(resp=>{
          this.service.updateCreditoRes(idTeamD,updateCreditoR).subscribe(resC=>{
            this.dialogRef.close("agg");
            this._snackBar.open("giocatore e credito del team aggiornati", "chiudi");
            this.cd.detectChanges();
          });
        });
      });
    }
  }
}

export interface DialogData {
  selectTeamsD: any[],
  idPlayerD: number,
  ruoloD: string,
  idLegaD: number,
  selectTeamsXCreditiR: any[];
}