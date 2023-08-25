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

import it.gwaysrl.springbootmongo.dto.UpdateTeamsCreditoResDTO;
import it.gwaysrl.springbootmongo.dto.UpdateTeamsSoloCreditoResDTO;
import it.gwaysrl.springbootmongo.model.Team;
import it.gwaysrl.springbootmongo.repository.TeamRepository;

@RestController
@RequestMapping("/api")
public class TeamController {

	@Autowired
	private TeamRepository teamRepos;
	
	@Autowired
	private MongoTemplate mongoTemplate;
	
	@GetMapping({"/teams/maxId"})
	Integer getMxIdTeam() {
		try {
			try {

		        Query query = new Query();
		        query.with(Sort.by(Sort.Direction.DESC, "identificatore"));
		        query.limit(1);

		        List<Team> documents = mongoTemplate.find(query, Team.class, "team");
		        
		        if (documents.isEmpty()) {
		            return Integer.valueOf(0);
		        }

		        return documents.get(0).getIdentificatore();

			} catch(Exception e) {
				System.out.println(e.getMessage());
				return null;
			}
		} catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}
	
	@GetMapping({"/teams/{idlega}"})
	List<Team> getAllTeams(@PathVariable Integer idlega) {
		try {
			return this.teamRepos.getAllTeams(idlega);
		} catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}

   @PostMapping({"/teams"})
    Team insertTeam(@RequestBody Team newTeam) {
    	try {
    		return (Team)this.teamRepos.save(newTeam);
		} catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
    }

   @DeleteMapping({"/teams/{id}"})
    void deleteLega(@PathVariable Integer id) {
    	try {
    		this.teamRepos.deleteByIdentificatore(id);
		} catch(Exception e) {
			System.out.println(e.getMessage());
		}
    }
    
   @GetMapping({"/teams/credAgg/{idTeam}"})
    Team getCreditoRXTeamAggiornato(@PathVariable Integer idTeam) {
    	try {
    		return (Team)this.teamRepos.findByIdentificatore(idTeam);
		} catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
    }
    
   @GetMapping({"/teams/credByName/{nameTeam}"})
    Team getCreditoRXTeamAggiornatoByName(@PathVariable String nameTeam) {
    	try {
    		return (Team)this.teamRepos.getCreditoRXTeamAggiornatoByName(nameTeam);
		} catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
    }
    
    @PatchMapping({"/teams/credRes/{idTeam}"})
    Team updateCreditoRes(@PathVariable Integer idTeam, @RequestBody UpdateTeamsCreditoResDTO credito) {
    	try {
	    	Team teamPatch = (Team)this.teamRepos.findByIdentificatore(idTeam);
	    	this.teamRepos.deleteByIdentificatore(idTeam);
	    	teamPatch.setCreditoResiduo(credito.getCreditoResiduo());
	    	teamPatch.setPorR(credito.getPorR());
	    	teamPatch.setDifR(credito.getDifR());
	    	teamPatch.setCenR(credito.getCenR());
	    	teamPatch.setAttR(credito.getAttR());
	        return (Team)this.teamRepos.save(teamPatch);
		} catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
    }

    @PatchMapping({"/teams/soloCredRes/{idt}"})
    Team updateCreditoResByname(@PathVariable Integer idt, @RequestBody UpdateTeamsSoloCreditoResDTO credito) {
    	try {
	    	Team teamPatch = (Team)this.teamRepos.findByIdentificatore(idt);
	    	this.teamRepos.deleteByIdentificatore(idt);
	    	teamPatch.setCreditoResiduo(credito.getCreditoResiduo());
	        return (Team)this.teamRepos.save(teamPatch);
		} catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
    }
}
