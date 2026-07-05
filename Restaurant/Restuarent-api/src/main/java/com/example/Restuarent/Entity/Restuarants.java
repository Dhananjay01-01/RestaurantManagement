package com.example.Restuarent.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Restuarants {
    @Id
    private String email;
    private String password;
    private String name;
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String image;
    private String city;
    private String address;
    private String mobileNo;
    private String status;
    private String type;
    private String timings;
}
