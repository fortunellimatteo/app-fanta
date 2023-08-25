package it.gwaysrl.springbootmongo.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import it.gwaysrl.springbootmongo.model.Team;

public interface TeamRepository extends MongoRepository<Team, Integer> {

	@Query("{ 'idLega' : ?0 }")
	List<Team> getAllTeams(Integer idLega);
	
	void deleteByIdentificatore(Integer id);
	
	@Query("{ 'identificatore' : ?0 }")
	Team findByIdentificatore(Integer idTeam);
	
	@Query("{ 'nameTeam' : ?0 }")
	Team getCreditoRXTeamAggiornatoByName(String nameTeam);
}
