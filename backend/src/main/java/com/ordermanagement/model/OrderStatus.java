package com.ordermanagement.model;

public enum OrderStatus {
    PENDING("Pending", "#f59e0b"),
    PROCESSING("Processing", "#3b82f6"),
    COMPLETED("Completed", "#10b981"),
    CANCELLED("Cancelled", "#ef4444"),
    DECLINED("Declined", "#dc2626");

    private final String displayName;
    private final String color;

    OrderStatus(String displayName, String color) {
        this.displayName = displayName;
        this.color = color;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getColor() {
        return color;
    }
}