import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LegaDTO } from 'src/app/DTO/LegaDTO';
import { Configuration, OpenAIApi } from "openai";
import { TeamService } from 'src/app/service/team.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-lega-fanta',
  templateUrl: './lega-fanta.component.html',
  styleUrls: ['./lega-fanta.component.scss']
})
export class LegaFantaComponent implements OnInit{

  public datasource: Array<any> = new Array<any>();
  displayedColumns: string[] = ['id', 'nameLega', 'adminLega', 'btn'];

  @ViewChild('legaNome') legaNome: ElementRef;
  @ViewChild('admin') admin: ElementRef;
  idlega: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private matDialog: MatDialog,
    private readonly cd: ChangeDetectorRef,
    private service: TeamService,
    private _snackBar: MatSnackBar){}

  ngOnInit() {
    /* KEY for API chatGPT - 
      curl https://api.openai.com/v1/chat/completions \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer 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" \
      -d '{
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": "Say this is a test!"}],
        "temperature": 0.7
      }'
    */

    /*const configuration = new Configuration({
      apiKey: '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',
    });
    const openai = new OpenAIApi(configuration);

    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: "Hello world"}],
    });

    console.log(chatCompletion.data.choices[0].message);*/

    let l = 0;
    this.service.getMaxIdLega().subscribe(res=>{
      l = res;
      this.idlega = l + 1;
      console.log(l);
      console.log(this.idlega);
      this.service.getAllLeghe().subscribe(res=>{
        this.datasource = res;
     });
    });
  }

  createAndNext() {
    if (this.legaNome.nativeElement.value != "" && this.admin.nativeElement.value) {
      let tipoNav: any = 'homeFanta';
      let nome = null;
      let id = null;
      let nomenuovalega = this.legaNome.nativeElement.value;
      let adminnuovalega = this.admin.nativeElement.value;
      let idnuovalega = this.idlega;
      this.matDialog.open(LoginDialogComponent , {
        data: {nome, id, tipoNav, nomenuovalega, adminnuovalega, idnuovalega},
      });
    } else {
      this._snackBar.open("Inserire il nome della lega e admin","Chiudi");
    }
  }

  deleteLega(id: number) {
    let teamxl = new Array();
    let playersxl = new Array();
    this.service.getAllTeams(id).subscribe(rest=>{
      teamxl = rest;
      this.service.getPlayersXLega(id).subscribe(resp=>{
        playersxl = resp;
        this.service.deleteLega(id).subscribe(res=>{
          for(let i = 0;i<teamxl.length;i++) {
            this.service.deleteTeam(teamxl[i].id).subscribe(res=>{
              for(let j = 0;j<playersxl.length;j++) {
                this.service.deletePlayersXLega(playersxl[j].id).subscribe(res=>{

                });
              }
            });
          }
          this.service.getAllLeghe().subscribe(res=>{
            this.datasource = res;
          });
          this._snackBar.open("Eliminata lega con team e giocatori","Chiudi");
        });
      });
    });
  }

  accediLega(element :any) {
    //this.router.navigate(['summaryFanta', {"nomelega": element.nameLega,"idlega": element.id}],
    // {relativeTo: this.route.parent});
    let tipoNav: any = 'summaryFanta';
    let nome = element.nameLega;
    let id = element.id;
    this.matDialog.open(LoginDialogComponent , {
      data: {nome, id, tipoNav},
    });
  }
}
