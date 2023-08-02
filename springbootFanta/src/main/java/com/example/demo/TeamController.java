package com.example.demo;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.DTO.UpdateTeamsCreditoResDTO;
import com.example.demo.DTO.UpdateTeamsSoloCreditoResDTO;

@RestController
public class TeamController {
	private final TeamRepository teamRepos;
	
	TeamController(TeamRepository repository) {
		this.teamRepos = repository;
	}
	
	@GetMapping({"/teams/maxId"})
	Integer getMxIdTeam() {
		try {
			return this.teamRepos.getMxIdTeam();
		} catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}
	
	@GetMapping({"/teams/{idlega}"})
	Iterable<Team> getAllTeams(@PathVariable Integer idlega) {
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
    		this.teamRepos.deleteById(id);
		} catch(Exception e) {
			System.out.println(e.getMessage());
		}
    }
    
    @GetMapping({"/teams/credAgg/{idTeam}"})
    Team getCreditoRXTeamAggiornato(@PathVariable Integer idTeam) {
    	try {
    		return (Team)this.teamRepos.findById(idTeam).orElseThrow();
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
	    	Team teamPatch = (Team)this.teamRepos.findById(idTeam).orElseThrow();
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
	    	Team teamPatch = (Team)this.teamRepos.findById(idt).orElseThrow();
	    	teamPatch.setCreditoResiduo(credito.getCreditoResiduo());
	        return (Team)this.teamRepos.save(teamPatch);
		} catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
    }
}
