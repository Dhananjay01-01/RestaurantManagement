package com.example.Restuarent.Controller;

import com.example.Restuarent.Entity.Items;
import com.example.Restuarent.Repository.ItemsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class ItemController {
    @Autowired
    private ItemsRepo itemsRepo;

    @GetMapping("getitems")
    public ResponseEntity<?> getitems(){
        List<Items> use = itemsRepo.findAll();
        return new ResponseEntity<>(use, HttpStatus.OK);
    }

    @GetMapping("getbyid/{id}")
    public ResponseEntity<?> getitems(@PathVariable int id){
        Optional<Items> use = itemsRepo.findById(id);
        return new ResponseEntity<>(use, HttpStatus.OK);
    }
    @PostMapping("postitems")
    public ResponseEntity<?> postmitems(@RequestBody Items obj){
        Items use = itemsRepo.save(obj);
        return new ResponseEntity<>(use,HttpStatus.OK);
    }

    @PutMapping("putitems")
    public ResponseEntity<?> putmitems(@RequestBody Items obj){
        Items use = itemsRepo.save(obj);
        return new ResponseEntity<>(use,HttpStatus.OK);
    }
}
