package com.ordermanagement.controller;

import com.ordermanagement.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
@Tag(name = "Authentication", description = "User authentication endpoints")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    @Operation(summary = "Register a new user", description = "Create a new user account")
    public ResponseEntity<Map<String, Object>> register(@RequestBody Map<String, String> request) {
        try {
            String username = request.get("username");
            String email = request.get("email");
            String password = request.get("password");
            String fullName = request.get("fullName");

            // Validate input
            if (username == null || username.trim().isEmpty()) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Username is required");
                return ResponseEntity.badRequest().body(response);
            }

            if (email == null || email.trim().isEmpty()) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Email is required");
                return ResponseEntity.badRequest().body(response);
            }

            if (password == null || password.length() < 6) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Password must be at least 6 characters long");
                return ResponseEntity.badRequest().body(response);
            }

            if (fullName == null || fullName.trim().isEmpty()) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Full name is required");
                return ResponseEntity.badRequest().body(response);
            }

            Map<String, Object> result = authService.register(username, email, password, fullName);

            if ((Boolean) result.get("success")) {
                return ResponseEntity.ok(result);
            } else {
                return ResponseEntity.badRequest().body(result);
            }

        } catch (Exception e) {
            logger.error("Error during registration", e);
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Registration failed: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @PostMapping("/login")
    @Operation(summary = "User login", description = "Authenticate user and get JWT token")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> request) {
        try {
            String usernameOrEmail = request.get("usernameOrEmail");
            String password = request.get("password");

            // Validate input
            if (usernameOrEmail == null || usernameOrEmail.trim().isEmpty()) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Username or email is required");
                return ResponseEntity.badRequest().body(response);
            }

            if (password == null || password.trim().isEmpty()) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Password is required");
                return ResponseEntity.badRequest().body(response);
            }

            Map<String, Object> result = authService.login(usernameOrEmail, password);

            if ((Boolean) result.get("success")) {
                return ResponseEntity.ok(result);
            } else {
                return ResponseEntity.badRequest().body(result);
            }

        } catch (Exception e) {
            logger.error("Error during login", e);
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Login failed: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @PostMapping("/validate")
    @Operation(summary = "Validate JWT token", description = "Check if JWT token is valid")
    public ResponseEntity<Map<String, Object>> validateToken(@RequestHeader("Authorization") String authHeader) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                response.put("valid", false);
                response.put("message", "Invalid authorization header");
                return ResponseEntity.badRequest().body(response);
            }

            // Token validation logic would go here
            response.put("valid", true);
            response.put("message", "Token is valid");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("Error validating token", e);
            response.put("valid", false);
            response.put("message", "Token validation failed");
            return ResponseEntity.internalServerError().body(response);
        }
    }
}