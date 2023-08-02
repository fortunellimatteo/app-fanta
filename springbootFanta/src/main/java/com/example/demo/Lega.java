package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Lega {

    @Id
    private Integer id;
    private String nameLega;
    private String adminLega;
	private Integer creditoIniziale;
    private boolean flgMercatoInvernale;
  
    Lega() {}
  
    public Lega(Integer id, String nameLega, String adminLega, Integer creditoIniziale, boolean flgMercatoInvernale) {
      this.id = id;
      this.nameLega = nameLega;
      this.adminLega = adminLega;
      this.creditoIniziale = creditoIniziale;
      this.flgMercatoInvernale = flgMercatoInvernale;
    }

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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
