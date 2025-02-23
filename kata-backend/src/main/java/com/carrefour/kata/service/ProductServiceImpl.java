package com.carrefour.kata.service;

import com.carrefour.kata.model.Product;
import com.carrefour.kata.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepo;

    public ProductServiceImpl(ProductRepository productRepo) {
        this.productRepo = productRepo;
    }

    @Override
    public List<Product> findAllProducts() {
        return productRepo.findAll();
    }
}
