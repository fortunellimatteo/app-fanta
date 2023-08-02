package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Player {

    @Id
    private Integer id;
    private String r;
    private String rm;
    private String nome;
    private String squadra;
    private Integer quotaI;
    private Integer idLega;
    private Integer pagato;
    private String team;
    
    Player() {}
    
    public Player(Integer id, String r, String rm, String nome, String squadra, Integer quotaI, Integer idLega,
    		Integer pagato, String team) {
    	this.id = id;
    	this.r = r;
    	this.rm = rm;
    	this.nome = nome;
    	this.squadra = squadra;
    	this.quotaI = quotaI;
    	this.idLega = idLega;
    	this.pagato = pagato;
    	this.team = team;
    }

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
