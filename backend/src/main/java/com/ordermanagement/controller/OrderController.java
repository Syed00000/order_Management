package com.ordermanagement.controller;

import com.ordermanagement.model.Order;
import com.ordermanagement.model.OrderStatus;
import com.ordermanagement.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "*")
@Tag(name = "Orders", description = "Order management endpoints")
public class OrderController {

    private static final Logger logger = LoggerFactory.getLogger(OrderController.class);

    @Autowired
    private OrderService orderService;

    @PostMapping
    @Operation(summary = "Create a new order", description = "Create a new order with invoice file upload")
    public ResponseEntity<Map<String, Object>> createOrder(
            @RequestParam("customerName") String customerName,
            @RequestParam("orderAmount") Double orderAmount,
            @RequestParam("invoiceFile") MultipartFile invoiceFile) {

        Map<String, Object> response = new HashMap<>();

        try {
            logger.info("Received order creation request - Customer: {}, Amount: {}, File: {}",
                       customerName, orderAmount, invoiceFile.getOriginalFilename());

            // Validate input
            if (customerName == null || customerName.trim().isEmpty()) {
                logger.warn("Validation failed: Customer name is empty");
                response.put("error", "Customer name is required");
                return ResponseEntity.badRequest().body(response);
            }

            if (orderAmount == null || orderAmount <= 0) {
                logger.warn("Validation failed: Invalid order amount: {}", orderAmount);
                response.put("error", "Order amount must be greater than 0");
                return ResponseEntity.badRequest().body(response);
            }

            if (invoiceFile == null || invoiceFile.isEmpty()) {
                logger.warn("Validation failed: No invoice file provided");
                response.put("error", "Invoice file is required");
                return ResponseEntity.badRequest().body(response);
            }

            // Check file type
            String contentType = invoiceFile.getContentType();
            if (contentType == null || !contentType.equals("application/pdf")) {
                logger.warn("Validation failed: Invalid file type: {}", contentType);
                response.put("error", "Only PDF files are allowed");
                return ResponseEntity.badRequest().body(response);
            }

            logger.info("Validation passed, creating order...");
            // Create order
            Order order = orderService.createOrder(customerName, orderAmount, invoiceFile);

            logger.info("Order created successfully with ID: {}", order.getId());
            response.put("message", "Order created successfully");
            response.put("orderId", order.getId());
            response.put("order", order);

            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (Exception e) {
            logger.error("Error creating order", e);
            logger.error("Exception type: {}", e.getClass().getName());
            logger.error("Stack trace: ", e);
            
            String errorMessage = "Failed to create order: " + e.getMessage();
            if (e.getCause() != null) {
                errorMessage += " (Cause: " + e.getCause().getMessage() + ")";
            }
            
            response.put("error", errorMessage);
            response.put("exceptionType", e.getClass().getSimpleName());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping("/{id}/status")
    @Operation(summary = "Update order status", description = "Update the status of an existing order")
    public ResponseEntity<Map<String, Object>> updateOrderStatus(
            @PathVariable String id,
            @RequestBody Map<String, String> request) {
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            String statusStr = request.get("status");
            if (statusStr == null || statusStr.trim().isEmpty()) {
                response.put("error", "Status is required");
                return ResponseEntity.badRequest().body(response);
            }

            OrderStatus status;
            try {
                status = OrderStatus.valueOf(statusStr.toUpperCase());
            } catch (IllegalArgumentException e) {
                response.put("error", "Invalid status. Valid values are: PENDING, PROCESSING, COMPLETED, CANCELLED, DECLINED");
                return ResponseEntity.badRequest().body(response);
            }

            Optional<Order> orderOptional = orderService.getOrderById(id);
            if (orderOptional.isEmpty()) {
                response.put("error", "Order not found");
                return ResponseEntity.notFound().build();
            }

            Order order = orderOptional.get();
            order.setStatus(status);
            Order updatedOrder = orderService.updateOrderStatus(id, status);

            response.put("message", "Order status updated successfully");
            response.put("order", updatedOrder);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("Error updating order status", e);
            response.put("error", "Failed to update order status: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        try {
            List<Order> orders = orderService.getAllOrders();
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable String id) {
        try {
            Optional<Order> order = orderService.getOrderById(id);
            if (order.isPresent()) {
                return ResponseEntity.ok(order.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<Order>> searchOrders(
            @RequestParam(required = false) String customerName,
            @RequestParam(required = false) Double minAmount,
            @RequestParam(required = false) Double maxAmount) {
        
        try {
            List<Order> orders;
            
            if (customerName != null && !customerName.trim().isEmpty()) {
                orders = orderService.getOrdersByCustomerName(customerName);
            } else if (minAmount != null && maxAmount != null) {
                orders = orderService.getOrdersByAmountRange(minAmount, maxAmount);
            } else {
                orders = orderService.getAllOrders();
            }
            
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteOrder(@PathVariable String id) {
        Map<String, String> response = new HashMap<>();
        
        try {
            Optional<Order> order = orderService.getOrderById(id);
            if (order.isPresent()) {
                orderService.deleteOrder(id);
                response.put("message", "Order deleted successfully");
                return ResponseEntity.ok(response);
            } else {
                response.put("error", "Order not found");
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            response.put("error", "Failed to delete order: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/test-db")
    public ResponseEntity<Map<String, Object>> testDatabaseConnection() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            logger.info("Testing database connection...");
            List<Order> orders = orderService.getAllOrders();
            response.put("status", "success");
            response.put("message", "Database connection successful");
            response.put("orderCount", orders.size());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Database connection test failed", e);
            response.put("status", "error");
            response.put("message", "Database connection failed: " + e.getMessage());
            response.put("exceptionType", e.getClass().getSimpleName());
            if (e.getCause() != null) {
                response.put("cause", e.getCause().getMessage());
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
