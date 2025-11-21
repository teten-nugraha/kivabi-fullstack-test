package com.teten.kivabi.service.exceptions;

import com.teten.kivabi.service.controller.AuthController;
import java.time.LocalDateTime;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(basePackageClasses = AuthController.class)
public class RegistrationControllerAdvice {

  @ExceptionHandler(RegistrationException.class)
  ResponseEntity<ApiExceptionResponse> handleRegistrationException(
      RegistrationException exception) {

    final ApiExceptionResponse response =
        new ApiExceptionResponse(
            exception.getErrorMessage(), HttpStatus.BAD_REQUEST, LocalDateTime.now());

    return ResponseEntity.status(response.getStatus()).body(response);
  }
}
