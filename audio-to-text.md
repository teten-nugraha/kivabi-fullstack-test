# Audio-to-Text Integration for Note-Taking

## 1. High-Level Workflow

1.  Client uploads an audio file.
2.  Spring Boot API receives the audio.
3.  Backend calls a Speech-to-Text (STT) provider.
4.  Provider returns transcription.
5.  Backend saves transcription to the database.
6.  (Optional) Save audio for reference.

## 2. Integration Modes

### A. Synchronous (for short audio)

-   Simple: Client → Backend → STT → DB
-   Not suitable for long audio.

### B. Asynchronous (for long audio)

-   Client → Backend → Storage → Queue → Worker → STT → DB

## 3. Spring Boot Integration Points

### Upload Endpoint

``` java
@PostMapping("/notes/audio")
public NoteResponse createNoteFromAudio(@RequestParam("audio") MultipartFile audioFile) {
    // processing
}
```

### STT Service

``` java
public String transcribeAudio(File audioFile) {
    return transcriptionText;
}
```

### Save to Database

``` java
Note note = new Note();
note.setContent(transcribedText);
noteRepository.save(note);
```

## 4. Provider Comparison

  ------------------------------------------------------------------------
  Provider             Pros           Cons          Best For
  -------------------- -------------- ------------- ----------------------
  OpenAI Whisper       Best accuracy, Requires      Most use cases
                       multilingual   upload        

  Google STT           Strong         Higher cost   Enterprise
                       accuracy                     

  AWS Transcribe       Good streaming AWS           AWS users
                                      complexity    

  Azure STT            Enterprise     Expensive     Enterprise

  Vosk Offline         No internet    Lower         On-device
                                      accuracy      
  ------------------------------------------------------------------------

## 5. Architecture

### Simple

Client → Backend → Whisper API → DB

### Scalable

Client → Backend → Storage → Queue → Worker → STT → DB

## 6. Challenges

-   Large audio files → async processing
-   Long transcription → background workers
-   Noise → preprocessing (FFmpeg)
-   Cost → delete audio after processing
-   Scaling → storage + queues

## 7. Whisper Example

### Controller

``` java
@PostMapping("/notes/audio")
public NoteResponse createFromAudio(@RequestParam("audio") MultipartFile file) throws Exception {
    File temp = File.createTempFile("note", file.getOriginalFilename());
    file.transferTo(temp);
    String text = whisperService.transcribe(temp);
    Note note = new Note(text);
    noteRepository.save(note);
    return new NoteResponse(note.getId(), note.getContent());
}
```

### Whisper Service

``` java
@Service
public class WhisperService {

    private final WebClient webClient = WebClient.builder()
            .baseUrl("https://api.openai.com/v1/audio/transcriptions")
            .defaultHeader("Authorization", "Bearer YOUR_API_KEY")
            .build();

    public String transcribe(File audio) {
        return webClient.post()
            .contentType(MediaType.MULTIPART_FORM_DATA)
            .body(BodyInserters.fromMultipartData("file", new FileSystemResource(audio))
                .with("model", "whisper-1"))
            .retrieve()
            .bodyToMono(JsonNode.class)
            .map(node -> node.get("text").asText())
            .block();
    }
}
```
