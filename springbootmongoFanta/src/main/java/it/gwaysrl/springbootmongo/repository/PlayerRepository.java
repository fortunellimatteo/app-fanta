package it.gwaysrl.springbootmongo.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import it.gwaysrl.springbootmongo.model.Player;

public interface PlayerRepository extends MongoRepository<Player, Integer>{

	
    @Query("{ 'identificatore' : ?0 }")
    Player findByidentificatore(Integer id);
    
    @Query("{ 'idLega' : ?0 }")
    List<Player> getPlayersXLega(Integer idLega);
    
    @Query("{ 'nome' : ?0 }")
    Player getPlayerXNome(String nome);

    void deleteByIdentificatore(Integer id);
    
    @Query("{ 'idLega' : ?0, 'r' : ?1}")
    List<Player> getPlayersXRuolo(Integer idLega, String ruolo);
}
