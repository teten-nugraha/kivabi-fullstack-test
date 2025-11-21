package com.teten.kivabi.service.service;

import com.teten.kivabi.service.model.Notes;
import java.util.List;

public interface NotesService {
  List<Notes> getNotesByProjectId(Long projectId);

  Notes createNote(Long projectId, String content);
}
