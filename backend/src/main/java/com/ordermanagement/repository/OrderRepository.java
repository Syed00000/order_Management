package com.ordermanagement.repository;

import com.ordermanagement.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
    
    // Find orders by customer name
    List<Order> findByCustomerNameContainingIgnoreCase(String customerName);
    
    // Find orders by amount range
    List<Order> findByOrderAmountBetween(Double minAmount, Double maxAmount);
    
}
