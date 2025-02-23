package com.carrefour.kata.controller;

import com.carrefour.kata.model.Order;
import com.carrefour.kata.repository.OrderRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderRepository orderRepo;

    public OrderController(OrderRepository orderRepo) {
        this.orderRepo = orderRepo;
    }

    // [GET] /api/orders
    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }

    // [GET] /api/orders/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        return orderRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // [POST] /api/orders
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        // on peut set createdAt
        order.setCreatedAt(LocalDateTime.now());
        Order saved = orderRepo.save(order);
        return ResponseEntity.status(201).body(saved);
    }

    // [PUT/PATCH] /api/orders/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long id, @RequestBody Order updates) {
        return orderRepo.findById(id)
                .map(existing -> {
                    // ex. si tu veux MAJ items
                    existing.setItems(updates.getItems());
                    return ResponseEntity.ok(orderRepo.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // [DELETE] /api/orders/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        return orderRepo.findById(id)
                .map(existing -> {
                    orderRepo.delete(existing);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
