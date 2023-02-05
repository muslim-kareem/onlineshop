package com.my.shope.backend.order;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.List;

@Data
@AllArgsConstructor
public class Order {

    @Id
    private String id;
    private String appUserId;
    private List<String> productsIds;
    private boolean isExecuted;
}
