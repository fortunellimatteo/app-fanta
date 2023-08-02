package com.example.demo;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface LegaRepository extends CrudRepository<Lega, Integer> {
	@Query("SELECT COALESCE(MAX(id), 0) FROM Lega")
	Integer getMxIdLega();
}
