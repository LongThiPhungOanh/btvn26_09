package com.example.btvn22_09.service;

import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface IGenericService<E> {
    List<E> findAll();
    E findOne(Long id);

}
