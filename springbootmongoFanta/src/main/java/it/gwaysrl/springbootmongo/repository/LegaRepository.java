package it.gwaysrl.springbootmongo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import it.gwaysrl.springbootmongo.model.Lega;

public interface LegaRepository extends MongoRepository<Lega, Integer>{

    @Query("{ 'identificatore' : ?0 }")
    Lega findByidentificatore(Integer id);

    void deleteByidentificatore(Integer id);
}
