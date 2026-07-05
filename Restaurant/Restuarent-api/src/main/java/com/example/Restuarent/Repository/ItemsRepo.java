package com.example.Restuarent.Repository;

import com.example.Restuarent.Entity.Items;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ItemsRepo extends JpaRepository<Items, Integer> {
}
