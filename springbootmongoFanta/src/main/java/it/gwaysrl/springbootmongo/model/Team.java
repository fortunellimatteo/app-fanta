package it.gwaysrl.springbootmongo.model;

public class Team {

    private Integer identificatore;
    private String nameTeam;
    private String authorTeam;
    private Integer idLega;
    private Integer creditoResiduo;
    private Integer porR;
    private Integer difR;
    private Integer cenR;
    private Integer attR;
    
    public Team(Integer identificatore, String nameTeam, String authorTeam, Integer idLega, Integer creditoResiduo, Integer porR, Integer difR,
    		Integer cenR, Integer attR) {
    	this.identificatore = identificatore;
    	this.nameTeam = nameTeam;
    	this.authorTeam = authorTeam;
    	this.idLega = idLega;
    	this.creditoResiduo = creditoResiduo;
    	this.porR = porR;
    	this.difR = difR;
    	this.cenR = cenR;
    	this.attR = attR;
    }

	public Integer getIdentificatore() {
		return identificatore;
	}

	public void setIdentificatore(Integer identificatore) {
		this.identificatore = identificatore;
	}

	public String getNameTeam() {
		return nameTeam;
	}

	public void setNameTeam(String nameTeam) {
		this.nameTeam = nameTeam;
	}

	public String getAuthorTeam() {
		return authorTeam;
	}

	public void setAuthorTeam(String authorTeam) {
		this.authorTeam = authorTeam;
	}

	public Integer getIdLega() {
		return idLega;
	}

	public void setIdLega(Integer idLega) {
		this.idLega = idLega;
	}

	public Integer getCreditoResiduo() {
		return creditoResiduo;
	}

	public void setCreditoResiduo(Integer creditoResiduo) {
		this.creditoResiduo = creditoResiduo;
	}

	public Integer getPorR() {
		return porR;
	}

	public void setPorR(Integer porR) {
		this.porR = porR;
	}

	public Integer getDifR() {
		return difR;
	}

	public void setDifR(Integer difR) {
		this.difR = difR;
	}

	public Integer getCenR() {
		return cenR;
	}

	public void setCenR(Integer cenR) {
		this.cenR = cenR;
	}

	public Integer getAttR() {
		return attR;
	}

	public void setAttR(Integer attR) {
		this.attR = attR;
	}

}
