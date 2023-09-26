package com.example.btvn22_09.service.impl;

import com.example.btvn22_09.model.Status;
import com.example.btvn22_09.repository.IStatusRepository;
import com.example.btvn22_09.service.IStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StatusService implements IStatusService {
    @Autowired
    IStatusRepository statusRepository;
    @Override
    public List<Status> findAll() {
        return statusRepository.findAll();
    }

    @Override
    public Status findOne(Long id) {
        Optional<Status> status = statusRepository.findById(id);
        return status.orElse(null);
    }
}
