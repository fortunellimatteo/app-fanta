import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { CourseDialogComponent, DialogData } from '../course-dialog/course-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from 'src/app/service/team.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LegaDTO } from 'src/app/DTO/LegaDTO';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  @ViewChild('username') username: ElementRef= {} as ElementRef;
  @ViewChild('password') password: ElementRef= {} as ElementRef;

  constructor(private dialogRef: MatDialogRef<CourseDialogComponent>,
    private service: TeamService,
    private route: ActivatedRoute,
    private readonly cd: ChangeDetectorRef,
    private router: Router,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataLogin) {}

  ngOnInit(): void {
    
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    console.log(this.username.nativeElement.value, this.password.nativeElement.value);
    this.service.getLogin(this.username.nativeElement.value, this.password.nativeElement.value).subscribe(res=>{
      if(res.length>0) {
        console.log(res);
        if (this.data.tipoNav === 'summaryFanta') {
          console.log("prova1");
          this.dialogRef.close();
          this.router.navigate(['summaryFanta', {"nomelega": this.data.nome,"idlega": this.data.id}],
          {relativeTo: this.route.parent});
        } else if('homeFanta') {
          console.log("prova2");
          let newLega = new LegaDTO;
          newLega.id = this.data.idnuovalega;
          newLega.nameLega = this.data.nomenuovalega;
          newLega.adminLega = this.data.adminnuovalega;
          newLega.creditoIniziale = 0;
          newLega.flgMercatoInvernale = false;
          this.dialogRef.close();
          this.service.insertLega(newLega).subscribe(res=>{
            this.router.navigate(['homeFanta', {"nomelega": this.data.nomenuovalega,"idlega":this.data.idnuovalega}],
            {relativeTo: this.route.parent});
          })
        }
      } else {
        this._snackBar.open("Attenzione: username o password non corretti", "Chiudi");
      }
    });
  }
}

export interface DialogDataLogin {
  nome: string,
  id: number,
  tipoNav: string;
  nomenuovalega: string;
  adminnuovalega: string;
  idnuovalega: number;
}