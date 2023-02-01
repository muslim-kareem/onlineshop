package com.my.shope.backend.product;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product implements Comparable<Product> {
    private String id;
    private String name;
    private String description;
    private double price;
    private List<String> imageIDs;
    private String category;

    @Override
    public int compareTo(Product p) {
        return this.getId().compareTo(p.getId());
    }
}
