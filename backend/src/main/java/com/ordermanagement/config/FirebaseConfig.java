package com.ordermanagement.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.IOException;

@Configuration
public class FirebaseConfig {

    @Value("${firebase.service-account-key}")
    private String serviceAccountKeyPath;

    @Value("${firebase.storage-bucket}")
    private String storageBucket;

    @PostConstruct
    public void initialize() {
        try {
            if (FirebaseApp.getApps().isEmpty()) {
                FileInputStream serviceAccount = new FileInputStream(serviceAccountKeyPath);
                
                FirebaseOptions options = FirebaseOptions.builder()
                        .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                        .build();

                FirebaseApp.initializeApp(options);
                System.out.println("Firebase application has been initialized");
            }
        } catch (IOException e) {
            System.err.println("Failed to initialize Firebase: " + e.getMessage());
            System.err.println("Continuing without Firebase - using local storage only");
            e.printStackTrace();
            // Don't throw exception, just log and continue
        } catch (Exception e) {
            System.err.println("Unexpected error initializing Firebase: " + e.getMessage());
            System.err.println("Continuing without Firebase - using local storage only");
            e.printStackTrace();
            // Don't throw exception, just log and continue
        }
    }
}
