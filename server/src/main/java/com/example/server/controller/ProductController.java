package com.example.server.controller;

import com.example.server.dto.ProductDTO;
import com.example.server.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<ProductDTO> getAllProducts() {
        return productService.getAllProducts();
    }

    // 새로운 특정 제품의 세부 정보를 가져오는 엔드포인트
    @GetMapping("/{productName}")
    public ProductDTO getProductByName(@PathVariable String productName) {
        return productService.getProductByName(productName);
    }
}
