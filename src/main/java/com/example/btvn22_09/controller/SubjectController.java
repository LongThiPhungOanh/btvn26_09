package com.example.btvn22_09.controller;
import com.example.btvn22_09.model.Subject;
import com.example.btvn22_09.service.impl.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/subjects")
public class SubjectController {
    @Autowired
    SubjectService service;
    @GetMapping
    public ResponseEntity<List<Subject>> showList(){
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }
    @PostMapping("/create")
    public ResponseEntity<Void> create(@RequestBody Subject objSubject){
        if (objSubject != null){
            service.create(objSubject);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/update")
    public ResponseEntity<Subject> checkObj(@RequestBody Subject subject){
        Subject subject1 = service.findOne(subject.getId());
        if (subject1 != null){
            return new ResponseEntity<>(subject1, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/updateS")
    public ResponseEntity<Void> update(@RequestBody Subject subject){
        if (subject != null){
            service.update(subject);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
