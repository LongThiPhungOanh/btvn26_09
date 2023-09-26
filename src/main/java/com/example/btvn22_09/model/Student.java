package com.example.btvn22_09.model;
import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Size(min = 3, max = 5)
    @Column(unique = true)
    private String code;
    private String name;

    private int age;
    private String gender;
    private String address;
    @ManyToOne
    @JoinColumn(name = "idStatus")
    private Status status;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "student_subject",
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "subject_id")
    )
    private Set<Subject> subjects = new HashSet<>();
    public boolean checkSubject() {
        return subjects.size() <= 3;
    }
    public Student() {
    }

    public Student(Long id) {
        this.id = id;
    }

    public Student(Set<Subject> subjects) {
        this.subjects = subjects;
    }

    public Student(Long id, Set<Subject> subjects) {
        this.id = id;
        this.subjects = subjects;
    }

    public Student(Long id, String code, String name, int age, String gender, String address, Status status) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.address = address;
        this.status = status;
    }

    public Student(String code, String name, int age, String gender, String address, Status status, Set<Subject> subjects) {
        this.code = code;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.address = address;
        this.status = status;
        this.subjects = subjects;
    }

    public Student(Long id, String code, String name, int age, String gender, String address, Status status, Set<Subject> subjects) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.address = address;
        this.status = status;
        this.subjects = subjects;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Set<Subject> getSubjects() {
        return subjects;
    }
    public void setSubjects(Set<Subject> subjects) {
        this.subjects = subjects;
    }
}
