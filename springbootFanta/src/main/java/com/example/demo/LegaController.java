package com.example.demo;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.UpdateLegaDTO;
import com.example.demo.DTO.UpdateMercatoInvernalelegaDTO;

@RestController
public class LegaController {
	private final LegaRepository legaRepos;

	LegaController(LegaRepository repository) {
		this.legaRepos = repository;
	}
	
	@GetMapping({"/leghe/maxId"})
	Integer getMxIdLega() {
		try {
			return this.legaRepos.getMxIdLega();
		} catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}

	@GetMapping({"/leghe"})
	Iterable<Lega> getAllLeghe() {
		try {
			return this.legaRepos.findAll();
		} catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}

	@GetMapping({"/leghe/{id}"})
	Lega getLega(@PathVariable Integer id) {
		return (Lega)this.legaRepos.findById(id).orElseThrow();
	}

    @PostMapping({"/leghe"})
    Lega insertLega(@RequestBody Lega newLega) {
    	try {
    		return (Lega)this.legaRepos.save(newLega);
		} catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
    }

    @DeleteMapping({"/leghe/{id}"})
    void deleteLega(@PathVariable Integer id) {
    	try {
    		this.legaRepos.deleteById(id);
		} catch(Exception e) {
			System.out.println(e.getMessage());
		}
    }
    
    @PatchMapping({"/leghe/mercInv/{id}"})
    Lega updateLega(@PathVariable Integer id, @RequestBody UpdateMercatoInvernalelegaDTO mercInv) {
    	try {
	        Lega legaPatch = (Lega)this.legaRepos.findById(id).orElseThrow();
	        legaPatch.setFlgMercatoInvernale(mercInv.isFlgMercatoInvernale());
	        return (Lega)this.legaRepos.save(legaPatch);
		} catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
    }
    
    @PatchMapping({"/leghe/credito/{idlega}"})
    Lega updateCreditoIni(@PathVariable Integer idlega, @RequestBody UpdateLegaDTO credito) {
    	try {
	        Lega legaPatch = (Lega)this.legaRepos.findById(idlega).orElseThrow();
	        legaPatch.setCreditoIniziale(credito.getCreditoIniziale());
	        return (Lega)this.legaRepos.save(legaPatch);
		} catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
    }
}
