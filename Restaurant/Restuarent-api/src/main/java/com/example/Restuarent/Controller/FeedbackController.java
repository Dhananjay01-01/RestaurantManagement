package com.example.Restuarent.Controller;

import com.example.Restuarent.Entity.Feedback;
import com.example.Restuarent.Repository.FeedbackRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class FeedbackController {
    @Autowired
    private FeedbackRepo feedbackrepo;

    @GetMapping("getfeedback")
    public ResponseEntity<?> getfeedback(){
        List<Feedback> use = feedbackrepo.findAll();
        return new ResponseEntity<>(use, HttpStatus.OK);
    }

    @PostMapping("postfeedback")
    public ResponseEntity<?> postfeedback(@RequestBody Feedback obj) {
        Feedback use = feedbackrepo.save(obj);
        return new ResponseEntity<>(use,HttpStatus.OK);
    }
}
