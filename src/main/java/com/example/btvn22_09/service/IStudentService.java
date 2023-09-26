package com.example.btvn22_09.service;

import com.example.btvn22_09.model.Student;
import org.springframework.stereotype.Service;

@Service
public interface IStudentService extends IGenericService<Student> {
    void create(Student s);
    void update(Student s);
}
