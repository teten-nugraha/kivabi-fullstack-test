package com.teten.kivabi.service.controller;

import com.teten.kivabi.service.model.Project;
import com.teten.kivabi.service.service.ProjectService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {
  private final ProjectService projectService;

  @PostMapping
  public ResponseEntity<ApiResponse<Project>> createProject(@RequestBody Project project) {
    Project created = projectService.createProject(project);
    ApiResponse<Project> response = new ApiResponse<>(true, "Project berhasil dibuat", created);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  @GetMapping
  public ResponseEntity<ApiResponse<List<Project>>> getAllProjects() {
    List<Project> projects = projectService.getAllProjects();
    ApiResponse<List<Project>> response = new ApiResponse<>(true, "List project", projects);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/find")
  public ResponseEntity<ApiResponse<Project>> findByName(@RequestParam String name) {
    Project project = projectService.findByName(name);
    ApiResponse<Project> response = new ApiResponse<>(true, "Project ditemukan", project);
    return ResponseEntity.ok(response);
  }
}
