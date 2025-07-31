package com.ordermanagement.controller;

import com.ordermanagement.model.Order;
import com.ordermanagement.model.OrderStatus;
import com.ordermanagement.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/analytics")
@CrossOrigin(origins = "*")
@Tag(name = "Analytics", description = "Sales analytics and reporting endpoints")
public class AnalyticsController {

    private static final Logger logger = LoggerFactory.getLogger(AnalyticsController.class);

    @Autowired
    private OrderService orderService;

    @GetMapping("/dashboard")
    @Operation(summary = "Get dashboard analytics", description = "Get comprehensive dashboard analytics data")
    public ResponseEntity<Map<String, Object>> getDashboardAnalytics() {
        try {
            List<Order> allOrders = orderService.getAllOrders();
            Map<String, Object> analytics = new HashMap<>();

            // Basic statistics
            analytics.put("totalOrders", allOrders.size());
            analytics.put("totalRevenue", calculateTotalRevenue(allOrders));
            analytics.put("averageOrderValue", calculateAverageOrderValue(allOrders));

            // Status distribution
            analytics.put("statusDistribution", getStatusDistribution(allOrders));

            // Monthly sales data for charts
            analytics.put("monthlySales", getMonthlySalesData(allOrders));

            // Recent orders
            analytics.put("recentOrders", getRecentOrders(allOrders, 5));

            // Top customers
            analytics.put("topCustomers", getTopCustomers(allOrders, 5));

            return ResponseEntity.ok(analytics);

        } catch (Exception e) {
            logger.error("Error fetching dashboard analytics", e);
            Map<String, Object> response = new HashMap<>();
            response.put("error", "Failed to fetch analytics: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @GetMapping("/sales-chart")
    @Operation(summary = "Get sales chart data", description = "Get sales data for charts")
    public ResponseEntity<Map<String, Object>> getSalesChartData() {
        try {
            List<Order> allOrders = orderService.getAllOrders();
            Map<String, Object> chartData = new HashMap<>();

            // Monthly sales
            chartData.put("monthlySales", getMonthlySalesData(allOrders));
            
            // Daily sales for last 30 days
            chartData.put("dailySales", getDailySalesData(allOrders, 30));

            // Status distribution
            chartData.put("statusDistribution", getStatusDistribution(allOrders));

            return ResponseEntity.ok(chartData);

        } catch (Exception e) {
            logger.error("Error fetching sales chart data", e);
            Map<String, Object> response = new HashMap<>();
            response.put("error", "Failed to fetch chart data: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    private double calculateTotalRevenue(List<Order> orders) {
        return orders.stream()
                .filter(order -> order.getStatus() == OrderStatus.COMPLETED)
                .mapToDouble(Order::getOrderAmount)
                .sum();
    }

    private double calculateAverageOrderValue(List<Order> orders) {
        if (orders.isEmpty()) return 0.0;
        return orders.stream()
                .mapToDouble(Order::getOrderAmount)
                .average()
                .orElse(0.0);
    }

    private Map<String, Object> getStatusDistribution(List<Order> orders) {
        Map<OrderStatus, Long> statusCounts = orders.stream()
                .collect(Collectors.groupingBy(Order::getStatus, Collectors.counting()));

        Map<String, Object> distribution = new HashMap<>();
        for (OrderStatus status : OrderStatus.values()) {
            Map<String, Object> statusData = new HashMap<>();
            statusData.put("count", statusCounts.getOrDefault(status, 0L));
            statusData.put("color", status.getColor());
            statusData.put("displayName", status.getDisplayName());
            distribution.put(status.name(), statusData);
        }

        return distribution;
    }

    private List<Map<String, Object>> getMonthlySalesData(List<Order> orders) {
        Map<String, Double> monthlySales = orders.stream()
                .filter(order -> order.getStatus() == OrderStatus.COMPLETED)
                .collect(Collectors.groupingBy(
                        order -> order.getOrderDate().format(DateTimeFormatter.ofPattern("yyyy-MM")),
                        Collectors.summingDouble(Order::getOrderAmount)
                ));

        return monthlySales.entrySet().stream()
                .map(entry -> {
                    Map<String, Object> monthData = new HashMap<>();
                    monthData.put("month", entry.getKey());
                    monthData.put("sales", entry.getValue());
                    return monthData;
                })
                .sorted((a, b) -> ((String) a.get("month")).compareTo((String) b.get("month")))
                .collect(Collectors.toList());
    }

    private List<Map<String, Object>> getDailySalesData(List<Order> orders, int days) {
        LocalDateTime startDate = LocalDateTime.now().minusDays(days);
        
        Map<String, Double> dailySales = orders.stream()
                .filter(order -> order.getOrderDate().isAfter(startDate))
                .filter(order -> order.getStatus() == OrderStatus.COMPLETED)
                .collect(Collectors.groupingBy(
                        order -> order.getOrderDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")),
                        Collectors.summingDouble(Order::getOrderAmount)
                ));

        return dailySales.entrySet().stream()
                .map(entry -> {
                    Map<String, Object> dayData = new HashMap<>();
                    dayData.put("date", entry.getKey());
                    dayData.put("sales", entry.getValue());
                    return dayData;
                })
                .sorted((a, b) -> ((String) a.get("date")).compareTo((String) b.get("date")))
                .collect(Collectors.toList());
    }

    private List<Map<String, Object>> getRecentOrders(List<Order> orders, int limit) {
        return orders.stream()
                .sorted((a, b) -> b.getOrderDate().compareTo(a.getOrderDate()))
                .limit(limit)
                .map(order -> {
                    Map<String, Object> orderData = new HashMap<>();
                    orderData.put("id", order.getId());
                    orderData.put("customerName", order.getCustomerName());
                    orderData.put("orderAmount", order.getOrderAmount());
                    orderData.put("status", order.getStatus());
                    orderData.put("orderDate", order.getOrderDate());
                    return orderData;
                })
                .collect(Collectors.toList());
    }

    private List<Map<String, Object>> getTopCustomers(List<Order> orders, int limit) {
        Map<String, Double> customerTotals = orders.stream()
                .filter(order -> order.getStatus() == OrderStatus.COMPLETED)
                .collect(Collectors.groupingBy(
                        Order::getCustomerName,
                        Collectors.summingDouble(Order::getOrderAmount)
                ));

        return customerTotals.entrySet().stream()
                .sorted(Map.Entry.<String, Double>comparingByValue().reversed())
                .limit(limit)
                .map(entry -> {
                    Map<String, Object> customerData = new HashMap<>();
                    customerData.put("customerName", entry.getKey());
                    customerData.put("totalAmount", entry.getValue());
                    customerData.put("orderCount", orders.stream()
                            .filter(order -> order.getCustomerName().equals(entry.getKey()))
                            .count());
                    return customerData;
                })
                .collect(Collectors.toList());
    }
}