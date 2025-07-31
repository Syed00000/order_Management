package com.ordermanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class OrderManagementApplication {

    public static void main(String[] args) {
        // Set default profile to production if not specified
        System.setProperty("spring.profiles.default", "production");
        SpringApplication.run(OrderManagementApplication.class, args);
    }

}
