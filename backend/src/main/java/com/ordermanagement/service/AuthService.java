package com.ordermanagement.service;

import com.ordermanagement.model.User;
import com.ordermanagement.repository.UserRepository;
import com.ordermanagement.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public Map<String, Object> register(String username, String email, String password, String fullName) {
        Map<String, Object> response = new HashMap<>();

        // Check if username already exists
        if (userRepository.existsByUsername(username)) {
            response.put("success", false);
            response.put("message", "Username already exists");
            return response;
        }

        // Check if email already exists
        if (userRepository.existsByEmail(email)) {
            response.put("success", false);
            response.put("message", "Email already exists");
            return response;
        }

        // Create new user
        User user = new User(username, email, passwordEncoder.encode(password), fullName);
        user = userRepository.save(user);

        // Generate JWT token
        String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name(), user.getFullName());

        response.put("success", true);
        response.put("message", "User registered successfully");
        response.put("token", token);
        response.put("user", createUserResponse(user));

        return response;
    }

    public Map<String, Object> login(String usernameOrEmail, String password) {
        Map<String, Object> response = new HashMap<>();

        // Find user by username or email
        Optional<User> userOptional = userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail);

        if (userOptional.isEmpty()) {
            response.put("success", false);
            response.put("message", "User not found");
            return response;
        }

        User user = userOptional.get();

        // Check if user is active
        if (!user.isActive()) {
            response.put("success", false);
            response.put("message", "Account is deactivated");
            return response;
        }

        // Verify password
        if (!passwordEncoder.matches(password, user.getPassword())) {
            response.put("success", false);
            response.put("message", "Invalid credentials");
            return response;
        }

        // Update last login time
        user.setLastLoginAt(LocalDateTime.now());
        userRepository.save(user);

        // Generate JWT token
        String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name(), user.getFullName());

        response.put("success", true);
        response.put("message", "Login successful");
        response.put("token", token);
        response.put("user", createUserResponse(user));

        return response;
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    private Map<String, Object> createUserResponse(User user) {
        Map<String, Object> userResponse = new HashMap<>();
        userResponse.put("id", user.getId());
        userResponse.put("username", user.getUsername());
        userResponse.put("email", user.getEmail());
        userResponse.put("fullName", user.getFullName());
        userResponse.put("role", user.getRole().name());
        userResponse.put("createdAt", user.getCreatedAt());
        userResponse.put("lastLoginAt", user.getLastLoginAt());
        return userResponse;
    }
}