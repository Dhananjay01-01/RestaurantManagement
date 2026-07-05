package com.example.Restuarent.Controller;

import com.example.Restuarent.Entity.Reservation;
import com.example.Restuarent.Repository.ReservationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class ReservationController {
    @Autowired
    private ReservationRepo reservationrepo;

    @GetMapping("/getreserve")
    public ResponseEntity<?> getreserve (){
        List<Reservation> use = reservationrepo.findAll();
        return  new ResponseEntity<>(use, HttpStatus.OK);
    }


    @PostMapping("postreserve")
    public ResponseEntity<?> postreserve(@RequestBody Reservation obj){
        Reservation use = reservationrepo.save(obj);
        return new ResponseEntity<>(use,HttpStatus.OK);
    }

    @PutMapping("putreserve")
    public ResponseEntity<?> putreserve(@RequestBody Reservation obj){
        Reservation use = reservationrepo.save(obj);
        return new ResponseEntity<>(use,HttpStatus.OK);
    }
}
