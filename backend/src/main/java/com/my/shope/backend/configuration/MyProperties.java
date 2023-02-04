package com.my.shope.backend.configuration;


import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties("my.properties")
@Data
public class MyProperties {

    private final  static String detailsPath = "/Users/kareem89/IdeaProjects/simple-onlineshope-my-capstone-project/backend/product_details.txt";

}
