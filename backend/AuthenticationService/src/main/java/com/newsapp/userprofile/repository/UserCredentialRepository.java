package com.newsapp.userprofile.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.newsapp.userprofile.entity.UserCredential;

public interface UserCredentialRepository extends JpaRepository<UserCredential, Long> {

	UserCredential findByUsernameAndPassword(String username, String password);
}
