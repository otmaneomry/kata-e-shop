package com.carrefour.kata.service;

import com.carrefour.kata.model.Order;
import com.carrefour.kata.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepo;

    public OrderServiceImpl(OrderRepository orderRepo) {
        this.orderRepo = orderRepo;
    }

    @Override
    public List<Order> findAllOrders() {
        return orderRepo.findAll();
    }

    @Override
    public Order createOrder(Order order) {
        order.setCreatedAt(LocalDateTime.now());
        return orderRepo.save(order);
    }
}
