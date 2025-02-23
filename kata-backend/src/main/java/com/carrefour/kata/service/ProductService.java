package com.carrefour.kata.service;

import com.carrefour.kata.model.Product;

import java.util.List;

public interface ProductService {
    List<Product> findAllProducts();
}
