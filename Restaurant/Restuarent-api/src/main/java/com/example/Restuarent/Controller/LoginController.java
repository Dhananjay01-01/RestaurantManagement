package com.example.Restuarent.Controller;

import com.example.Restuarent.DTO.LoginDTO;
import com.example.Restuarent.Repository.RestuarantRepo;
import com.example.Restuarent.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
@RestController
@CrossOrigin("*")
public class LoginController {

    @Autowired
    private RestuarantRepo restuarantRepo;

    @Autowired
    private UserRepo userrepo;

    @PostMapping("/login")
    public ResponseEntity<?> Login(@RequestBody LoginDTO obj) {
        if (obj.getEmail().equals("restaurant@gmail.com")) {
            var user = restuarantRepo.findById(obj.getEmail()).orElseThrow(() -> new RuntimeException("restaurant not found"));
            if (user.getPassword().equals(obj.getPassword())) {
                return new ResponseEntity<>(user, HttpStatus.OK);
            } else {
                throw new RuntimeException("invalid password");
            }
        } else {
            var user = userrepo.findById(obj.getEmail()).orElseThrow(() -> new RuntimeException("user not found"));
            if (user.getStatus().equals("blocked")){
                throw new RuntimeException("User has blocked");
            }
            else if (user.getPassword().equals(obj.getPassword())) {
                return new ResponseEntity<>(user, HttpStatus.OK);
            } else {
                throw new RuntimeException("invalid password");
            }
        }
    }
}
