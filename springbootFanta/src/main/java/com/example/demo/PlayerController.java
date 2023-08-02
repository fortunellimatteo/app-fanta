package com.example.demo;

import java.util.ArrayList;
import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.DTO.PlayerDTO;
import com.example.demo.DTO.UpdatePlayerDTO;
import com.example.demo.DTO.UpdatePlayerXScambioDTO;

@RestController
public class PlayerController {
	private final PlayerRepository playerRepos;
	
	PlayerController(PlayerRepository playerRepos) {
		this.playerRepos = playerRepos;
	}

	@GetMapping({"/players/maxId"})
	Integer getMxIdPlayer() {
		try {
			return this.playerRepos.getMxIdPlayer();
		} catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}
	
	@GetMapping({"/players/{id}"})
	Player getPlayer(@PathVariable Integer id) {
		try {
			return (Player)this.playerRepos.findById(id).orElseThrow();
		} catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}

	@PostMapping({"/players/list"})
	List<Player> insertPlayers(@RequestBody List<PlayerDTO> newPlayer) {
    	try {
    	    List<Player> result = new ArrayList<Player>();
    		for(PlayerDTO p : newPlayer) {
    			Player obj = new Player();
    			obj.setId(p.getId());
    			obj.setR(p.getR());
    			obj.setRm(p.getRm());
    			obj.setNome(p.getNome());
    			obj.setSquadra(p.getSquadra());
    			obj.setIdLega(p.getIdLega());
    			obj.setTeam(p.getTeam());
    			obj.setPagato(p.getPagato());
    			obj.setQuotaI(p.getQuotaI());
    			
    			result.add(obj);
    		}
    		return (List<Player>)this.playerRepos.saveAll(result);
		} catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}

	@PostMapping({"/players"})
	Player insertPlayer(@RequestBody PlayerDTO newPlayer) {
    	try {
			Player obj = new Player();
			obj.setId(newPlayer.getId());
			obj.setR(newPlayer.getR());
			obj.setRm(newPlayer.getRm());
			obj.setNome(newPlayer.getNome());
			obj.setSquadra(newPlayer.getSquadra());
			obj.setIdLega(newPlayer.getIdLega());
			obj.setTeam(newPlayer.getTeam());
			obj.setPagato(newPlayer.getPagato());
			obj.setQuotaI(newPlayer.getQuotaI());

    		return (Player)this.playerRepos.save(obj);
		} catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}
	
	@GetMapping({"/players/lega/{idLega}"})
	Iterable<Player> getPlayersXLega(@PathVariable Integer idLega) {
		try {
			return this.playerRepos.getPlayersXLega(idLega);
		} catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}
	
	@GetMapping({"/players/nome/{nome}"})
	Player getPlayerXNome(@PathVariable String nome) {
		try {
			return this.playerRepos.getPlayerXNome(nome);
		} catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}
	
    @DeleteMapping({"/players/{id}"})
    void deletePlayersXLega(@PathVariable Integer id) {
    	try {
    		this.playerRepos.deleteById(id);
		} catch(Exception e) {
			System.out.println(e.getMessage());
		}
    }
    
	@GetMapping({"/players/ruolo/{idLega}/{ruolo}"})
	Iterable<Player> getPlayersXRuolo(@PathVariable Integer idLega, @PathVariable String ruolo) {
		try {
			return this.playerRepos.getPlayersXRuolo(idLega, ruolo);
		} catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}
	
	@GetMapping({"/players/comprati/{idLega}"})
	Iterable<Player> getPlayersComprati(@PathVariable Integer idLega) {
		try {
			return this.playerRepos.getPlayersComprati(idLega);
		} catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}
	
	@GetMapping({"/players/svincolati/{idLega}"})
	Iterable<Player> getPlayersSvincolati(@PathVariable Integer idLega) {
		try {
			return this.playerRepos.getPlayersSvincolati(idLega);
		} catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}
	
    @PatchMapping({"/players/{idPlayer}"})
    Player updatePlayer(@PathVariable Integer idPlayer, @RequestBody UpdatePlayerDTO body) {
    	try {
	    	Player playerPatch = (Player)this.playerRepos.findById(idPlayer).orElseThrow();
	    	playerPatch.setPagato(body.getPagato());
	    	playerPatch.setTeam(body.getTeam());
	        return (Player)this.playerRepos.save(playerPatch);
		} catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
    }
	
    @PatchMapping({"/players/scambio/{idPlayer}"})
    Player updatePlayerXScambio(@PathVariable Integer idPlayer, @RequestBody UpdatePlayerXScambioDTO body) {
    	try {
	    	Player playerPatch = (Player)this.playerRepos.findById(idPlayer).orElseThrow();
	    	playerPatch.setTeam(body.getTeam());
	        return (Player)this.playerRepos.save(playerPatch);
		} catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
    }
}
