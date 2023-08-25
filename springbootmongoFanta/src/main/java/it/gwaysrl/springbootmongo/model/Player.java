package it.gwaysrl.springbootmongo.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="player")
public class Player {

    private Integer identificatore;
	private String r;
    private String rm;
    private String nome;
    private String squadra;
    private Integer quotaI;
    private Integer idLega;
    private Integer pagato;
    private String team;
    
    public Player(Integer identificatore, String r, String rm, String nome, String squadra, Integer quotaI, Integer idLega,
    		Integer pagato, String team) {
    	super();
    	this.identificatore = identificatore;
    	this.r = r;
    	this.rm = rm;
    	this.nome = nome;
    	this.squadra = squadra;
    	this.quotaI = quotaI;
    	this.idLega = idLega;
    	this.pagato = pagato;
    	this.team = team;
    }

    public Integer getIdentificatore() {
		return identificatore;
	}

	public void setIdentificatore(Integer identificatore) {
		this.identificatore = identificatore;
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
