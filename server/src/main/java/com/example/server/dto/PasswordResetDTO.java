package com.example.server.dto;

public class PasswordResetDTO {

    private String currentPassword;
    private String newPassword;

    // 기본 생성자
    public PasswordResetDTO() {
    }

    // 모든 필드를 받는 생성자
    public PasswordResetDTO(String currentPassword, String newPassword) {
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
    }

    // Getters and Setters
    public String getCurrentPassword() {
        return currentPassword;
    }

    public void setCurrentPassword(String currentPassword) {
        this.currentPassword = currentPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
