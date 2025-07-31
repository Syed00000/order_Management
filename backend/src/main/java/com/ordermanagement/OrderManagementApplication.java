package com.ordermanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class OrderManagementApplication {

    public static void main(String[] args) {
        // Set default profile to development for local run
        System.setProperty("spring.profiles.default", "development");
        SpringApplication.run(OrderManagementApplication.class, args);
    }

}
