package com.example.Restuarent.Repository;

import com.example.Restuarent.Entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepo extends JpaRepository<Feedback , Integer> {
}
