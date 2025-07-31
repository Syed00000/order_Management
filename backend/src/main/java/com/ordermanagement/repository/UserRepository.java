package com.ordermanagement.repository;

import com.ordermanagement.model.User;
import com.ordermanagement.model.UserRole;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    
    Optional<User> findByUsername(String username);
    
    Optional<User> findByEmail(String email);
    
    Optional<User> findByUsernameOrEmail(String username, String email);
    
    List<User> findByRole(UserRole role);
    
    List<User> findByActiveTrue();
    
    boolean existsByUsername(String username);
    
    boolean existsByEmail(String email);
}