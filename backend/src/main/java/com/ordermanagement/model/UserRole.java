package com.ordermanagement.model;

public enum UserRole {
    ADMIN("Admin"),
    USER("User"),
    MANAGER("Manager");

    private final String displayName;

    UserRole(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}