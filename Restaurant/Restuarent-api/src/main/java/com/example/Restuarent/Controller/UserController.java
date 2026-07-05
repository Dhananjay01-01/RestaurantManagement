package com.example.Restuarent.Controller;

import com.example.Restuarent.Entity.User;
import com.example.Restuarent.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class UserController {
    @Autowired
    private UserRepo userrepo;

    @GetMapping("getuser")
    private ResponseEntity<?> getuser(){
        List<User> use = userrepo.findAll();
        return new ResponseEntity<>(use, HttpStatus.OK);
    }

    @PostMapping("postuser")
    private ResponseEntity<?> postuser(@RequestBody User obj){
        User use = userrepo.save(obj);
        return new ResponseEntity<>(use,HttpStatus.OK);
    }

    @PutMapping("putuser")
    private ResponseEntity<?> putuser(@RequestBody User obj){
        User use = userrepo.save(obj);
        return new ResponseEntity<>(use,HttpStatus.OK);
    }
}
