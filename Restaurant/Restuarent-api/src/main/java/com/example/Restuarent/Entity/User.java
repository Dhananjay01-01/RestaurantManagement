package com.example.Restuarent.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    private String email;
    private String password;
    private String mobileNo;
    private String name;
    private String city;
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String image;
    private String Gender;
    private String Status;
}
