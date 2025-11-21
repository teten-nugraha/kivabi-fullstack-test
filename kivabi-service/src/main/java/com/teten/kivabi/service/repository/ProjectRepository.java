package com.teten.kivabi.service.repository;

import com.teten.kivabi.service.model.Project;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
  Project findByName(String name);

  List<Project> findByCreatedBy(String username);
}
