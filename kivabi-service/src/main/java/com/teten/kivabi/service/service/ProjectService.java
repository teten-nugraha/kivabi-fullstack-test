package com.teten.kivabi.service.service;

import com.teten.kivabi.service.model.Project;
import java.util.List;

public interface ProjectService {
  Project createProject(Project project, String token);

  List<Project> getAllProjects(String token);

  Project findByName(String name);
}
