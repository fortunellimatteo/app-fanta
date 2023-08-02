package com.example.demo;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface TeamRepository extends CrudRepository<Team, Integer> {
	@Query("SELECT COALESCE(MAX(id), 0) FROM Team")
	Integer getMxIdTeam();
	
	@Query("SELECT new com.example.demo.Team(t.id, t.nameTeam, t.authorTeam, t.idLega, t.creditoResiduo,"
			+ "t.porR, t.difR, t.cenR, t.attR) FROM Team t WHERE t.idLega = :idlega")
	Iterable<Team> getAllTeams(Integer idlega);
	
	@Query("SELECT new com.example.demo.Team(t.id, t.nameTeam, t.authorTeam, t.idLega, t.creditoResiduo,"
			+ "t.porR, t.difR, t.cenR, t.attR) FROM Team t WHERE t.nameTeam = :nameTeam")
	Team getCreditoRXTeamAggiornatoByName(String nameTeam);
}