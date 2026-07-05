package com.example.Restuarent.Controller;

import com.example.Restuarent.Entity.Restuarants;
import com.example.Restuarent.Repository.RestuarantRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class RestuarantController {
    @Autowired
    private RestuarantRepo restuarantrepo;

    @GetMapping("getrestuarant")
    private ResponseEntity<?> getrestuarants(){
        List<Restuarants> use = restuarantrepo.findAll();
        return new ResponseEntity<>(use, HttpStatus.OK);
    }

    @PostMapping("postrestuarant")
    private ResponseEntity<?> postrestuarants(@RequestBody Restuarants obj){
        Restuarants use = restuarantrepo.save(obj);
        return new ResponseEntity<>(use,HttpStatus.OK);
    }

    @PutMapping("putrestuarants")
    private ResponseEntity<?> putrestuarants(@RequestBody Restuarants obj){
        Restuarants use = restuarantrepo.save(obj);
        return new ResponseEntity<>(use,HttpStatus.OK);
    }
}
