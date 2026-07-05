package com.example.Restuarent.Controller;

import com.example.Restuarent.Entity.Orders;
import com.example.Restuarent.Repository.OrdersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class OrdersController {
    @Autowired
    private OrdersRepo ordersrepo;

    @GetMapping("getorders")
    public ResponseEntity<?> getorders(){
        List<Orders> use = ordersrepo.findAll();
        return new ResponseEntity<>(use, HttpStatus.OK);
    }

    @PostMapping("postorders")
    public ResponseEntity<?> postorders(@RequestBody Orders obj){
        Orders use = ordersrepo.save(obj);
        return new ResponseEntity<>(use,HttpStatus.OK);
    }

    @PutMapping("putorders")
    public ResponseEntity<?> putorders(@RequestBody Orders obj){
        Orders use = ordersrepo.save(obj);
        return new ResponseEntity<>(use,HttpStatus.OK);
    }
}
