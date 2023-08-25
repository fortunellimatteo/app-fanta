package it.gwaysrl.springbootmongo.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="lega")
public class Lega {

    private Integer identificatore;
    private String nameLega;
    private String adminLega;
    private Integer creditoIniziale;
    private boolean flgMercatoInvernale;
    
    public Lega(Integer identificatore ,String nameLega ,String adminLega ,Integer creditoIniziale ,boolean flgMercatoInvernale) {
    	super();
    	this.identificatore = identificatore;
    	this.nameLega = nameLega;
    	this.adminLega = adminLega;
    	this.creditoIniziale = creditoIniziale;
    	this.flgMercatoInvernale = flgMercatoInvernale;
    }

	public Integer getIdentificatore() {
		return identificatore;
	}

	public void setIdentificatore(Integer identificatore) {
		this.identificatore = identificatore;
	}

	public String getNameLega() {
		return nameLega;
	}

	public void setNameLega(String nameLega) {
		this.nameLega = nameLega;
	}

	public String getAdminLega() {
		return adminLega;
	}

	public void setAdminLega(String adminLega) {
		this.adminLega = adminLega;
	}

	public Integer getCreditoIniziale() {
		return creditoIniziale;
	}

	public void setCreditoIniziale(Integer creditoIniziale) {
		this.creditoIniziale = creditoIniziale;
	}

	public boolean isFlgMercatoInvernale() {
		return flgMercatoInvernale;
	}

	public void setFlgMercatoInvernale(boolean flgMercatoInvernale) {
		this.flgMercatoInvernale = flgMercatoInvernale;
	}
}
