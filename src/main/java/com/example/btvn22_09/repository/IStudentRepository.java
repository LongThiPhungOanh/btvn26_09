package com.example.btvn22_09.repository;

import com.example.btvn22_09.model.Status;
import com.example.btvn22_09.model.Student;
import com.example.btvn22_09.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface IStudentRepository extends JpaRepository<Student, Long> {
    List<Student> findStudentsByNameContaining(String name);
    List<Student> findByStatus(Status status);

    //List<Student> findByNameContainingIgnoreCaseAndAddressContainingIgnoreCaseAndGenderContainingIgnoreCaseAndStatus_IdOrStatusIsNull(String name, String address, String gender, Long status_Id);
    List<Student> findByNameContainingIgnoreCaseAndAddressContainingIgnoreCaseAndGenderContainingIgnoreCase(String name, String address, String gender);
    List<Student> findBySubjectsIn(Set<Subject> subjects);
    @Query(value =
"SELECT s.* FROM student s JOIN student_subject ss ON s.id = ss.student_id WHERE ss.subject_id = ?1",nativeQuery = true)
    List<Student> findBySubjects(Subject subject);


}
