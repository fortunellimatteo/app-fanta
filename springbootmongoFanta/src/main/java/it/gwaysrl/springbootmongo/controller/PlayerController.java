package it.gwaysrl.springbootmongo.controller;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import it.gwaysrl.springbootmongo.dto.PlayerDTO;
import it.gwaysrl.springbootmongo.dto.UpdatePlayerDTO;
import it.gwaysrl.springbootmongo.dto.UpdatePlayerXScambioDTO;
import it.gwaysrl.springbootmongo.model.Player;
import it.gwaysrl.springbootmongo.repository.PlayerRepository;

@RestController
@RequestMapping("/api")
public class PlayerController {

	@Autowired
	private PlayerRepository playerRepos;
	
	@Autowired
	private MongoTemplate mongoTemplate;

	@GetMapping({"/players/maxId"})
	Integer getMxIdPlayer() {
		try {
			try {

		        Query query = new Query();
		        query.with(Sort.by(Sort.Direction.DESC, "identificatore"));
		        query.limit(1);

		        List<Player> documents = mongoTemplate.find(query, Player.class, "player");
		        
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
	
	@GetMapping({"/players/{id}"})
	Player getPlayer(@PathVariable Integer id) {
		try {
			return (Player)this.playerRepos.findByidentificatore(id);
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
    			Player obj = new Player(null, null, null, null, null, null, null, null, null);
    			obj.setIdentificatore(p.getIdentificatore());
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
			Player obj = new Player(null, null, null, null, null, null, null, null, null);
			obj.setIdentificatore(newPlayer.getIdentificatore());
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
    		this.playerRepos.deleteByIdentificatore(id);
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
	List<Player> getPlayersComprati(@PathVariable Integer idLega) {
		try {
		    Query query = new Query();
		    query.addCriteria(Criteria.where("idLega").is(idLega));
		    query.addCriteria(Criteria.where("team").ne(""));
		    query.with(Sort.by(Sort.Direction.DESC, "r"));
		    query.with(Sort.by(Sort.Direction.DESC, "team"));
		    List<Player> items = new ArrayList<Player>();
		    items = mongoTemplate.find(query, Player.class);
		    
		    return items;
		} catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}
	
	@GetMapping({"/players/svincolati/{idLega}"})
	Iterable<Player> getPlayersSvincolati(@PathVariable Integer idLega) {
		try {
		    Query query = new Query();
		    query.addCriteria(Criteria.where("idLega").is(idLega));
		    query.addCriteria(Criteria.where("team").is(""));
		    query.with(Sort.by(Sort.Direction.DESC, "r"));
		    query.with(Sort.by(Sort.Direction.ASC, "nome"));
		    List<Player> items = new ArrayList<Player>();
		    items = mongoTemplate.find(query, Player.class);
		    
		    return items;
		} catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}
	
    @PatchMapping({"/players/{idPlayer}"})
    Player updatePlayer(@PathVariable Integer idPlayer, @RequestBody UpdatePlayerDTO body) {
    	try {
	    	Player playerPatch = (Player)this.playerRepos.findByidentificatore(idPlayer);
	    	this.playerRepos.deleteByIdentificatore(idPlayer);
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
	    	Player playerPatch = (Player)this.playerRepos.findByidentificatore(idPlayer);
	    	this.playerRepos.deleteByIdentificatore(idPlayer);
	    	playerPatch.setTeam(body.getTeam());
	        return (Player)this.playerRepos.save(playerPatch);
		} catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
    }
}
