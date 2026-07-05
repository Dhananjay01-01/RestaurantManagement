package com.example.Restuarent.Controller;

import com.example.Restuarent.Entity.Tables;
import com.example.Restuarent.Repository.TablesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class TablesController {
    @Autowired
    private TablesRepo tablesrepo;

    @GetMapping("gettables")
    public ResponseEntity<?> gettables(){
        List<Tables> use = tablesrepo.findAll();
        return new ResponseEntity<>(use, HttpStatus.OK);
    }

    @PostMapping("posttables")
    public ResponseEntity<?> posttables(@RequestBody Tables obj){
        Tables use = tablesrepo.save(obj);
        return new ResponseEntity<>(use,HttpStatus.OK);
    }

    @PutMapping("puttables")
    public ResponseEntity<?> puttables(@RequestBody Tables obj){
        Tables use = tablesrepo.save(obj);
        return new ResponseEntity<>(use,HttpStatus.OK);
    }

    @PutMapping("putstatus/{status}/{id}")
    public ResponseEntity<?> putstatus(@PathVariable String status,@PathVariable int id){
        tablesrepo.updateStatusById(status,id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
