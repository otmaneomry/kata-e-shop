package com.carrefour.kata.repository;

import com.carrefour.kata.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}