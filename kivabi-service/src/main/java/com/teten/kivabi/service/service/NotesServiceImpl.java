package com.teten.kivabi.service.service;

import com.teten.kivabi.service.model.Notes;
import com.teten.kivabi.service.model.Project;
import com.teten.kivabi.service.repository.NotesRepository;
import com.teten.kivabi.service.repository.ProjectRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotesServiceImpl implements NotesService {
  private final NotesRepository notesRepository;
  private final ProjectRepository projectRepository;

  @Override
  public List<Notes> getNotesByProjectId(Long projectId) {
    Project project = projectRepository.findById(projectId).orElse(null);
    if (project == null) return java.util.Collections.emptyList();
    return notesRepository.findAll().stream()
        .filter(note -> note.getProject() != null && note.getProject().getId().equals(projectId))
        .toList();
  }

  @Override
  public Notes createNote(Long projectId, String content) {
    Project project = projectRepository.findById(projectId).orElse(null);
    if (project == null) return null;
    Notes note = new Notes(content, project);
    return notesRepository.save(note);
  }
}
