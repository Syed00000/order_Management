package com.ordermanagement.service;

// Firebase imports removed since we're using local storage
// import com.google.cloud.storage.Blob;
// import com.google.cloud.storage.BlobId;
// import com.google.cloud.storage.BlobInfo;
// import com.google.cloud.storage.Storage;
// import com.google.firebase.cloud.StorageClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
public class FirebaseStorageService {

    private static final Logger logger = LoggerFactory.getLogger(FirebaseStorageService.class);

    @Value("${firebase.storage-bucket}")
    private String bucketName;

    public String uploadFile(MultipartFile file) throws IOException {
        try {
            logger.info("Starting file upload: {}", file.getOriginalFilename());
            logger.info("File size: {} bytes", file.getSize());
            logger.info("Content type: {}", file.getContentType());

            // Generate unique filename
            String fileName = generateFileName(file.getOriginalFilename());
            logger.info("Generated filename: {}", fileName);

            // For now, use local storage instead of Firebase Storage
            // Create uploads directory if it doesn't exist
            String uploadsDir = "uploads";
            java.nio.file.Path uploadPath = java.nio.file.Paths.get(uploadsDir);
            if (!java.nio.file.Files.exists(uploadPath)) {
                java.nio.file.Files.createDirectories(uploadPath);
                logger.info("Created uploads directory: {}", uploadPath.toAbsolutePath());
            }

            // Create the full file path and ensure parent directories exist
            java.nio.file.Path filePath = uploadPath.resolve(fileName);
            java.nio.file.Path parentDir = filePath.getParent();
            if (!java.nio.file.Files.exists(parentDir)) {
                java.nio.file.Files.createDirectories(parentDir);
                logger.info("Created parent directory: {}", parentDir.toAbsolutePath());
            }

            // Save file locally
            java.nio.file.Files.copy(file.getInputStream(), filePath, java.nio.file.StandardCopyOption.REPLACE_EXISTING);
            logger.info("File saved locally: {}", filePath.toAbsolutePath());

            // Generate local URL (for development)
            String publicUrl = "http://localhost:8081/uploads/" + fileName;

            logger.info("Generated public URL: {}", publicUrl);
            return publicUrl;

        } catch (Exception e) {
            logger.error("Error uploading file", e);
            throw new IOException("Failed to upload file: " + e.getMessage(), e);
        }
    }

    private String generateFileName(String originalFileName) {
        String extension = "";
        if (originalFileName != null && originalFileName.contains(".")) {
            extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        }
        return "invoices/" + UUID.randomUUID().toString() + extension;
    }

    public boolean deleteFile(String fileName) {
        try {
            // For local storage implementation
            String uploadsDir = "uploads";
            java.nio.file.Path filePath = java.nio.file.Paths.get(uploadsDir, fileName);
            
            if (java.nio.file.Files.exists(filePath)) {
                java.nio.file.Files.delete(filePath);
                logger.info("File deleted successfully: {}", filePath.toAbsolutePath());
                return true;
            } else {
                logger.warn("File not found for deletion: {}", filePath.toAbsolutePath());
                return false;
            }
        } catch (Exception e) {
            logger.error("Error deleting file: " + fileName, e);
            return false;
        }
    }
}
