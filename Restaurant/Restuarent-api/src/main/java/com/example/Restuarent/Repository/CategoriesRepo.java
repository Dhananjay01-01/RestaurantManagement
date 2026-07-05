package com.example.Restuarent.Repository;

import com.example.Restuarent.Entity.Categories;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriesRepo extends JpaRepository<Categories,Integer> {
}
