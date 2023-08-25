package it.gwaysrl.springbootmongo.dto;

public class UpdatePlayerDTO {
	Integer pagato;
	String team;

	public Integer getPagato() {
		return pagato;
	}
	public void setPagato(Integer pagato) {
		this.pagato = pagato;
	}
	public String getTeam() {
		return team;
	}
	public void setTeam(String team) {
		this.team = team;
	}
}
