package com.my.shope.backend.product;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class Product {
    private String id;
    private String Name;
    private String description;
    private double price;
    private List<String> imageURLs;
    private String category;

}
