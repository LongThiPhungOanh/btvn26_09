package com.example.btvn22_09.service.impl;
import com.example.btvn22_09.model.Subject;
import com.example.btvn22_09.repository.ISubjectRepository;
import com.example.btvn22_09.service.ISubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public class SubjectService implements ISubjectService {
    @Autowired
    ISubjectRepository subjectRepository;
    @Override
    public List<Subject> findAll() {
        return subjectRepository.findAll();
    }

    @Override
    public Subject findOne(Long id) {
        Optional<Subject> subject = subjectRepository.findById(id);
        return subject.orElse(null);
    }

    @Override
    public void create(Subject s) {
        subjectRepository.save(s);
    }

    @Override
    public void update(Subject s) {
        subjectRepository.save(s);
    }
}
