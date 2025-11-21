package com.teten.kivabi.service.service;

import com.teten.kivabi.service.model.Project;
import com.teten.kivabi.service.repository.ProjectRepository;
import com.teten.kivabi.service.security.jwt.JwtTokenManager;
import com.teten.kivabi.service.security.utils.SecurityConstants;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {
  private final ProjectRepository projectRepository;
  private final JwtTokenManager jwtTokenManager;

  @Override
  public Project createProject(Project project, String token) {
    final String username = jwtTokenManager.getUsernameFromToken(getAuthToken(token));
    project.setCreatedBy(username);
    return projectRepository.save(project);
  }

  @Override
  public List<Project> getAllProjects(String token) {
    final String username = jwtTokenManager.getUsernameFromToken(getAuthToken(token));
    return projectRepository.findByCreatedBy(username);
  }

  @Override
  public Project findByName(String name) {
    return projectRepository.findByName(name);
  }

  private String getAuthToken(String tokenHeader) {
    return tokenHeader.replace(SecurityConstants.TOKEN_PREFIX, Strings.EMPTY);
  }
}
