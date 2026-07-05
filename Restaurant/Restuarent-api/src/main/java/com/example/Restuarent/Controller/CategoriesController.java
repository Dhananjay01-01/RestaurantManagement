package com.example.Restuarent.Controller;

import com.example.Restuarent.Entity.Categories;
import com.example.Restuarent.Repository.CategoriesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class CategoriesController {
    @Autowired
    private CategoriesRepo categoriesrepo;

    @GetMapping("getcategory")
    public ResponseEntity<?> getcatagories(){
        List<Categories> use = categoriesrepo.findAll();
        return new ResponseEntity<>(use, HttpStatus.OK);
    }

    @PostMapping("postcategory")
    public ResponseEntity<?> postcategory(@RequestBody Categories obj){
        Categories use = categoriesrepo.save(obj);
        return new ResponseEntity<>(use, HttpStatus.OK);
    }

    @PutMapping("putcategory")
    public ResponseEntity<?> putcategory(@RequestBody Categories obj){
        Categories use = categoriesrepo.save(obj);
        return new ResponseEntity<>(use, HttpStatus.OK);
    }

}
