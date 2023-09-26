package com.example.btvn22_09.service;

import com.example.btvn22_09.model.Subject;
import org.springframework.stereotype.Service;

@Service
public interface ISubjectService extends IGenericService<Subject> {
    void create(Subject s);
    void update(Subject s);
}
