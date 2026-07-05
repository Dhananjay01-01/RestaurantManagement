package com.example.Restuarent.Controller;

import com.example.Restuarent.Entity.Offers;
import com.example.Restuarent.Entity.Orders;
import com.example.Restuarent.Repository.OffersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class OfferController {
    @Autowired
    private OffersRepo offersRepo;

    @GetMapping("getoffer")
    public ResponseEntity<?> getoffer(){
        List<Offers> use = offersRepo.findAll();
        return new ResponseEntity<>(use, HttpStatus.OK);
    }

    @PostMapping("postoffer")
    public ResponseEntity<?> postorders(@RequestBody Offers obj){
        Offers use = offersRepo.save(obj);
        return new ResponseEntity<>(use,HttpStatus.OK);
    }

    @DeleteMapping("deleteoffer/{id}")
    public ResponseEntity<?> deleteofffer(@PathVariable int id){
        offersRepo.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("putoffer")
    public ResponseEntity<?> putoffer(@RequestBody Offers obj){
        Offers use = offersRepo.save(obj);
        return new ResponseEntity<>(use,HttpStatus.OK);
    }
}
