package com.newsapp.userprofile.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.newsapp.userprofile.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
