package com.example.Restuarent.Repository;

import com.example.Restuarent.Entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrdersRepo extends JpaRepository<Orders,Integer> {
}
