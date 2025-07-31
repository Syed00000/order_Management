package com.ordermanagement.service;

import com.ordermanagement.model.Order;
import com.ordermanagement.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private FirebaseStorageService firebaseStorageService;

    public Order createOrder(String customerName, Double orderAmount, MultipartFile invoiceFile) throws IOException {
        // Upload file to Firebase Storage
        String invoiceFileUrl = firebaseStorageService.uploadFile(invoiceFile);
        
        // Create and save order
        Order order = new Order(customerName, orderAmount, invoiceFileUrl);
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(String id) {
        return orderRepository.findById(id);
    }

    public List<Order> getOrdersByCustomerName(String customerName) {
        return orderRepository.findByCustomerNameContainingIgnoreCase(customerName);
    }

    public List<Order> getOrdersByAmountRange(Double minAmount, Double maxAmount) {
        return orderRepository.findByOrderAmountBetween(minAmount, maxAmount);
    }

    public void deleteOrder(String id) {
        // Get the order first to retrieve the file URL
        Optional<Order> orderOptional = orderRepository.findById(id);
        if (orderOptional.isPresent()) {
            Order order = orderOptional.get();
            
            // Extract filename from URL and delete the file
            if (order.getInvoiceFileUrl() != null) {
                try {
                    // Extract filename from URL (e.g., "http://localhost:8081/uploads/invoices/filename.pdf" -> "invoices/filename.pdf")
                    String url = order.getInvoiceFileUrl();
                    if (url.contains("/uploads/")) {
                        String fileName = url.substring(url.indexOf("/uploads/") + 9); // Remove "/uploads/" part
                        firebaseStorageService.deleteFile(fileName);
                    }
                } catch (Exception e) {
                    // Log error but don't fail the order deletion
                    System.err.println("Failed to delete file for order " + id + ": " + e.getMessage());
                }
            }
            
            // Delete the order from database
            orderRepository.deleteById(id);
        }
    }

    public Order updateOrder(String id, Order updatedOrder) {
        Optional<Order> existingOrder = orderRepository.findById(id);
        if (existingOrder.isPresent()) {
            Order order = existingOrder.get();
            order.setCustomerName(updatedOrder.getCustomerName());
            order.setOrderAmount(updatedOrder.getOrderAmount());
            // Note: We don't update the invoice file URL or order date
            return orderRepository.save(order);
        }
        return null;
    }

    public Order updateOrderStatus(String id, com.ordermanagement.model.OrderStatus status) {
        Optional<Order> existingOrder = orderRepository.findById(id);
        if (existingOrder.isPresent()) {
            Order order = existingOrder.get();
            order.setStatus(status);
            return orderRepository.save(order);
        }
        return null;
    }
}
