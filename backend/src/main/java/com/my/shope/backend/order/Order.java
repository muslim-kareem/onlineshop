package com.my.shope.backend.order;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class Order {

    private String id;
    private String appUserId;
    private List<String> productsIds;
    private boolean isExecuted;
}
