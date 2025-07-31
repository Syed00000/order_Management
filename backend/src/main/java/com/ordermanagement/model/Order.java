package com.ordermanagement.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "orders")
public class Order {
    
    @Id
    private String id;
    
    private String customerName;
    
    private Double orderAmount;
    
    private LocalDateTime orderDate;
    
    private String invoiceFileUrl;
    
    private OrderStatus status;
    
    // Default constructor
    public Order() {
        this.orderDate = LocalDateTime.now();
        this.status = OrderStatus.PENDING;
    }
    
    // Constructor with parameters
    public Order(String customerName, Double orderAmount, String invoiceFileUrl) {
        this.customerName = customerName;
        this.orderAmount = orderAmount;
        this.invoiceFileUrl = invoiceFileUrl;
        this.orderDate = LocalDateTime.now();
        this.status = OrderStatus.PENDING;
    }
    
    // Getters and Setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getCustomerName() {
        return customerName;
    }
    
    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }
    
    public Double getOrderAmount() {
        return orderAmount;
    }
    
    public void setOrderAmount(Double orderAmount) {
        this.orderAmount = orderAmount;
    }
    
    public LocalDateTime getOrderDate() {
        return orderDate;
    }
    
    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }
    
    public String getInvoiceFileUrl() {
        return invoiceFileUrl;
    }
    
    public void setInvoiceFileUrl(String invoiceFileUrl) {
        this.invoiceFileUrl = invoiceFileUrl;
    }
    
    public OrderStatus getStatus() {
        return status;
    }
    
    public void setStatus(OrderStatus status) {
        this.status = status;
    }
    
    @Override
    public String toString() {
        return "Order{" +
                "id='" + id + '\'' +
                ", customerName='" + customerName + '\'' +
                ", orderAmount=" + orderAmount +
                ", orderDate=" + orderDate +
                ", invoiceFileUrl='" + invoiceFileUrl + '\'' +
                ", status=" + status +
                '}';
    }
}
