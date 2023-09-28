package com.example.btvn22_09.service.impl;
import com.example.btvn22_09.model.Status;
import com.example.btvn22_09.model.Student;
import com.example.btvn22_09.model.Subject;
import com.example.btvn22_09.repository.IStudentRepository;
import com.example.btvn22_09.service.IStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class StudentService implements IStudentService {
    @Autowired
    IStudentRepository iStudentRepository;
    @Override
    public List<Student> findAll() {
        return iStudentRepository.findAll();
    }

    public List<Student> findAbc(String name, String address,Status status, String gender){
        return iStudentRepository.findByNameContainingIgnoreCaseAndAddressContainingIgnoreCaseAndGenderContainingIgnoreCase(name, address, gender);
    }


    public List<Student> findStatus(Status status){
        return iStudentRepository.findByStatus(status);
    }
    public List<Student> findSubject(Subject subject){
        return iStudentRepository.findBySubjects(subject);
    }
    public List<Student> findAllByName(String name) {
        return iStudentRepository.findStudentsByNameContaining(name);
    }

    @Override
    public Student findOne(Long id) {
        Optional<Student> student = iStudentRepository.findById(id);
        return student.orElse(null);
    }

    @Override
    public void create(Student s) {
        iStudentRepository.save(s);
    }

    @Override
    public void update(Student s) {
        iStudentRepository.save(s);
    }
//    public void delete(Long idStudent, Long idSubject){
//        iStudentRepository.deleteInStudent(idStudent, idSubject);
//    }
}
