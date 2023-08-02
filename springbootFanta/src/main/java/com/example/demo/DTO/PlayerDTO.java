package com.example.demo.DTO;

public class PlayerDTO {
	
    private Integer id;
    private String r;
    private String rm;
    private String nome;
    private String squadra;
    private Integer quotaI;
    private Integer idLega;
    private Integer pagato;
    private String team;
    
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getQuotaI() {
		return quotaI;
	}

	public void setQuotaI(Integer quotaI) {
		this.quotaI = quotaI;
	}

	public Integer getIdLega() {
		return idLega;
	}

	public void setIdLega(Integer idLega) {
		this.idLega = idLega;
	}

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

	public String getR() {
		return r;
	}

	public void setR(String r) {
		this.r = r;
	}

	public String getRm() {
		return rm;
	}

	public void setRm(String rm) {
		this.rm = rm;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getSquadra() {
		return squadra;
	}

	public void setSquadra(String squadra) {
		this.squadra = squadra;
	}
}
