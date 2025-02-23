package com.carrefour.kata.repository;

import com.carrefour.kata.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}