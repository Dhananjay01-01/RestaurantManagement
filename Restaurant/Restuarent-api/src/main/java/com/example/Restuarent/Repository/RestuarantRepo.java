package com.example.Restuarent.Repository;

import com.example.Restuarent.Entity.Restuarants;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestuarantRepo extends JpaRepository<Restuarants,String> {
}
