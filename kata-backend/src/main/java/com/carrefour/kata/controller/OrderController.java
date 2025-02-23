package com.carrefour.kata.controller;

import com.carrefour.kata.model.Order;
import com.carrefour.kata.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.findAllOrders();
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        Order created = orderService.createOrder(order);
        return ResponseEntity.status(201).body(created);
    }

}
