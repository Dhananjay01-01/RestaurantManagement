package com.example.Restuarent.Repository;


import com.example.Restuarent.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User,String> {
}
