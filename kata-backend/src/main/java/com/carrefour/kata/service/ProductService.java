package com.carrefour.kata.service;

import com.carrefour.kata.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService {
    Page<Product> findAllProducts(Pageable pageable);
}
