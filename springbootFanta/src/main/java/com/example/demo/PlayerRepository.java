package com.example.demo;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface PlayerRepository extends CrudRepository<Player, Integer>{
	
	@Query("SELECT COALESCE(MAX(id), 0) FROM Player")
	Integer getMxIdPlayer();
	
	@Query("SELECT new com.example.demo.Player(t.id, t.r, t.rm, t.nome, t.squadra,"
			+ "t.quotaI, t.idLega, t.pagato, t.team) FROM Player t WHERE t.idLega = :idLega")
	Iterable<Player> getPlayersXLega(Integer idLega);
	
	@Query("SELECT new com.example.demo.Player(t.id, t.r, t.rm, t.nome, t.squadra,"
			+ "t.quotaI, t.idLega, t.pagato, t.team) FROM Player t WHERE t.nome = :nome")
	Player getPlayerXNome(String nome);
	
	@Query("SELECT new com.example.demo.Player(t.id, t.r, t.rm, t.nome, t.squadra,"
			+ "t.quotaI, t.idLega, t.pagato, t.team) FROM Player t WHERE t.idLega = :idLega AND t.r = :ruolo")
	Iterable<Player> getPlayersXRuolo(Integer idLega,String ruolo);
	
	@Query("SELECT new com.example.demo.Player(t.id, t.r, t.rm, t.nome, t.squadra,"
			+ "t.quotaI, t.idLega, t.pagato, t.team) FROM Player t WHERE t.idLega = :idLega AND t.team != ''"
			+ "ORDER BY 2 DESC, 9 DESC")
	Iterable<Player> getPlayersComprati(Integer idLega);
	
	@Query("SELECT new com.example.demo.Player(t.id, t.r, t.rm, t.nome, t.squadra,"
			+ "t.quotaI, t.idLega, t.pagato, t.team) FROM Player t WHERE t.idLega = :idLega AND t.team = ''"
			+ "ORDER BY 2 DESC, 4 ASC")
	Iterable<Player> getPlayersSvincolati(Integer idLega);
}
