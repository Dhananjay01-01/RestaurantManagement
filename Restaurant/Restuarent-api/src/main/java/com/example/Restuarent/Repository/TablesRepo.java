package com.example.Restuarent.Repository;

import com.example.Restuarent.Entity.Tables;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface TablesRepo extends JpaRepository<Tables, Integer> {
    @Transactional
    @Modifying
    @Query("UPDATE Tables t SET t.status = :status WHERE t.id = :id")
    void updateStatusById(String status, int id);
}
