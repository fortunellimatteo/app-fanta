package it.gwaysrl.springbootmongo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import it.gwaysrl.springbootmongo.model.Login;

public interface LoginRepository extends MongoRepository<Login, String>{

	@Query("{ 'username' : ?0, 'password' : ?1 }")
	Login getLogin(String username, String password);
}
