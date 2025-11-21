package com.teten.kivabi.service.controller;

import com.teten.kivabi.service.model.Notes;
import com.teten.kivabi.service.service.NotesService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notes")
@RequiredArgsConstructor
public class NotesController {
  private final NotesService notesService;

  @GetMapping
  public ResponseEntity<ApiResponse<List<Notes>>> getNotesByProjectId(
      @RequestParam Long projectId) {
    List<Notes> notes = notesService.getNotesByProjectId(projectId);
    ApiResponse<List<Notes>> response = new ApiResponse<>(true, "List notes", notes);
    return ResponseEntity.ok(response);
  }

  @PostMapping
  public ResponseEntity<ApiResponse<Notes>> createNote(
      @RequestParam Long projectId, @RequestBody Notes notesRequest) {
    Notes created = notesService.createNote(projectId, notesRequest.getContent());
    ApiResponse<Notes> response = new ApiResponse<>(true, "Notes berhasil dibuat", created);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }
}
