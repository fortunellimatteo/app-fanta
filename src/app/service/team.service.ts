import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamDTO } from '../DTO/TeamDTO';
import { LegaDTO } from '../DTO/LegaDTO';
import { PlayerDTO } from '../DTO/PlayerDTO';
import { UpdatePlayerDTO } from '../DTO/UpdatePlayerDTO';
import { UpdateLegaDTO } from '../DTO/UpdateLegaDTO';
import { UpdateTeamsCreditoResDTO } from '../DTO/UpdateTeamsCreditoResDTO';
import { UpdateTeamsSoloCreditoResDTO } from '../DTO/UpdateTeamsSoloCreditoResDTO';
import { UpdatePlayerXScambioDTO } from '../DTO/UpdatePlayerXScambioDTO';
import { UpdateMercatoInvernalelegaDTO } from '../DTO/UpdateMercatoInvernalelegaDTO';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  ENDPOINT: String = 'https://www.bottelegramfortu.com/form';

  constructor(private http: HttpClient) { }

  // ENDPOINT

  getLogin(username: any, password: any) :Observable<any> {
    return this.http.get(this.ENDPOINT + '/login?username='+username+'&password='+password);
  }

  getMaxIdLega() :Observable<any> {
    return this.http.get(this.ENDPOINT + '/leghe/maxId');
  }

  getAllLeghe():Observable<any> {
    return this.http.get(this.ENDPOINT + '/leghe');
  }

  getLega(id: any):Observable<any> {
    return this.http.get(this.ENDPOINT + '/leghe/'+id);
  }

  insertLega(newLega: LegaDTO) :Observable<any> {
    return this.http.post(this.ENDPOINT + '/leghe', newLega);
  }

  deleteLega(id: number) :Observable<any> {
    return this.http.delete(this.ENDPOINT + '/leghe/'+ id);
  }

  updateLega(id: number, mercInv: UpdateMercatoInvernalelegaDTO) :Observable<any> {
    return this.http.patch(this.ENDPOINT + '/leghe/mercInv/'+id, mercInv)
  }

  updateCreditoIni(idlega: any, credito: UpdateLegaDTO): Observable<any> {
    return this.http.patch(this.ENDPOINT + '/leghe/credito/'+idlega, credito);
  }

  getMaxIdTeam() :Observable<any> {
    return this.http.get(this.ENDPOINT + '/teams/maxId');
  }

  getAllTeams(idlega: any) :Observable<any> {
    return this.http.get(this.ENDPOINT + '/teams?idLega='+idlega);
  }

  insertTeam(newTeam: TeamDTO) :Observable<any> {
    return this.http.post(this.ENDPOINT + '/teams', newTeam);
  }

  deleteTeam(id: number) :Observable<any> {
    return this.http.delete(this.ENDPOINT + '/teams/'+id)
  }

  getCreditoRXTeamAggiornato(idTeam: any): Observable<any> {
    return this.http.get(this.ENDPOINT + '/teams/credAgg/'+idTeam);
  }

  getCreditoRXTeamAggiornatoByName(nameTeam: any): Observable<any> {
    return this.http.get(this.ENDPOINT + '/teams/credByName?nameTeam='+nameTeam);
  }

  updateCreditoRes(idTeam: any ,credito: UpdateTeamsCreditoResDTO): Observable<any> {
    return this.http.patch(this.ENDPOINT + '/teams/credRes/'+idTeam, credito);
  }

  updateCreditoResByname(idt: any ,credito: UpdateTeamsSoloCreditoResDTO): Observable<any> {
    return this.http.patch(this.ENDPOINT + '/teams/soloCredRes/'+idt, credito);
  }

  getMaxIdPlayer() :Observable<any> {
    return this.http.get(this.ENDPOINT + '/players/maxId');
  }

  getPlayer(id: any) :Observable<any>  {
    return this.http.get(this.ENDPOINT + '/players/'+id);
  }

  insertPlayers(newPlayer: Array<PlayerDTO>) :Observable<any> {
    return this.http.post(this.ENDPOINT + '/players', newPlayer);
  }

  insertPlayer(newPlayer: PlayerDTO) :Observable<any> {
    return this.http.post(this.ENDPOINT + '/players', newPlayer);
  }

  getPlayersXLega(idlega: any) :Observable<any>  {
    return this.http.get(this.ENDPOINT + '/players/lega?idLega='+idlega);
  }

  getPlayerXNome(nome: any) :Observable<any>  {
    return this.http.get(this.ENDPOINT + '/players/nome?nome='+nome);
  }

  deletePlayersXLega(id: any) :Observable<any>  {
    return this.http.delete(this.ENDPOINT + '/players/'+id);
  }

  getPlayersXRuolo(idlega: any,ruolo: any): Observable<any>  {
    return this.http.get(this.ENDPOINT + '/players/ruolo?idLega='+idlega+'&r='+ruolo);
  }

  getPlayersComprati(idlega: any) :Observable<any>  {
    return this.http.get(this.ENDPOINT + '/players?idLega='+idlega);
  }

  getPlayersSvincolati(idlega: any) :Observable<any>  {
    return this.http.get(this.ENDPOINT + '/players?idLega='+idlega);
  }

  updatePlayer(idPlayer: any, body:UpdatePlayerDTO): Observable<any> {
    return this.http.patch(this.ENDPOINT + '/players/'+idPlayer,body);
  }

  updatePlayerXScambio(idPlayer: any, body:UpdatePlayerXScambioDTO): Observable<any> {
    return this.http.patch(this.ENDPOINT + '/players/scambio/'+idPlayer,body);
  }

  // LOCALE

  /*getLogin(username: any, password: any) :Observable<any> {
    return this.http.get('http://localhost:3000/login?username='+username+'&password='+password);
  }

  getMaxIdLega() :Observable<any> {
    return this.http.get('http://localhost:3000/leghe/maxId');
  }

  getAllLeghe():Observable<any> {
    return this.http.get('http://localhost:3000/leghe');
  }

  getLega(id: any):Observable<any> {
    return this.http.get('http://localhost:3000/leghe/'+id);
  }

  insertLega(newLega: LegaDTO) :Observable<any> {
    return this.http.post('http://localhost:3000/leghe', newLega);
  }

  deleteLega(id: number) :Observable<any> {
    return this.http.delete('http://localhost:3000/leghe/'+ id);
  }

  updateLega(id: number, mercInv: UpdateMercatoInvernalelegaDTO) :Observable<any> {
    return this.http.patch('http://localhost:3000/leghe/mercInv/'+id, mercInv)
  }

  updateCreditoIni(idlega: any, credito: UpdateLegaDTO): Observable<any> {
    return this.http.patch('http://localhost:3000/leghe/credito/'+idlega, credito);
  }

  getMaxIdTeam() :Observable<any> {
    return this.http.get('http://localhost:3000/teams/maxId');
  }

  getAllTeams(idlega: any) :Observable<any> {
    return this.http.get('http://localhost:3000/teams?idLega='+idlega);
  }

  insertTeam(newTeam: TeamDTO) :Observable<any> {
    return this.http.post('http://localhost:3000/teams', newTeam);
  }

  deleteTeam(id: number) :Observable<any> {
    return this.http.delete('http://localhost:3000/teams/'+id)
  }

  getCreditoRXTeamAggiornato(idTeam: any): Observable<any> {
    return this.http.get('http://localhost:3000/teams/credAgg/'+idTeam);
  }

  getCreditoRXTeamAggiornatoByName(nameTeam: any): Observable<any> {
    return this.http.get('http://localhost:3000/teams/credByName?nameTeam='+nameTeam);
  }

  updateCreditoRes(idTeam: any ,credito: UpdateTeamsCreditoResDTO): Observable<any> {
    return this.http.patch('http://localhost:3000/teams/credRes/'+idTeam, credito);
  }

  updateCreditoResByname(idt: any ,credito: UpdateTeamsSoloCreditoResDTO): Observable<any> {
    return this.http.patch('http://localhost:3000/teams/soloCredRes/'+idt, credito);
  }

  getMaxIdPlayer() :Observable<any> {
    return this.http.get('http://localhost:3000/players/maxId');
  }

  getPlayer(id: any) :Observable<any>  {
    return this.http.get('http://localhost:3000/players/'+id);
  }

  insertPlayers(newPlayer: Array<PlayerDTO>) :Observable<any> {
    return this.http.post('http://localhost:3000/players', newPlayer);
  }

  insertPlayer(newPlayer: PlayerDTO) :Observable<any> {
    return this.http.post('http://localhost:3000/players', newPlayer);
  }

  getPlayersXLega(idlega: any) :Observable<any>  {
    return this.http.get('http://localhost:3000/players/lega?idLega='+idlega);
  }

  getPlayerXNome(nome: any) :Observable<any>  {
    return this.http.get('http://localhost:3000/players/nome?nome='+nome);
  }

  deletePlayersXLega(id: any) :Observable<any>  {
    return this.http.delete('http://localhost:3000/players/'+id);
  }

  getPlayersXRuolo(idlega: any,ruolo: any): Observable<any>  {
    return this.http.get('http://localhost:3000/players/ruolo?idLega='+idlega+'&r='+ruolo);
  }

  getPlayersComprati(idlega: any) :Observable<any>  {
    return this.http.get('http://localhost:3000/players?idLega='+idlega);
  }

  getPlayersSvincolati(idlega: any) :Observable<any>  {
    return this.http.get('http://localhost:3000/players?idLega='+idlega);
  }

  updatePlayer(idPlayer: any, body:UpdatePlayerDTO): Observable<any> {
    return this.http.patch('http://localhost:3000/players/'+idPlayer,body);
  }

  updatePlayerXScambio(idPlayer: any, body:UpdatePlayerXScambioDTO): Observable<any> {
    return this.http.patch('http://localhost:3000/players/scambio/'+idPlayer,body);
  }*/
}
