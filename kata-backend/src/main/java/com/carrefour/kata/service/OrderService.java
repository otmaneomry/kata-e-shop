package com.carrefour.kata.service;

import com.carrefour.kata.model.Order;

import java.util.List;

public interface OrderService {
    List<Order> findAllOrders();

    Order createOrder(Order order);
}
