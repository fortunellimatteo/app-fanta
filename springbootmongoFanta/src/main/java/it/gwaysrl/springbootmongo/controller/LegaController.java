package it.gwaysrl.springbootmongo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.gwaysrl.springbootmongo.dto.UpdateLegaDTO;
import it.gwaysrl.springbootmongo.dto.UpdateMercatoInvernalelegaDTO;
import it.gwaysrl.springbootmongo.model.Lega;
import it.gwaysrl.springbootmongo.repository.LegaRepository;

@RestController
@RequestMapping("/api")
public class LegaController {
	@Autowired
	private LegaRepository legaRepos;
	
	@Autowired
	private MongoTemplate mongoTemplate;
	
	@GetMapping({"/leghe/maxId"})
	Integer getMxIdLega() {
		try {

	        Query query = new Query();
	        query.with(Sort.by(Sort.Direction.DESC, "identificatore"));
	        query.limit(1);

	        List<Lega> documents = mongoTemplate.find(query, Lega.class, "lega");
	        
	        if (documents.isEmpty()) {
	            return Integer.valueOf(0);
	        }

	        return documents.get(0).getIdentificatore();

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
	Lega getLega(@PathVariable Integer id) throws Exception {
		return this.legaRepos.findByidentificatore(id);
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
    		this.legaRepos.deleteByidentificatore(id);
		} catch(Exception e) {
			System.out.println(e.getMessage());
		}
    }

    @PatchMapping({"/leghe/mercInv/{id}"})
    Lega updateLega(@PathVariable Integer id, @RequestBody UpdateMercatoInvernalelegaDTO mercInv) {
    	try {
	        Lega legaPatch = (Lega)this.legaRepos.findByidentificatore(id);
	        this.legaRepos.deleteByidentificatore(id);
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
	        Lega legaPatch = (Lega)this.legaRepos.findByidentificatore(idlega);
	        this.legaRepos.deleteByidentificatore(idlega);
	        legaPatch.setCreditoIniziale(credito.getCreditoIniziale());
	        return (Lega)this.legaRepos.save(legaPatch);
		} catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
    }
}
