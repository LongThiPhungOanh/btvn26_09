package com.example.btvn22_09.controller;
import com.example.btvn22_09.model.Status;
import com.example.btvn22_09.model.Student;
import com.example.btvn22_09.model.Subject;
import com.example.btvn22_09.service.impl.StatusService;
import com.example.btvn22_09.service.impl.StudentService;
import com.example.btvn22_09.service.impl.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/students")
public class StudentController {
    @Autowired
    StudentService service;
    @Autowired
    StatusService statusService;
    @Autowired
    SubjectService subjectService;

    @GetMapping
    public ResponseEntity<List<Student>> showList() {
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }

    @GetMapping("/create")
    public ResponseEntity<List<Status>> create() {
        List<Status> list = statusService.findAll();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/listSubjects")
    public ResponseEntity<List<Subject>> getListSubjects() {
        List<Subject> list = subjectService.findAll();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    @GetMapping("/findIntegration")
    public ResponseEntity<List<Object>> findIntegration(){
        List<Subject> listSubject = subjectService.findAll();
        List<Status> listStatus = statusService.findAll();
        List<Object> objects  = new ArrayList<>();
        objects.add(listSubject);
        objects.add(listStatus);
        return new ResponseEntity<>(objects, HttpStatus.OK);
    }

    @PostMapping("/createP")
    public ResponseEntity<Void> createP(@RequestBody Student student) {
        if (student.getGender().equals("2")) {
            student.setGender("Nữ");
        } else {
            student.setGender("Nam");
        }
            service.create(student);
            return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping("/addSubj")
    public ResponseEntity<List<Void>> addSubj(@RequestBody Student student) {
        Set<Subject> subjects = student.getSubjects();
        Student newStudent = service.findOne(student.getId());
        if (newStudent != null) {
            if (student.getSubjects().size() < 3) {
                int count = 0;
                for (Student s: service.findAll()) {
                    if (s.getSubjects().equals(student.getSubjects())){
                        count ++;
                    }
                } if (count < 10){
                    Set<Subject> a = newStudent.getSubjects();
                    a.addAll(subjects);
                    newStudent.setSubjects(a);
                    service.update(newStudent);
                    return new ResponseEntity<>(HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                }
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/edit/{id}")
    public ResponseEntity<List<Object>> editStudent(@PathVariable Long id){
        List<Object> objects = new ArrayList<>();
        Student student = service.findOne(id);
        if (student != null){
        List<Status> list = statusService.findAll();
        objects.add(student);
        objects.add(list);
        return new ResponseEntity<>(objects, HttpStatus.OK);
    } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/editSubj/{id}")
        public ResponseEntity<Set<Subject>> getStudentSubject(@PathVariable Long id) {
        Student student1 = service.findOne(id);
        if (student1 != null) {
            if (!student1.getSubjects().isEmpty()) {
                return new ResponseEntity<>(student1.getSubjects(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
@PostMapping("/updateSubjects")
public ResponseEntity<Void> update(@RequestBody List<Student> listStudent) {
    Student oldStudent = listStudent.get(0);
    List<Subject> oldSubList = new ArrayList<>(oldStudent.getSubjects());
    Subject subjectDel = oldSubList.get(0);
    Student newStudent = listStudent.get(1);
    List<Subject> newSubList = new ArrayList<>(newStudent.getSubjects());
    Subject subjectAdd = newSubList.get(0);
    Student student = service.findOne(oldStudent.getId());
    if (student != null) {
        List<Subject> listSubject = new ArrayList<>(student.getSubjects());
        listSubject.add(subjectService.findOne(subjectAdd.getId()));
        int idxDel = 0;
        for (int i = 0; i < listSubject.size(); i++) {
            if(listSubject.get(i).getId().equals(subjectDel.getId())){
                idxDel = i;
            }
        }
        listSubject.remove(idxDel);
        student.setSubjects(new HashSet<>(listSubject));
        service.update(student);
        return new ResponseEntity<>(HttpStatus.OK);
    } else {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}

    @GetMapping("/getSubj")
    public ResponseEntity<List<Subject>> getSub(){
        if (!subjectService.findAll().isEmpty()){
            return new ResponseEntity<>(subjectService.findAll(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/search")
    public ResponseEntity<List<Student>> search(@RequestBody Student student) {
        return new ResponseEntity<>(service.findAllByName(student.getName()), HttpStatus.OK);
    }
@PostMapping("/searchIntegration")
public ResponseEntity<List<Student>> searchIntegration(@RequestBody Student student) {

        List<Student> list = new ArrayList<>();
    String name = student.getName();
    Status status = student.getStatus();
    Set<Subject> subjects = student.getSubjects();
    Subject subject = subjects.iterator().next();
    String address = student.getAddress();
    String gender = student.getGender();
        if (!Objects.equals(name, "")) {
            list.addAll(service.findAllByName(name));
        } else if (!address.isEmpty()) {
            list.addAll(service.findAddress(address));
        } else if (!gender.equals("0")) {
            if (gender.equals("1")){
                student.setGender("Nam");
                list.addAll(service.findGender(student.getGender()));
            } else {
                student.setGender("Nữ");
                list.addAll(service.findGender(student.getGender()));
            }
        } else if (status.getId() != 0) {
            list.addAll(service.findStatus(status));
        } else if (!subjects.isEmpty()) {
            list.addAll(service.findSubject(subject));
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

}



